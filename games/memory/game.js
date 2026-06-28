const STORAGE_KEY = "dor-bachelor-memory-state-v1";
const STORAGE_VERSION = 3;
const APP_VERSION = "2026-06-28-memory-card-face-preload-1";
const RESTORABLE_PHASES = new Set(["start", "rules", "raffle", "playing", "resolving", "gameOver"]);
const PAIR_COUNT = 15;
const CARD_COUNT = PAIR_COUNT * 2;
const BOARD_COLUMNS = 6;
const FAIR_SHUFFLE_ATTEMPTS = 1600;
const FAIR_SHUFFLE_TIME_BUDGET_MS = 45;
const MAX_CLOSE_PAIR_COUNT = 1;
const MATCH_REVEAL_HOLD_MS = 0;
const MISS_POPUP_DELAY_MS = 1000;
const MISS_FEEDBACK_MS = 2200;
const CELEBRATION_MS = 1100;
const SUCCESS_FEEDBACK_HOLD_MS = 2200;
const CARD_FLIP_CLOSE_MS = 130;
const CARD_FLIP_OPEN_MS = 170;
const CARD_FACE_PRELOAD_TIMEOUT_MS = 4000;
const CURSOR_REVEAL_SUPPRESSION_MS = 1000;
const RAFFLE_DURATION_MS = 7000;
const RAFFLE_RESULT_PAUSE_MS = 3000;
const RAFFLE_STEP_MS = 180;
const RULES_MODAL_MS = 16000;
const SOUND_ASSET_VERSION = "2026-06-27-plato-card-open-short-1";
const MUSIC_ASSET_VERSION = "2026-06-26-memory-arcade-playlist-1";
const BACKGROUND_MUSIC_VOLUME = 0.24;
const MUSIC_CROSSFADE_SECONDS = 3;
const MUSIC_CROSSFADE_MS = 2800;
const MEMORY_CURSOR_DEBUG = true;
const SOUND_MANIFEST = {
  cardFlip: "assets/sounds/card-flip.wav",
  match: "assets/sounds/match-fanfare.wav",
  miss: "assets/sounds/miss-buzzer.wav",
  gameOver: "assets/sounds/game-over-fanfare.wav",
  chooseFighter: "assets/sounds/choose-your-fighter.mp3",
  fighterRevealMeser: "assets/sounds/fighter-reveals/meser_reveal.mp3",
  fighterRevealMagami: "assets/sounds/fighter-reveals/magami_reveal.mp3",
  fighterRevealOmri: "assets/sounds/fighter-reveals/omri_reveal.mp3",
  fighterRevealPlato: "assets/sounds/fighter-reveals/plato_reveal.mp3",
  fighterRevealPishuto: "assets/sounds/fighter-reveals/pishuto_reveal.mp3",
  fighterRevealMiki: "assets/sounds/fighter-reveals/miki_reveal.mp3",
  fighterRevealDor: "assets/sounds/fighter-reveals/dor_reveal.mp3",
  fighterRevealGabo: "assets/sounds/fighter-reveals/gabo_reveal.mp3",
  fighterCardOpenMeser: "assets/sounds/fighter-card-opens/meser_card_open.mp3",
  fighterCardOpenMagami: "assets/sounds/fighter-card-opens/magami_card_open.mp3",
  fighterCardOpenOmri: "assets/sounds/fighter-card-opens/omri_card_open.mp3",
  fighterCardOpenPlato: "assets/sounds/fighter-card-opens/plato_card_open.mp3",
  fighterCardOpenPishuto: "assets/sounds/fighter-card-opens/pishuto_card_open.mp3",
  fighterCardOpenMiki: "assets/sounds/fighter-card-opens/miki_card_open.mp3",
  fighterCardOpenDor: "assets/sounds/fighter-card-opens/dor_card_open.mp3",
  fighterCardOpenGabo: "assets/sounds/fighter-card-opens/gabo_card_open.mp3",
};
const BACKGROUND_MUSIC_MANIFEST = [
  "assets/sounds/music/arcade-01.mp3",
  "assets/sounds/music/arcade-02.mp3",
  "assets/sounds/music/arcade-03.mp3",
  "assets/sounds/music/arcade-04.mp3",
];
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
const FIGHTER_CARD_OPEN_SOUND_KEYS = {
  meser: "fighterCardOpenGabo",
  magami: "fighterCardOpenPishuto",
  omri: "fighterCardOpenOmri",
  plato: "fighterCardOpenPlato",
  pishuto: "fighterCardOpenMeser",
  miki: "fighterCardOpenDor",
  dor: "fighterCardOpenMiki",
  gabo: "fighterCardOpenMagami",
};
const FIGHTER_CURSOR_ASSETS = {
  brazim: {
    pishuto: "assets/images/characters/pishuto_fighter_cursor.gif?v=2026-06-26-pishuto-stripe-fix-1",
    miki: "assets/images/characters/miki_fighter_cursor.gif?v=2026-06-27-miki-no-ghost-1",
    dor: "assets/images/characters/dor_fighter_cursor.gif?v=2026-06-18-dor-head90-1",
    gabo: "assets/images/characters/gabo_fighter_cursor.gif?v=2026-06-19-gabo-head-margin-1",
  },
  chen: {
    meser: "assets/images/characters/messer_fighter_cursor.gif?v=2026-06-17-messer-cursor-1",
    magami: "assets/images/characters/magami_fighter_cursor.gif?v=2026-06-19-hair-matte-1",
    omri: "assets/images/characters/omri_fighter_cursor.gif?v=2026-06-19-hair-matte-1",
    plato: "assets/images/characters/plato_fighter_cursor.gif?v=2026-06-18-plato-fighter-2",
  },
};

const TEAMS = [
  {
    id: "brazim",
    name: "הבראזים",
    color: "#2f80ff",
    setupId: "teamOneSetup",
    panelId: "teamOnePanel",
    scoreId: "teamOneScore",
    collectionId: "teamOneCollection",
  },
  {
    id: "chen",
    name: "החן יוספים, ועוזריהם",
    color: "#f04444",
    setupId: "teamTwoSetup",
    panelId: "teamTwoPanel",
    scoreId: "teamTwoScore",
    collectionId: "teamTwoCollection",
  },
];
const CHARACTER_ROSTER = {
  brazim: [
    { id: "pishuto", name: "פישוטו" },
    { id: "miki", name: "מיקי" },
    { id: "dor", name: "דור" },
    { id: "gabo", name: "גבו" },
  ],
  chen: [
    { id: "meser", name: "מסר" },
    { id: "magami", name: "מגמי" },
    { id: "omri", name: "עומרי" },
    { id: "plato", name: "פלטו" },
  ],
};
const LEGACY_GABO_ID = ["ge", "vo"].join("");

const CARD_COLORS = [
  "#2f80ff",
  "#f04444",
  "#f6c85f",
  "#a78bfa",
  "#78dd7b",
  "#60a5fa",
  "#fb7185",
  "#f59e0b",
  "#34d399",
  "#f472b6",
];

// Static localhost apps cannot list folder contents, so update this manifest when card files change.
// Bump this when replacing images while keeping the same filenames, so browsers reload local assets.
const CARD_ASSET_VERSION = "2026-06-16-memory-k-girl-1";
const MICHAEL_JACKSON_FILENAME = "michael_jackson.jpg";
const MICHAEL_JACKSON_TARGET_POSITIONS = [
  { row: 3, column: 1 },
  { row: 4, column: 4 },
];
const CARD_IMAGE_FILENAMES = [
  "Kelev.jpg",
  "Of.jpg",
  "Tusik.jpg",
  "beach.jpg",
  "bilbao.jpg",
  "blood.jpg",
  "dorfin.jpg",
  "gila.jpg",
  "instagram.jpg",
  "k_girl.jpg",
  "michael_jackson.jpg",
  "omer.jpg",
  "pitma.jpg",
  "ramon.jpg",
  "shemesh.jpg",
];
const CARD_MANIFEST_SIGNATURE = `${CARD_ASSET_VERSION}|pairs:${PAIR_COUNT}|${CARD_IMAGE_FILENAMES.slice(0, PAIR_COUNT).join("|")}`;
const PLACEHOLDER_LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Future voice clips can map to these stable audio keys; current generated effects play separately.
const SUCCESS_PHRASES = [
  { text: "יופי", audioKey: "success-01" },
  { text: "כל הכבוד", audioKey: "success-02" },
  { text: "הצלחתם יפה", audioKey: "success-03" },
  { text: "טוב אתם!", audioKey: "success-04" },
  { text: "יופי יופי יופי", audioKey: "success-05" },
  { text: "פננננננטסטי", audioKey: "success-06" },
  { text: "יפה מאוד", audioKey: "success-07" },
  { text: "איזה זיכרון", audioKey: "success-08" },
  { text: "לא רע בכלל", audioKey: "success-09" },
  { text: "עבודה יפה", audioKey: "success-10" },
  { text: "זה היה נקי", audioKey: "success-11" },
  { text: "פגיעה טובה", audioKey: "success-12" },
  { text: "אתם על זה", audioKey: "success-13" },
  { text: "חזק מאוד", audioKey: "success-14" },
  { text: "וואלה הצלחתם", audioKey: "success-15" },
  { text: "זה שלכם", audioKey: "success-16" },
  { text: "קליל", audioKey: "success-17" },
  { text: "זיכרון של פיל", audioKey: "success-18" },
  { text: "אחלה תפיסה", audioKey: "success-19" },
  { text: "סחתיין", audioKey: "success-20" },
];

const CARD_FACES = createCardFaces();
const cardFaceObjectUrlBySrc = new Map();
const cardFacePreload = preloadCardFaceImages(CARD_FACES);

