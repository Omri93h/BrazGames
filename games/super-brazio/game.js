const STORAGE_KEY = "dor-bachelor-super-brazio-state-v1";
const VENDOR_DIAGNOSTICS_KEY = "dor-bachelor-super-brazio-vendor-diagnostics-v1";
const STORAGE_VERSION = 4;
const RESET_PASSWORD = "Chmir";
const RULES_MODAL_MS = 16000;
const COUNTDOWN_SECONDS = 3;
const VENDOR_READY_TIMEOUT_MS = 7000;
const VENDOR_RETRY_DELAY_BASE_MS = 350;
const VENDOR_RETRY_DELAY_MAX_MS = 3500;

const INITIAL_LEVEL = "1-1";
const FINAL_LEVEL = "brazio-2";
const FINAL_FINISH_X = 3392;
const VENDOR_BUILD = "2026-06-28-dor-face-placement-1";
const VENDOR_BASE_PATH = "vendor/meth-super-mario-runtime-20260628-dor-face-placement";
const getVendorAssetSrc = (path) => `${VENDOR_BASE_PATH}/${path}`;
const DAMAGE_SOUND_SRC = getVendorAssetSrc("audio/music/die.ogg");
const VICTORY_SOUND_SRC = getVendorAssetSrc("audio/music/level-clear.ogg");
const VICTORY_FALLBACK_SOUND_SRC = getVendorAssetSrc("audio/music/princess.ogg");
const STAGE_ONE_MUSIC_SRC = getVendorAssetSrc("audio/music/overworld.ogg");
const STAGE_TWO_MUSIC_SRC = getVendorAssetSrc("audio/music/castle.ogg");
const STAGE_TWO_FALLBACK_MUSIC_SRC = getVendorAssetSrc("audio/music/overworld.ogg");
const STAGE_TWO_MUSIC_SWITCH_MS = 30000;
const STAGE_TWO_MUSIC_FADE_MS = 2750;
const CHOOSE_FIGHTER_SOUND_SRC = "assets/sounds/choose-your-fighter.mp3?v=2026-06-23-choose-fighter-1";
const SOUND_ASSET_VERSION = "2026-06-27-start-arcade-music-1";
const START_SCREEN_MUSIC_VOLUME = 0.24;
const START_SCREEN_MUSIC_CROSSFADE_SECONDS = 3;
const START_SCREEN_MUSIC_CROSSFADE_MS = 2800;
const START_SCREEN_MUSIC_MANIFEST = [
  "assets/sounds/start-music/arcade-01.mp3",
  "assets/sounds/start-music/arcade-02.mp3",
  "assets/sounds/start-music/arcade-03.mp3",
  "assets/sounds/start-music/arcade-04.mp3",
];
const FIGHTER_REVEAL_SOUNDS = {
  fighterRevealDor: `assets/sounds/fighter-reveals/dor_reveal.mp3?v=${SOUND_ASSET_VERSION}`,
  fighterRevealGabo: `assets/sounds/fighter-reveals/gabo_reveal.mp3?v=${SOUND_ASSET_VERSION}`,
  fighterRevealMagami: `assets/sounds/fighter-reveals/magami_reveal.mp3?v=${SOUND_ASSET_VERSION}`,
  fighterRevealMeser: `assets/sounds/fighter-reveals/meser_reveal.mp3?v=${SOUND_ASSET_VERSION}`,
  fighterRevealMiki: `assets/sounds/fighter-reveals/miki_reveal.mp3?v=${SOUND_ASSET_VERSION}`,
  fighterRevealOmri: `assets/sounds/fighter-reveals/omri_reveal.mp3?v=${SOUND_ASSET_VERSION}`,
  fighterRevealPishuto: `assets/sounds/fighter-reveals/pishuto_reveal.mp3?v=${SOUND_ASSET_VERSION}`,
  fighterRevealPlato: `assets/sounds/fighter-reveals/plato_reveal.mp3?v=${SOUND_ASSET_VERSION}`,
};
const FIGHTER_REVEAL_SOUND_KEYS = {
  meser: "fighterRevealGabo",
  magami: "fighterRevealPishuto",
  omri: "fighterRevealOmri",
  plato: "fighterRevealPlato",
  pishuto: "fighterRevealMeser",
  miki: "fighterRevealDor",
  dor: "fighterRevealMiki",
  gabo: "fighterRevealMagami",
};
const FIGHTER_PREVIEW_ASSETS = {
  meser: "assets/images/characters/messer_fighter_preview.gif?v=2026-06-16-messer-xminus5-1",
  magami: "assets/images/characters/magami_fighter_preview.gif?v=2026-06-19-hair-matte-1",
  omri: "assets/images/characters/omri_fighter_preview.gif?v=2026-06-19-hair-matte-1",
  plato: "assets/images/characters/plato_fighter_preview.gif?v=2026-06-18-plato-fighter-2",
  pishuto: "assets/images/characters/pishuto_fighter_preview.gif?v=2026-06-26-pishuto-stripe-fix-1",
  miki: "assets/images/characters/miki_fighter_preview.gif?v=2026-06-27-miki-no-ghost-1",
  dor: "assets/images/characters/dor_fighter_preview.gif?v=2026-06-18-dor-head90-1",
  gabo: "assets/images/characters/gabo_fighter_preview.gif?v=2026-06-19-gabo-head-margin-1",
};
const URL_PARAMS = new URLSearchParams(window.location.search);
const IS_DEBUG_MODE = URL_PARAMS.get("debug") === "1";
const START_WITH_DEBUG_HUD = IS_DEBUG_MODE || URL_PARAMS.get("debugHud") === "1";
const DEBUG_DEFAULT_CHARACTER = "dor";

const TEAMS = [
  {
    id: "chen",
    name: "החן יוספים, ועוזריהם",
    color: "#f04444",
    controls: new Map([
      ["KeyA", "KeyA"],
      ["KeyD", "KeyD"],
      ["KeyW", "KeyP"],
    ]),
  },
  {
    id: "brazim",
    name: "הבראזים",
    color: "#2f80ff",
    controls: new Map([
      ["ArrowLeft", "KeyA"],
      ["ArrowRight", "KeyD"],
      ["ArrowUp", "KeyP"],
    ]),
  },
];

const CHARACTER_ROSTER = {
  chen: [
    { id: "meser", name: "מסר" },
    { id: "magami", name: "מגמי" },
    { id: "omri", name: "עומרי" },
    { id: "plato", name: "פלטו" },
  ],
  brazim: [
    { id: "pishuto", name: "פישוטו" },
    { id: "miki", name: "מיקי" },
    { id: "dor", name: "דור" },
    { id: "gabo", name: "גבו" },
  ],
};
const LEGACY_GABO_ID = ["ge", "vo"].join("");

