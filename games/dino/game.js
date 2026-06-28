const STORAGE_KEY = "dor-bachelor-dino-state-v1";
const PORTAL_FRESH_START_PREFIX = "the-braz-games:fresh-start:";
const STORAGE_VERSION = 8;
const IS_MAC_PLATFORM = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || "");
const CHOOSE_FIGHTER_SOUND_SRC = "assets/sounds/choose-your-fighter.mp3?v=2026-06-23-choose-fighter-1";
const SOUND_ASSET_VERSION = "2026-06-26-meser-magami-gabo-swap-1";
const BACKGROUND_MUSIC_VERSION = "2026-06-26-dino-bg-music-1";
const GAMEPLAY_SOUND_VERSION = "2026-06-27-dino-gameplay-sounds-1";
const DINO_SPRITE_VERSION = "2026-06-28-dino-dor-face-up20-1";
const JACKSON_OBSTACLE_VERSION = "2026-06-27-dino-obstacle-perf-1";
const JACKSON_OBSTACLE_SRC = `assets/images/obstacles/jackson-face-runtime.png?v=${JACKSON_OBSTACLE_VERSION}`;
const GAMEPLAY_IMAGE_PRELOADS = [
  "assets/dinorun/cactus.png",
  JACKSON_OBSTACLE_SRC,
];
const FIGHTER_REVEAL_SOUNDS = {
  fighterRevealMeser: "assets/sounds/fighter-reveals/meser_reveal.mp3",
  fighterRevealMagami: "assets/sounds/fighter-reveals/magami_reveal.mp3",
  fighterRevealOmri: "assets/sounds/fighter-reveals/omri_reveal.mp3",
  fighterRevealPlato: "assets/sounds/fighter-reveals/plato_reveal.mp3",
  fighterRevealPishuto: "assets/sounds/fighter-reveals/pishuto_reveal.mp3",
  fighterRevealMiki: "assets/sounds/fighter-reveals/miki_reveal.mp3",
  fighterRevealDor: "assets/sounds/fighter-reveals/dor_reveal.mp3",
  fighterRevealGabo: "assets/sounds/fighter-reveals/gabo_reveal.mp3",
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
const GAMEPLAY_SOUNDS = {
  jump: {
    src: "assets/sounds/gameplay/jump-boing.mp3",
    volume: 0.56,
  },
  death: {
    src: "assets/sounds/gameplay/dino-death.mp3",
    volume: 0.78,
  },
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
const BACKGROUND_MUSIC_TRACKS = [
  "assets/sounds/background-music/arcade_5.mp3",
  "assets/sounds/background-music/arcade_6.mp3",
  "assets/sounds/background-music/arcade_7.mp3",
  "assets/sounds/background-music/arcade_8.mp3",
].map((src) => `${src}?v=${BACKGROUND_MUSIC_VERSION}`);
const BACKGROUND_MUSIC_VOLUME = 0.32;
const BACKGROUND_MUSIC_FADE_MS = 1800;
const BACKGROUND_MUSIC_FADE_SECONDS = BACKGROUND_MUSIC_FADE_MS / 1000;
const BACKGROUND_MUSIC_TICK_MS = 50;

const TOTAL_ROUNDS = 5;
const COUNTDOWN_SECONDS = 8;
const RULES_MODAL_MS = 16000;
const ROUND_RESULT_FREEZE_MS = 1500;
const GAME_OVER_FREEZE_MS = 3000;
const ROUND_RESULT_DELAY_MS = 6000;

const BASE_SPEED_SCALE = 0.82;
const ROUND_SPEED_BONUS = 0.025;
const PACE_STEP_MS = 10000;
const PACE_SPEED_STEP = 0.08;
const PACE_NOTICE_MS = 2800;
const SPEED_SCALE_INCREASE = 0.0000015;
const SPEED_SCALE_MAX = 1.9;
const GROUND_SPEED = 0.05;
const CACTUS_SPEED = 0.05;
const START_SIGN_SPEED = 0.026;
const START_SIGN_INITIAL_X_RATIO = 0.28;
const START_SIGN_RESPAWN_X_RATIO = 1.62;
const START_SIGN_OVERLAP_TRIGGER_RATIO = -0.18;
const START_SIGN_INITIAL_OVERLAP_TRIGGER_RATIO = -0.18;
const START_SIGN_COMMIT_CENTER_RATIO = 0.5;
const BACKGROUND_ZOMBIE_BASE_SPEED = 0.016;
const BACKGROUND_ZOMBIE_HEIGHT_PX = 52;
const CACTUS_INTERVAL_MIN = 700;
const CACTUS_INTERVAL_MAX = 1550;
const JUMP_SPEED = 1.05;
const GRAVITY = 0.003;
const RUN_FRAME_MS = 120;
const DINO_LEFT_RATIO = 0.06;
const FALLBACK_TRACK_WIDTH = 1280;
const FALLBACK_TRACK_HEIGHT = 360;
const FALLBACK_DINO_WIDTH = 112;
const FALLBACK_DINO_HEIGHT = 112;
const FALLBACK_OBSTACLE_WIDTH = 48;
const FALLBACK_OBSTACLE_HEIGHT = 76;
const DINO_COLLISION_INSET_X = 5;
const DINO_COLLISION_INSET_TOP = 3;
const DINO_COLLISION_INSET_BOTTOM = 3;
const OBSTACLE_COLLISION_INSET_X = 4;
const OBSTACLE_COLLISION_INSET_TOP = 3;
const OBSTACLE_COLLISION_INSET_BOTTOM = 2;
const OBSTACLE_SPAWN_X_RATIO = 1.04;
const CACTUS_ASPECT_RATIO = 70 / 34;
const JACKSON_OBSTACLE_SPAWN_NUMBERS_BY_ROUND = new Map([
  [2, new Set([30])],
  [3, new Set([3])],
  [4, new Set([15])],
  [5, new Set([7, 14])],
]);

const JACKSON_OBSTACLE_PATTERN = {
  id: "jackson-face",
  type: "jackson-face",
  width: 50,
  height: 58,
  cooldownMultiplier: 1.08,
};

const OBSTACLE_PATTERNS = [
  {
    id: "cactus-small",
    type: "cactus",
    width: 34,
    height: 34 * CACTUS_ASPECT_RATIO,
    weight: 34,
    cooldownMultiplier: 0.95,
  },
  {
    id: "cactus-regular",
    type: "cactus",
    width: 46,
    height: 46 * CACTUS_ASPECT_RATIO,
    weight: 36,
  },
  {
    id: "cactus-large",
    type: "cactus",
    width: 58,
    height: 58 * CACTUS_ASPECT_RATIO,
    minRound: 2,
    minElapsedMs: 4500,
    weight: 16,
    cooldownMultiplier: 1.1,
  },
  {
    id: "cactus-double",
    type: "cactus-cluster",
    width: 88,
    height: 44 * CACTUS_ASPECT_RATIO,
    minRound: 2,
    minElapsedMs: 8000,
    weight: 13,
    cooldownMultiplier: 1.26,
    parts: [
      { left: 0, width: 37, height: 37 * CACTUS_ASPECT_RATIO },
      { left: 39, width: 44, height: 44 * CACTUS_ASPECT_RATIO },
    ],
  },
];

const BACKGROUND_SIGN_MESSAGES = [
  {
    lines: ["ברוכים הבאים", "לבאר שבע"],
    speedScale: 0.82,
  },
  {
    lines: ["מבצע במכללת", "סמי שמעון!", "2 תארים ב-10", "קדימה רק היום", "אינעל דינק"],
    variant: "long",
    speedScale: 0.55,
  },
  {
    lines: ["פסטה בסטה", "כי מסתבר שזה מדהים", "שמוצר זול", "עולה זול"],
    variant: "long",
    speedScale: 0.55,
  },
  {
    lines: [
      { text: "אונ' בן גוריון !", emphasis: true },
      { text: "כי מי לא רוצה אווירה סטודנטיאלית", emphasis: false },
      { text: "בחור תחת", emphasis: false },
    ],
    variant: "long",
    speedScale: 0.55,
  },
  {
    lines: ["אמא של חמיר", "אמא של חמיר", "אל תסמוך עליה", "היא בסוף", "אותך", "תחמיר"],
    variant: "stacked",
    speedScale: 0.5,
  },
  {
    id: "sima-shimoni",
    lines: [
      { text: "סימה שמעוני", emphasis: true },
      "מתווכת מספר 1",
      "סמכו עלי כי הפרצוף שלי פה על השלט",
    ],
    variant: "sima",
    media: {
      src: "assets/images/backgrounds/zombies/zombie-3-idle-1.png",
      alt: "",
    },
    speedScale: 0.48,
  },
  {
    id: "farewell-beer-sheva",
    lines: ["צאתכם לשלום!", "באר שבע"],
    speedScale: 0.7,
  },
  {
    lines: ["נמל התעופה", "בן גוריון", { text: "→", arrow: true }],
    variant: "arrow",
    speedScale: 0.55,
  },
  {
    lines: ["הרגה אותי", "המסיבת רווקים הזאת"],
    speedScale: 0.62,
  },
  {
    lines: ["סגור ת'חלון"],
    speedScale: 0.68,
  },
  {
    lines: ["ברוכים הבאים לאשדוד", "או אשקלון", "גם התושבים עצמם", "לא מבדילים"],
    variant: "long",
    speedScale: 0.52,
  },
  {
    lines: ["שיחקתי כל משחק", "איזה 100 פעמים", "איזה בזבוז זמן", "התחייבות הרסנית"],
    variant: "long",
    speedScale: 0.52,
  },
  {
    lines: ["תקשיבו לי עכשיו דחוף", "המקרר פתוח"],
    variant: "long",
    speedScale: 0.55,
  },
];

const BACKGROUND_ZOMBIE_ROOT = "assets/images/backgrounds/zombies";
const ROUND_BACKGROUND_ZOMBIES = [
  [
    {
      asset: "zombie-1-idle-1.png",
      xRatio: 0.12,
      bottomRatio: 0.08,
      opacity: 0.24,
      speedScale: 0.7,
    },
    {
      asset: "zombie-2-walk-1.png",
      xRatio: 0.36,
      bottomRatio: 0.09,
      opacity: 0.2,
      speedScale: 1.08,
      flip: true,
    },
    {
      asset: "zombie-3-idle-1.png",
      xRatio: 0.64,
      bottomRatio: 0.07,
      opacity: 0.22,
      speedScale: 0.82,
    },
    {
      asset: "zombie-1-walk-1.png",
      xRatio: 0.82,
      bottomRatio: 0.1,
      opacity: 0.19,
      speedScale: 1.22,
      flip: true,
    },
  ],
];

const TEAMS = [
  {
    id: "chen",
    name: "החן יוספים, ועוזריהם",
    shortName: "החן יוספים, ועוזריהם",
    color: "#f04444",
    jumpCode: "KeyW",
    jumpLabel: "W",
  },
  {
    id: "brazim",
    name: "הבראזים",
    shortName: "הבראזים",
    color: "#2f80ff",
    jumpCode: "ArrowUp",
    jumpLabel: "↑",
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
const chooseFighterPromptAudio = new Audio(CHOOSE_FIGHTER_SOUND_SRC);
const backgroundMusic = createBackgroundMusicController();
const fighterRevealAudioCache = new Map(
  Object.entries(FIGHTER_REVEAL_SOUNDS).map(([key, src]) => {
    const audio = new Audio(`${src}?v=${SOUND_ASSET_VERSION}`);
    audio.preload = "auto";
    return [key, audio];
  }),
);
const gameplayAudioCache = new Map(
  Object.entries(GAMEPLAY_SOUNDS).map(([key, config]) => {
    const audio = new Audio(`${config.src}?v=${GAMEPLAY_SOUND_VERSION}`);
    audio.preload = "auto";
    return [key, audio];
  }),
);
const gameplayImagePreloadCache = preloadGameplayImages();
let startIntroStarted = false;
let countdownTimerId = null;
let rulesTimeoutId = null;
let rulesCompleteHandler = null;
let chooseFighterPromptTimerId = null;
let roundAdvanceTimerId = null;
let countdownEndsAt = 0;
let animationId = null;
let lastTime = null;
let speedScale = BASE_SPEED_SCALE;
let roundStartedAt = 0;
let paceLevel = 1;
let paceNoticeTimerId = null;
let activeFighterRevealAudio = null;
const fighterRevealTimers = new WeakMap();

chooseFighterPromptAudio.preload = "auto";

const els = {
  startScreen: document.querySelector("#startScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  startButton: document.querySelector("#startButton"),
  rulesOverlay: document.querySelector("#rulesOverlay"),
  splitWorld: document.querySelector("#splitWorld"),
  chenLanePlayer: document.querySelector("#chenLanePlayer"),
  brazimLanePlayer: document.querySelector("#brazimLanePlayer"),
  chenScore: document.querySelector("#chenScore"),
  brazimScore: document.querySelector("#brazimScore"),
  laneFighters: {
    chen: document.querySelector('[data-lane-fighter="chen"]'),
    brazim: document.querySelector('[data-lane-fighter="brazim"]'),
  },
  laneLevelStars: [...document.querySelectorAll("[data-level-stars]")],
  debugModeBadge: document.querySelector("#debugModeBadge"),
  roundOverlay: document.querySelector("#roundOverlay"),
  roundKicker: document.querySelector("#roundKicker"),
  roundPlayer: document.querySelector("#roundPlayer"),
  roundCountdown: document.querySelector("#roundCountdown"),
  gameOverOverlay: document.querySelector("#gameOverOverlay"),
  resetModal: document.querySelector("#resetModal"),
  resetError: document.querySelector("#resetError"),
  confirmResetButton: document.querySelector("#confirmResetButton"),
  cancelResetButton: document.querySelector("#cancelResetButton"),
  dorFighterPreview: document.querySelector("#dorFighterPreview"),
  pishutoFighterPreview: document.querySelector("#pishutoFighterPreview"),
  mikiFighterPreview: document.querySelector("#mikiFighterPreview"),
  gaboFighterPreview: document.querySelector("#gaboFighterPreview"),
  messerFighterPreview: document.querySelector("#messerFighterPreview"),
  magamiFighterPreview: document.querySelector("#magamiFighterPreview"),
  omriFighterPreview: document.querySelector("#omriFighterPreview"),
  platoFighterPreview: document.querySelector("#platoFighterPreview"),
};

const lanes = new Map(
  TEAMS.map((team) => [
    team.id,
    {
      team,
      lane: document.querySelector(`[data-lane="${team.id}"]`),
      track: document.querySelector(`[data-track="${team.id}"]`),
      dino: document.querySelector(`[data-dino="${team.id}"]`),
      grounds: [...document.querySelectorAll(`[data-ground="${team.id}"]`)],
      metrics: {
        trackWidth: FALLBACK_TRACK_WIDTH,
        trackHeight: FALLBACK_TRACK_HEIGHT,
        dinoLeft: FALLBACK_TRACK_WIDTH * DINO_LEFT_RATIO,
        dinoWidth: FALLBACK_DINO_WIDTH,
        dinoHeight: FALLBACK_DINO_HEIGHT,
        groundWidth: FALLBACK_TRACK_WIDTH * 3,
      },
      groundLefts: [0, FALLBACK_TRACK_WIDTH * 3],
      startSigns: [],
      backgroundActors: [],
      obstacles: [],
      obstacleSpawnCount: 0,
      nextObstacleMs: CACTUS_INTERVAL_MIN,
      jumpHeight: 0,
      jumpVelocity: 0,
      isJumping: false,
      frame: 0,
      frameElapsed: 0,
      elapsedMs: 0,
      currentSprite: "",
      lost: false,
    },
  ]),
);

document.querySelectorAll(".character-card").forEach((card) => {
  card.addEventListener("click", () => {
    selectCharacter(card.dataset.teamId, card.dataset.characterId);
  });
});

els.startButton.addEventListener("click", handleStartButtonClick);
els.confirmResetButton.addEventListener("click", confirmReset);
els.cancelResetButton.addEventListener("click", closeResetModal);
document.addEventListener("keydown", handleKeyDown);

init();

function createInitialState() {
  return {
    version: STORAGE_VERSION,
    phase: "start",
    selectedCharacters: {
      chen: "",
      brazim: "",
    },
    scores: {
      chen: 0,
      brazim: 0,
    },
    roundNumber: 1,
    roundResults: [],
    nextSignIndex: 0,
    countdownEndsAt: 0,
    debugMode: false,
    debugTeamId: "brazim",
  };
}

function init() {
  if (new URLSearchParams(window.location.search).get("init") === "1") {
    localStorage.removeItem(STORAGE_KEY);
    window.history.replaceState({}, "", window.location.pathname);
  }

  if (consumePortalFreshStartFlag()) {
    localStorage.removeItem(STORAGE_KEY);
  }

  restoreState();
  syncCharacterSelectionUI();
  updateStartButtonState();
  updateDebugModeUI();
  renderHud();
  resetAllLanes();

  if (state.phase === "rules") {
    startIntroStarted = true;
    if (state.debugMode) {
      startDebugMatchImmediately({ resetMatch: false });
    } else {
      showRulesScreen();
    }
  } else if (["prep", "roundOver", "gameOver"].includes(state.phase)) {
    startIntroStarted = true;
    showGameScreen();
    if (state.phase === "prep") {
      if (state.debugMode) {
        beginRound();
      } else {
        resumeCountdown();
      }
    }
    if (state.phase === "roundOver") {
      renderRoundOverFromState();
      scheduleNextRound();
    }
    if (state.phase === "gameOver") renderGameOverOverlay();
  } else if (state.phase === "playing") {
    startIntroStarted = true;
    state.phase = "prep";
    showGameScreen();
    startCountdown();
  } else {
    showStartScreen();
  }
}

function preloadGameplayImages() {
  return GAMEPLAY_IMAGE_PRELOADS.map((src) => {
    const image = new Image();
    image.decoding = "async";
    image.loading = "eager";
    image.src = src;
    if (typeof image.decode === "function") image.decode().catch(() => {});
    return image;
  });
}

function handleKeyDown(event) {
  if (state.phase === "rules" && event.code === "Space" && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    event.stopImmediatePropagation();
    completeRulesOverlayNow();
    return;
  }

  if ((event.ctrlKey || event.metaKey) && event.code === "KeyD" && state.phase === "start") {
    event.preventDefault();
    event.stopImmediatePropagation();
    toggleDebugMode();
    return;
  }

  if (IS_MAC_PLATFORM && event.ctrlKey && !event.metaKey && event.code === "KeyD") {
    event.preventDefault();
    event.stopImmediatePropagation();
    toggleDebugMode();
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.code === "KeyD") {
    event.preventDefault();
    event.stopImmediatePropagation();
    openResetModal();
    return;
  }

  if (state.phase !== "playing") return;

  const team = TEAMS.find((candidate) => candidate.jumpCode === event.code);
  if (!team) return;

  event.preventDefault();
  event.stopImmediatePropagation();
  jump(team.id);
}

function selectCharacter(teamId, characterId) {
  if (!startIntroStarted) return;
  if (state.phase !== "start") return;
  const character = getCharacterById(teamId, characterId);
  if (!character) return;

  state.selectedCharacters[teamId] = character.id;
  syncCharacterSelectionUI(teamId, character.id);
  playFighterRevealSound(character.id);
  updateStartButtonState();
  saveState();
}

function getCharacterById(teamId, characterId) {
  characterId = normalizeCharacterId(characterId);
  return CHARACTER_ROSTER[teamId]?.find((character) => character.id === characterId) || null;
}

function normalizeCharacterId(characterId) {
  return characterId === LEGACY_GABO_ID ? "gabo" : characterId || "";
}

function getSelectedCharacter(teamId) {
  return getCharacterById(teamId, state.selectedCharacters[teamId]);
}

function getTeam(teamId) {
  return TEAMS.find((team) => team.id === teamId);
}

function getOtherTeamId(teamId) {
  return teamId === "chen" ? "brazim" : "chen";
}

function syncCharacterSelectionUI(animateTeamId = null, animateCharacterId = null) {
  document.querySelectorAll(".character-card").forEach((card) => {
    card.classList.toggle(
      "is-selected",
      state.selectedCharacters[card.dataset.teamId] === card.dataset.characterId,
    );
  });

  const canShowFighterPreviews = startIntroStarted && state.phase === "start";
  setFighterPreviewVisible(
    els.messerFighterPreview,
    canShowFighterPreviews && state.selectedCharacters.chen === "meser",
    animateTeamId === "chen" && animateCharacterId === "meser",
  );
  setFighterPreviewVisible(
    els.magamiFighterPreview,
    canShowFighterPreviews && state.selectedCharacters.chen === "magami",
    animateTeamId === "chen" && animateCharacterId === "magami",
  );
  setFighterPreviewVisible(
    els.platoFighterPreview,
    canShowFighterPreviews && state.selectedCharacters.chen === "plato",
    animateTeamId === "chen" && animateCharacterId === "plato",
  );
  setFighterPreviewVisible(
    els.omriFighterPreview,
    canShowFighterPreviews && state.selectedCharacters.chen === "omri",
    animateTeamId === "chen" && animateCharacterId === "omri",
  );
  setFighterPreviewVisible(
    els.pishutoFighterPreview,
    canShowFighterPreviews && state.selectedCharacters.brazim === "pishuto",
    animateTeamId === "brazim" && animateCharacterId === "pishuto",
  );
  setFighterPreviewVisible(
    els.mikiFighterPreview,
    canShowFighterPreviews && state.selectedCharacters.brazim === "miki",
    animateTeamId === "brazim" && animateCharacterId === "miki",
  );
  setFighterPreviewVisible(
    els.dorFighterPreview,
    canShowFighterPreviews && state.selectedCharacters.brazim === "dor",
    animateTeamId === "brazim" && animateCharacterId === "dor",
  );
  setFighterPreviewVisible(
    els.gaboFighterPreview,
    canShowFighterPreviews && state.selectedCharacters.brazim === "gabo",
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

  els.startButton.disabled = !getActiveTeams().every((team) => Boolean(state.selectedCharacters[team.id]));
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

function playFighterRevealSound(characterId) {
  const soundKey = FIGHTER_REVEAL_SOUND_KEYS[normalizeCharacterId(characterId)];
  if (!soundKey) return;
  const source = fighterRevealAudioCache.get(soundKey);
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
    // Browser audio may be blocked until a user gesture; selection still works.
  });
}

function playGameplaySound(soundKey) {
  const config = GAMEPLAY_SOUNDS[soundKey];
  const source = gameplayAudioCache.get(soundKey);
  if (!config || !source) return;

  const audio = source.cloneNode(true);
  audio.volume = config.volume;
  audio.play().catch(() => {
    // Browser audio may be blocked until a user gesture; gameplay continues.
  });
}

function createBackgroundMusicController() {
  let currentAudio = null;
  let currentTrackIndex = 0;
  let isStarting = false;
  let isStarted = false;
  let isTransitioning = false;
  let fadeTimerId = null;

  function makeAudio(trackIndex) {
    const audio = new Audio(BACKGROUND_MUSIC_TRACKS[trackIndex]);
    audio.preload = "auto";
    audio.volume = 0;
    audio.addEventListener("timeupdate", () => maybeStartNextTrack(audio));
    audio.addEventListener("ended", () => {
      if (audio !== currentAudio || isTransitioning) return;
      startNextTrack({ fadeInOnly: true });
    });
    audio.addEventListener("error", () => {
      if (audio !== currentAudio || isTransitioning) return;
      startNextTrack({ fadeInOnly: true });
    });
    return audio;
  }

  function start() {
    if (isStarted || isStarting || !BACKGROUND_MUSIC_TRACKS.length) return;

    isStarting = true;
    const audio = makeAudio(currentTrackIndex);
    audio.volume = BACKGROUND_MUSIC_VOLUME;
    currentAudio = audio;
    audio.play()
      .then(() => {
        isStarted = true;
        isStarting = false;
      })
      .catch(() => {
        if (currentAudio === audio) currentAudio = null;
        isStarted = false;
        isStarting = false;
      });
  }

  function maybeStartNextTrack(audio) {
    if (audio !== currentAudio || isTransitioning) return;
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
    if (audio.duration - audio.currentTime > BACKGROUND_MUSIC_FADE_SECONDS) return;

    startNextTrack();
  }

  function startNextTrack({ fadeInOnly = false } = {}) {
    if (!isStarted || isTransitioning || !BACKGROUND_MUSIC_TRACKS.length) return;

    const outgoingAudio = currentAudio;
    const nextTrackIndex = (currentTrackIndex + 1) % BACKGROUND_MUSIC_TRACKS.length;
    const incomingAudio = makeAudio(nextTrackIndex);
    incomingAudio.volume = 0;
    isTransitioning = true;

    incomingAudio.play()
      .then(() => {
        const transitionStartedAt = performance.now();
        clearFadeTimer();
        fadeTimerId = window.setInterval(() => {
          const progress = Math.min(
            (performance.now() - transitionStartedAt) / BACKGROUND_MUSIC_FADE_MS,
            1,
          );

          incomingAudio.volume = BACKGROUND_MUSIC_VOLUME * progress;
          if (outgoingAudio && !fadeInOnly) {
            outgoingAudio.volume = BACKGROUND_MUSIC_VOLUME * (1 - progress);
          }

          if (progress < 1) return;

          clearFadeTimer();
          if (outgoingAudio) {
            outgoingAudio.pause();
            outgoingAudio.volume = 0;
          }
          currentAudio = incomingAudio;
          currentTrackIndex = nextTrackIndex;
          isTransitioning = false;
        }, BACKGROUND_MUSIC_TICK_MS);
      })
      .catch(() => {
        incomingAudio.pause();
        isTransitioning = false;
      });
  }

  function clearFadeTimer() {
    if (fadeTimerId === null) return;
    window.clearInterval(fadeTimerId);
    fadeTimerId = null;
  }

  return {
    start,
    getDebugState() {
      return {
        isStarted,
        isStarting,
        isTransitioning,
        currentTrackIndex,
        currentSrc: currentAudio?.currentSrc || currentAudio?.src || "",
        volume: currentAudio?.volume ?? 0,
      };
    },
  };
}

function handleStartButtonClick() {
  backgroundMusic.start();

  if (!startIntroStarted) {
    if (state.debugMode) {
      startIntroStarted = true;
      startDebugMatchImmediately();
      return;
    }

    startIntroStarted = true;
    els.startScreen.classList.add("is-intro-open");
    els.startButton.disabled = true;
    window.setTimeout(() => {
      els.startButton.textContent = "התחל משחק";
    }, 3700);
    scheduleChooseFighterPrompt();
    window.setTimeout(updateStartButtonState, 4850);
    return;
  }

  startRulesFlow();
}

function startRulesFlow() {
  ensureDebugSelection();
  if (!getActiveTeams().every((team) => Boolean(state.selectedCharacters[team.id]))) return;

  if (state.debugMode) {
    startDebugMatchImmediately();
    return;
  }

  clearTimers();
  stopLoop();
  hideGameOverOverlay();
  state.phase = "rules";
  state.scores = { chen: 0, brazim: 0 };
  state.roundNumber = 1;
  state.roundResults = [];
  state.nextSignIndex = 0;
  saveState();
  showRulesOverlay(() => {
    if (state.phase !== "rules") return;
    startMatchAfterRules();
  });
}

function startMatchAfterRules() {
  clearRulesTimeout();
  hideRulesOverlay();
  state.phase = "prep";
  saveState();
  showGameScreen();
  startCountdown();
}

function startDebugMatchImmediately({ resetMatch = true } = {}) {
  ensureDebugSelection();
  if (!getActiveTeams().every((team) => Boolean(state.selectedCharacters[team.id]))) return;

  clearTimers();
  stopLoop();
  hideRulesOverlay();
  hideGameOverOverlay();
  if (resetMatch) {
    state.scores = { chen: 0, brazim: 0 };
    state.roundNumber = 1;
    state.roundResults = [];
    state.nextSignIndex = 0;
  }
  state.phase = "prep";
  state.countdownEndsAt = 0;
  saveState();
  showGameScreen();
  beginRound();
}

function showStartScreen() {
  stopLoop();
  clearTimers();
  hideRulesOverlay();
  hideGameOverOverlay();
  startIntroStarted = false;
  els.startScreen.classList.remove("is-intro-open");
  els.startButton.textContent = "התחל";
  syncCharacterSelectionUI();
  updateStartButtonState();
  updateDebugModeUI();
  els.startScreen.classList.remove("is-hidden");
  els.gameScreen.classList.add("is-hidden");
}

function showRulesScreen() {
  stopLoop();
  clearTimers();
  hideGameOverOverlay();
  els.startScreen.classList.remove("is-hidden");
  els.startScreen.classList.add("is-intro-open");
  els.startButton.textContent = "התחל משחק";
  els.startButton.disabled = true;
  els.gameScreen.classList.add("is-hidden");
  syncCharacterSelectionUI();
  updateDebugModeUI();
  showRulesOverlay(() => {
    if (state.phase !== "rules") return;
    startMatchAfterRules();
  });
}

function showRulesOverlay(onComplete) {
  clearRulesTimeout();
  rulesCompleteHandler = onComplete;
  els.rulesOverlay.classList.remove("is-hidden", "is-running");
  void els.rulesOverlay.offsetWidth;
  els.rulesOverlay.classList.add("is-running");
  rulesTimeoutId = window.setTimeout(() => {
    rulesTimeoutId = null;
    rulesCompleteHandler = null;
    onComplete();
  }, RULES_MODAL_MS);
}

function hideRulesOverlay() {
  clearRulesTimeout();
  rulesCompleteHandler = null;
  els.rulesOverlay.classList.add("is-hidden");
  els.rulesOverlay.classList.remove("is-running");
}

function clearRulesTimeout() {
  if (rulesTimeoutId !== null) {
    window.clearTimeout(rulesTimeoutId);
    rulesTimeoutId = null;
  }
}

function completeRulesOverlayNow() {
  if (state.phase !== "rules" || !rulesCompleteHandler) return;
  const onComplete = rulesCompleteHandler;
  clearRulesTimeout();
  rulesCompleteHandler = null;
  onComplete();
}

function showGameScreen() {
  els.startScreen.classList.add("is-hidden");
  hideRulesOverlay();
  els.gameScreen.classList.remove("is-hidden");
  applyGameModeUI();
  renderHud();
}

function startCountdown() {
  stopLoop();
  clearTimers();
  hideGameOverOverlay();
  resetAllLanes();
  state.phase = "prep";
  setCountdownEnd(Date.now() + COUNTDOWN_SECONDS * 1000);
  renderHud();
  renderCountdownOverlay();
  saveState();
  countdownTimerId = window.setInterval(tickCountdown, 250);
  tickCountdown();
}

function resumeCountdown() {
  stopLoop();
  clearTimers();
  resetAllLanes();
  state.phase = "prep";
  setCountdownEnd(
    Number.isFinite(state.countdownEndsAt) && state.countdownEndsAt > Date.now()
      ? state.countdownEndsAt
      : Date.now() + COUNTDOWN_SECONDS * 1000,
  );
  renderHud();
  renderCountdownOverlay();
  saveState();
  countdownTimerId = window.setInterval(tickCountdown, 250);
  tickCountdown();
}

function setCountdownEnd(value) {
  countdownEndsAt = value;
  state.countdownEndsAt = value;
}

function tickCountdown() {
  const secondsLeft = Math.max(0, Math.ceil((countdownEndsAt - Date.now()) / 1000));
  renderCountdownOverlay(secondsLeft);

  if (secondsLeft > 0) return;

  clearTimers();
  beginRound();
}

function renderCountdownOverlay(secondsLeft = COUNTDOWN_SECONDS) {
  els.roundOverlay.classList.remove("is-hidden", "is-game-over", "is-round-over");
  els.roundOverlay.style.setProperty("--round-team-color", "var(--game-accent)");
  els.roundKicker.textContent = `סיבוב ${state.roundNumber} מתוך ${TOTAL_ROUNDS}`;
  els.roundPlayer.textContent = "";
  els.roundCountdown.classList.remove("round-result-details");
  els.roundCountdown.textContent = `מתחילים בעוד ${secondsLeft}`;
}

function beginRound() {
  state.phase = "playing";
  state.countdownEndsAt = 0;
  speedScale = getRoundStartingSpeed();
  roundStartedAt = 0;
  paceLevel = 1;
  lastTime = null;
  hidePaceNotice();
  hideOverlay();
  resetAllLanes();
  renderHud();
  saveState();
  animationId = window.requestAnimationFrame(update);
}

function resetAllLanes() {
  lanes.forEach(resetLane);
}

function resetLane(laneState) {
  refreshLaneMetrics(laneState);
  laneState.startSigns.forEach((sign) => sign.el.remove());
  laneState.startSigns = [];
  laneState.backgroundActors.forEach((actor) => actor.el.remove());
  laneState.backgroundActors = [];
  laneState.obstacles.forEach((obstacle) => obstacle.el.remove());
  laneState.obstacles = [];
  laneState.obstacleSpawnCount = 0;
  laneState.nextObstacleMs = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX);
  laneState.groundLefts = [0, laneState.metrics.groundWidth];
  laneState.jumpHeight = 0;
  laneState.jumpVelocity = 0;
  laneState.isJumping = false;
  laneState.frame = 0;
  laneState.frameElapsed = 0;
  laneState.elapsedMs = 0;
  laneState.lost = false;
  laneState.currentSprite = "";
  setDinoSprite(laneState, getDinoSpriteSrc("dino-stationary.png"));
  laneState.dino.classList.remove("is-lost");
  laneState.dino.style.setProperty("--bottom-px", "0px");
  laneState.grounds.forEach((ground, index) => {
    setElementX(ground, laneState.groundLefts[index]);
  });
  createBackgroundActors(laneState);
  const spawnConfig = getRoundInitialSignSpawnConfig();
  spawnStartSign(laneState, state.nextSignIndex, spawnConfig.xRatio, {
    nextSpawnLeftRatio: spawnConfig.nextSpawnLeftRatio,
  });
}

function getRoundInitialSignSpawnConfig() {
  const shouldStartOnScreen = state.roundNumber === 1 && state.nextSignIndex === 0;
  return {
    xRatio: shouldStartOnScreen ? START_SIGN_INITIAL_X_RATIO : START_SIGN_RESPAWN_X_RATIO,
    nextSpawnLeftRatio: shouldStartOnScreen
      ? START_SIGN_INITIAL_OVERLAP_TRIGGER_RATIO
      : START_SIGN_OVERLAP_TRIGGER_RATIO,
  };
}

function update(timeMs) {
  if (state.phase !== "playing") {
    animationId = null;
    return;
  }

  if (lastTime === null) {
    lastTime = timeMs;
    roundStartedAt = timeMs;
    updatePace(timeMs);
    animationId = window.requestAnimationFrame(update);
    return;
  }

  const delta = timeMs - lastTime;
  updatePace(timeMs);
  speedScale = Math.min(
    SPEED_SCALE_MAX,
    getRoundStartingSpeed() + (paceLevel - 1) * PACE_SPEED_STEP + (timeMs - roundStartedAt) * SPEED_SCALE_INCREASE,
  );

  const activeLanes = getActiveLanes();
  activeLanes.forEach((laneState) => {
    updateLane(laneState, delta);
  });

  const loser = activeLanes.find((laneState) => checkLose(laneState));
  if (loser) {
    handleRoundLoss(loser.team.id);
    return;
  }

  lastTime = timeMs;
  animationId = window.requestAnimationFrame(update);
}

function updateLane(laneState, delta) {
  laneState.elapsedMs += delta;
  updateGround(laneState, delta);
  updateBackgroundActors(laneState, delta);
  updateStartSign(laneState, delta);
  updateDino(laneState, delta);
  updateObstacles(laneState, delta);
}

function updatePace(timeMs) {
  const elapsed = Math.max(0, timeMs - roundStartedAt);
  const nextPaceLevel = Math.max(1, Math.floor(elapsed / PACE_STEP_MS) + 1);
  if (nextPaceLevel <= paceLevel) return;

  paceLevel = nextPaceLevel;
  showPaceIncrease(paceLevel);
}

function showPaceIncrease(level) {
  const stars = Math.min(level, 5);
  const markup = Array.from({ length: stars }, (_, index) => {
    const className = index === stars - 1 ? "lane-level-star is-current" : "lane-level-star";
    return `<span class="${className}">★</span>`;
  }).join("");

  els.laneLevelStars.forEach((levelStars) => {
    levelStars.innerHTML = markup;
    levelStars.classList.add("is-visible");
  });

  if (paceNoticeTimerId !== null) window.clearTimeout(paceNoticeTimerId);
  paceNoticeTimerId = window.setTimeout(hidePaceNotice, PACE_NOTICE_MS);
}

function hidePaceNotice() {
  if (paceNoticeTimerId !== null) {
    window.clearTimeout(paceNoticeTimerId);
    paceNoticeTimerId = null;
  }

  els.laneLevelStars.forEach((levelStars) => {
    levelStars.classList.remove("is-visible");
    levelStars.innerHTML = "";
  });
}

function updateGround(laneState, delta) {
  const groundWidth = laneState.metrics.groundWidth;
  const pixelsPerMs = (GROUND_SPEED * laneState.metrics.trackWidth) / 100;
  laneState.grounds.forEach((ground, index) => {
    laneState.groundLefts[index] -= delta * pixelsPerMs * speedScale;
    if (laneState.groundLefts[index] <= -groundWidth) laneState.groundLefts[index] += groundWidth * 2;
    setElementX(ground, laneState.groundLefts[index]);
  });
}

function createBackgroundActors(laneState) {
  const actors = getRoundBackgroundActors(state.roundNumber);
  if (!actors.length) return;

  const laneOffset = laneState.team.id === "chen" ? 0 : 0.16;
  actors.forEach((actorConfig, index) => {
    const actor = document.createElement("img");
    actor.src = `${BACKGROUND_ZOMBIE_ROOT}/${actorConfig.asset}`;
    actor.alt = "";
    actor.className = "lane-background-zombie";
    actor.dataset.backgroundActor = "zombie";
    actor.style.setProperty("--actor-height-px", `${BACKGROUND_ZOMBIE_HEIGHT_PX}px`);
    actor.style.setProperty("--actor-bottom-px", `${laneState.metrics.trackHeight * actorConfig.bottomRatio}px`);
    actor.style.setProperty("--actor-opacity", actorConfig.opacity);
    actor.style.setProperty("--actor-scale-x", actorConfig.flip ? "-1" : "1");
    actor.style.setProperty("--actor-layer-offset", `${index * 0.2}px`);

    const left = laneState.metrics.trackWidth * (actorConfig.xRatio + laneOffset);
    setElementX(actor, left);
    laneState.track.append(actor);

    const actorState = {
      el: actor,
      left,
      width: actor.offsetWidth || 180,
      speedScale: actorConfig.speedScale,
      revealDelayMs: actorConfig.revealDelayMs || 0,
    };

    actor.addEventListener(
      "load",
      () => {
        actorState.width = actor.offsetWidth || actorState.width;
      },
      { once: true },
    );

    laneState.backgroundActors.push(actorState);
  });
}

function getRoundBackgroundActors(roundNumber) {
  return ROUND_BACKGROUND_ZOMBIES[roundNumber - 1] || ROUND_BACKGROUND_ZOMBIES[0] || [];
}

function updateBackgroundActors(laneState, delta) {
  if (!laneState.backgroundActors.length) return;

  const pixelsPerMs = (BACKGROUND_ZOMBIE_BASE_SPEED * laneState.metrics.trackWidth) / 100;
  laneState.backgroundActors.forEach((actor) => {
    if (laneState.elapsedMs < actor.revealDelayMs) return;
    actor.left -= delta * speedScale * pixelsPerMs * actor.speedScale;
    setElementX(actor.el, actor.left);
  });

  laneState.backgroundActors = laneState.backgroundActors.filter((actor) => {
    if (actor.left > -actor.width * 1.2) return true;
    actor.el.remove();
    return false;
  });
}

function spawnStartSign(laneState, queueIndex, xRatio = START_SIGN_RESPAWN_X_RATIO, options = {}) {
  if (!hasQueuedStartSign(queueIndex)) return;

  const signMessage = BACKGROUND_SIGN_MESSAGES[queueIndex];
  const { lines, media, variant } = signMessage;
  if (!lines.length) return;

  const sign = document.createElement("div");
  sign.className = "lane-start-sign";
  if (variant) sign.classList.add(`lane-start-sign-${variant}`);
  sign.setAttribute("aria-label", lines.map(getSignLineText).join(" "));

  const copyContainer = media ? document.createElement("div") : sign;
  if (media) copyContainer.className = "lane-start-sign-copy";

  lines.forEach((line) => {
    const lineConfig = typeof line === "string" ? { text: line } : line;
    const textLine = document.createElement("span");
    textLine.className = "lane-start-sign-line";
    if (lineConfig.emphasis === true) textLine.classList.add("lane-start-sign-line-emphasis");
    if (lineConfig.emphasis === false) textLine.classList.add("lane-start-sign-line-muted");
    if (lineConfig.arrow === true) textLine.classList.add("lane-start-sign-line-arrow");
    textLine.textContent = lineConfig.text;
    copyContainer.append(textLine);
  });

  if (media) {
    const mediaContainer = document.createElement("div");
    mediaContainer.className = "lane-start-sign-media";
    const mediaImage = document.createElement("img");
    mediaImage.src = media.src;
    mediaImage.alt = media.alt || "";
    mediaContainer.append(mediaImage);
    sign.append(mediaContainer, copyContainer);
  }

  const left = laneState.metrics.trackWidth * xRatio;
  setElementX(sign, left);
  laneState.track.append(sign);
  const signState = {
    el: sign,
    left,
    width: sign.offsetWidth || 170,
    queueIndex,
    speedScale: signMessage.speedScale || 1,
    spawnedNext: false,
    committed: false,
    nextSpawnLeftRatio: options.nextSpawnLeftRatio || START_SIGN_OVERLAP_TRIGGER_RATIO,
  };
  laneState.startSigns.push(signState);
}

function getSignLineText(line) {
  return typeof line === "string" ? line : line.text;
}

function isQueuedStartSignIndex(queueIndex) {
  return Number.isInteger(queueIndex) && queueIndex >= 0 && queueIndex < BACKGROUND_SIGN_MESSAGES.length;
}

function hasQueuedStartSign(queueIndex) {
  return isQueuedStartSignIndex(queueIndex);
}

function updateStartSign(laneState, delta) {
  if (!laneState.startSigns.length) return;

  const pixelsPerMs = (START_SIGN_SPEED * laneState.metrics.trackWidth) / 100;
  let removedSign = false;
  laneState.startSigns.forEach((sign) => {
    sign.left -= delta * speedScale * pixelsPerMs * sign.speedScale;
    setElementX(sign.el, sign.left);
    maybeAdvanceSignQueue(laneState, sign);
    maybeSpawnFollowingSign(laneState, sign);
  });

  laneState.startSigns = laneState.startSigns.filter((sign) => {
    if (sign.left > -sign.width) return true;
    sign.el.remove();
    removedSign = true;
    return false;
  });

  if (removedSign && !laneState.startSigns.length) spawnStartSign(laneState, state.nextSignIndex);
}

function maybeSpawnFollowingSign(laneState, sign) {
  if (sign.spawnedNext) return;
  if (!hasQueuedStartSign(sign.queueIndex + 1)) {
    sign.spawnedNext = true;
    return;
  }
  if (sign.left > laneState.metrics.trackWidth * sign.nextSpawnLeftRatio) return;

  sign.spawnedNext = true;
  spawnStartSign(laneState, sign.queueIndex + 1);
}

function maybeAdvanceSignQueue(laneState, sign) {
  if (sign.committed) return;

  if (!hasStartSignReachedCommitPoint(laneState, sign)) return;

  sign.committed = true;
  if (state.nextSignIndex !== sign.queueIndex) return;

  state.nextSignIndex = sign.queueIndex + 1;
  saveState();
}

function hasStartSignReachedCommitPoint(laneState, sign) {
  const signWidth = Math.max(sign.width || sign.el.offsetWidth || 0, 1);
  const signCenter = sign.left + signWidth / 2;
  return signCenter <= laneState.metrics.trackWidth * START_SIGN_COMMIT_CENTER_RATIO;
}

function updateDino(laneState, delta) {
  if (laneState.isJumping) {
    laneState.jumpHeight = Math.max(0, laneState.jumpHeight + laneState.jumpVelocity * delta);
    laneState.jumpVelocity -= GRAVITY * delta;
    if (laneState.jumpHeight <= 0) {
      laneState.jumpHeight = 0;
      laneState.isJumping = false;
      laneState.jumpVelocity = 0;
    }
    setDinoSprite(laneState, getDinoSpriteSrc("dino-stationary.png"));
  } else {
    laneState.frameElapsed += delta * speedScale;
    if (laneState.frameElapsed >= RUN_FRAME_MS) {
      laneState.frame = (laneState.frame + 1) % 2;
      laneState.frameElapsed -= RUN_FRAME_MS;
    }
    setDinoSprite(laneState, getDinoSpriteSrc(`dino-run-${laneState.frame}.png`));
  }

  laneState.dino.style.setProperty("--bottom-px", `${laneState.jumpHeight}px`);
}

function updateObstacles(laneState, delta) {
  const pixelsPerMs = (CACTUS_SPEED * laneState.metrics.trackWidth) / 100;
  laneState.obstacles.forEach((obstacle) => {
    obstacle.left -= delta * speedScale * pixelsPerMs;
    setElementX(obstacle.el, obstacle.left);
  });

  laneState.obstacles = laneState.obstacles.filter((obstacle) => {
    if (obstacle.left > -obstacle.width) return true;
    obstacle.el.remove();
    return false;
  });

  laneState.nextObstacleMs -= delta;
  if (laneState.nextObstacleMs > 0) return;

  const obstacle = createObstacle(laneState);
  const baseInterval = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX);
  laneState.nextObstacleMs = (baseInterval * obstacle.cooldownMultiplier) / speedScale;
}

function createObstacle(laneState) {
  laneState.obstacleSpawnCount += 1;
  const pattern = chooseObstaclePattern(laneState, laneState.obstacleSpawnCount);
  const obstacle = createObstacleElement(pattern);
  const left = laneState.metrics.trackWidth * OBSTACLE_SPAWN_X_RATIO;
  setObstacleVisualMetrics(obstacle, pattern);
  const obstacleState = {
    el: obstacle,
    patternId: pattern.id,
    type: pattern.type,
    left,
    width: pattern.width || FALLBACK_OBSTACLE_WIDTH,
    height: pattern.height || FALLBACK_OBSTACLE_HEIGHT,
    bottom: pattern.bottom || 0,
    hitboxes: getObstacleHitboxes(pattern),
    cooldownMultiplier: pattern.cooldownMultiplier || 1,
  };
  setElementX(obstacle, left);
  laneState.track.append(obstacle);
  laneState.obstacles.push(obstacleState);
  return obstacleState;
}

function chooseObstaclePattern(laneState, spawnNumber) {
  if (shouldSpawnJacksonObstacle(state.roundNumber, spawnNumber)) return JACKSON_OBSTACLE_PATTERN;

  const eligiblePatterns = OBSTACLE_PATTERNS.filter((pattern) => (
    state.roundNumber >= (pattern.minRound || 1) &&
    laneState.elapsedMs >= (pattern.minElapsedMs || 0) &&
    speedScale >= (pattern.minSpeedScale || 0)
  ));
  const totalWeight = eligiblePatterns.reduce((total, pattern) => total + pattern.weight, 0);
  let roll = Math.random() * totalWeight;

  for (const pattern of eligiblePatterns) {
    roll -= pattern.weight;
    if (roll <= 0) return pattern;
  }

  return eligiblePatterns[0] || OBSTACLE_PATTERNS[0];
}

function shouldSpawnJacksonObstacle(roundNumber, spawnNumber) {
  return JACKSON_OBSTACLE_SPAWN_NUMBERS_BY_ROUND.get(roundNumber)?.has(spawnNumber) || false;
}

function createObstacleElement(pattern) {
  if (pattern.type === "cactus-cluster") return createCactusClusterElement(pattern);
  if (pattern.type === "jackson-face") return createJacksonObstacleElement(pattern);
  return createCactusElement(pattern);
}

function createCactusElement(pattern) {
  const obstacle = document.createElement("img");
  obstacle.src = "assets/dinorun/cactus.png";
  obstacle.alt = "";
  obstacle.className = `lane-obstacle lane-cactus lane-cactus-${pattern.id}`;
  return obstacle;
}

function createCactusClusterElement(pattern) {
  const obstacle = document.createElement("div");
  obstacle.className = `lane-obstacle lane-cactus-cluster lane-cactus-${pattern.id}`;
  pattern.parts.forEach((part) => {
    const cactus = document.createElement("img");
    cactus.src = "assets/dinorun/cactus.png";
    cactus.alt = "";
    cactus.style.setProperty("--part-left-px", `${part.left}px`);
    cactus.style.setProperty("--part-width-px", `${part.width}px`);
    cactus.style.setProperty("--part-height-px", `${part.height}px`);
    obstacle.append(cactus);
  });
  return obstacle;
}

function createJacksonObstacleElement(pattern) {
  const obstacle = document.createElement("img");
  obstacle.src = JACKSON_OBSTACLE_SRC;
  obstacle.alt = "";
  obstacle.className = `lane-obstacle lane-jackson-obstacle lane-jackson-obstacle-${pattern.id}`;
  return obstacle;
}

function setObstacleVisualMetrics(obstacle, pattern) {
  obstacle.style.setProperty("--obstacle-width-px", `${pattern.width}px`);
  obstacle.style.setProperty("--obstacle-height-px", `${pattern.height}px`);
  obstacle.style.setProperty("--obstacle-bottom-px", `${pattern.bottom || 0}px`);
}

function getObstacleHitboxes(pattern) {
  if (pattern.parts?.length) {
    return pattern.parts.map((part) => ({
      type: "cactus",
      left: part.left,
      width: part.width,
      height: part.height,
      bottom: 0,
    }));
  }

  return [
    {
      type: pattern.type,
      left: 0,
      width: pattern.width,
      height: pattern.height,
      bottom: pattern.bottom || 0,
    },
  ];
}

function jump(teamId) {
  const laneState = lanes.get(teamId);
  if (!laneState || laneState.isJumping || laneState.lost) return;
  laneState.isJumping = true;
  laneState.jumpVelocity = JUMP_SPEED;
  playGameplaySound("jump");
}

function checkLose(laneState) {
  const dinoRect = getDinoCollisionRect(laneState);
  return laneState.obstacles.some((obstacle) => (
    getObstacleCollisionRects(laneState, obstacle).some((obstacleRect) => isCollision(dinoRect, obstacleRect))
  ));
}

function handleRoundLoss(loserTeamId) {
  stopLoop();
  hidePaceNotice();
  playGameplaySound("death");
  const winnerTeamId = getOtherTeamId(loserTeamId);
  const loserLane = lanes.get(loserTeamId);
  const loserTeam = getTeam(loserTeamId);
  const winnerTeam = getTeam(winnerTeamId);

  loserLane.lost = true;
  setDinoSprite(loserLane, getDinoSpriteSrc("dino-lose.png"));
  markLaneAsLost(loserLane);
  state.scores[winnerTeamId] += 1;
  state.roundResults.push({
    round: state.roundNumber,
    loserTeamId,
    winnerTeamId,
  });

  if (state.roundNumber >= TOTAL_ROUNDS) {
    state.phase = "gameOver";
    saveState();
    renderHud();
    roundAdvanceTimerId = window.setTimeout(renderGameOverOverlay, GAME_OVER_FREEZE_MS);
    return;
  }

  state.phase = "roundOver";
  state.countdownEndsAt = 0;
  saveState();
  renderHud();
  roundAdvanceTimerId = window.setTimeout(() => {
    renderRoundOverOverlay(loserTeam, winnerTeam);
    scheduleNextRound();
  }, ROUND_RESULT_FREEZE_MS);
}

function renderRoundOverOverlay(loserTeam, winnerTeam) {
  const loserPlayer = getSelectedCharacter(loserTeam.id)?.name || loserTeam.name;
  els.roundOverlay.classList.remove("is-hidden", "is-game-over");
  els.roundOverlay.classList.add("is-round-over");
  els.roundOverlay.style.setProperty("--round-team-color", winnerTeam.color);
  els.roundKicker.textContent = "";
  els.roundPlayer.textContent = `${loserPlayer} אכל אותה`;
  els.roundCountdown.classList.add("round-result-details");
  els.roundCountdown.replaceChildren(createRoundResultTimer(), createRoundScoreLine());
}

function renderRoundOverFromState() {
  const latestResult = state.roundResults[state.roundResults.length - 1];
  if (!latestResult) return;

  renderRoundOverOverlay(getTeam(latestResult.loserTeamId), getTeam(latestResult.winnerTeamId));
}

function renderGameOverOverlay() {
  const winner = getWinnerTeam();
  hideOverlay();
  els.gameOverOverlay.innerHTML = "";
  els.gameOverOverlay.append(createGameOverCard(winner));
  els.gameOverOverlay.classList.remove("is-hidden");
}

function createGameOverCard(winner) {
  const card = document.createElement("div");
  card.className = "game-over-card";
  card.style.setProperty("--winner-color", winner?.color || "var(--game-accent)");

  const eyebrow = document.createElement("p");
  eyebrow.className = "game-over-eyebrow";
  eyebrow.textContent = winner ? "המנצחים:" : "תיקו";

  const title = document.createElement("h2");
  title.append(createTeamNameDisplay(winner, "winner-name"));
  title.style.setProperty("--winner-color", winner?.color || "var(--game-accent)");

  const results = createGameOverScoreboard();

  card.append(eyebrow, title, results, createGameOverResetButton());
  return card;
}

function createRoundScoreLine() {
  const line = document.createElement("span");
  line.className = "round-score-line";

  const chenTeam = createTeamNameDisplay(getTeam("chen"), "round-score-team round-score-team-chen");
  const brazimTeam = createTeamNameDisplay(getTeam("brazim"), "round-score-team round-score-team-brazim");

  const score = document.createElement("strong");
  score.className = "round-score-number";
  score.textContent = `${Math.floor(state.scores.chen)} : ${Math.floor(state.scores.brazim)}`;

  line.append(chenTeam, score, brazimTeam);
  return line;
}

function createRoundResultTimer() {
  const timer = document.createElement("span");
  timer.className = "round-result-timer";
  timer.setAttribute("aria-label", "הסיבוב הבא מתחיל עוד רגע");
  return timer;
}

function createGameOverScoreboard() {
  const board = document.createElement("div");
  board.className = "game-over-final-score";

  const chenTeam = createTeamNameDisplay(getTeam("chen"), "final-team final-team-chen");
  const brazimTeam = createTeamNameDisplay(getTeam("brazim"), "final-team final-team-brazim");

  const score = document.createElement("strong");
  score.className = "final-score-number";
  score.textContent = `${Math.floor(state.scores.brazim)} : ${Math.floor(state.scores.chen)}`;

  board.append(chenTeam, score, brazimTeam);
  return board;
}

function createTeamNameDisplay(team, className) {
  const wrapper = document.createElement("span");
  wrapper.className = className;

  if (!team) {
    wrapper.textContent = "אין מנצחים";
    wrapper.style.setProperty("--team-color", "var(--game-accent)");
    return wrapper;
  }

  wrapper.style.setProperty("--team-color", team.color);

  if (team.id === "chen") {
    const main = document.createElement("span");
    main.textContent = "החן יוספים";
    const sub = document.createElement("small");
    sub.className = "team-display-sub";
    sub.textContent = "ועוזריהם";
    wrapper.append(main, sub);
    return wrapper;
  }

  wrapper.textContent = team.shortName;
  return wrapper;
}

function createGameOverResetButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "game-over-reset-button";
  button.textContent = "איפוס תוצאה";
  button.addEventListener("click", openResetModal);
  return button;
}

function hideGameOverOverlay() {
  els.gameOverOverlay.classList.add("is-hidden");
  els.gameOverOverlay.innerHTML = "";
}

function scheduleNextRound() {
  clearTimers();
  roundAdvanceTimerId = window.setTimeout(startNextRound, ROUND_RESULT_DELAY_MS);
}

function startNextRound() {
  if (state.phase !== "roundOver") return;
  state.roundNumber += 1;
  state.phase = "prep";
  saveState();
  startCountdown();
}

function renderHud() {
  applyGameModeUI();
  updateDebugModeUI();
  els.chenLanePlayer.textContent = getSelectedCharacter("chen")?.name || "-";
  els.brazimLanePlayer.textContent = getSelectedCharacter("brazim")?.name || "-";
  els.chenScore.textContent = Math.floor(state.scores.chen);
  els.brazimScore.textContent = Math.floor(state.scores.brazim);
  syncLaneFighterUI();
}

function syncLaneFighterUI() {
  TEAMS.forEach((team) => {
    const fighterColumn = els.laneFighters[team.id];
    if (!fighterColumn) return;

    const character = getSelectedCharacter(team.id);
    const src = character ? FIGHTER_PREVIEW_ASSETS[character.id] : "";
    fighterColumn.classList.toggle("is-visible", Boolean(src));
    fighterColumn.dataset.characterId = character?.id || "";

    if (!src) {
      fighterColumn.replaceChildren();
      return;
    }

    const currentImage = fighterColumn.querySelector("img");
    const image = currentImage || document.createElement("img");
    image.alt = "";
    if (image.getAttribute("src") !== src) image.src = src;
    if (!currentImage) fighterColumn.append(image);
  });
}

function getActiveTeams() {
  return state.debugMode ? [getTeam(state.debugTeamId)] : TEAMS;
}

function getActiveLanes() {
  const activeTeamIds = new Set(getActiveTeams().map((team) => team.id));
  return [...lanes.values()].filter((laneState) => activeTeamIds.has(laneState.team.id));
}

function ensureDebugSelection() {
  if (!state.debugMode) return;
  if (state.selectedCharacters[state.debugTeamId]) return;

  state.selectedCharacters[state.debugTeamId] = CHARACTER_ROSTER[state.debugTeamId][0].id;
  syncCharacterSelectionUI();
}

function applyGameModeUI() {
  const isDebug = Boolean(state.debugMode);
  els.gameScreen.classList.toggle("is-debug-mode", isDebug);
  lanes.forEach((laneState) => {
    laneState.lane.classList.toggle(
      "is-debug-hidden",
      isDebug && laneState.team.id !== state.debugTeamId,
    );
  });
}

function updateDebugModeUI() {
  const isDebug = Boolean(state.debugMode);
  els.startScreen.classList.toggle("is-debug-mode", isDebug);
  els.debugModeBadge.classList.toggle("is-hidden", !isDebug);
}

function toggleDebugMode() {
  state.debugMode = !state.debugMode;
  ensureDebugSelection();
  syncCharacterSelectionUI();
  updateStartButtonState();
  updateDebugModeUI();
  applyGameModeUI();
  saveState();

  if (["prep", "playing", "roundOver"].includes(state.phase)) {
    state.phase = "prep";
    state.countdownEndsAt = 0;
    saveState();
    showGameScreen();
    if (state.debugMode) {
      beginRound();
    } else {
      startCountdown();
    }
  }
}

function markLaneAsLost(laneState) {
  laneState.dino.classList.add("is-lost");
}

function refreshLaneMetrics(laneState) {
  const trackWidth = laneState.track.clientWidth || FALLBACK_TRACK_WIDTH;
  const trackHeight = laneState.track.clientHeight || FALLBACK_TRACK_HEIGHT;
  const dinoWidth = laneState.dino.offsetWidth || FALLBACK_DINO_WIDTH;
  const dinoHeight = laneState.dino.offsetHeight || FALLBACK_DINO_HEIGHT;

  laneState.metrics = {
    trackWidth,
    trackHeight,
    dinoLeft: trackWidth * DINO_LEFT_RATIO,
    dinoWidth,
    dinoHeight,
    groundWidth: trackWidth * 3,
  };
}

function setElementX(element, x) {
  element.style.setProperty("--x-px", `${x}px`);
}

function setDinoSprite(laneState, src) {
  if (laneState.currentSprite === src) return;
  laneState.currentSprite = src;
  laneState.dino.src = src;
}

function getDinoSpriteSrc(filename) {
  return `assets/dinorun/${filename}?v=${DINO_SPRITE_VERSION}`;
}

function getDinoCollisionRect(laneState) {
  const { dinoLeft, dinoWidth, dinoHeight, trackHeight } = laneState.metrics;
  const left = dinoLeft + dinoWidth * 0.22 + DINO_COLLISION_INSET_X;
  const right = dinoLeft + dinoWidth * 0.82 - DINO_COLLISION_INSET_X;
  const bottom = trackHeight - laneState.jumpHeight - dinoHeight * 0.07 - DINO_COLLISION_INSET_BOTTOM;
  const top = trackHeight - laneState.jumpHeight - dinoHeight * 0.58 + DINO_COLLISION_INSET_TOP;

  return {
    left,
    right,
    top,
    bottom,
    width: right - left,
    height: bottom - top,
  };
}

function getObstacleCollisionRects(laneState, obstacle) {
  return obstacle.hitboxes.map((hitbox) => getObstacleCollisionRect(laneState, obstacle, hitbox));
}

function getObstacleCollisionRect(laneState, obstacle, hitbox) {
  return getCactusCollisionRect(laneState, obstacle, hitbox);
}

function getCactusCollisionRect(laneState, obstacle, hitbox) {
  const { trackHeight } = laneState.metrics;
  const left = obstacle.left + hitbox.left + hitbox.width * 0.14 + OBSTACLE_COLLISION_INSET_X;
  const right = obstacle.left + hitbox.left + hitbox.width * 0.86 - OBSTACLE_COLLISION_INSET_X;
  const bottom = trackHeight - hitbox.bottom - hitbox.height * 0.02 - OBSTACLE_COLLISION_INSET_BOTTOM;
  const top = trackHeight - hitbox.bottom - hitbox.height * 0.92 + OBSTACLE_COLLISION_INSET_TOP;

  return {
    left,
    right,
    top,
    bottom,
    width: right - left,
    height: bottom - top,
  };
}

function getWinnerTeam() {
  if (Math.floor(state.scores.chen) === Math.floor(state.scores.brazim)) return null;
  return state.scores.chen > state.scores.brazim ? getTeam("chen") : getTeam("brazim");
}

function getRoundStartingSpeed() {
  return BASE_SPEED_SCALE + (state.roundNumber - 1) * ROUND_SPEED_BONUS;
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function hideOverlay() {
  els.roundOverlay.classList.add("is-hidden");
  els.roundOverlay.classList.remove("is-round-over", "is-game-over");
}

function stopLoop() {
  if (animationId !== null) {
    window.cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function clearTimers() {
  clearChooseFighterPromptTimer();

  if (countdownTimerId !== null) {
    window.clearInterval(countdownTimerId);
    countdownTimerId = null;
  }

  if (roundAdvanceTimerId !== null) {
    window.clearTimeout(roundAdvanceTimerId);
    roundAdvanceTimerId = null;
  }

  if (paceNoticeTimerId !== null) {
    window.clearTimeout(paceNoticeTimerId);
    paceNoticeTimerId = null;
  }

  els.laneLevelStars.forEach((levelStars) => {
    levelStars.classList.remove("is-visible");
    levelStars.innerHTML = "";
  });
}

function openResetModal() {
  els.resetModal.classList.remove("is-hidden");
  els.resetError.textContent = "";
  window.setTimeout(() => els.confirmResetButton.focus(), 0);
}

function closeResetModal() {
  els.resetModal.classList.add("is-hidden");
  els.resetError.textContent = "";
}

function confirmReset() {
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, createInitialState());
  startIntroStarted = false;
  stopLoop();
  clearTimers();
  closeResetModal();
  window.location.replace(window.location.pathname);
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // The game still works if localStorage is unavailable.
  }
}

function restoreState() {
  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    if (!rawState) return;
    const parsed = JSON.parse(rawState);
    if (parsed?.version !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    Object.assign(state, createInitialState(), parsed);
    state.selectedCharacters = {
      chen: normalizeCharacterId(state.selectedCharacters?.chen),
      brazim: normalizeCharacterId(state.selectedCharacters?.brazim),
    };
    if (state.phase === "start") {
      state.selectedCharacters = { chen: "", brazim: "" };
      state.debugMode = false;
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    if (state.phase === "playing") {
      // Refreshing during live play restarts only the current round checkpoint.
      // Score and completed round results stay intact.
      state.phase = "prep";
      state.countdownEndsAt = 0;
    }
    if (!Number.isInteger(state.roundNumber) || state.roundNumber < 1) state.roundNumber = 1;
    if (state.roundNumber > TOTAL_ROUNDS) state.roundNumber = TOTAL_ROUNDS;
    if (!Number.isInteger(state.nextSignIndex) || state.nextSignIndex < 0) state.nextSignIndex = 0;
    if (!Array.isArray(state.roundResults)) state.roundResults = [];
    if (!state.countdownEndsAt) state.countdownEndsAt = 0;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function consumePortalFreshStartFlag() {
  try {
    const storageKey = `${PORTAL_FRESH_START_PREFIX}${window.location.pathname.replace(/\/+$/, "")}`;
    if (sessionStorage.getItem(storageKey) !== "1") return false;
    sessionStorage.removeItem(storageKey);
    return true;
  } catch {
    return false;
  }
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