const els = {
  startScreen: document.querySelector("#startScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  board: document.querySelector("#board"),
  statusMessage: document.querySelector("#statusMessage"),
  rafflePanel: document.querySelector("#rafflePanel"),
  raffleResult: document.querySelector("#raffleResult"),
  raffleModal: document.querySelector("#raffleModal"),
  rafflePlayerCard: document.querySelector("#rafflePlayerCard"),
  rafflePlayerPortrait: document.querySelector("#rafflePlayerPortrait"),
  rafflePlayerName: document.querySelector("#rafflePlayerName"),
  rafflePlayerTeam: document.querySelector("#rafflePlayerTeam"),
  rulesOverlay: document.querySelector("#rulesOverlay"),
  dorFighterPreview: document.querySelector("#dorFighterPreview"),
  pishutoFighterPreview: document.querySelector("#pishutoFighterPreview"),
  mikiFighterPreview: document.querySelector("#mikiFighterPreview"),
  gaboFighterPreview: document.querySelector("#gaboFighterPreview"),
  messerFighterPreview: document.querySelector("#messerFighterPreview"),
  magamiFighterPreview: document.querySelector("#magamiFighterPreview"),
  omriFighterPreview: document.querySelector("#omriFighterPreview"),
  platoFighterPreview: document.querySelector("#platoFighterPreview"),
  startButton: document.querySelector("#startButton"),
  resetModal: document.querySelector("#resetModal"),
  resetError: document.querySelector("#resetError"),
  confirmResetButton: document.querySelector("#confirmResetButton"),
  cancelResetButton: document.querySelector("#cancelResetButton"),
  celebrationLayer: document.querySelector("#celebrationLayer"),
  turnCursorBuddy: document.querySelector("#turnCursorBuddy"),
  gameOverOverlay: document.querySelector("#gameOverOverlay"),
};

let raffleIntervalId = null;
let raffleTimeoutId = null;
let rulesTimeoutId = null;
let rulesCompleteHandler = null;
let chooseFighterPromptTimerId = null;
let startIntroStarted = false;
let soundsPrimed = false;
let activeFighterRevealAudio = null;
let activeFighterCardOpenAudio = null;
let backgroundMusicAudio = null;
let backgroundMusicNextAudio = null;
let backgroundMusicIndex = 0;
let backgroundMusicStarted = false;
let backgroundMusicCrossfading = false;
const soundCache = new Map();
const flipVisual = {
  index: null,
  stage: null,
};
const fighterRevealTimers = new Map();
let cursorBuddyPoint = null;
let cursorBuddyKey = "";
let cursorBuddySuppressed = false;
let cursorBuddyBriefSuppressionTimeoutId = null;
let isReloadingAfterReset = false;

const state = createInitialState();

function debugCursor(eventName, payload = {}) {
  if (!MEMORY_CURSOR_DEBUG) return;

  console.log(`[Memory Cursor Debug] ${eventName}`, {
    phase: state.phase,
    locked: state.locked,
    selectedIndexes: [...state.selectedIndexes],
    activeTeamId: state.activeTeamId,
    cursorBuddySuppressed,
    cursorBuddyVisible: Boolean(els.turnCursorBuddy?.classList.contains("is-visible")),
    seenCardInstanceIdsCount: state.seenCardInstanceIds.length,
    ...payload,
  });
}

window.memoryCursorDebug = () => ({
  phase: state.phase,
  locked: state.locked,
  selectedIndexes: [...state.selectedIndexes],
  activeTeamId: state.activeTeamId,
  cursorBuddySuppressed,
  cursorBuddyVisible: Boolean(els.turnCursorBuddy?.classList.contains("is-visible")),
  seenCardInstanceIds: [...state.seenCardInstanceIds],
  revealedCards: state.deck
    .map((card, index) => ({ index, id: card.id, instanceId: card.instanceId, label: card.label, revealed: card.revealed, collected: card.collected, hasEverBeenRevealed: Boolean(card.hasEverBeenRevealed) }))
    .filter((card) => card.revealed || card.collected || card.hasEverBeenRevealed),
});

els.startButton.addEventListener("click", handleStartButtonClick);
els.confirmResetButton.addEventListener("click", confirmPasswordReset);
els.cancelResetButton.addEventListener("click", closeResetModal);
document.addEventListener("keydown", handleGlobalKeyDown, { capture: true });
document.addEventListener("pointermove", handlePointerMove, { passive: true });
document.addEventListener("pointerleave", hideTurnCursorBuddy);
window.addEventListener("pagehide", saveState);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    saveState();
    pauseBackgroundMusic();
    return;
  }

  resumeBackgroundMusic();
});
document.querySelectorAll(".character-card").forEach((card) => {
  card.addEventListener("click", () => {
    selectCharacter(card.dataset.teamId, card.dataset.characterId);
  });
});
initialize();

function createInitialState() {
  return {
    version: STORAGE_VERSION,
    appVersion: APP_VERSION,
    phase: "start",
    deck: [],
    selectedIndexes: [],
    startingTeamId: null,
    activeTeamId: null,
    locked: false,
    cheatRevealAll: false,
    seenCardInstanceIds: [],
    collectedCount: 0,
    successPhraseIndex: 0,
    gameOverResult: null,
    teams: TEAMS.map((team) => ({
      ...team,
      representative: "",
      selectedCharacterId: "",
      score: 0,
      collectedPairs: [],
    })),
  };
}

async function initialize() {
  if (new URLSearchParams(window.location.search).get("init") === "1") {
    await resetMemoryRuntimeState();
    window.history.replaceState({}, "", window.location.pathname);
    showCleanStart();
    return;
  }

  const savedState = loadSavedState();

  if (!savedState) {
    showCleanStart();
    return;
  }

  await restoreState(savedState);
}

function showCleanStart() {
  applyState(createInitialState());
  renderStartScreen();
}

function renderStartScreen() {
  window.clearInterval(raffleIntervalId);
  window.clearTimeout(raffleTimeoutId);
  window.clearTimeout(rulesTimeoutId);
  clearChooseFighterPromptTimer();
  raffleIntervalId = null;
  raffleTimeoutId = null;
  rulesTimeoutId = null;
  startIntroStarted = false;

  els.startScreen.classList.remove("is-hidden");
  els.startScreen.classList.remove("is-intro-open");
  els.gameScreen.classList.add("is-hidden");
  els.startButton.disabled = false;
  els.startButton.classList.remove("is-hidden");
  els.startButton.textContent = "התחל";
  els.raffleResult.textContent = "";
  els.board.innerHTML = "";
  els.statusMessage.textContent = "";
  els.celebrationLayer.innerHTML = "";
  hideTurnCursorBuddy();
  hideGameOverOverlay();
  closeResetModal();
  closeRaffleModal();
  hideRulesOverlay();
  clearRaffleHighlights();
  syncCharacterSelectionUI();
  updateStartButtonState();

}

function handleStartButtonClick() {
  primeSounds();
  startBackgroundMusic();
  if (!startIntroStarted) {
    startIntroStarted = true;
    els.startScreen.classList.add("is-intro-open");
    els.startButton.disabled = true;
    window.setTimeout(() => {
      els.startButton.textContent = "התחל משחק";
    }, 450);
    window.setTimeout(() => {
      syncCharacterSelectionUI();
    }, 3650);
    scheduleChooseFighterPrompt();
    window.setTimeout(updateStartButtonState, 4850);
    return;
  }

  startRulesFlow();
}