const state = createInitialState();
const pressedCodes = new Set();
const vendorKeyHolds = new Map();
const frameStates = new Map();
const damageAudio = new Audio(DAMAGE_SOUND_SRC);
const victoryAudio = new Audio(VICTORY_SOUND_SRC);
const fallbackVictoryAudio = new Audio(VICTORY_FALLBACK_SOUND_SRC);
const stageOneMusicAudio = new Audio(STAGE_ONE_MUSIC_SRC);
const stageTwoMusicAudio = new Audio(STAGE_TWO_MUSIC_SRC);
const stageTwoFallbackMusicAudio = new Audio(STAGE_TWO_FALLBACK_MUSIC_SRC);
const chooseFighterPromptAudio = new Audio(CHOOSE_FIGHTER_SOUND_SRC);
const fighterRevealAudioCache = new Map(Object.entries(FIGHTER_REVEAL_SOUNDS).map(([key, src]) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  return [key, audio];
}));
let startIntroStarted = false;
let rulesTimeoutId = null;
let rulesCompleteHandler = null;
let chooseFighterPromptTimerId = null;
let activeFighterRevealAudio = null;
const fighterRevealTimers = new Set();
let activeStartMusicAudio = null;
let nextStartMusicAudio = null;
let startMusicIndex = 0;
let startMusicWasStarted = false;
let startMusicCrossfadeInProgress = false;
const startMusicFadeFrames = new Set();
let countdownTimerId = null;
let countdownWaitingForVendor = false;
let shortcutDebugMode = false;
let debugHudEnabled = START_WITH_DEBUG_HUD;
let lastControlTeamId = null;
let globalStageMusicLevel = "";
let stageTwoMusicSwitchTimerId = null;
let stageTwoMusicFadeTimerId = null;

damageAudio.preload = "auto";
victoryAudio.preload = "auto";
fallbackVictoryAudio.preload = "none";
stageOneMusicAudio.preload = "auto";
stageOneMusicAudio.loop = true;
stageTwoMusicAudio.preload = "auto";
stageTwoMusicAudio.loop = true;
stageTwoFallbackMusicAudio.preload = "auto";
stageTwoFallbackMusicAudio.loop = true;
chooseFighterPromptAudio.preload = "auto";

const els = {
  startScreen: document.querySelector("#startScreen"),
  debugScreen: document.querySelector("#debugScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  startButton: document.querySelector("#startButton"),
  dorFighterPreview: document.querySelector("#dorFighterPreview"),
  pishutoFighterPreview: document.querySelector("#pishutoFighterPreview"),
  mikiFighterPreview: document.querySelector("#mikiFighterPreview"),
  gaboFighterPreview: document.querySelector("#gaboFighterPreview"),
  messerFighterPreview: document.querySelector("#messerFighterPreview"),
  magamiFighterPreview: document.querySelector("#magamiFighterPreview"),
  omriFighterPreview: document.querySelector("#omriFighterPreview"),
  platoFighterPreview: document.querySelector("#platoFighterPreview"),
  gameFrames: new Map([
    ["chen", document.querySelector("#gameFrameChen")],
    ["brazim", document.querySelector("#gameFrameBrazim")],
  ]),
  worldPanels: new Map([
    ["chen", document.querySelector(".world-panel-chen")],
    ["brazim", document.querySelector(".world-panel-brazim")],
  ]),
  gameplayHuds: new Map([
    ["chen", document.querySelector('[data-gameplay-hud="chen"]')],
    ["brazim", document.querySelector('[data-gameplay-hud="brazim"]')],
  ]),
  rulesOverlay: document.querySelector("#rulesOverlay"),
  countdownOverlay: document.querySelector("#countdownOverlay"),
  countdownNumber: document.querySelector("#countdownNumber"),
  winnerOverlay: document.querySelector("#winnerOverlay"),
  resetModal: document.querySelector("#resetModal"),
  resetPasswordInput: document.querySelector("#resetPasswordInput"),
  resetError: document.querySelector("#resetError"),
  debugHudBadge: document.querySelector("#debugHudBadge"),
  debugHudPanels: new Map([
    ["chen", document.querySelector("#debugHudPanelChen")],
    ["brazim", document.querySelector("#debugHudPanelBrazim")],
  ]),
  confirmResetButton: document.querySelector("#confirmResetButton"),
  cancelResetButton: document.querySelector("#cancelResetButton"),
};

TEAMS.forEach((team) => {
  frameStates.set(team.id, createFrameState(team.id, els.gameFrames.get(team.id)));
});

document.querySelectorAll(".character-card").forEach((card) => {
  card.addEventListener("click", () => {
    selectCharacter(card.dataset.teamId, card.dataset.characterId);
  });
});

document.querySelectorAll("[data-debug-level]").forEach((button) => {
  button.addEventListener("click", () => {
    startDebugMode(button.dataset.debugLevel);
  });
});

els.startButton.addEventListener("click", handleStartButtonClick);
els.confirmResetButton.addEventListener("click", confirmReset);
els.cancelResetButton.addEventListener("click", closeResetModal);
els.resetPasswordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") confirmReset();
  if (event.key === "Escape") closeResetModal();
});

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
window.addEventListener("message", handleVendorMessage);

init();

function createInitialState() {
  return {
    version: STORAGE_VERSION,
    phase: "start",
    selectedCharacters: {
      chen: "",
      brazim: "",
    },
    raceStartedAt: 0,
    elapsedMs: 0,
    currentLevel: INITIAL_LEVEL,
    currentLevels: createInitialLevels(),
    winner: null,
  };
}

function createInitialLevels() {
  return Object.fromEntries(TEAMS.map((team) => [team.id, INITIAL_LEVEL]));
}

function createFrameState(teamId, frame) {
  return {
    teamId,
    frame,
    ready: false,
    loadAttempt: 0,
    bootToken: 0,
    watchdogTimerId: null,
    retryTimerId: null,
    lastDebugHudData: null,
  };
}

function init() {
  if (URL_PARAMS.get("init") === "1") {
    localStorage.removeItem(STORAGE_KEY);
    window.history.replaceState({}, "", getCleanStartupPath());
  }

  if (IS_DEBUG_MODE) {
    if (hasDirectDebugLevel()) {
      startDebugMode(getDebugLevel());
    } else {
      showDebugScreen();
    }
    return;
  }

  restoreState();
  syncCharacterSelectionUI();
  updateStartButtonState();

  if (state.phase === "gameOver" && state.winner) {
    showGameScreen();
    bootVendorFrames({reason: "winner-restore"});
    showWinnerOverlay();
  } else if (state.phase === "rules") {
    showStartScreen();
    showRulesOverlay(() => {
      if (state.phase === "rules") startRace();
    });
  } else if (state.phase !== "start") {
    showGameScreen();
    bootVendorFrames();
    startCountdown();
  } else {
    showStartScreen();
  }
}

function getCleanStartupPath() {
  const cleanParams = new URLSearchParams(window.location.search);
  cleanParams.delete("init");
  const query = cleanParams.toString();
  return query ? `${window.location.pathname}?${query}` : window.location.pathname;
}

function getDebugLevel() {
  const requestedLevel = URL_PARAMS.get("level") || URL_PARAMS.get("debugLevel") || INITIAL_LEVEL;
  return [INITIAL_LEVEL, FINAL_LEVEL].includes(requestedLevel) ? requestedLevel : INITIAL_LEVEL;
}

function hasDirectDebugLevel() {
  return URL_PARAMS.has("level") || URL_PARAMS.has("debugLevel");
}

