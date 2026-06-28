const els = {
  fighterInput: document.querySelector("#fighterInput"),
  sessionNameInput: document.querySelector("#sessionNameInput"),
  uploadButton: document.querySelector("#uploadButton"),
  uploadStatus: document.querySelector("#uploadStatus"),
  sessionSelect: document.querySelector("#sessionSelect"),
  loadSessionButton: document.querySelector("#loadSessionButton"),
  loadMarioPresetButton: document.querySelector("#loadMarioPresetButton"),
  presetStatus: document.querySelector("#presetStatus"),
  saveButton: document.querySelector("#saveButton"),
  downloadButton: document.querySelector("#downloadButton"),
  saveStatus: document.querySelector("#saveStatus"),
  sessionTitle: document.querySelector("#sessionTitle"),
  frameCounter: document.querySelector("#frameCounter"),
  prevButton: document.querySelector("#prevButton"),
  nextButton: document.querySelector("#nextButton"),
  copyPreviousButton: document.querySelector("#copyPreviousButton"),
  copyRemainingButton: document.querySelector("#copyRemainingButton"),
  clearFrameButton: document.querySelector("#clearFrameButton"),
  saveDraftButton: document.querySelector("#saveDraftButton"),
  completionStatus: document.querySelector("#completionStatus"),
  missingFramesList: document.querySelector("#missingFramesList"),
  canvas: document.querySelector("#frameCanvas"),
  stage: document.querySelector("#stage"),
  emptyState: document.querySelector("#emptyState"),
};

const ctx = els.canvas.getContext("2d");
const state = {
  session: null,
  frameIndex: 0,
  image: null,
  view: { scale: 1, x: 0, y: 0, width: 0, height: 0, dpr: 1 },
  drawing: false,
  pointerMode: null,
  dragStart: null,
  moveOffset: null,
  draftBox: null,
};

els.uploadButton.addEventListener("click", uploadFighter);
els.loadSessionButton.addEventListener("click", () => loadSession(els.sessionSelect.value));
els.loadMarioPresetButton.addEventListener("click", () => loadPreset("mario"));
els.saveButton.addEventListener("click", saveSession);
els.downloadButton.addEventListener("click", downloadSession);
els.prevButton.addEventListener("click", () => goToFrame(state.frameIndex - 1));
els.nextButton.addEventListener("click", () => goToFrame(state.frameIndex + 1));
els.copyPreviousButton.addEventListener("click", copyPreviousBox);
els.copyRemainingButton.addEventListener("click", copyBoxToRemaining);
els.clearFrameButton.addEventListener("click", clearCurrentFrame);
els.saveDraftButton.addEventListener("click", () => saveSession({ allowIncomplete: true }));
els.canvas.addEventListener("pointerdown", startBox);
els.canvas.addEventListener("pointermove", updateBox);
els.canvas.addEventListener("pointerup", finishBox);
els.canvas.addEventListener("pointercancel", cancelBox);
document.querySelectorAll("[data-nudge-x][data-nudge-y]").forEach((button) => {
  button.addEventListener("click", () => {
    nudgeCurrentBox(Number(button.dataset.nudgeX), Number(button.dataset.nudgeY));
  });
});
window.addEventListener("resize", draw);
document.addEventListener("keydown", handleKeys);

refreshSessions();
updateControls();

async function refreshSessions() {
  try {
    const sessions = await fetchJson("/api/sessions");
    els.sessionSelect.innerHTML = "";
    sessions.forEach((session) => {
      const option = document.createElement("option");
      option.value = session.id;
      const summary = session.mappingSummary;
      const status = summary?.complete
        ? "מלא"
        : `חסרים ${summary?.missingFrames?.length ?? "?"}`;
      option.textContent = `${session.id} (${session.frameCount} פריימים, ${status})`;
      els.sessionSelect.append(option);
    });
  } catch {
    els.sessionSelect.innerHTML = "";
  }
}

async function uploadFighter() {
  const file = els.fighterInput.files?.[0];
  if (!file) {
    els.uploadStatus.textContent = "בחר GIF קודם";
    return;
  }

  els.uploadStatus.textContent = "מפרק GIF לפריימים...";
  const dataUrl = await readFileAsDataUrl(file);
  const session = await fetchJson("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      sessionId: els.sessionNameInput.value,
      dataUrl,
    }),
  });

  if (session.error) {
    els.uploadStatus.textContent = session.error;
    return;
  }

  els.uploadStatus.textContent = `נטען: ${session.id}`;
  await refreshSessions();
  await setSession(session);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