function startRulesFlow() {
  if (state.phase === "rules") return;
  if (!validateStartRepresentatives()) return;

  state.phase = "rules";
  state.locked = true;
  state.teams = state.teams.map((team) => ({
    ...team,
    representative: getRepresentative(team.id),
    selectedCharacterId: getSelectedCharacterId(team.id),
  }));
  els.startButton.disabled = true;
  saveState();
  showRulesOverlay(() => {
    if (state.phase !== "rules") return;
    startRaffleFlow();
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

function startRaffleFlow() {
  if (state.phase === "raffle") return;
  if (!validateStartRepresentatives()) return;

  state.phase = "raffle";
  state.locked = true;
  state.selectedIndexes = [];
  state.deck = [];
  state.seenCardInstanceIds = [];
  state.collectedCount = 0;
  state.successPhraseIndex = 0;
  state.startingTeamId = null;
  state.activeTeamId = null;
  state.gameOverResult = null;
  state.cheatRevealAll = false;
  state.teams = state.teams.map((team) => ({
    ...team,
    representative: getRepresentative(team.id),
    selectedCharacterId: getSelectedCharacterId(team.id),
    score: 0,
    collectedPairs: [],
  }));

  els.startButton.disabled = true;
  els.startButton.classList.add("is-hidden");
  els.startButton.textContent = "התחל";
  els.raffleResult.textContent = "";
  saveState();

  runRaffleAnimation();
}

function runRaffleAnimation() {
  window.clearInterval(raffleIntervalId);
  window.clearTimeout(raffleTimeoutId);

  const candidates = getRaffleCandidates();
  const finalCandidateIndex = Math.floor(Math.random() * candidates.length);
  let tick = 0;

  openRaffleModal();
  showRaffleCandidate(candidates[0]);

  raffleIntervalId = window.setInterval(() => {
    const activeIndex = tick % candidates.length;
    showRaffleCandidate(candidates[activeIndex]);
    tick += 1;
  }, RAFFLE_STEP_MS);

  raffleTimeoutId = window.setTimeout(() => {
    window.clearInterval(raffleIntervalId);
    raffleIntervalId = null;
    const startingPlayer = candidates[finalCandidateIndex];
    state.startingTeamId = startingPlayer.teamId;
    state.activeTeamId = startingPlayer.teamId;
    showRaffleCandidate(startingPlayer, true);
    saveState();

    window.setTimeout(() => {
      closeRaffleModal();
      startGameAfterRaffle();
    }, RAFFLE_RESULT_PAUSE_MS);
  }, RAFFLE_DURATION_MS);
}

function getRaffleCandidates() {
  return state.teams.map((team) => ({
    teamId: team.id,
    teamName: team.name,
    playerName: team.representative || getSelectedCharacter(team.id)?.name || team.name,
    characterId: team.selectedCharacterId || getSelectedCharacterId(team.id),
    portrait: getCharacterPortrait(team.id, team.selectedCharacterId || getSelectedCharacterId(team.id)),
    color: team.color,
  }));
}

function openRaffleModal() {
  els.raffleModal.classList.remove("is-hidden");
}

function closeRaffleModal() {
  els.raffleModal.classList.add("is-hidden");
  els.rafflePlayerCard.style.removeProperty("--raffle-team-color");
  els.rafflePlayerPortrait.innerHTML = "";
  els.rafflePlayerPortrait.classList.remove("is-image", "is-placeholder");
  els.rafflePlayerName.textContent = "";
  els.rafflePlayerTeam.textContent = "";
}

function primeSounds() {
  if (soundsPrimed) return;
  soundsPrimed = true;

  Object.entries(SOUND_MANIFEST).forEach(([key, path]) => {
    const audio = new Audio(`${path}?v=${encodeURIComponent(SOUND_ASSET_VERSION)}`);
    audio.preload = "auto";
    audio.load();
    soundCache.set(key, audio);
  });
}

function playSound(key, volume = 0.7) {
  primeSounds();
  const source = soundCache.get(key);
  if (!source) return;

  const audio = source.cloneNode(true);
  audio.volume = volume;
  audio.play().catch(() => {
    // Browser audio may be blocked until the first user gesture; gameplay continues silently.
  });
}

function getBackgroundMusicSource(index) {
  const path = BACKGROUND_MUSIC_MANIFEST[index % BACKGROUND_MUSIC_MANIFEST.length];
  return `${path}?v=${encodeURIComponent(MUSIC_ASSET_VERSION)}`;
}

function createBackgroundMusicAudio(index) {
  const audio = new Audio(getBackgroundMusicSource(index));
  audio.preload = "auto";
  audio.loop = false;
  audio.volume = 0;
  audio.dataset.musicIndex = String(index);
  audio.addEventListener("timeupdate", () => {
    maybeCrossfadeBackgroundMusic(audio);
  });
  audio.addEventListener("ended", () => {
    if (audio !== backgroundMusicAudio || backgroundMusicCrossfading) return;
    crossfadeToNextBackgroundMusicTrack();
  });
  audio.load();
  return audio;
}

function startBackgroundMusic() {
  if (!BACKGROUND_MUSIC_MANIFEST.length || document.visibilityState === "hidden") return;

  if (backgroundMusicAudio) {
    resumeBackgroundMusic();
    return;
  }

  backgroundMusicStarted = true;
  backgroundMusicAudio = createBackgroundMusicAudio(backgroundMusicIndex);
  playAudioWithFade(backgroundMusicAudio, BACKGROUND_MUSIC_VOLUME, 900);
}

function resumeBackgroundMusic() {
  if (!backgroundMusicStarted || document.visibilityState === "hidden") return;
  if (!backgroundMusicAudio) {
    startBackgroundMusic();
    return;
  }

  backgroundMusicAudio.play().catch(() => {
    // Browser audio may still be blocked until a direct gesture; the next click/keypress retries.
  });
}

function pauseBackgroundMusic() {
  if (backgroundMusicAudio) backgroundMusicAudio.pause();
  if (!backgroundMusicNextAudio) return;

  backgroundMusicNextAudio.pause();
  backgroundMusicIndex = Number.parseInt(backgroundMusicNextAudio.dataset.musicIndex, 10) || backgroundMusicIndex;
  backgroundMusicAudio = backgroundMusicNextAudio;
  backgroundMusicNextAudio = null;
  backgroundMusicCrossfading = false;
  backgroundMusicAudio.volume = BACKGROUND_MUSIC_VOLUME;
}

function maybeCrossfadeBackgroundMusic(audio) {
  if (audio !== backgroundMusicAudio || backgroundMusicCrossfading) return;
  if (!Number.isFinite(audio.duration) || audio.duration <= MUSIC_CROSSFADE_SECONDS + 0.5) return;
  if (audio.duration - audio.currentTime > MUSIC_CROSSFADE_SECONDS) return;

  crossfadeToNextBackgroundMusicTrack();
}

function crossfadeToNextBackgroundMusicTrack() {
  if (!backgroundMusicAudio || backgroundMusicCrossfading || document.visibilityState === "hidden") return;

  backgroundMusicCrossfading = true;
  const previousAudio = backgroundMusicAudio;
  const nextIndex = (backgroundMusicIndex + 1) % BACKGROUND_MUSIC_MANIFEST.length;
  const nextAudio = createBackgroundMusicAudio(nextIndex);
  backgroundMusicNextAudio = nextAudio;

  nextAudio.play()
    .then(() => {
      animateAudioVolume(previousAudio, previousAudio.volume, 0, MUSIC_CROSSFADE_MS, () => {
        previousAudio.pause();
        try {
          previousAudio.currentTime = 0;
        } catch {
          // Some browsers refuse seeking while metadata is unavailable.
        }
      });
      animateAudioVolume(nextAudio, 0, BACKGROUND_MUSIC_VOLUME, MUSIC_CROSSFADE_MS, () => {
        backgroundMusicIndex = nextIndex;
        backgroundMusicAudio = nextAudio;
        backgroundMusicNextAudio = null;
        backgroundMusicCrossfading = false;
      });
    })
    .catch(() => {
      backgroundMusicNextAudio = null;
      backgroundMusicCrossfading = false;
    });
}

function playAudioWithFade(audio, targetVolume, durationMs) {
  audio.volume = 0;
  audio.play()
    .then(() => {
      animateAudioVolume(audio, 0, targetVolume, durationMs);
    })
    .catch(() => {
      // Autoplay can be blocked until the first user gesture.
    });
}

function animateAudioVolume(audio, fromVolume, toVolume, durationMs, onComplete = null) {
  const startedAt = performance.now();

  function step(now) {
    const progress = Math.min(1, (now - startedAt) / durationMs);
    audio.volume = fromVolume + ((toVolume - fromVolume) * progress);

    if (progress < 1) {
      window.requestAnimationFrame(step);
      return;
    }

    audio.volume = toVolume;
    if (onComplete) onComplete();
  }

  window.requestAnimationFrame(step);
}

function scheduleChooseFighterPrompt() {
  clearChooseFighterPromptTimer();
  chooseFighterPromptTimerId = window.setTimeout(() => {
    chooseFighterPromptTimerId = null;
    if (!startIntroStarted || state.phase !== "start") return;
    playSound("chooseFighter", 0.88);
  }, 3350);
}

function clearChooseFighterPromptTimer() {
  if (chooseFighterPromptTimerId === null) return;
  window.clearTimeout(chooseFighterPromptTimerId);
  chooseFighterPromptTimerId = null;
}

function playFighterRevealSound(characterId) {
  const soundKey = FIGHTER_REVEAL_SOUND_KEYS[normalizeCharacterId(characterId)];
  if (!soundKey) return;
  primeSounds();
  const source = soundCache.get(soundKey);
  if (!source) return;

  if (activeFighterRevealAudio) {
    activeFighterRevealAudio.pause();
    try {
      activeFighterRevealAudio.currentTime = 0;
    } catch {
      // Some browsers refuse seeking while media metadata is still loading.
    }
  }

  const audio = source.cloneNode(true);
  activeFighterRevealAudio = audio;
  audio.volume = 0.72;
  audio.play().catch(() => {
    // Browser audio may be blocked until the first user gesture; selection still works.
  });
}

function playFighterCardOpenSound(characterId) {
  const soundKey = FIGHTER_CARD_OPEN_SOUND_KEYS[normalizeCharacterId(characterId)];
  if (!soundKey) return false;
  primeSounds();
  const source = soundCache.get(soundKey);
  if (!source) return false;

  if (activeFighterCardOpenAudio) {
    activeFighterCardOpenAudio.pause();
    try {
      activeFighterCardOpenAudio.currentTime = 0;
    } catch {
      // Some browsers refuse seeking while media metadata is still loading.
    }
  }

  const audio = source.cloneNode(true);
  activeFighterCardOpenAudio = audio;
  audio.volume = 0.68;
  audio.play().catch(() => {
    // Browser audio may be blocked until the first user gesture; card reveal still works.
  });
  return true;
}

function playActiveFighterCardOpenSound() {
  const activeTeam = getActiveTeam();
  const characterId = activeTeam?.selectedCharacterId
    || getCharacterIdByName(activeTeam?.id, activeTeam?.representative);

  if (characterId && playFighterCardOpenSound(characterId)) {
    return;
  }

  playSound("cardFlip", 0.34);
}

function showRaffleCandidate(candidate, isFinal = false) {
  if (!candidate) return;
  highlightRafflePlayer(candidate.teamId, candidate.characterId);
  els.rafflePlayerCard.style.setProperty("--raffle-team-color", candidate.color);
  renderRafflePortrait(candidate);
  els.rafflePlayerName.textContent = candidate.playerName;
  els.rafflePlayerTeam.textContent = isFinal ? `מתחילים עם ${candidate.playerName}` : candidate.teamName;
}

function renderRafflePortrait(candidate) {
  const portrait = candidate.portrait || {};
  els.rafflePlayerPortrait.innerHTML = "";
  els.rafflePlayerPortrait.dataset.teamId = candidate.teamId;
  els.rafflePlayerPortrait.dataset.characterId = candidate.characterId;
  els.rafflePlayerPortrait.classList.toggle("is-image", Boolean(portrait.src));
  els.rafflePlayerPortrait.classList.toggle("is-placeholder", !portrait.src);

  if (portrait.src) {
    const image = document.createElement("img");
    image.src = portrait.src;
    image.alt = "";
    image.draggable = false;
    els.rafflePlayerPortrait.append(image);
    return;
  }

  els.rafflePlayerPortrait.textContent = candidate.playerName;
}

function highlightRafflePlayer(teamId, characterId) {
  state.teams.forEach((team) => {
    document
      .querySelector(`#${team.setupId}`)
      .classList.toggle("is-raffle-active", team.id === teamId);
  });
  document.querySelectorAll(".character-card").forEach((card) => {
    card.classList.toggle(
      "is-raffle-candidate",
      card.dataset.teamId === teamId && card.dataset.characterId === characterId,
    );
  });
}

function clearRaffleHighlights() {
  state.teams.forEach((team) => {
    document.querySelector(`#${team.setupId}`).classList.remove("is-raffle-active");
  });
  document.querySelectorAll(".character-card").forEach((card) => {
    card.classList.remove("is-raffle-candidate");
  });
}

async function startGameAfterRaffle() {
  state.phase = "playing";
  state.locked = false;
  state.selectedIndexes = [];
  state.collectedCount = 0;
  state.successPhraseIndex = 0;
  state.seenCardInstanceIds = [];
  state.deck = buildDeck();
  state.teams = state.teams.map((team) => ({
    ...team,
    score: 0,
    collectedPairs: [],
  }));
  state.gameOverResult = null;

  await waitForCardFacePreload();

  clearRaffleHighlights();
  els.startScreen.classList.add("is-hidden");
  els.gameScreen.classList.remove("is-hidden");
  hideGameOverOverlay();
  renderBoard();
  renderScoreboard();
  setTurnStatus(getActiveTeam());
  updateTurnCursorBuddy();
  saveState();
}

function openResetModal() {
  els.resetModal.classList.remove("is-hidden");
  els.resetError.textContent = "";
  window.setTimeout(() => els.confirmResetButton.focus(), 0);
}

function handleGlobalKeyDown(event) {
  if (state.phase === "rules" && event.code === "Space" && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    event.stopPropagation();
    completeRulesOverlayNow();
    return;
  }

  if (!(event.metaKey || event.ctrlKey) || event.code !== "KeyD") return;
  event.preventDefault();
  event.stopPropagation();
  openResetModal();
}

function closeResetModal() {
  els.resetModal.classList.add("is-hidden");
  els.resetError.textContent = "";
}

async function confirmPasswordReset() {
  closeResetModal();
  await resetMemoryRuntimeState();
  reloadGameHome();
}

function getRepresentative(teamId) {
  const team = state.teams.find((entry) => entry.id === teamId);
  return team?.representative || getSelectedCharacter(teamId)?.name || "";
}

function getSelectedCharacterId(teamId) {
  const team = state.teams.find((entry) => entry.id === teamId);
  if (team?.selectedCharacterId) return team.selectedCharacterId;

  const selectedCard = document.querySelector(`.character-card[data-team-id="${teamId}"].is-selected`);
  return selectedCard?.dataset.characterId || "";
}

function getSelectedCharacter(teamId) {
  const characterId = getSelectedCharacterId(teamId);
  return CHARACTER_ROSTER[teamId]?.find((character) => character.id === characterId) || null;
}

function getCharacterById(teamId, characterId) {
  characterId = normalizeCharacterId(characterId);
  return CHARACTER_ROSTER[teamId]?.find((character) => character.id === characterId) || null;
}

function getCharacterPortrait(teamId, characterId) {
  characterId = normalizeCharacterId(characterId);
  const character = getCharacterById(teamId, characterId);
  const card = document.querySelector(`.character-card[data-team-id="${teamId}"][data-character-id="${characterId}"]`);
  const image = card?.querySelector(".character-headshot");
  if (image?.getAttribute("src")) {
    return {
      type: "image",
      src: image.getAttribute("src"),
      label: image.alt || character?.name || "",
    };
  }

  return {
    type: "placeholder",
    label: character?.name || "",
  };
}

function getCharacterIdByName(teamId, name) {
  return CHARACTER_ROSTER[teamId]?.find((character) => character.name === name)?.id || "";
}

function normalizeCharacterId(characterId) {
  return characterId === LEGACY_GABO_ID ? "gabo" : characterId || "";
}

function selectCharacter(teamId, characterId) {
  const character = getCharacterById(teamId, characterId);
  if (!startIntroStarted) return;
  if (!character || state.phase !== "start") return;

  state.teams = state.teams.map((team) => (
    team.id === teamId
      ? { ...team, representative: character.name, selectedCharacterId: character.id }
      : team
  ));

  clearStartValidation(getTeamConfigById(teamId));
  syncCharacterSelectionUI(teamId, characterId);
  playFighterRevealSound(character.id);
  updateStartButtonState();
  saveState();
}

function syncCharacterSelectionUI(animateTeamId = null, animateCharacterId = null) {
  document.querySelectorAll(".character-card").forEach((card) => {
    const teamId = card.dataset.teamId;
    const characterId = card.dataset.characterId;
    const team = state.teams.find((entry) => entry.id === teamId);
    card.classList.toggle("is-selected", team?.selectedCharacterId === characterId);
  });

  const brazim = state.teams.find((team) => team.id === "brazim");
  const chen = state.teams.find((team) => team.id === "chen");
  const canShowFighterPreviews = startIntroStarted && state.phase === "start";
  setFighterPreviewVisible(
    els.messerFighterPreview,
    canShowFighterPreviews && chen?.selectedCharacterId === "meser",
    animateTeamId === "chen" && animateCharacterId === "meser",
  );
  setFighterPreviewVisible(
    els.magamiFighterPreview,
    canShowFighterPreviews && chen?.selectedCharacterId === "magami",
    animateTeamId === "chen" && animateCharacterId === "magami",
  );
  setFighterPreviewVisible(
    els.platoFighterPreview,
    canShowFighterPreviews && chen?.selectedCharacterId === "plato",
    animateTeamId === "chen" && animateCharacterId === "plato",
  );
  setFighterPreviewVisible(
    els.omriFighterPreview,
    canShowFighterPreviews && chen?.selectedCharacterId === "omri",
    animateTeamId === "chen" && animateCharacterId === "omri",
  );
  setFighterPreviewVisible(
    els.pishutoFighterPreview,
    canShowFighterPreviews && brazim?.selectedCharacterId === "pishuto",
    animateTeamId === "brazim" && animateCharacterId === "pishuto",
  );
  setFighterPreviewVisible(
    els.mikiFighterPreview,
    canShowFighterPreviews && brazim?.selectedCharacterId === "miki",
    animateTeamId === "brazim" && animateCharacterId === "miki",
  );
  setFighterPreviewVisible(
    els.dorFighterPreview,
    canShowFighterPreviews && brazim?.selectedCharacterId === "dor",
    animateTeamId === "brazim" && animateCharacterId === "dor",
  );
  setFighterPreviewVisible(
    els.gaboFighterPreview,
    canShowFighterPreviews && brazim?.selectedCharacterId === "gabo",
    animateTeamId === "brazim" && animateCharacterId === "gabo",
  );
}

function setFighterPreviewVisible(element, isVisible, shouldAnimate) {
  if (!element) return;

  element.classList.toggle("is-visible", isVisible);
  if (!isVisible) {
    element.classList.remove("is-appearing");
    clearFighterRevealTimer(element);
    return;
  }

  if (!shouldAnimate) return;

  clearFighterRevealTimer(element);
  element.classList.remove("is-appearing");
  void element.offsetWidth;
  element.classList.add("is-appearing");
  const timer = window.setTimeout(() => {
    element.classList.remove("is-appearing");
    fighterRevealTimers.delete(element);
  }, 1500);
  fighterRevealTimers.set(element, timer);
}

function clearFighterRevealTimer(element) {
  const timer = fighterRevealTimers.get(element);
  if (timer) window.clearTimeout(timer);
  fighterRevealTimers.delete(element);
}

function updateStartButtonState() {
  if (state.phase !== "start") return;
  if (!startIntroStarted) {
    els.startButton.disabled = false;
    return;
  }
  const allSelected = TEAMS.every((team) => getSelectedCharacterId(team.id));
  els.startButton.disabled = !allSelected;
}

function getTeamConfigById(teamId) {
  return TEAMS.find((team) => team.id === teamId);
}

function validateStartRepresentatives() {
  const missingTeams = TEAMS.filter((team) => !getSelectedCharacterId(team.id));

  TEAMS.forEach((team) => {
    const missing = missingTeams.includes(team);
    const setup = document.querySelector(`#${team.setupId}`);
    setup.classList.toggle("is-invalid", missing);
    setup.setAttribute("aria-invalid", String(missing));
  });

  if (!missingTeams.length) {
    els.raffleResult.textContent = "";
    return true;
  }

  els.raffleResult.textContent = "בחרו שחקנים";
  return false;
}

function clearStartValidation(team) {
  if (!team) return;
  document.querySelector(`#${team.setupId}`).classList.remove("is-invalid");
  document.querySelector(`#${team.setupId}`).setAttribute("aria-invalid", "false");

  if (!TEAMS.some((entry) => document.querySelector(`#${entry.setupId}`).classList.contains("is-invalid"))) {
    els.raffleResult.textContent = "";
  }
}

function createCardFaces() {
  const imageFaces = CARD_IMAGE_FILENAMES.slice(0, PAIR_COUNT).map((filename, index) => ({
    id: `image-${index}-${slugify(filename)}`,
    type: "image",
    label: getFilenameStem(filename),
    src: `assets/images/cards/${encodeURIComponent(filename)}?v=${encodeURIComponent(CARD_ASSET_VERSION)}`,
    color: CARD_COLORS[index % CARD_COLORS.length],
  }));
  const placeholderFaces = PLACEHOLDER_LABELS.slice(0, Math.max(0, PAIR_COUNT - imageFaces.length)).map((label, offset) => {
    const index = imageFaces.length + offset;

    return {
      id: `label-${label.toLowerCase()}`,
      type: "label",
      label,
      src: null,
      color: CARD_COLORS[index % CARD_COLORS.length],
    };
  });

  return [...imageFaces, ...placeholderFaces];
}

function preloadCardFaceImages(cardFaces) {
  const srcs = [...new Set(
    cardFaces
      .filter((face) => face.type === "image" && face.src)
      .map((face) => face.src),
  )];

  const promise = Promise.allSettled(srcs.map(preloadImage)).then((results) => ({
    total: srcs.length,
    loaded: results.filter((result) => result.status === "fulfilled").length,
  }));

  return { promise, srcs };
}

async function preloadImage(src) {
  const response = await fetch(src, { cache: "force-cache" });
  if (!response.ok) throw new Error(`Failed to preload ${src}`);

  const objectUrl = URL.createObjectURL(await response.blob());
  cardFaceObjectUrlBySrc.set(src, objectUrl);

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.loading = "eager";
    image.onload = () => {
      if (typeof image.decode !== "function") {
        resolve(src);
        return;
      }

      image.decode().then(() => resolve(src)).catch(() => resolve(src));
    };
    image.onerror = () => reject(new Error(`Failed to preload ${src}`));
    image.src = objectUrl;
  });
}

async function waitForCardFacePreload() {
  if (!cardFacePreload.srcs.length) return;

  await Promise.race([
    cardFacePreload.promise,
    wait(CARD_FACE_PRELOAD_TIMEOUT_MS),
  ]);
}

function getPreloadedCardFaceSrc(src) {
  return cardFaceObjectUrlBySrc.get(src) || src;
}

function getFilenameStem(filename) {
  return filename.replace(/\.[^.]+$/, "");
}

function slugify(value) {
  return getFilenameStem(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildDeck() {
  const pairedCards = CARD_FACES.slice(0, PAIR_COUNT).flatMap((face) => [
    createCard(face),
    createCard(face),
  ]);

  return applyHiddenPairPlacementRule(createSafeFairShuffle(pairedCards));
}

function createCard(face) {
  return {
    ...face,
    instanceId: `${face.id}-${createId()}`,
    revealed: false,
    hasEverBeenRevealed: false,
    collected: false,
    ownerTeamId: null,
  };
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2);
}

function shuffle(cards) {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function createSafeFairShuffle(cards) {
  const fallbackDeck = shuffle(cards);

  try {
    return createFairShuffle(cards, fallbackDeck);
  } catch (error) {
    console.warn("Memory fair shuffle failed; using fallback shuffle.", error);
    return fallbackDeck;
  }
}

function createFairShuffle(cards, fallbackDeck) {
  let bestDeck = fallbackDeck;
  let bestScore = scoreDeckSpacing(bestDeck);
  const startedAt = getNow();

  for (let attempt = 1; attempt < FAIR_SHUFFLE_ATTEMPTS; attempt += 1) {
    if (getNow() - startedAt > FAIR_SHUFFLE_TIME_BUDGET_MS) break;

    const candidate = shuffle(cards);
    const candidateScore = scoreDeckSpacing(candidate);

    if (isBetterDeckScore(candidateScore, bestScore)) {
      bestDeck = candidate;
      bestScore = candidateScore;
    }
  }

  return bestDeck;
}

function applyHiddenPairPlacementRule(deck) {
  const michaelFace = CARD_FACES.find((face) => (
    face.type === "image" && face.label === getFilenameStem(MICHAEL_JACKSON_FILENAME)
  ));

  if (!michaelFace) return deck;
  return placePairAtTargetPositions(deck, michaelFace.id, MICHAEL_JACKSON_TARGET_POSITIONS);
}

function placePairAtTargetPositions(deck, pairId, targetPositions) {
  const targetIndexes = targetPositions
    .map(({ row, column }) => getBoardIndex(row, column))
    .filter((index) => index >= 0 && index < deck.length);

  if (targetIndexes.length !== 2 || new Set(targetIndexes).size !== 2) return deck;

  const pairCount = deck.filter((card) => card.id === pairId).length;
  if (pairCount !== 2) return deck;

  const nextDeck = [...deck];
  const placedTargets = new Set();

  targetIndexes.forEach((targetIndex) => {
    const currentIndex = nextDeck.findIndex((card, index) => (
      card.id === pairId && !placedTargets.has(index)
    ));

    if (currentIndex === -1) return;
    [nextDeck[targetIndex], nextDeck[currentIndex]] = [nextDeck[currentIndex], nextDeck[targetIndex]];
    placedTargets.add(targetIndex);
  });

  return nextDeck;
}

function getNow() {
  return typeof performance !== "undefined" && typeof performance.now === "function"
    ? performance.now()
    : Date.now();
}

function scoreDeckSpacing(deck) {
  const pairPositions = new Map();

  deck.forEach((card, index) => {
    const positions = pairPositions.get(card.id) || [];
    positions.push(index);
    pairPositions.set(card.id, positions);
  });

  const score = [...pairPositions.values()].reduce(
    (score, positions) => {
      if (positions.length !== 2) {
        score.hardViolations += 1;
        return score;
      }

      const [firstIndex, secondIndex] = positions;
      const first = getBoardPosition(firstIndex);
      const second = getBoardPosition(secondIndex);
      const rowDistance = Math.abs(first.row - second.row);
      const columnDistance = Math.abs(first.column - second.column);
      const linearDistance = Math.abs(firstIndex - secondIndex);
      const manhattanDistance = rowDistance + columnDistance;
      const isClosePair =
        (rowDistance <= 1 && columnDistance <= 1) ||
        manhattanDistance <= 2 ||
        linearDistance <= 2;

      // Party shuffle rule: one close/easy pair is acceptable randomness.
      // Two or more close pairs make the board feel too easy, so penalize them.
      if (isClosePair) score.closePairCount += 1;

      score.totalDistance += manhattanDistance;
      score.minDistance = Math.min(score.minDistance, manhattanDistance);
      return score;
    },
    {
      hardViolations: 0,
      closePairCount: 0,
      totalDistance: 0,
      minDistance: Number.POSITIVE_INFINITY,
    },
  );

  score.hardViolations += Math.max(0, score.closePairCount - MAX_CLOSE_PAIR_COUNT);
  return score;
}

function getBoardPosition(index) {
  return {
    row: Math.floor(index / BOARD_COLUMNS),
    column: index % BOARD_COLUMNS,
  };
}

function getBoardIndex(row, column) {
  return row * BOARD_COLUMNS + column;
}

function isBetterDeckScore(nextScore, currentScore) {
  if (nextScore.hardViolations !== currentScore.hardViolations) {
    return nextScore.hardViolations < currentScore.hardViolations;
  }

  if (nextScore.minDistance !== currentScore.minDistance) {
    return nextScore.minDistance > currentScore.minDistance;
  }

  return nextScore.totalDistance > currentScore.totalDistance;
}

function renderBoard() {
  els.board.innerHTML = "";

  state.deck.forEach((card, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = getCardClassName(card, index);
    button.dataset.index = String(index);
    button.style.setProperty("--card-color", card.color);
    if (card.ownerTeamId) {
      button.style.setProperty("--owner-color", getTeamById(card.ownerTeamId).color);
    }
    button.disabled = state.locked || card.collected || state.phase !== "playing";
    button.setAttribute("aria-label", `Card ${index + 1}`);
    button.addEventListener("click", () => handleCardClick(index));

    const inner = document.createElement("span");
    inner.className = "card-inner";

    const isFlippingThisCard = flipVisual.index === index;
    const shouldShowFace = isCardFaceVisible(card) || (isFlippingThisCard && flipVisual.stage === "opening");

    if (shouldShowFace) {
      const front = document.createElement("span");
      front.className = "card-face card-front";
      front.append(createCardFaceContent(card));
      inner.append(front);
    } else {
      const back = document.createElement("span");
      back.className = "card-face card-back";
      back.textContent = "?";
      inner.append(back);
    }

    button.append(inner);
    els.board.append(button);
  });
}

function createCardFaceContent(card) {
  const wrapper = document.createElement("span");
  wrapper.className = card.type === "image" ? "card-label card-image-wrap" : "card-label";

  const fallback = document.createElement("span");
  fallback.className = "card-fallback-label";
  fallback.textContent = card.label;
  wrapper.append(fallback);

  if (card.type === "image" && card.src) {
    const image = document.createElement("img");
    image.className = "card-image";
    image.src = getPreloadedCardFaceSrc(card.src);
    image.alt = card.label;
    image.loading = "eager";
    image.addEventListener("error", () => {
      image.remove();
      wrapper.classList.add("is-image-missing");
    });
    wrapper.append(image);
  }

  return wrapper;
}

function getCardClassName(card, index) {
  const classes = ["card"];

  if (isCardFaceVisible(card)) classes.push("is-revealed");
  if (flipVisual.index === index && flipVisual.stage && !card.collected) {
    classes.push(`is-flip-${flipVisual.stage}`);
  }
  if (state.cheatRevealAll && !card.revealed && !card.collected) classes.push("is-cheat-revealed");
  if (card.collected) classes.push("is-collected");

  return classes.join(" ");
}

function isCardFaceVisible(card) {
  return card.revealed || card.collected || (state.cheatRevealAll && state.phase === "playing");
}

function renderScoreboard() {
  state.teams.forEach((team) => {
    const panel = document.querySelector(`#${team.panelId}`);
    const score = document.querySelector(`#${team.scoreId}`);
    const collection = document.querySelector(`#${team.collectionId}`);

    panel.classList.toggle("is-active", team.id === state.activeTeamId && state.phase === "playing");
    score.textContent = team.score;
    collection.innerHTML = "";

    [...team.collectedPairs].reverse().forEach((pair, index) => {
      const chip = document.createElement("span");
      chip.className = pair.type === "image" && pair.src ? "pair-chip pair-chip-image" : "pair-chip";
      chip.style.setProperty("--chip-color", pair.color || team.color);
      chip.style.zIndex = String(team.collectedPairs.length - index);

      if (pair.type === "image" && pair.src) {
        const image = document.createElement("img");

        image.src = getPreloadedCardFaceSrc(pair.src);
        image.alt = pair.label;
        image.loading = "eager";
        image.addEventListener("error", () => {
          image.remove();
          chip.classList.remove("pair-chip-image");
        });

        chip.append(image);
      } else {
        chip.textContent = pair.label;
      }

      collection.append(chip);
    });
  });
}

function handlePointerMove(event) {
  cursorBuddyPoint = {
    x: event.clientX,
    y: event.clientY,
  };
  updateTurnCursorBuddyPosition();
  updateTurnCursorBuddy();
}

function updateTurnCursorBuddy() {
  if (!els.turnCursorBuddy) return;

  const shouldShow = (
    state.phase === "playing"
    && !cursorBuddySuppressed
    && cursorBuddyPoint
    && !els.gameScreen.classList.contains("is-hidden")
    && els.gameOverOverlay.classList.contains("is-hidden")
    && els.resetModal.classList.contains("is-hidden")
  );

  if (!shouldShow) {
    hideTurnCursorBuddy("updateTurnCursorBuddy:not-show", {
      hasPointer: Boolean(cursorBuddyPoint),
      gameScreenHidden: els.gameScreen.classList.contains("is-hidden"),
      gameOverHidden: els.gameOverOverlay.classList.contains("is-hidden"),
      resetHidden: els.resetModal.classList.contains("is-hidden"),
    });
    return;
  }

  const team = getActiveTeam();
  const characterId = team.selectedCharacterId || getCharacterIdByName(team.id, team.representative);
  const key = `${team.id}:${characterId || "team"}`;

  els.turnCursorBuddy.style.setProperty("--cursor-buddy-color", team.color);
  els.turnCursorBuddy.dataset.teamId = team.id;
  els.turnCursorBuddy.dataset.characterId = characterId || "";

  if (cursorBuddyKey !== key) {
    cursorBuddyKey = key;
    renderTurnCursorBuddy(team, characterId);
  }

  updateTurnCursorBuddyPosition();
  els.turnCursorBuddy.classList.add("is-visible");
}

function renderTurnCursorBuddy(team, characterId) {
  els.turnCursorBuddy.innerHTML = "";
  els.turnCursorBuddy.classList.remove("is-fighter", "is-portrait", "is-placeholder");

  const fighterSrc = FIGHTER_CURSOR_ASSETS[team.id]?.[characterId];
  if (fighterSrc) {
    const image = document.createElement("img");
    image.className = "turn-cursor-fighter";
    image.src = fighterSrc;
    image.alt = "";
    image.draggable = false;
    els.turnCursorBuddy.classList.add("is-fighter");
    els.turnCursorBuddy.append(image);
    return;
  }

  const portrait = getCharacterPortrait(team.id, characterId);
  if (portrait.src) {
    const image = document.createElement("img");
    image.className = "turn-cursor-portrait";
    image.src = portrait.src;
    image.alt = "";
    image.draggable = false;
    els.turnCursorBuddy.classList.add("is-portrait");
    els.turnCursorBuddy.append(image);
    return;
  }

  const label = document.createElement("span");
  label.className = "turn-cursor-label";
  label.textContent = team.representative || portrait.label || team.name;
  els.turnCursorBuddy.classList.add("is-placeholder");
  els.turnCursorBuddy.append(label);
}

function updateTurnCursorBuddyPosition() {
  if (!cursorBuddyPoint || !els.turnCursorBuddy) return;
  const width = els.turnCursorBuddy.offsetWidth || 96;
  const height = els.turnCursorBuddy.offsetHeight || 150;
  const margin = 8;
  const styles = window.getComputedStyle(els.turnCursorBuddy);
  const anchorY = Number.parseFloat(styles.getPropertyValue("--cursor-buddy-anchor-y")) || 0.5;
  const centeredX = cursorBuddyPoint.x - (width / 2);
  const centeredY = cursorBuddyPoint.y - (height * anchorY);
  const x = Math.min(Math.max(margin, centeredX), window.innerWidth - width - margin);
  const y = Math.min(Math.max(margin, centeredY), window.innerHeight - height - margin);

  els.turnCursorBuddy.style.left = `${x}px`;
  els.turnCursorBuddy.style.top = `${y}px`;
}

function hideTurnCursorBuddy(reason = "unknown", payload = {}) {
  if (!els.turnCursorBuddy) return;
  const wasVisible = els.turnCursorBuddy.classList.contains("is-visible");
  els.turnCursorBuddy.classList.remove("is-visible");
  if (wasVisible) {
    debugCursor("hideTurnCursorBuddy", {
      reason,
      ...payload,
    });
  }
}

function clearTurnCursorBuddyBriefSuppression() {
  if (cursorBuddyBriefSuppressionTimeoutId === null) return;

  window.clearTimeout(cursorBuddyBriefSuppressionTimeoutId);
  cursorBuddyBriefSuppressionTimeoutId = null;
}

function suppressTurnCursorBuddyBriefly(durationMs) {
  clearTurnCursorBuddyBriefSuppression();
  cursorBuddySuppressed = true;
  debugCursor("suppressTurnCursorBuddyBriefly:start", { durationMs });
  hideTurnCursorBuddy("brief-suppression-start");

  cursorBuddyBriefSuppressionTimeoutId = window.setTimeout(() => {
    cursorBuddyBriefSuppressionTimeoutId = null;
    cursorBuddySuppressed = false;
    debugCursor("suppressTurnCursorBuddyBriefly:end", { durationMs });
    updateTurnCursorBuddy();
  }, durationMs);
}

function setTurnCursorBuddySuppressed(isSuppressed) {
  if (isSuppressed) clearTurnCursorBuddyBriefSuppression();

  cursorBuddySuppressed = isSuppressed;
  debugCursor("setTurnCursorBuddySuppressed", { isSuppressed });

  if (isSuppressed) {
    hideTurnCursorBuddy("setTurnCursorBuddySuppressed:true");
    return;
  }

  updateTurnCursorBuddy();
}

function handleCardClick(index) {
  void handleCardClickAsync(index);
}

async function handleCardClickAsync(index) {
  if (state.locked || state.phase !== "playing") {
    debugCursor("cardClick:ignored-before-card", { index, reason: state.locked ? "locked" : "not-playing" });
    return;
  }

  const card = state.deck[index];
  if (!card || card.revealed || card.collected) {
    debugCursor("cardClick:ignored-card-state", {
      index,
      exists: Boolean(card),
      revealed: Boolean(card?.revealed),
      collected: Boolean(card?.collected),
      id: card?.id,
      instanceId: card?.instanceId,
      label: card?.label,
    });
    return;
  }

  const revealCursorDecision = getCardRevealCursorDecision(card);
  debugCursor("cardClick:before-reveal", {
    index,
    id: card.id,
    instanceId: card.instanceId,
    label: card.label,
    type: card.type,
    revealCursorDecision,
  });

  state.locked = true;
  await revealCardWithFlip(index);

  if (card.revealed) {
    markCardSeen(card);
  }

  debugCursor("cardClick:after-reveal", {
    index,
    id: card.id,
    instanceId: card.instanceId,
    label: card.label,
    revealed: card.revealed,
    hasEverBeenRevealed: Boolean(card.hasEverBeenRevealed),
    revealCursorDecision,
  });

  if (revealCursorDecision.shouldHide && card.revealed) {
    suppressTurnCursorBuddyBriefly(CURSOR_REVEAL_SUPPRESSION_MS);
  } else {
    debugCursor("cardClick:no-cursor-hide", {
      index,
      reason: revealCursorDecision.reason,
      id: card.id,
      instanceId: card.instanceId,
      label: card.label,
    });
  }

  if (state.selectedIndexes.length === 2) {
    await resolveTurn();
    return;
  }

  state.locked = false;
  renderBoard();
  saveState();
}

function getCardRevealCursorDecision(card) {
  const instanceSeen = Boolean(card?.instanceId && state.seenCardInstanceIds.includes(card.instanceId));
  const hasEverBeenRevealed = Boolean(card?.hasEverBeenRevealed);
  const shouldHide = Boolean(card?.instanceId && !state.cheatRevealAll && !instanceSeen && !hasEverBeenRevealed);
  let reason = "first-card-reveal";

  if (!card?.instanceId) reason = "missing-instance-id";
  else if (state.cheatRevealAll) reason = "cheat-reveal-all";
  else if (instanceSeen) reason = "instance-already-seen";
  else if (hasEverBeenRevealed) reason = "card-flag-already-revealed";

  return {
    shouldHide,
    reason,
    instanceSeen,
    hasEverBeenRevealed,
    seenCardInstanceIdsCount: state.seenCardInstanceIds.length,
  };
}

function markCardSeen(card) {
  if (!card || !card.instanceId) {
    debugCursor("markCardSeen:skipped", { reason: "missing-card-or-instance" });
    return;
  }

  const wasInSeenList = state.seenCardInstanceIds.includes(card.instanceId);
  card.hasEverBeenRevealed = true;

  if (!wasInSeenList) {
    state.seenCardInstanceIds = [...state.seenCardInstanceIds, card.instanceId];
  }

  debugCursor("markCardSeen", {
    id: card.id,
    instanceId: card.instanceId,
    label: card.label,
    wasInSeenList,
    hasEverBeenRevealed: card.hasEverBeenRevealed,
  });
}

async function revealCardWithFlip(index) {
  const card = state.deck[index];
  if (!card || card.revealed || card.collected) return;

  playActiveFighterCardOpenSound();

  if (state.cheatRevealAll) {
    card.revealed = true;
    state.selectedIndexes.push(index);
    renderBoard();
    saveState();
    return;
  }

  flipVisual.index = index;
  flipVisual.stage = "closing";
  renderBoard();
  await wait(CARD_FLIP_CLOSE_MS);

  card.revealed = true;
  state.selectedIndexes.push(index);
  flipVisual.stage = "opening";
  renderBoard();
  saveState();
  await wait(CARD_FLIP_OPEN_MS);

  flipVisual.index = null;
  flipVisual.stage = null;
}

async function resolveTurn() {
  const [firstIndex, secondIndex] = state.selectedIndexes;
  const firstCard = state.deck[firstIndex];
  const secondCard = state.deck[secondIndex];

  state.locked = true;
  saveState();

  if (firstCard.id === secondCard.id) {
    await handleMatch(firstIndex, secondIndex);
    return;
  }

  await handleMiss(firstCard, secondCard);
}

async function handleMatch(firstIndex, secondIndex) {
  const team = getActiveTeam();
  const firstCard = state.deck[firstIndex];
  const secondCard = state.deck[secondIndex];
  const successPhrase = getNextSuccessPhrase();

  firstCard.revealed = true;
  secondCard.revealed = true;
  state.locked = true;
  saveState();
  await waitForPaint();
  await wait(MATCH_REVEAL_HOLD_MS);
  playSound("match", 0.74);
  await playMatchCelebration([firstIndex, secondIndex], team, successPhrase.text, "שחק עוד תור אלוף!");

  firstCard.collected = true;
  secondCard.collected = true;
  firstCard.revealed = true;
  secondCard.revealed = true;
  firstCard.ownerTeamId = team.id;
  secondCard.ownerTeamId = team.id;
  state.selectedIndexes = [];
  state.collectedCount += 1;
  state.successPhraseIndex += 1;
  team.score += 1;
  team.collectedPairs.push({
    id: firstCard.id,
    type: firstCard.type || "label",
    label: firstCard.label,
    src: firstCard.src || null,
    color: team.color,
    ownerTeamId: team.id,
    successPhrase: successPhrase.text,
    audioKey: successPhrase.audioKey,
  });

  state.locked = false;
  renderBoard();
  renderScoreboard();

  if (state.collectedCount === PAIR_COUNT) {
    endGame();
    return;
  }

  setTurnStatus(team);
  saveState();
}

async function handleMiss(firstCard, secondCard) {
  await wait(MISS_POPUP_DELAY_MS);
  setTurnCursorBuddySuppressed(true);
  playSound("miss", 0.5);
  await playMissFeedback();

  firstCard.revealed = false;
  secondCard.revealed = false;
  state.selectedIndexes = [];
  state.activeTeamId = getOtherTeamId();
  state.locked = false;
  renderBoard();
  renderScoreboard();
  setTurnStatus(getActiveTeam());
  saveState();
  setTurnCursorBuddySuppressed(false);
}

function getNextSuccessPhrase() {
  return SUCCESS_PHRASES[state.successPhraseIndex % SUCCESS_PHRASES.length];
}

async function playMatchCelebration(indexes, team, phraseText, extraTurnText = "") {
  const originals = indexes
    .map((index) => els.board.querySelector(`[data-index="${index}"]`))
    .filter(Boolean);

  if (originals.length !== 2) return;

  originals.forEach((original) => original.classList.add("is-celebrating"));

  const layer = els.celebrationLayer;
  layer.innerHTML = "";

  const center = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  const sampleRect = originals[0].getBoundingClientRect();
  const sampleScale = getCelebrationCardScale(sampleRect);
  const celebratedCardHeight = sampleRect.height * sampleScale;
  const successTextY = Math.min(
    window.innerHeight * 0.2,
    Math.max(82, celebratedCardHeight * 0.48 + 20),
  );
  const burst = createFeedbackBurst(phraseText, "success", extraTurnText);
  layer.append(burst);

  const cloneAnimations = originals.map((original, cloneIndex) => {
    const rect = original.getBoundingClientRect();
    const clone = original.cloneNode(true);
    clone.classList.add("celebration-clone", "is-revealed");
    clone.classList.remove("is-celebrating");
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    layer.append(clone);

    const targetScale = getCelebrationCardScale(rect);
    const visualWidth = rect.width * targetScale;
    const visualHeight = rect.height * targetScale;
    const gap = Math.min(38, window.innerWidth * 0.025);
    const offset = cloneIndex === 0 ? -(visualWidth / 2 + gap / 2) : visualWidth / 2 + gap / 2;
    const targetX = center.x - rect.width / 2 + offset;
    const targetY = center.y - rect.height / 2 - visualHeight * 0.06;

    return clone.animate(
      [
        { transform: "translate(0, 0) scale(1)", filter: "brightness(1)" },
        {
          transform: `translate(${targetX - rect.left}px, ${targetY - rect.top}px) scale(${targetScale})`,
          filter: "brightness(1.18) saturate(1.08)",
        },
      ],
      {
        duration: CELEBRATION_MS + 180,
        easing: "cubic-bezier(.18,.9,.22,1)",
        fill: "forwards",
      },
    ).finished;
  });

  const burstAnimation = burst.animate(
    [
      { opacity: 0, transform: `translate(-50%, ${successTextY}px) scale(0.2)` },
      { opacity: 1, transform: `translate(-50%, ${successTextY}px) scale(1.05)`, offset: 0.4 },
      { opacity: 1, transform: `translate(-50%, ${successTextY}px) scale(1)` },
    ],
    {
      duration: CELEBRATION_MS,
      easing: "ease-out",
      fill: "forwards",
    },
  ).finished;

  await Promise.all([...cloneAnimations, burstAnimation]);
  await wait(SUCCESS_FEEDBACK_HOLD_MS);
  await flyChipToScoreboard(team, state.deck[indexes[0]]);
  layer.innerHTML = "";
}

function getCelebrationCardScale(rect) {
  return Math.min(3.2, Math.max(2.35, (window.innerWidth * 0.18) / rect.width));
}

async function playMissFeedback() {
  const layer = els.celebrationLayer;
  layer.innerHTML = "";

  const burst = createFeedbackBurst("לוזר!!!", "miss");
  layer.append(burst);

  await burst.animate(
    [
      { opacity: 0, transform: "translate(-50%, -50%) scale(0.72) rotate(0deg)" },
      { opacity: 1, transform: "translate(-50%, -50%) scale(1.04) rotate(-1deg)", offset: 0.16 },
      { opacity: 1, transform: "translate(-50%, -50%) scale(1) rotate(1deg)", offset: 0.3 },
      { opacity: 1, transform: "translate(-50%, -50%) scale(1) rotate(0deg)", offset: 0.88 },
      { opacity: 0, transform: "translate(-50%, -50%) scale(0.96) rotate(0deg)" },
    ],
    {
      duration: MISS_FEEDBACK_MS,
      easing: "cubic-bezier(.18,.9,.22,1)",
      fill: "forwards",
    },
  ).finished;

  layer.innerHTML = "";
}

function createFeedbackBurst(text, variant, secondaryText = "") {
  const burst = document.createElement("div");
  burst.className = `celebration-burst feedback-burst is-${variant}`;
  const main = document.createElement("span");
  main.className = "feedback-main-text";
  main.textContent = text;
  burst.append(main);

  if (secondaryText) {
    const secondary = document.createElement("span");
    secondary.className = "feedback-secondary-text";
    secondary.textContent = secondaryText;
    burst.append(secondary);
  }

  return burst;
}

function wait(duration) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

function waitForPaint() {
  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resolve);
    });
  });
}