function startDebugMode(levelName = getDebugLevel()) {
  stopStartScreenMusic();
  stopGlobalStageMusic();
  shortcutDebugMode = true;
  lastControlTeamId = "brazim";
  const debugLevel = [INITIAL_LEVEL, FINAL_LEVEL].includes(levelName) ? levelName : INITIAL_LEVEL;
  Object.assign(state, createInitialState(), {
    phase: "countdown",
    selectedCharacters: {
      chen: "",
      brazim: DEBUG_DEFAULT_CHARACTER,
    },
    currentLevel: debugLevel,
    currentLevels: {
      chen: INITIAL_LEVEL,
      brazim: debugLevel,
    },
  });
  startIntroStarted = true;
  countdownWaitingForVendor = false;
  hideRulesOverlay();
  clearInterval(countdownTimerId);
  clearVendorTimers();
  releaseAllKeys();
  syncCharacterSelectionUI();
  els.winnerOverlay.classList.add("is-hidden");
  showGameScreen();
  bootVendorFrames({reason: "debug-boot"});
  startCountdown();
}

function handleStartButtonClick() {
  if (!startIntroStarted) {
    startStartScreenMusic();
    startIntroStarted = true;
    els.startScreen.classList.add("is-intro-open");
    els.startButton.disabled = true;
    window.setTimeout(() => {
      els.startButton.textContent = "התחל משחק";
      updateStartButtonState();
    }, 4300);
    scheduleChooseFighterPrompt();
    return;
  }

  if (!allCharactersSelected()) return;
  stopStartScreenMusic();
  startRulesFlow();
}

function startRulesFlow() {
  stopStartScreenMusic();
  state.phase = "rules";
  state.winner = null;
  state.elapsedMs = 0;
  state.raceStartedAt = 0;
  state.currentLevel = INITIAL_LEVEL;
  state.currentLevels = createInitialLevels();
  saveState();
  showRulesOverlay(() => {
    if (state.phase === "rules") startRace();
  });
}

function showRulesOverlay(onComplete) {
  window.clearTimeout(rulesTimeoutId);
  rulesTimeoutId = null;
  rulesCompleteHandler = onComplete;
  els.rulesOverlay.classList.remove("is-hidden", "is-running");
  void els.rulesOverlay.offsetWidth;
  els.rulesOverlay.classList.add("is-running");
  rulesTimeoutId = window.setTimeout(() => {
    rulesTimeoutId = null;
    rulesCompleteHandler = null;
    hideRulesOverlay();
    onComplete();
  }, RULES_MODAL_MS);
}

function hideRulesOverlay() {
  window.clearTimeout(rulesTimeoutId);
  rulesTimeoutId = null;
  rulesCompleteHandler = null;
  els.rulesOverlay.classList.add("is-hidden");
  els.rulesOverlay.classList.remove("is-running");
}

function completeRulesOverlayNow() {
  if (state.phase !== "rules" || !rulesCompleteHandler) return;
  const onComplete = rulesCompleteHandler;
  window.clearTimeout(rulesTimeoutId);
  rulesTimeoutId = null;
  rulesCompleteHandler = null;
  els.rulesOverlay.classList.add("is-hidden");
  els.rulesOverlay.classList.remove("is-running");
  onComplete();
}

function startRace() {
  stopStartScreenMusic();
  stopGlobalStageMusic();
  state.phase = "countdown";
  state.winner = null;
  lastControlTeamId = null;
  state.elapsedMs = 0;
  state.raceStartedAt = 0;
  state.currentLevel = state.currentLevel || INITIAL_LEVEL;
  state.currentLevels = createInitialLevels();
  saveState();
  showGameScreen();
  bootVendorFrames();
  startCountdown();
}

function bootVendorFrames({resetAttempts = true, reason = "boot"} = {}) {
  clearVendorTimers();
  releaseAllKeys();
  els.countdownOverlay.dataset.vendorError = "";
  syncActivePanels();
  getActiveTeams().forEach((team) => {
    bootVendorFrame(team.id, {resetAttempts, reason});
  });
  syncDebugHudBadge();
}

function bootVendorFrame(teamId, {resetAttempts = true, reason = "boot"} = {}) {
  const frameState = getFrameState(teamId);
  if (!frameState) return;
  if (resetAttempts) {
    frameState.loadAttempt = 0;
  }
  clearVendorTimers(teamId);
  releaseTeamKeys(teamId);
  frameState.ready = false;
  frameState.lastDebugHudData = null;
  const frame = replaceVendorFrame(teamId);
  if (!frame) {
    logVendorEvent("missing-frame", {teamId, reason});
    return;
  }
  const bootToken = ++frameState.bootToken;
  const cacheKey = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const level = getTeamLevel(teamId);
  const src = `${VENDOR_BASE_PATH}/index.html?autostart=1&parentMusic=1&level=${encodeURIComponent(level)}&finalLevel=${encodeURIComponent(FINAL_LEVEL)}&finishX=${FINAL_FINISH_X}&build=${VENDOR_BUILD}&team=${encodeURIComponent(teamId)}&debug=${isDebugSession() ? "1" : "0"}&debugHud=${debugHudEnabled ? "1" : "0"}&attempt=${frameState.loadAttempt}&boot=${bootToken}&cache=${cacheKey}`;
  frame.src = src;
  logVendorEvent("boot", {teamId, reason, bootToken, src});

  frameState.watchdogTimerId = window.setTimeout(() => {
    if (bootToken !== frameState.bootToken || frameState.ready || state.phase === "start" || state.phase === "gameOver") {
      return;
    }
    scheduleVendorReboot(teamId, "ready-timeout", {bootToken, src});
  }, VENDOR_READY_TIMEOUT_MS);
}

function startCountdown() {
  clearInterval(countdownTimerId);
  releaseAllKeys();
  els.countdownOverlay.classList.remove("is-hidden");
  state.phase = "countdown";
  saveState();
  countdownWaitingForVendor = true;
  els.countdownNumber.textContent = "טוען";
  if (!areActiveFramesReady()) return;
  runCountdownTimer();
}

function runCountdownTimer() {
  if (!areActiveFramesReady()) {
    startCountdown();
    return;
  }
  clearInterval(countdownTimerId);
  countdownWaitingForVendor = false;
  const countdownEndsAt = Date.now() + COUNTDOWN_SECONDS * 1000;

  countdownTimerId = window.setInterval(() => {
    const remaining = Math.max(0, Math.ceil((countdownEndsAt - Date.now()) / 1000));
    els.countdownNumber.textContent = remaining || "יאללה";
    if (remaining <= 0) {
      clearInterval(countdownTimerId);
      countdownTimerId = null;
      beginPlaying();
    }
  }, 100);
}

function beginPlaying() {
  if (!areActiveFramesLoaded() || !areActiveFramesReady()) {
    bootVendorFrames();
    startCountdown();
    return;
  }
  state.phase = "playing";
  state.raceStartedAt = Date.now();
  els.countdownOverlay.classList.add("is-hidden");
  syncDebugHudBadge();
  syncGlobalStageMusic();
  saveState();
}

function toggleDebugHud() {
  debugHudEnabled = !debugHudEnabled;
  syncDebugHudBadge();
  broadcastVendorMessage({
    type: "set-debug-overlay",
    enabled: debugHudEnabled,
  });
}