async function loadSession(sessionId) {
  if (!sessionId) return;
  const session = await fetchJson(`/api/session/${encodeURIComponent(sessionId)}`);
  await setSession(session);
}

async function loadPreset(presetId) {
  els.presetStatus.textContent = "טוען preset...";
  const session = await fetchJson(`/api/preset/${encodeURIComponent(presetId)}`, {
    method: "POST",
  });

  if (session.error) {
    els.presetStatus.textContent = session.error;
    return;
  }

  els.presetStatus.textContent = `נטען: ${session.id}`;
  await refreshSessions();
  await setSession(session);
}

async function setSession(session) {
  state.session = session;
  state.frameIndex = 0;
  await loadFrameImage();
  updateControls();
}

async function loadFrameImage() {
  const frame = getCurrentFrame();
  state.image = null;
  if (!frame) {
    draw();
    return;
  }

  const image = new Image();
  image.src = `${frame.src}?v=${Date.now()}`;
  await image.decode();
  state.image = image;
  draw();
}

function updateControls() {
  const hasSession = Boolean(state.session);
  const frame = getCurrentFrame();
  els.emptyState.style.display = hasSession ? "none" : "block";
  els.sessionTitle.textContent = hasSession
    ? `${state.session.id} / ${state.session.sourceFilename}`
    : "לא נטען session";
  els.frameCounter.textContent = hasSession
    ? `Frame ${state.frameIndex + 1} / ${state.session.frames.length}`
    : "Frame - / -";

  [
    els.saveButton,
    els.saveDraftButton,
    els.downloadButton,
    els.prevButton,
    els.nextButton,
    els.copyPreviousButton,
    els.copyRemainingButton,
    els.clearFrameButton,
  ].forEach((button) => {
    button.disabled = !hasSession;
  });
  els.prevButton.disabled = !hasSession || state.frameIndex === 0;
  els.nextButton.disabled = !hasSession || state.frameIndex >= state.session.frames.length - 1;
  els.copyPreviousButton.disabled = !hasSession || state.frameIndex === 0;
  els.clearFrameButton.disabled = !hasSession || !frame?.faceBox;
  renderCompletionStatus();
}

function getCurrentFrame() {
  return state.session?.frames?.[state.frameIndex] || null;
}

async function goToFrame(nextIndex) {
  if (!state.session) return;
  state.frameIndex = Math.max(0, Math.min(state.session.frames.length - 1, nextIndex));
  state.draftBox = null;
  await loadFrameImage();
  updateControls();
}