async function flyChipToScoreboard(team, card) {
  const target = document.querySelector(`#${team.collectionId}`);
  const targetRect = target.getBoundingClientRect();
  const layer = els.celebrationLayer;
  const chip = document.createElement("span");

  chip.className = "flying-chip";
  chip.style.setProperty("--chip-color", team.color);

  if (card.type === "image" && card.src) {
    const image = document.createElement("img");
    image.src = getPreloadedCardFaceSrc(card.src);
    image.alt = card.label;
    image.addEventListener("error", () => {
      image.remove();
      chip.textContent = card.label;
    });
    chip.append(image);
  } else {
    chip.textContent = card.label;
  }

  chip.style.left = `${window.innerWidth / 2 - 25}px`;
  chip.style.top = `${window.innerHeight / 2 + 80}px`;
  layer.append(chip);

  const endX = targetRect.left + Math.min(targetRect.width - 36, 8);
  const endY = targetRect.top + 8;

  await chip.animate(
    [
      { transform: "translate(0, 0) scale(1.2)", opacity: 1 },
      {
        transform: `translate(${endX - (window.innerWidth / 2 - 25)}px, ${endY - (window.innerHeight / 2 + 80)}px) scale(0.55)`,
        opacity: 0.35,
      },
    ],
    {
      duration: 420,
      easing: "cubic-bezier(.2,.8,.2,1)",
      fill: "forwards",
    },
  ).finished;
}