function syncDebugHudBadge() {
  const showBadge = debugHudEnabled && !els.gameScreen.classList.contains("is-hidden");
  els.debugHudBadge?.classList.toggle("is-hidden", !showBadge);
  frameStates.forEach((frameState) => renderDebugHudPanel(frameState.teamId));
}

function renderDebugHudPanel(teamId) {
  const frameState = getFrameState(teamId);
  const panel = els.debugHudPanels.get(teamId);
  const shouldShow = debugHudEnabled
    && frameState?.lastDebugHudData
    && !els.gameScreen.classList.contains("is-hidden");
  panel?.classList.toggle("is-hidden", !shouldShow);
  if (!panel) return;
  if (!shouldShow) {
    panel.textContent = "";
    return;
  }

  const data = frameState.lastDebugHudData;
  const iceLine = data.nearbyIce?.length
    ? data.nearbyIce.map((enemy) => `#${enemy.id} tile ${enemy.tileX},${enemy.tileY} dx ${enemy.dx}`).join(" | ")
    : "none nearby";
  const flagLine = data.nearbyFlags?.length
    ? data.nearbyFlags.map((flag) => `#${flag.id} tile ${flag.tileX},${flag.tileY} dx ${flag.dx} ${flag.reached ? "green" : "red"}`).join(" | ")
    : "none nearby";
  const lines = [
    `${teamId} | level ${data.level} | camera tiles ${data.cameraStartTile}-${data.cameraEndTile}`,
    `Mario px ${Math.round(data.marioX)},${Math.round(data.marioY)} | tile ${data.marioTileX},${data.marioTileY} | vel ${Math.round(data.velX)},${Math.round(data.velY)}`,
    `under ${data.under || "empty"} | body ${data.body || "empty"}`,
    `ICE ${iceLine}`,
    `FLAGS ${flagLine}`,
  ];

  panel.replaceChildren(...lines.map((line) => {
    const row = document.createElement("div");
    row.textContent = line;
    return row;
  }));
}

function handleKeyDown(event) {
  if (state.phase === "rules" && event.code === "Space" && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    event.stopPropagation();
    completeRulesOverlayNow();
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.code === "KeyD") {
    event.preventDefault();
    if (canEnterShortcutDebugMode()) {
      shortcutDebugMode = true;
      showDebugScreen();
      return;
    }
    openResetModal();
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.code === "KeyI") {
    event.preventDefault();
    toggleDebugHud();
    return;
  }

  if (state.phase !== "playing") return;

  const handled = routeKey(event.code, "keydown");
  if (handled) {
    event.preventDefault();
    pressedCodes.add(event.code);
  }
}

function handleKeyUp(event) {
  const handled = routeKey(event.code, "keyup");
  if (handled) {
    event.preventDefault();
    pressedCodes.delete(event.code);
  }
}

function routeKey(sourceCode, eventType) {
  let handled = false;
  TEAMS.forEach((team) => {
    if (!isTeamActive(team.id)) return;
    const vendorCode = team.controls.get(sourceCode);
    if (!vendorCode) return;
    handled = true;
    const holdKey = `${team.id}:${vendorCode}`;
    const holders = vendorKeyHolds.get(holdKey) || new Set();
    if (eventType === "keydown") {
      if (holders.has(sourceCode)) return;
      lastControlTeamId = team.id;
      if (holders.size === 0) postVendorKey(team.id, eventType, vendorCode);
      holders.add(sourceCode);
      vendorKeyHolds.set(holdKey, holders);
      return;
    }
    if (!holders.has(sourceCode)) return;
    holders.delete(sourceCode);
    if (holders.size === 0) {
      vendorKeyHolds.delete(holdKey);
      postVendorKey(team.id, eventType, vendorCode);
    } else {
      vendorKeyHolds.set(holdKey, holders);
    }
  });
  return handled;
}

function postVendorKey(teamId, eventType, code) {
  getFrame(teamId)?.contentWindow?.postMessage({
    source: "super-brazio-parent",
    type: "key",
    eventType,
    code,
  }, "*");
}

function releaseAllKeys() {
  [...pressedCodes].forEach((code) => routeKey(code, "keyup"));
  pressedCodes.clear();
  vendorKeyHolds.clear();
  broadcastVendorMessage({type: "release-input"});
}

function releaseTeamKeys(teamId) {
  [...pressedCodes].forEach((code) => {
    const team = TEAMS.find((candidate) => candidate.id === teamId);
    if (team?.controls.has(code)) {
      routeKey(code, "keyup");
      pressedCodes.delete(code);
    }
  });
  [...vendorKeyHolds.keys()].forEach((holdKey) => {
    if (holdKey.startsWith(`${teamId}:`)) {
      vendorKeyHolds.delete(holdKey);
    }
  });
  postVendorMessage(teamId, {type: "release-input"});
}

function handleVendorMessage(event) {
  if (event.data?.source !== "super-brazio-vendor") return;
  const frameState = findFrameStateByWindow(event.source);
  if (!frameState) {
    logVendorEvent("stale-message", {
      type: event.data.type,
      message: event.data.message || "",
    });
    return;
  }
  if (event.data.type === "ready") {
    frameState.ready = true;
    clearVendorTimers(frameState.teamId);
    els.countdownOverlay.dataset.vendorError = "";
    logVendorEvent("ready", {
      teamId: frameState.teamId,
      level: event.data.level || "",
      bootToken: frameState.bootToken,
    });
    stopVendorAudio(frameState.teamId);
    if (countdownWaitingForVendor && state.phase === "countdown" && areActiveFramesReady()) {
      runCountdownTimer();
    }
    if (state.phase === "playing") {
      syncGlobalStageMusic();
    } else if (state.phase === "countdown" && hasAnyTeamReachedStageTwo()) {
      activateStageTwoMusic();
    }
  }
  if (event.data.type === "load-error") {
    scheduleVendorReboot(frameState.teamId, "load-error", {
      message: event.data.message || "",
      stack: event.data.stack || "",
      bootToken: frameState.bootToken,
    });
    return;
  }
  if (event.data.type === "level-change") {
    releaseTeamKeys(frameState.teamId);
    setTeamLevel(frameState.teamId, event.data.level || getTeamLevel(frameState.teamId));
    if (getTeamLevel(frameState.teamId) === FINAL_LEVEL) {
      activateStageTwoMusic();
    } else if (state.phase === "playing") {
      syncGlobalStageMusic();
    }
    saveState();
    return;
  }
  if (event.data.type === "debug-state") {
    frameState.lastDebugHudData = event.data;
    renderDebugHudPanel(frameState.teamId);
    return;
  }
  if (event.data.type === "powerup" && event.data.powerup === "green-mushroom") {
    broadcastVendorMessage({
      type: "activate-psychedelic",
    });
    return;
  }
  if (event.data.type === "finish") {
    finishRace(event.data.team || frameState.teamId);
  }
  if (event.data.type === "damage") {
    if (state.phase === "playing") {
      releaseTeamKeys(frameState.teamId);
      playDamageSound();
    }
    saveState();
  }
}