function draw() {
  const rect = els.stage.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  els.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  els.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  els.canvas.style.width = `${rect.width}px`;
  els.canvas.style.height = `${rect.height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.fillStyle = "#050707";
  ctx.fillRect(0, 0, rect.width, rect.height);

  if (!state.image) return;

  const scale = Math.min(rect.width / state.image.naturalWidth, rect.height / state.image.naturalHeight);
  const width = state.image.naturalWidth * scale;
  const height = state.image.naturalHeight * scale;
  const x = (rect.width - width) / 2;
  const y = (rect.height - height) / 2;
  state.view = { scale, x, y, width, height, dpr };

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(state.image, x, y, width, height);

  const box = state.draftBox || getCurrentFrame()?.faceBox;
  if (box) drawFaceBox(box);
}

function drawFaceBox(box) {
  const viewBox = imageBoxToView(box);
  ctx.save();
  ctx.fillStyle = "rgba(112, 255, 181, 0.18)";
  ctx.strokeStyle = "#70ffb5";
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 6]);
  ctx.fillRect(viewBox.x, viewBox.y, viewBox.width, viewBox.height);
  ctx.strokeRect(viewBox.x, viewBox.y, viewBox.width, viewBox.height);
  ctx.setLineDash([]);
  ctx.fillStyle = "#70ffb5";
  ctx.font = "900 18px Arial";
  ctx.fillText(`${Math.round(box.width)}x${Math.round(box.height)}`, viewBox.x + 8, viewBox.y - 8);
  ctx.restore();
}

function getMappingSummary() {
  const frames = state.session?.frames || [];
  const missingFrames = frames
    .filter((frame) => !isValidFaceBox(frame.faceBox))
    .map((frame) => frame.frame);
  return {
    frameCount: frames.length,
    mappedFrameCount: frames.length - missingFrames.length,
    missingFrames,
    complete: frames.length > 0 && missingFrames.length === 0,
  };
}

function isValidFaceBox(box) {
  return Boolean(
    box
      && Number.isFinite(Number(box.x))
      && Number.isFinite(Number(box.y))
      && Number.isFinite(Number(box.width))
      && Number.isFinite(Number(box.height))
      && Number(box.width) > 4
      && Number(box.height) > 4,
  );
}

function renderCompletionStatus() {
  if (!state.session) {
    els.completionStatus.textContent = "אין session טעון";
    els.missingFramesList.innerHTML = "";
    return;
  }

  const summary = getMappingSummary();
  els.completionStatus.textContent = summary.complete
    ? `מוכן לשמירה: ${summary.mappedFrameCount}/${summary.frameCount} פריימים מסומנים`
    : `חסרים ${summary.missingFrames.length} מתוך ${summary.frameCount} פריימים`;
  els.completionStatus.classList.toggle("is-complete", summary.complete);
  els.completionStatus.classList.toggle("is-incomplete", !summary.complete);

  els.missingFramesList.innerHTML = "";
  summary.missingFrames.forEach((frameNumber) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary missing-frame-button";
    button.textContent = `Frame ${frameNumber + 1}`;
    button.addEventListener("click", () => {
      void goToFrame(frameNumber);
    });
    els.missingFramesList.append(button);
  });
}

function imageBoxToView(box) {
  return {
    x: state.view.x + box.x * state.view.scale,
    y: state.view.y + box.y * state.view.scale,
    width: box.width * state.view.scale,
    height: box.height * state.view.scale,
  };
}

function viewPointToImage(event) {
  const rect = els.canvas.getBoundingClientRect();
  const viewX = event.clientX - rect.left;
  const viewY = event.clientY - rect.top;
  return {
    x: clamp((viewX - state.view.x) / state.view.scale, 0, state.image.naturalWidth),
    y: clamp((viewY - state.view.y) / state.view.scale, 0, state.image.naturalHeight),
  };
}

function startBox(event) {
  if (!state.image || !state.session) return;
  els.canvas.setPointerCapture(event.pointerId);
  const point = viewPointToImage(event);
  const currentBox = getCurrentFrame()?.faceBox;
  state.drawing = true;
  if (currentBox && pointIsInsideBox(point, currentBox)) {
    state.pointerMode = "move";
    state.moveOffset = {
      x: point.x - currentBox.x,
      y: point.y - currentBox.y,
    };
    state.draftBox = { ...currentBox };
    els.canvas.classList.add("is-moving-box");
  } else {
    state.pointerMode = "draw";
    state.dragStart = point;
    state.draftBox = { x: state.dragStart.x, y: state.dragStart.y, width: 1, height: 1 };
  }
  draw();
}

function updateBox(event) {
  if (!state.drawing) {
    updateCanvasCursor(event);
    return;
  }
  const point = viewPointToImage(event);
  if (state.pointerMode === "move" && state.draftBox && state.moveOffset) {
    state.draftBox = moveBoxToPoint(state.draftBox, point, state.moveOffset);
  } else if (state.dragStart) {
    state.draftBox = normalizeBox(state.dragStart, point);
  }
  draw();
}

function finishBox(event) {
  if (!state.drawing) return;
  updateBox(event);
  const frame = getCurrentFrame();
  if (frame && state.draftBox && state.draftBox.width > 4 && state.draftBox.height > 4) {
    frame.faceBox = roundBox(state.draftBox);
  }
  state.drawing = false;
  state.pointerMode = null;
  state.dragStart = null;
  state.moveOffset = null;
  state.draftBox = null;
  els.canvas.classList.remove("is-moving-box");
  draw();
  updateControls();
}

function cancelBox() {
  state.drawing = false;
  state.pointerMode = null;
  state.dragStart = null;
  state.moveOffset = null;
  state.draftBox = null;
  els.canvas.classList.remove("is-moving-box");
  draw();
}

function pointIsInsideBox(point, box) {
  return (
    point.x >= box.x
    && point.x <= box.x + box.width
    && point.y >= box.y
    && point.y <= box.y + box.height
  );
}

function moveBoxToPoint(box, point, offset) {
  const width = Number(box.width);
  const height = Number(box.height);
  return {
    ...box,
    x: Math.round(clamp(point.x - offset.x, 0, state.image.naturalWidth - width)),
    y: Math.round(clamp(point.y - offset.y, 0, state.image.naturalHeight - height)),
    width,
    height,
  };
}

function updateCanvasCursor(event) {
  if (!state.image || !state.session) {
    els.canvas.classList.remove("can-move-box");
    return;
  }
  const box = getCurrentFrame()?.faceBox;
  const point = viewPointToImage(event);
  els.canvas.classList.toggle("can-move-box", Boolean(box && pointIsInsideBox(point, box)));
}

function normalizeBox(a, b) {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    x,
    y,
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };
}

function roundBox(box) {
  return {
    x: Math.round(box.x),
    y: Math.round(box.y),
    width: Math.round(box.width),
    height: Math.round(box.height),
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function copyPreviousBox() {
  if (!state.session || state.frameIndex === 0) return;
  const previous = state.session.frames[state.frameIndex - 1]?.faceBox;
  if (!previous) return;
  getCurrentFrame().faceBox = { ...previous };
  draw();
  updateControls();
}

function copyBoxToRemaining() {
  const box = getCurrentFrame()?.faceBox;
  if (!box || !state.session) return;
  for (let index = state.frameIndex + 1; index < state.session.frames.length; index += 1) {
    state.session.frames[index].faceBox = { ...box };
  }
  els.saveStatus.textContent = "הועתק לשאר הפריימים";
  updateControls();
}

function clearCurrentFrame() {
  const frame = getCurrentFrame();
  if (!frame) return;
  frame.faceBox = null;
  draw();
  updateControls();
}

function nudgeCurrentBox(dx, dy) {
  const frame = getCurrentFrame();
  if (!frame?.faceBox || !state.image) return;

  frame.faceBox = {
    ...frame.faceBox,
    x: Math.round(clamp(Number(frame.faceBox.x) + dx, 0, state.image.naturalWidth - Number(frame.faceBox.width))),
    y: Math.round(clamp(Number(frame.faceBox.y) + dy, 0, state.image.naturalHeight - Number(frame.faceBox.height))),
  };
  els.saveStatus.textContent = `הוזז: x ${dx > 0 ? "+" : ""}${dx}, y ${dy > 0 ? "+" : ""}${dy}`;
  draw();
  updateControls();
}

async function saveSession({ allowIncomplete = false } = {}) {
  if (!state.session) return;
  const summary = getMappingSummary();
  if (!allowIncomplete && !summary.complete) {
    els.saveStatus.textContent = `לא נשמר: חסרים פריימים ${summary.missingFrames.map((frame) => frame + 1).join(", ")}`;
    if (summary.missingFrames.length > 0) {
      await goToFrame(summary.missingFrames[0]);
    }
    return;
  }

  state.session.updatedAt = new Date().toISOString();
  state.session.mappingSummary = {
    ...summary,
    savedAt: state.session.updatedAt,
    status: summary.complete ? "complete" : "draft",
  };
  state.session.facePlacementMode = state.session.facePlacementMode || "fixed-size-bottom-center";
  state.session.compositorNotes = state.session.compositorNotes
    || "Use one fixed face size for all frames. Face boxes are placement anchors only.";

  const payload = {
    ...state.session,
    _allowIncomplete: allowIncomplete,
  };
  const result = await fetchJson(`/api/session/${encodeURIComponent(state.session.id)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  els.saveStatus.textContent = result.ok
    ? `${allowIncomplete ? "טיוטה נשמרה" : "נשמר מלא"}: ${result.path}`
    : result.error || "שמירה נכשלה";
  await refreshSessions();
  renderCompletionStatus();
}

function downloadSession() {
  if (!state.session) return;
  const blob = new Blob([JSON.stringify(state.session, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${state.session.id}-face-anchors.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function handleKeys(event) {
  if (!state.session) return;
  const key = event.key;
  if (event.shiftKey && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(key)) {
    event.preventDefault();
    const step = event.altKey ? 5 : 1;
    const direction = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    }[key];
    nudgeCurrentBox(direction[0], direction[1]);
    return;
  }

  if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
    event.preventDefault();
    void goToFrame(state.frameIndex - 1);
  }
  if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
    event.preventDefault();
    void goToFrame(state.frameIndex + 1);
  }
  if (event.key.toLowerCase() === "c") {
    copyPreviousBox();
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    void saveSession();
  }
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok && !data.error) {
    data.error = `${response.status} ${response.statusText}`;
  }
  return data;
}