function endGame() {
  state.phase = "gameOver";
  state.locked = true;
  playSound("gameOver", 0.65);
  renderBoard();
  renderScoreboard();

  const [teamOne, teamTwo] = state.teams;

  if (teamOne.score > teamTwo.score) {
    state.gameOverResult = {
      type: "winner",
      winnerTeamId: teamOne.id,
      message: `${teamOne.name} ניצחו!`,
    };
  } else if (teamTwo.score > teamOne.score) {
    state.gameOverResult = {
      type: "winner",
      winnerTeamId: teamTwo.id,
      message: `${teamTwo.name} ניצחו!`,
    };
  } else {
    state.gameOverResult = {
      type: "tie",
      winnerTeamId: null,
      message: "תיקו!",
    };
  }

  setPlainStatus("סיום המשחק");
  renderGameOverOverlay();
  saveState();
}

async function restoreState(savedState) {
  applyState(savedState);

  if (state.phase === "start") {
    showCleanStart();
    saveState();
    return;
  }

  if (state.phase === "rules") {
    startIntroStarted = true;
    els.startScreen.classList.remove("is-hidden");
    els.startScreen.classList.add("is-intro-open");
    els.gameScreen.classList.add("is-hidden");
    els.startButton.disabled = true;
    els.startButton.textContent = "התחל משחק";
    syncCharacterSelectionUI();
    showRulesOverlay(() => {
      if (state.phase !== "rules") return;
      startRaffleFlow();
    });
    return;
  }

  if (state.phase === "raffle") {
    state.phase = "start";
    renderStartScreen();
    startRaffleFlow();
    return;
  }

  if (state.phase === "playing" || state.phase === "gameOver") {
    normalizeRestoredPlayingState();
    await waitForCardFacePreload();
    els.startScreen.classList.add("is-hidden");
    els.gameScreen.classList.remove("is-hidden");
    renderBoard();
    renderScoreboard();

    if (state.phase === "gameOver") {
      setPlainStatus("סיום המשחק");
      renderGameOverOverlay();
    } else {
      hideGameOverOverlay();
      setTurnStatus(getActiveTeam());
    }

    saveState();
    return;
  }

  renderStartScreen();
}