function finishRace(teamId) {
  if (state.phase !== "playing") return;
  const winnerTeamId = resolveWinnerTeamId(teamId);
  state.phase = "gameOver";
  state.elapsedMs = Date.now() - state.raceStartedAt;
  state.winner = {
    teamId: winnerTeamId,
    teamName: TEAMS.find((team) => team.id === winnerTeamId)?.name || "SUPER BRAZIO",
    characterId: state.selectedCharacters[winnerTeamId] || state.selectedCharacters.brazim || state.selectedCharacters.chen,
    characterName: getSelectedCharacterName(winnerTeamId) || getSelectedCharacterName("brazim") || getSelectedCharacterName("chen") || "מריו",
    elapsedMs: state.elapsedMs,
  };
  releaseAllKeys();
  stopVendorAudio();
  stopGlobalStageMusic();
  playVictorySound();
  saveState();
  showWinnerOverlay();
}

function resolveWinnerTeamId(teamId) {
  if (TEAMS.some((team) => team.id === teamId)) return teamId;
  if (lastControlTeamId && state.selectedCharacters[lastControlTeamId]) return lastControlTeamId;
  if (state.selectedCharacters.brazim) return "brazim";
  if (state.selectedCharacters.chen) return "chen";
  return "brazim";
}

function stopVendorAudio(teamId = "") {
  const message = {type: "stop-audio"};
  if (teamId) {
    postVendorMessage(teamId, message);
    return;
  }
  broadcastVendorMessage(message);
}

function syncGlobalStageMusic() {
  if (hasAnyTeamReachedStageTwo()) {
    activateStageTwoMusic();
    return;
  }
  if (state.phase === "playing") {
    activateStageOneMusic();
    return;
  }
  stopGlobalStageMusic();
}

function activateStageOneMusic() {
  stopVendorAudio();
  if (globalStageMusicLevel !== INITIAL_LEVEL) {
    resetAudio(stageOneMusicAudio);
  }
  globalStageMusicLevel = INITIAL_LEVEL;
  window.clearTimeout(stageTwoMusicSwitchTimerId);
  window.clearInterval(stageTwoMusicFadeTimerId);
  stageTwoMusicSwitchTimerId = null;
  stageTwoMusicFadeTimerId = null;
  resetAudio(stageTwoMusicAudio);
  resetAudio(stageTwoFallbackMusicAudio);
  stageOneMusicAudio.volume = 1;
  stageOneMusicAudio.play().catch(() => {});
}

function activateStageTwoMusic() {
  stopVendorAudio();
  if (globalStageMusicLevel === FINAL_LEVEL) return;

  globalStageMusicLevel = FINAL_LEVEL;
  window.clearTimeout(stageTwoMusicSwitchTimerId);
  window.clearInterval(stageTwoMusicFadeTimerId);
  stageTwoMusicSwitchTimerId = null;
  stageTwoMusicFadeTimerId = null;

  resetAudio(stageOneMusicAudio);
  resetAudio(stageTwoFallbackMusicAudio);
  resetAudio(stageTwoMusicAudio);
  stageTwoFallbackMusicAudio.volume = 1;
  stageTwoMusicAudio.volume = 1;
  stageTwoMusicAudio.play().catch(() => {});

  stageTwoMusicSwitchTimerId = window.setTimeout(() => {
    fadeStageTwoMusicToFallback();
  }, STAGE_TWO_MUSIC_SWITCH_MS);
}

function fadeStageTwoMusicToFallback() {
  window.clearTimeout(stageTwoMusicSwitchTimerId);
  window.clearInterval(stageTwoMusicFadeTimerId);
  stageTwoMusicSwitchTimerId = null;

  const startedAt = Date.now();
  const startVolume = stageTwoMusicAudio.volume || 1;
  stageTwoMusicFadeTimerId = window.setInterval(() => {
    const progress = Math.min(1, (Date.now() - startedAt) / STAGE_TWO_MUSIC_FADE_MS);
    stageTwoMusicAudio.volume = Math.max(0, startVolume * (1 - progress));
    if (progress < 1) return;

    window.clearInterval(stageTwoMusicFadeTimerId);
    stageTwoMusicFadeTimerId = null;
    resetAudio(stageTwoMusicAudio);
    resetAudio(stageTwoFallbackMusicAudio);
    stageTwoMusicAudio.volume = 1;
    stageTwoFallbackMusicAudio.volume = 1;
    stageTwoFallbackMusicAudio.play().catch(() => {});
  }, 80);
}

function stopGlobalStageMusic() {
  globalStageMusicLevel = "";
  window.clearTimeout(stageTwoMusicSwitchTimerId);
  window.clearInterval(stageTwoMusicFadeTimerId);
  stageTwoMusicSwitchTimerId = null;
  stageTwoMusicFadeTimerId = null;
  [stageOneMusicAudio, stageTwoMusicAudio, stageTwoFallbackMusicAudio].forEach(resetAudio);
}

function resetAudio(audio) {
  audio.pause();
  audio.volume = 1;
  try {
    audio.currentTime = 0;
  } catch {
    // Media may not be seekable before metadata is ready.
  }
}