function normalizeRestoredPlayingState() {
  state.locked = state.phase === "gameOver";
  state.selectedIndexes = state.selectedIndexes
    .filter((index) => state.deck[index] && state.deck[index].revealed && !state.deck[index].collected)
    .slice(0, 1);

  state.deck.forEach((card, index) => {
    if (card.collected) {
      card.revealed = true;
      return;
    }

    if (!state.selectedIndexes.includes(index)) {
      card.revealed = false;
    }
  });

  if (!state.activeTeamId) {
    state.activeTeamId = state.startingTeamId || state.teams[0].id;
  }
}

function getGameOverMessage() {
  const [teamOne, teamTwo] = state.teams;
  if (teamOne.score > teamTwo.score) return `${teamOne.name} ניצחו!`;
  if (teamTwo.score > teamOne.score) return `${teamTwo.name} ניצחו!`;
  return "תיקו!";
}

function renderGameOverOverlay() {
  const result = state.gameOverResult || {
    type: "tie",
    winnerTeamId: null,
    message: getGameOverMessage(),
  };
  const overlay = els.gameOverOverlay;
  overlay.innerHTML = "";
  overlay.classList.remove("is-hidden");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");

  const dialog = document.createElement("section");
  dialog.className = "game-over-card";

  const title = document.createElement("h2");
  title.className = "game-over-title";
  title.textContent = result.message;

  const teams = document.createElement("div");
  teams.className = "game-over-teams";

  const finalScore = createGameOverFinalScore();

  state.teams.forEach((team) => {
    const teamResult = document.createElement("section");
    teamResult.className = "game-over-team";
    teamResult.classList.add(team.id === "brazim" ? "team-one" : "team-two");
    teamResult.style.setProperty("--team-color", team.color);
    if (team.id === result.winnerTeamId) teamResult.classList.add("is-winner");

    const heading = document.createElement("div");
    heading.className = "game-over-team-header";

    const name = document.createElement("h3");
    name.textContent = team.name;
    heading.append(name);

    const collected = document.createElement("div");
    collected.className = "game-over-collected";

    team.collectedPairs.forEach((pair) => {
      collected.append(createGameOverPairChip(pair, team));
    });

    teamResult.append(heading, collected);
    teams.append(teamResult);
  });

  dialog.append(title, finalScore, teams, createGameOverResetButton());
  overlay.append(dialog);
}

function createGameOverResetButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "reset-button game-over-reset-button";
  button.textContent = "איפוס תוצאה";
  button.addEventListener("click", openResetModal);
  return button;
}

function createGameOverFinalScore() {
  const chen = state.teams.find((team) => team.id === "chen");
  const brazim = state.teams.find((team) => team.id === "brazim");
  const score = document.createElement("div");
  score.className = "game-over-final-score";

  const chenName = document.createElement("span");
  chenName.className = "final-score-team final-score-team-chen";
  chenName.style.setProperty("--team-color", chen.color);
  chenName.innerHTML = "<span>החן יוספים</span><small>ועוזריהם</small>";

  const scoreNumbers = document.createElement("strong");
  scoreNumbers.className = "final-score-numbers";
  scoreNumbers.textContent = `${chen.score} : ${brazim.score}`;

  const brazimName = document.createElement("span");
  brazimName.className = "final-score-team final-score-team-brazim";
  brazimName.style.setProperty("--team-color", brazim.color);
  brazimName.textContent = "הבראזים";

  score.append(chenName, scoreNumbers, brazimName);
  return score;
}

function createGameOverPairChip(pair, team) {
  const chip = document.createElement("span");
  chip.className = pair.type === "image" && pair.src ? "game-over-chip game-over-chip-image" : "game-over-chip";
  chip.style.setProperty("--team-color", team.color);

  if (pair.type === "image" && pair.src) {
    const image = document.createElement("img");
    image.src = getPreloadedCardFaceSrc(pair.src);
    image.alt = pair.label;
    image.loading = "eager";
    image.addEventListener("error", () => {
      image.remove();
      chip.classList.remove("game-over-chip-image");
      chip.textContent = pair.label;
    });
    chip.append(image);
  } else {
    chip.textContent = pair.label;
  }

  return chip;
}