function getVersionedSoundSrc(src) {
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}v=${encodeURIComponent(SOUND_ASSET_VERSION)}`;
}

function createStartMusicAudio(index) {
  const path = START_SCREEN_MUSIC_MANIFEST[index % START_SCREEN_MUSIC_MANIFEST.length];
  const audio = new Audio(getVersionedSoundSrc(path));
  audio.preload = "auto";
  audio.volume = 0;
  audio.addEventListener("timeupdate", handleStartMusicTimeUpdate);
  audio.addEventListener("ended", handleStartMusicEnded);
  return audio;
}

function startStartScreenMusic() {
  if (!START_SCREEN_MUSIC_MANIFEST.length || state.phase !== "start") return;
  startMusicWasStarted = true;

  if (!activeStartMusicAudio) {
    activeStartMusicAudio = createStartMusicAudio(startMusicIndex);
  }

  activeStartMusicAudio.play().then(() => {
    fadeStartMusicAudio(activeStartMusicAudio, START_SCREEN_MUSIC_VOLUME, 900);
  }).catch(() => {
    // Browser audio may be blocked until the next user gesture.
  });
}

function handleStartMusicTimeUpdate(event) {
  const audio = event.currentTarget;
  if (
    audio !== activeStartMusicAudio ||
    nextStartMusicAudio ||
    startMusicCrossfadeInProgress ||
    !Number.isFinite(audio.duration) ||
    audio.duration <= START_SCREEN_MUSIC_CROSSFADE_SECONDS
  ) {
    return;
  }

  if (audio.duration - audio.currentTime <= START_SCREEN_MUSIC_CROSSFADE_SECONDS) {
    crossfadeToNextStartMusicTrack();
  }
}

function handleStartMusicEnded(event) {
  if (event.currentTarget !== activeStartMusicAudio) return;
  crossfadeToNextStartMusicTrack(true);
}

function crossfadeToNextStartMusicTrack(forceImmediate = false) {
  if (!START_SCREEN_MUSIC_MANIFEST.length || nextStartMusicAudio || state.phase !== "start") return;

  const previousAudio = activeStartMusicAudio;
  startMusicIndex = (startMusicIndex + 1) % START_SCREEN_MUSIC_MANIFEST.length;
  const nextAudio = createStartMusicAudio(startMusicIndex);
  nextStartMusicAudio = nextAudio;
  activeStartMusicAudio = nextAudio;
  startMusicCrossfadeInProgress = true;

  nextAudio.play().then(() => {
    fadeStartMusicAudio(nextAudio, START_SCREEN_MUSIC_VOLUME, forceImmediate ? 320 : START_SCREEN_MUSIC_CROSSFADE_MS, () => {
      startMusicCrossfadeInProgress = false;
      nextStartMusicAudio = null;
    });

    if (previousAudio) {
      fadeStartMusicAudio(previousAudio, 0, forceImmediate ? 120 : START_SCREEN_MUSIC_CROSSFADE_MS, () => {
        disposeStartMusicAudio(previousAudio);
      });
    }
  }).catch(() => {
    disposeStartMusicAudio(nextAudio);
    if (activeStartMusicAudio === nextAudio) {
      activeStartMusicAudio = previousAudio || null;
    }
    nextStartMusicAudio = null;
    startMusicCrossfadeInProgress = false;
  });
}

function fadeStartMusicAudio(audio, targetVolume, durationMs, onComplete) {
  if (!audio) return;

  const frameRef = { id: null };
  startMusicFadeFrames.add(frameRef);
  const startVolume = audio.volume;
  const startedAt = performance.now();
  const safeDuration = Math.max(1, durationMs);

  const step = (now) => {
    if (!startMusicFadeFrames.has(frameRef)) return;
    const progress = Math.min(1, (now - startedAt) / safeDuration);
    audio.volume = startVolume + (targetVolume - startVolume) * progress;

    if (progress < 1) {
      frameRef.id = window.requestAnimationFrame(step);
      return;
    }

    startMusicFadeFrames.delete(frameRef);
    onComplete?.();
  };

  frameRef.id = window.requestAnimationFrame(step);
}

function stopStartScreenMusic() {
  startMusicFadeFrames.forEach((frameRef) => {
    if (frameRef.id !== null) window.cancelAnimationFrame(frameRef.id);
  });
  startMusicFadeFrames.clear();

  disposeStartMusicAudio(activeStartMusicAudio);
  disposeStartMusicAudio(nextStartMusicAudio);
  activeStartMusicAudio = null;
  nextStartMusicAudio = null;
  startMusicCrossfadeInProgress = false;
  startMusicWasStarted = false;
  startMusicIndex = 0;
}

function disposeStartMusicAudio(audio) {
  if (!audio) return;
  audio.removeEventListener("timeupdate", handleStartMusicTimeUpdate);
  audio.removeEventListener("ended", handleStartMusicEnded);
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch {
    // Some browsers refuse seeking while media metadata is still loading.
  }
}

function playVictorySound() {
  stopStartScreenMusic();
  stopGlobalStageMusic();
  damageAudio.pause();
  damageAudio.currentTime = 0;
  victoryAudio.pause();
  fallbackVictoryAudio.pause();
  victoryAudio.currentTime = 0;
  fallbackVictoryAudio.currentTime = 0;
  victoryAudio.play().catch(() => {
    fallbackVictoryAudio.play().catch(() => {});
  });
}

function playDamageSound() {
  damageAudio.pause();
  damageAudio.currentTime = 0;
  damageAudio.play().catch(() => {});
}

function scheduleChooseFighterPrompt() {
  clearChooseFighterPromptTimer();
  chooseFighterPromptTimerId = window.setTimeout(() => {
    chooseFighterPromptTimerId = null;
    if (!startIntroStarted || state.phase !== "start") return;
    playChooseFighterPrompt();
  }, 3350);
}

function clearChooseFighterPromptTimer() {
  if (chooseFighterPromptTimerId === null) return;
  window.clearTimeout(chooseFighterPromptTimerId);
  chooseFighterPromptTimerId = null;
}

function playChooseFighterPrompt() {
  chooseFighterPromptAudio.pause();
  try {
    chooseFighterPromptAudio.currentTime = 0;
  } catch {
    // Some browsers refuse seeking while media metadata is still loading.
  }
  chooseFighterPromptAudio.volume = 0.88;
  chooseFighterPromptAudio.play().catch(() => {
    // Browser audio may be blocked until the first user gesture; the menu still works.
  });
}

function showStartScreen() {
  if (!startIntroStarted) clearChooseFighterPromptTimer();
  els.startScreen.classList.remove("is-hidden");
  els.debugScreen.classList.add("is-hidden");
  els.gameScreen.classList.add("is-hidden");
  els.winnerOverlay.classList.add("is-hidden");
  els.countdownOverlay.classList.add("is-hidden");
  hideRulesOverlay();
  syncDebugHudBadge();
  if (startIntroStarted) {
    els.startScreen.classList.add("is-intro-open");
    els.startButton.textContent = "התחל משחק";
  } else {
    els.startScreen.classList.remove("is-intro-open");
    els.startButton.textContent = "התחל";
  }
  syncCharacterSelectionUI();
  updateStartButtonState();
}

function showDebugScreen() {
  stopStartScreenMusic();
  clearChooseFighterPromptTimer();
  els.startScreen.classList.add("is-hidden");
  els.debugScreen.classList.remove("is-hidden");
  els.gameScreen.classList.add("is-hidden");
  els.winnerOverlay.classList.add("is-hidden");
  els.countdownOverlay.classList.add("is-hidden");
  hideRulesOverlay();
  releaseAllKeys();
  clearAllFrameSources();
  syncDebugHudBadge();
}

function showGameScreen() {
  stopStartScreenMusic();
  clearChooseFighterPromptTimer();
  els.startScreen.classList.add("is-hidden");
  els.debugScreen.classList.add("is-hidden");
  els.gameScreen.classList.remove("is-hidden");
  syncActivePanels();
  syncGameplayHud();
  hideRulesOverlay();
  syncDebugHudBadge();
}

function selectCharacter(teamId, characterId) {
  if (!startIntroStarted || state.phase !== "start") return;
  const character = getCharacterById(teamId, characterId);
  if (!character) return;
  state.selectedCharacters[teamId] = character.id;
  syncCharacterSelectionUI(teamId, character.id);
  updateStartButtonState();
  playFighterRevealSound(character.id);
  saveState();
}

function syncCharacterSelectionUI(animatedTeamId = "", animatedCharacterId = "") {
  const canShowFighterPreviews = startIntroStarted && state.phase === "start";
  document.querySelectorAll(".character-card").forEach((card) => {
    const selected = state.selectedCharacters[card.dataset.teamId] === card.dataset.characterId;
    card.classList.toggle("is-selected", selected);
  });

  document.querySelectorAll(".fighter-preview").forEach((preview) => {
    const characterId = preview.dataset.characterId;
    const teamId = preview.dataset.teamId;
    const selected = canShowFighterPreviews && state.selectedCharacters[teamId] === characterId;
    setFighterPreviewVisible(preview, selected, teamId === animatedTeamId && characterId === animatedCharacterId);
  });
}

function syncGameplayHud() {
  TEAMS.forEach((team) => {
    const hud = els.gameplayHuds.get(team.id);
    if (!hud) return;

    const character = getGameplayHudCharacter(team.id);
    const src = character ? FIGHTER_PREVIEW_ASSETS[character.id] : "";
    hud.classList.toggle("is-hidden", !isTeamActive(team.id) || !character);
    hud.dataset.characterId = character?.id || "";

    const name = hud.querySelector(".world-player-name");
    if (name) name.textContent = character?.name || "";

    const fighter = hud.querySelector(".world-player-fighter");
    if (!fighter) return;
    if (!src) {
      fighter.replaceChildren();
      return;
    }

    const currentImage = fighter.querySelector("img");
    const image = currentImage || document.createElement("img");
    image.alt = "";
    if (image.getAttribute("src") !== src) image.src = src;
    if (!currentImage) fighter.append(image);
  });
}

function setFighterPreviewVisible(preview, visible, animate = false) {
  clearFighterRevealTimer(preview);
  preview.classList.remove("is-appearing");
  preview.classList.toggle("is-visible", visible);
  if (!visible || !animate) return;
  void preview.offsetWidth;
  preview.classList.add("is-appearing");
  const timerId = window.setTimeout(() => {
    preview.classList.remove("is-appearing");
    fighterRevealTimers.delete(timerId);
    delete preview.dataset.revealTimerId;
  }, 1500);
  preview.dataset.revealTimerId = String(timerId);
  fighterRevealTimers.add(timerId);
}

function clearFighterRevealTimer(preview) {
  const timerId = Number(preview.dataset.revealTimerId);
  if (!Number.isFinite(timerId) || !fighterRevealTimers.has(timerId)) return;
  window.clearTimeout(timerId);
  fighterRevealTimers.delete(timerId);
  delete preview.dataset.revealTimerId;
}

function playFighterRevealSound(characterId) {
  const soundKey = FIGHTER_REVEAL_SOUND_KEYS[normalizeCharacterId(characterId)];
  const audio = fighterRevealAudioCache.get(soundKey);
  if (!audio) return;
  if (activeFighterRevealAudio && activeFighterRevealAudio !== audio) {
    activeFighterRevealAudio.pause();
    try {
      activeFighterRevealAudio.currentTime = 0;
    } catch {
      // Some browsers refuse seeking until metadata is ready.
    }
  }
  activeFighterRevealAudio = audio;
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch {
    // Some browsers refuse seeking until metadata is ready.
  }
  audio.volume = 0.95;
  audio.play().catch(() => {
    // Selection still works when browser autoplay policy blocks audio.
  });
}

function updateStartButtonState() {
  if (state.phase !== "start") return;
  if (!startIntroStarted) {
    els.startButton.disabled = false;
    return;
  }
  els.startButton.disabled = !allCharactersSelected();
}

function allCharactersSelected() {
  return TEAMS.every((team) => Boolean(state.selectedCharacters[team.id]));
}

function getCharacterById(teamId, characterId) {
  characterId = normalizeCharacterId(characterId);
  return CHARACTER_ROSTER[teamId]?.find((character) => character.id === characterId) || null;
}

function normalizeCharacterId(characterId) {
  return characterId === LEGACY_GABO_ID ? "gabo" : characterId || "";
}

function getGameplayHudCharacter(teamId) {
  const character = getCharacterById(teamId, state.selectedCharacters[teamId]);
  if (character) return character;
  if (isDebugSession() && teamId === "brazim") {
    return getCharacterById("brazim", DEBUG_DEFAULT_CHARACTER);
  }
  return null;
}

function getSelectedCharacterName(teamId) {
  const character = getCharacterById(teamId, state.selectedCharacters[teamId]);
  return character?.name || "";
}

function showWinnerOverlay() {
  const winner = state.winner;
  if (!winner) return;
  const heartColor = winner.teamId === "chen" ? "#ff5c8d" : "#ff3f6f";
  const winnerName = escapeHtml(winner.characterName || "מריו");
  const winnerHearts = [
    [7, 0.1, 2.2], [14, 1.7, 1.6], [22, 0.7, 2.9], [31, 2.4, 1.9],
    [42, 1.1, 2.5], [53, 3.0, 1.7], [64, 0.3, 3.1], [73, 2.0, 2.0],
    [83, 1.4, 2.7], [92, 2.8, 1.8], [18, 3.5, 2.3], [69, 4.0, 2.4],
  ].map(([x, delay, size]) => (
    `<span style="--x:${x}%;--delay:${delay}s;--size:${size}rem;">♥</span>`
  )).join("");
  els.winnerOverlay.innerHTML = `
    <div class="winner-hearts" style="--winner-heart-color:${heartColor};" aria-hidden="true">
      ${winnerHearts}
    </div>
    <div class="winner-banner">
      <strong>${winnerName} הגיע לגרין קארד!</strong>
    </div>
  `;
  els.winnerOverlay.classList.remove("is-hidden");
  els.winnerOverlay.addEventListener("click", restartAfterWinner, {once: true});
}

function restartAfterWinner() {
    if (isDebugSession()) {
      state.winner = null;
      els.winnerOverlay.classList.add("is-hidden");
      startDebugMode(getTeamLevel("brazim") || state.currentLevel || getDebugLevel());
      return;
    }
    state.phase = "start";
    state.winner = null;
    state.elapsedMs = 0;
    state.raceStartedAt = 0;
    startIntroStarted = true;
    countdownWaitingForVendor = false;
    saveState();
    releaseAllKeys();
    clearAllFrameSources();
    syncCharacterSelectionUI();
    updateStartButtonState();
    els.winnerOverlay.classList.add("is-hidden");
    showStartScreen();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  }[char]));
}

function openResetModal() {
  els.resetModal.classList.remove("is-hidden");
  els.resetPasswordInput.value = "";
  els.resetError.textContent = "";
  window.setTimeout(() => els.resetPasswordInput.focus(), 0);
}

function closeResetModal() {
  els.resetModal.classList.add("is-hidden");
  els.resetPasswordInput.value = "";
  els.resetError.textContent = "";
}

function confirmReset() {
  if (els.resetPasswordInput.value !== RESET_PASSWORD) {
    els.resetError.textContent = "לא";
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
  stopGlobalStageMusic();
  Object.assign(state, createInitialState());
  startIntroStarted = false;
  hideRulesOverlay();
  clearInterval(countdownTimerId);
  clearVendorTimers();
  countdownWaitingForVendor = false;
  releaseAllKeys();
  clearAllFrameSources();
  syncCharacterSelectionUI();
  updateStartButtonState();
  closeResetModal();
  if (isDebugSession()) {
    showDebugScreen();
    return;
  }
  showStartScreen();
}

function restoreState() {
  if (isDebugSession()) return;
  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    if (!rawState) return;
    const parsed = JSON.parse(rawState);
    if (parsed.version !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    const restoredPhase = parsed.phase || "start";
    if (restoredPhase === "start") {
      localStorage.removeItem(STORAGE_KEY);
      Object.assign(state, createInitialState());
      startIntroStarted = false;
      return;
    }
    state.phase = restoredPhase;
    state.selectedCharacters = {
      chen: normalizeCharacterId(parsed.selectedCharacters?.chen),
      brazim: normalizeCharacterId(parsed.selectedCharacters?.brazim),
    };
    state.elapsedMs = parsed.elapsedMs || 0;
    state.winner = parsed.winner || null;
    state.raceStartedAt = parsed.raceStartedAt || 0;
    state.currentLevel = parsed.currentLevel || INITIAL_LEVEL;
    state.currentLevels = normalizeCurrentLevels(parsed.currentLevels, state.currentLevel);
    if (state.phase !== "start") startIntroStarted = true;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  if (isDebugSession()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: STORAGE_VERSION,
      phase: state.phase,
      selectedCharacters: state.selectedCharacters,
      elapsedMs: state.elapsedMs,
      winner: state.winner,
      raceStartedAt: state.raceStartedAt,
      currentLevel: state.currentLevel || INITIAL_LEVEL,
      currentLevels: normalizeCurrentLevels(state.currentLevels, state.currentLevel),
    }));
  } catch {
    // The game should still be playable if localStorage is unavailable.
  }
}

function isDebugSession() {
  return IS_DEBUG_MODE || shortcutDebugMode;
}

function canEnterShortcutDebugMode() {
  return state.phase === "start"
    && !els.startScreen.classList.contains("is-hidden")
    && els.resetModal.classList.contains("is-hidden");
}

function getActiveTeams() {
  if (isDebugSession()) {
    return TEAMS.filter((team) => team.id === "brazim");
  }
  return TEAMS;
}

function isTeamActive(teamId) {
  return getActiveTeams().some((team) => team.id === teamId);
}

function syncActivePanels() {
  const debugSolo = isDebugSession();
  els.gameScreen.classList.toggle("is-debug-solo", debugSolo);
  els.worldPanels.forEach((panel, teamId) => {
    panel?.classList.toggle("is-inactive", !isTeamActive(teamId));
  });
}

function getFrameState(teamId) {
  return frameStates.get(teamId) || null;
}

function getFrame(teamId) {
  return getFrameState(teamId)?.frame || null;
}

function findFrameStateByWindow(sourceWindow) {
  for (const frameState of frameStates.values()) {
    if (frameState.frame?.contentWindow === sourceWindow) {
      return frameState;
    }
  }
  return null;
}

function replaceVendorFrame(teamId) {
  const frameState = getFrameState(teamId);
  const oldFrame = frameState?.frame;
  if (!oldFrame) return null;
  const nextFrame = oldFrame.cloneNode(false);
  nextFrame.removeAttribute("src");
  oldFrame.replaceWith(nextFrame);
  frameState.frame = nextFrame;
  els.gameFrames.set(teamId, nextFrame);
  return nextFrame;
}

function clearVendorTimers(teamId = "") {
  const targets = teamId ? [getFrameState(teamId)].filter(Boolean) : [...frameStates.values()];
  targets.forEach((frameState) => {
    window.clearTimeout(frameState.watchdogTimerId);
    window.clearTimeout(frameState.retryTimerId);
    frameState.watchdogTimerId = null;
    frameState.retryTimerId = null;
  });
}

function scheduleVendorReboot(teamId, reason, detail = {}) {
  const frameState = getFrameState(teamId);
  if (!frameState) return;
  if (state.phase === "start" || state.phase === "gameOver") {
    logVendorEvent("ignored-reboot", {teamId, reason, ...detail});
    return;
  }

  frameState.ready = false;
  frameState.loadAttempt += 1;
  clearVendorTimers(teamId);
  clearInterval(countdownTimerId);
  countdownTimerId = null;
  releaseTeamKeys(teamId);
  state.phase = "countdown";
  saveState();
  countdownWaitingForVendor = true;
  els.countdownOverlay.classList.remove("is-hidden");
  els.countdownOverlay.dataset.vendorError = detail.message || reason;
  els.countdownNumber.textContent = frameState.loadAttempt <= 1 ? "טוען" : "טוען מחדש";

  const delay = Math.min(
    VENDOR_RETRY_DELAY_MAX_MS,
    VENDOR_RETRY_DELAY_BASE_MS + frameState.loadAttempt * 300,
  );
  logVendorEvent("reboot-scheduled", {teamId, reason, delay, ...detail});
  frameState.retryTimerId = window.setTimeout(() => {
    bootVendorFrame(teamId, {resetAttempts: false, reason});
  }, delay);
}

function areActiveFramesReady() {
  return getActiveTeams().every((team) => getFrameState(team.id)?.ready);
}

function areActiveFramesLoaded() {
  return getActiveTeams().every((team) => Boolean(getFrame(team.id)?.getAttribute("src")));
}

function normalizeCurrentLevels(levels, fallbackLevel = INITIAL_LEVEL) {
  const fallback = [INITIAL_LEVEL, FINAL_LEVEL].includes(fallbackLevel) ? fallbackLevel : INITIAL_LEVEL;
  return Object.fromEntries(TEAMS.map((team) => {
    const level = levels?.[team.id] || fallback;
    return [team.id, [INITIAL_LEVEL, FINAL_LEVEL].includes(level) ? level : INITIAL_LEVEL];
  }));
}

function getTeamLevel(teamId) {
  state.currentLevels = normalizeCurrentLevels(state.currentLevels, state.currentLevel);
  return state.currentLevels[teamId] || INITIAL_LEVEL;
}

function setTeamLevel(teamId, levelName) {
  const level = [INITIAL_LEVEL, FINAL_LEVEL].includes(levelName) ? levelName : INITIAL_LEVEL;
  state.currentLevels = normalizeCurrentLevels(state.currentLevels, state.currentLevel);
  state.currentLevels[teamId] = level;
  if (teamId === "brazim" || isDebugSession()) {
    state.currentLevel = level;
  }
}

function hasAnyTeamReachedStageTwo() {
  state.currentLevels = normalizeCurrentLevels(state.currentLevels, state.currentLevel);
  return getActiveTeams().some((team) => state.currentLevels[team.id] === FINAL_LEVEL);
}

function postVendorMessage(teamId, message) {
  getFrame(teamId)?.contentWindow?.postMessage({
    source: "super-brazio-parent",
    ...message,
  }, "*");
}

function broadcastVendorMessage(message) {
  getActiveTeams().forEach((team) => postVendorMessage(team.id, message));
}

function clearAllFrameSources() {
  frameStates.forEach((frameState) => {
    frameState.ready = false;
    frameState.lastDebugHudData = null;
    frameState.frame?.removeAttribute("src");
  });
}

function logVendorEvent(type, detail = {}) {
  const entry = {
    at: new Date().toISOString(),
    type,
    phase: state.phase,
    attempt: detail.teamId ? getFrameState(detail.teamId)?.loadAttempt || 0 : undefined,
    build: VENDOR_BUILD,
    ...detail,
  };
  console.warn("[Super Brazio vendor]", entry);
  try {
    const history = JSON.parse(localStorage.getItem(VENDOR_DIAGNOSTICS_KEY) || "[]");
    history.push(entry);
    localStorage.setItem(VENDOR_DIAGNOSTICS_KEY, JSON.stringify(history.slice(-80)));
  } catch {
    // Diagnostics are helpful, but gameplay must not depend on localStorage.
  }
}

function formatTime(ms) {
  const seconds = Math.max(0, ms / 1000);
  const whole = Math.floor(seconds);
  const tenths = Math.floor((seconds - whole) * 10);
  return `${String(whole).padStart(2, "0")}.${tenths}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