function hideGameOverOverlay() {
  els.gameOverOverlay.classList.add("is-hidden");
  els.gameOverOverlay.innerHTML = "";
  els.gameOverOverlay.removeAttribute("role");
  els.gameOverOverlay.removeAttribute("aria-modal");
}

function applyState(nextState) {
  Object.assign(state, nextState);
  state.teams = TEAMS.map((team) => {
    const savedTeam = nextState.teams?.find((candidate) => candidate.id === team.id) || {};
    const selectedCharacterId = normalizeCharacterId(
      savedTeam.selectedCharacterId || getCharacterIdByName(team.id, savedTeam.representative),
    );
    return {
      ...team,
      representative: savedTeam.representative || "",
      selectedCharacterId,
      score: Number(savedTeam.score) || 0,
      collectedPairs: Array.isArray(savedTeam.collectedPairs)
        ? savedTeam.collectedPairs.map((pair) => ({
            ...pair,
            src: refreshCardAssetSrc(pair.src),
            color: team.color,
            ownerTeamId: pair.ownerTeamId || team.id,
          }))
        : [],
    };
  });
  state.deck = Array.isArray(nextState.deck)
    ? nextState.deck.map((card) => ({
        ...card,
        src: refreshCardAssetSrc(card.src),
      }))
    : [];
  state.selectedIndexes = Array.isArray(nextState.selectedIndexes) ? nextState.selectedIndexes : [];
  state.seenCardInstanceIds = normalizeSeenCardInstanceIds(nextState, state.deck);
  state.deck.forEach((card) => {
    card.hasEverBeenRevealed = Boolean(
      card.hasEverBeenRevealed
      || card.revealed
      || card.collected
      || state.seenCardInstanceIds.includes(card.instanceId),
    );
  });
  state.collectedCount = Number(nextState.collectedCount) || state.deck.filter((card) => card.collected).length / 2 || 0;
  state.successPhraseIndex = Number.isFinite(Number(nextState.successPhraseIndex))
    ? Number(nextState.successPhraseIndex)
    : state.teams.reduce((total, team) => total + team.collectedPairs.length, 0);
  state.locked = Boolean(nextState.locked);
  state.cheatRevealAll = Boolean(nextState.cheatRevealAll);
  state.gameOverResult = nextState.gameOverResult || null;
  if (!RESTORABLE_PHASES.has(state.phase)) state.phase = "start";
  if (state.phase === "resolving") state.phase = "playing";
  if (state.version !== STORAGE_VERSION) state.version = STORAGE_VERSION;
  state.appVersion = APP_VERSION;
}

function refreshCardAssetSrc(src) {
  if (!src || typeof src !== "string") return src || null;

  const cleanPath = src.split("?")[0];
  const filename = decodeURIComponent(cleanPath.split("/").pop() || "");

  if (!CARD_IMAGE_FILENAMES.includes(filename)) return src;

  return `assets/images/cards/${encodeURIComponent(filename)}?v=${encodeURIComponent(CARD_ASSET_VERSION)}`;
}

function normalizeSeenCardInstanceIds(nextState, deck) {
  const seenIds = new Set();

  if (Array.isArray(nextState.seenCardInstanceIds)) {
    nextState.seenCardInstanceIds.forEach((id) => {
      if (typeof id === "string" && id) seenIds.add(id);
    });
  }

  const legacySeenPairIds = new Set();
  if (Array.isArray(nextState.seenImageFaceIds)) {
    nextState.seenImageFaceIds.forEach((id) => {
      if (typeof id === "string" && id) legacySeenPairIds.add(id);
    });
  }

  deck.forEach((card) => {
    if (card?.instanceId && (card.revealed || card.collected)) {
      seenIds.add(card.instanceId);
    }
    if (card?.instanceId && card.id && legacySeenPairIds.has(card.id)) {
      seenIds.add(card.instanceId);
    }
  });

  return [...seenIds];
}

function saveState() {
  if (isReloadingAfterReset) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeState()));
  } catch {
    // If localStorage is unavailable, the game should still be playable.
  }
}

function serializeState() {
  return {
    version: STORAGE_VERSION,
    appVersion: APP_VERSION,
    phase: state.phase,
    savedAt: new Date().toISOString(),
    representativeNames: Object.fromEntries(state.teams.map((team) => [team.id, team.representative])),
    startingTeamId: state.startingTeamId,
    activeTeamId: state.activeTeamId,
    deck: state.deck,
    cheatRevealAll: state.cheatRevealAll,
    seenCardInstanceIds: state.seenCardInstanceIds,
    cardManifestSignature: CARD_MANIFEST_SIGNATURE,
    selectedIndexes: state.selectedIndexes,
    collectedCount: state.collectedCount,
    successPhraseIndex: state.successPhraseIndex,
    teams: state.teams.map((team) => ({
      id: team.id,
      representative: team.representative,
      selectedCharacterId: team.selectedCharacterId,
      score: team.score,
      collectedPairs: team.collectedPairs,
    })),
    gameOverResult: state.gameOverResult,
  };
}

function loadSavedState() {
  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    if (!rawState) return null;

    const parsedState = JSON.parse(rawState);
    if (!isRecoverableSavedState(parsedState)) {
      clearSavedState();
      return null;
    }

    return parsedState;
  } catch {
    clearSavedState();
    return null;
  }
}

function isRecoverableSavedState(savedState) {
  if (!savedState || typeof savedState !== "object") return false;
  if (!Number.isFinite(Number(savedState.version))) return false;
  if (!RESTORABLE_PHASES.has(savedState.phase)) return false;
  if (!Array.isArray(savedState.teams)) return false;

  if (Array.isArray(savedState.deck) && savedState.deck.length > 0) {
    if (savedState.deck.length % 2 !== 0) return false;
    return savedState.deck.every((card) => (
      card
      && typeof card === "object"
      && typeof card.id === "string"
      && typeof card.instanceId === "string"
    ));
  }

  return true;
}

function clearSavedState() {
  localStorage.removeItem(STORAGE_KEY);
}

async function resetMemoryRuntimeState() {
  clearSavedState();
  applyState(createInitialState());

  if (window.caches && typeof window.caches.keys === "function") {
    try {
      const cacheKeys = await window.caches.keys();
      await Promise.all(cacheKeys.map((cacheKey) => window.caches.delete(cacheKey)));
    } catch {
      // Cache clearing is best-effort; this game does not require Cache API support.
    }
  }
}

function reloadGameHome() {
  isReloadingAfterReset = true;
  window.location.replace(window.location.pathname);
}

function getActiveTeam() {
  return state.teams.find((team) => team.id === state.activeTeamId) || state.teams[0];
}

function getTeamById(teamId) {
  return state.teams.find((team) => team.id === teamId) || state.teams[0];
}

function getOtherTeamId() {
  return state.activeTeamId === state.teams[0].id ? state.teams[1].id : state.teams[0].id;
}

function setTurnStatus(team) {
  const turnName = team.representative || team.name;
  const prefix = document.createElement("span");
  const teamName = document.createElement("span");

  prefix.className = "turn-prefix";
  prefix.textContent = "תור: ";
  teamName.className = "turn-team-name";
  teamName.textContent = turnName;

  els.statusMessage.style.setProperty("--active-team-color", team.color);
  els.statusMessage.replaceChildren(prefix, teamName);
  updateTurnCursorBuddy();
}

function setPlainStatus(message) {
  els.statusMessage.style.removeProperty("--active-team-color");
  els.statusMessage.textContent = message;
  hideTurnCursorBuddy();
}
