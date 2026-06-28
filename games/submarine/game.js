const STORAGE_KEY = "dor-bachelor-submarine-state-v1";
const PORTAL_FRESH_START_PREFIX = "the-braz-games:fresh-start:";
const STORAGE_VERSION = 1;
const APP_VERSION = "2026-06-28-submarine-dor-face-size-1";
const ASSET_VERSION = "2026-06-27-miki-no-ghost-1";
const SOUND_ASSET_VERSION = "2026-06-27-start-arcade-music-1";
const URL_PARAMS = new URLSearchParams(window.location.search);
const CLASSIC_VISUAL_MODE = (
  URL_PARAMS.get("classic") === "1" ||
  URL_PARAMS.get("arcade") === "0" ||
  URL_PARAMS.get("style") === "classic" ||
  window.location.pathname.replace(/\/+$/, "").endsWith("/classic")
);
const ARCADE_VISUAL_MODE = !CLASSIC_VISUAL_MODE;
const START_CHECKPOINT_PARAMS = ["subSelect", "subChen", "subBrazim", "subSolo"];
const HIT_LIMIT = 3;
const ROUND_RESULT_SCREEN_SECONDS = 5;
const NEXT_STAGE_SCREEN_SECONDS = 8;
const RULES_MODAL_MS = 16000;
const MAX_TOTAL_ELIMINATIONS = 5;
const HIT_INVULNERABLE_MS = 2200;
const HIT_FLASH_MS = 650;
const ELIMINATION_FREEZE_MS = 5000;
const PLAYER_RADIUS = 24;
const SUBMARINE_VISUAL_SCALE = 0.82;
const DOR_SELECTED_CREW_FACE_SCALE = 1.1;
const PLAYER_COLLISION_RADIUS = PLAYER_RADIUS * 0.82;
const PLAYER_COLLISION_POINTS = [
  { x: -58, y: 0, radiusScale: 0.95 },
  { x: -14, y: 0, radiusScale: 1 },
  { x: 34, y: -1, radiusScale: 0.92 },
];
const DEBUG_LOGS = URL_PARAMS.get("debugLogs") === "1";
const DIAGNOSTIC_INTERVAL_MS = 5000;
const TINT_CACHE_LIMIT = 240;
const PIXELATED_SPRITE_CACHE_LIMIT = 180;
const ARCADE_PIXEL_SUBMARINES = false;
const ARCADE_ENEMY_PIXEL_MAX_DIMENSION = 192;
const GLOBAL_ENEMY_CAP_MULTIPLIER = 0.81;
const GLOBAL_ENEMY_WAVE_MULTIPLIER = 0.81;
const GLOBAL_ENEMY_SPEED_MULTIPLIER = 0.81;
const GLOBAL_ENEMY_SPAWN_INTERVAL_MULTIPLIER = 1.21;
const GLOBAL_ENEMY_RAMP_MULTIPLIER = 0.9;
const GLOBAL_DRIFTER_CHANCE_BONUS = 0.07;
const SALTY_ANTISEMITES_STAGE_ROUND = 2;
const SALTY_ANTISEMITES_RADIUS_SCALE = 0.65;
const CHMIROZON_STAGE_ROUND = 5;
const CHMIROZON_SP_UNLOCK_SECONDS = 15;
const CHMIROZON_SP_MAX_ACTIVE = 2;
const CHMIROZON_SP_LIMIT_GROWTH_SECONDS = 24;
const CHMIROZON_SP_SPAWN_CHANCE = 0.15;
const CHMIROZON_SP_EARLY_EASE_REDUCTION = 0.05;
const RARE_ADOLF_JACKSON_LAST_HEART_DELAY_SECONDS = 10;
const RARE_ADOLF_JACKSON_PRE_ARRIVAL_SOUND_SECONDS = 1.6;
const RARE_ADOLF_JACKSON_VISIBLE_SECONDS = 6;
const RARE_ADOLF_JACKSON_FADE_SECONDS = 1.6;
const RARE_ADOLF_JACKSON_PRESENCE_VOLUME = 0.82;
const START_SCREEN_MUSIC_VOLUME = 0.24;
const START_SCREEN_MUSIC_CROSSFADE_SECONDS = 3;
const START_SCREEN_MUSIC_CROSSFADE_MS = 2800;
const STAGE_MUSIC_VOLUME = 0.75;
const STAGE_MUSIC_FADE_IN_MS = 2600;
const LATE_PRESSURE_START_SECONDS = 45;
const LATE_PRESSURE_STEP_SECONDS = 15;
const LATE_PRESSURE_WAVE_BONUS = 2;
const LATE_PRESSURE_CAP_BONUS = 5;
const LATE_PRESSURE_SPAWN_MIN = 0.28;
const EARLY_EASE_SECONDS = 15;
const EARLY_EASE_FADE_SECONDS = 4;
const EARLY_EASE_CAP_MULTIPLIER = 0.82;
const EARLY_EASE_SPAWN_INTERVAL_MULTIPLIER = 1.18;
const EARLY_EASE_WAVE_REDUCTION = 1;
const EARLY_EASE_SPEED_MULTIPLIER = 0.9;
const EARLY_EASE_DRIFTER_BONUS = 0.08;
const ASSET_MANIFEST = {
  startImage: "assets/images/backgrounds/dor_army.jpeg",
  background: null,
  characters: {
    chen: {
      meser: "assets/images/characters/messer_face_card.webp",
      magami: "assets/images/characters/magami_face_card.webp",
      omri: "assets/images/characters/omri_face_card.webp",
      plato: "assets/images/characters/plato_face_card.webp",
    },
    brazim: {
      pishuto: "assets/images/characters/pishuto_face_card.webp",
      miki: "assets/images/characters/miki_face_card.webp",
      dor: "assets/images/characters/dor_face_card.webp",
      gabo: "assets/images/characters/gabo_face_card.webp",
    },
  },
  fighters: {
    chen: {
      meser: "assets/images/characters/messer_fighter_preview.gif",
      magami: "assets/images/characters/magami_fighter_preview.gif",
      omri: "assets/images/characters/omri_fighter_preview.gif",
      plato: "assets/images/characters/plato_fighter_preview.gif",
    },
    brazim: {
      pishuto: "assets/images/characters/pishuto_fighter_preview.gif",
      miki: "assets/images/characters/miki_fighter_preview.gif",
      dor: "assets/images/characters/dor_fighter_preview.gif",
      gabo: "assets/images/characters/gabo_fighter_preview.gif",
    },
  },
  players: {
    face: "assets/images/players/dor_face.webp",
    brazim: {
      normal: null,
      damaged: null,
    },
    chen: {
      normal: null,
      damaged: null,
    },
  },
  enemies: {
    magami: {
      frames: [
        "assets/images/enemies/magami/magami1.png",
        "assets/images/enemies/magami/magami2.png",
      ],
      final: "assets/images/enemies/magami/magami_final.png",
      finalFrames: [
        "assets/images/enemies/magami/magami_final.png",
        "assets/images/enemies/magami/magami_final_open.png",
      ],
    },
    moshik: "assets/images/enemies/moshik_and_galit/moshik_b.webp",
    galit: "assets/images/enemies/moshik_and_galit/galit_b.webp",
    tucker: "assets/images/enemies/salty_antisemites/tucker.webp",
    candace: "assets/images/enemies/salty_antisemites/candace.webp",
    amazonPrime: "assets/images/enemies/chmirozon_prime/amazon.png",
    bezosReal: "assets/images/enemies/chmirozon_prime/bezos_real.webp",
    bezosSp: "assets/images/enemies/chmirozon_prime/bezos_southpark.webp",
    adolfJackson: "assets/images/enemies/rare_adolf_jackson/adolf_jackson.webp",
    exiledMaor: "assets/images/enemies/the_revenge_of_the_exiled/maor.webp",
    exiledLior: "assets/images/enemies/the_revenge_of_the_exiled/lior.webp",
    exiledMosko: "assets/images/enemies/the_revenge_of_the_exiled/mosko.webp",
    exiledTomer: "assets/images/enemies/the_revenge_of_the_exiled/tomer.webp",
  },
};
const SOUND_MANIFEST = {
  hit: "assets/sounds/submarine-hit-clash.wav",
  eliminated: "assets/sounds/submarine-eliminated.wav",
  roundStart: "assets/sounds/round-start.mp3",
  gameOver: "assets/sounds/game-over-fanfare.wav",
  adolfJacksonArrival: "assets/sounds/jackson-hee-hee.mp3",
  adolfJacksonPresence: "assets/sounds/jackson-presence.mp3",
  chooseFighter: "assets/sounds/choose-your-fighter.mp3",
  fighterRevealMeser: "assets/sounds/fighter-reveals/meser_reveal.mp3",
  fighterRevealMagami: "assets/sounds/fighter-reveals/magami_reveal.mp3",
  fighterRevealOmri: "assets/sounds/fighter-reveals/omri_reveal.mp3",
  fighterRevealPlato: "assets/sounds/fighter-reveals/plato_reveal.mp3",
  fighterRevealPishuto: "assets/sounds/fighter-reveals/pishuto_reveal.mp3",
  fighterRevealMiki: "assets/sounds/fighter-reveals/miki_reveal.mp3",
  fighterRevealDor: "assets/sounds/fighter-reveals/dor_reveal.mp3",
  fighterRevealGabo: "assets/sounds/fighter-reveals/gabo_reveal.mp3",
  stageMagamiMusic: "assets/sounds/stage-music/magami-song.mp3",
  stageSaltyAntisemitesMusic: "assets/sounds/stage-music/salty-antisemites-song.mp3",
  stageLaFamiliaMusic: "assets/sounds/stage-music/la-familia-song.mp3",
  stageExiledRevengeMusic: "assets/sounds/stage-music/exiled-revenge-song.mp3",
  stageChmirozonPrimeMusic: "assets/sounds/stage-music/chmirozon-prime-song.mp3",
};
const START_SCREEN_MUSIC_MANIFEST = [
  "assets/sounds/start-music/arcade-01.mp3",
  "assets/sounds/start-music/arcade-02.mp3",
  "assets/sounds/start-music/arcade-03.mp3",
  "assets/sounds/start-music/arcade-04.mp3",
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
const STAGE_MUSIC_CONFIG = {
  1: {
    soundKey: "stageMagamiMusic",
    startAt: 0,
    volume: STAGE_MUSIC_VOLUME,
  },
  2: {
    soundKey: "stageSaltyAntisemitesMusic",
    startAt: 0,
    volume: STAGE_MUSIC_VOLUME * 0.8,
  },
  3: {
    soundKey: "stageLaFamiliaMusic",
    startAt: 0,
    volume: STAGE_MUSIC_VOLUME,
  },
  4: {
    soundKey: "stageExiledRevengeMusic",
    startAt: 0,
    volume: STAGE_MUSIC_VOLUME,
  },
  5: {
    soundKey: "stageChmirozonPrimeMusic",
    startAt: 0,
    volume: STAGE_MUSIC_VOLUME,
  },
};

const ENEMY_FRAME_MS = 500;
const HEART_ICON_PATH = "M19.5 12.6 12 20 4.5 12.6A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6Z";
const HEART_PATH = new Path2D(HEART_ICON_PATH);
const pixelatedSpriteCache = new Map();
const ROUND_STAGE_TITLES = [
  { label: "שלב ראשון:", name: "המגמים" },
  { label: "שלב שני:", name: "אנטישמים מלוחים" },
  { label: "שלב שלישי:", name: "לה פאמיליה" },
  { label: "שלב רביעי:", name: "The Revenge Of The Exiled" },
  { label: "השלב הסופי", name: "חמירוזון פריים", isFinal: true },
];
const ROUND_ENEMY_TYPES = [
  ["magami"],
  ["tucker", "candace"],
  ["moshik", "galit"],
  ["exiledMaor", "exiledLior", "exiledMosko", "exiledTomer"],
  ["amazonPrime", "bezosReal", "bezosSp"],
];
const ENEMY_TYPE_VISUAL_SCALE = {
  magami: 1.13,
  moshik: 0.92,
  galit: 0.92,
  tucker: 0.86,
  candace: 0.86,
  amazonPrime: 1.38,
  bezosReal: 0.92,
  bezosSp: 0.82,
  adolfJackson: 0.82,
  exiledMaor: 0.9,
  exiledLior: 0.88,
  exiledMosko: 0.95,
  exiledTomer: 0.9,
};
const NON_MIRRORED_ENEMY_TYPES = new Set(["amazonPrime"]);
const NON_TINTED_ENEMY_TYPES = new Set(["amazonPrime"]);
const SOURCE_FACES_LEFT_ENEMY_TYPES = new Set(["tucker", "galit", "bezosSp", "exiledTomer"]);
const FINAL_SCREEN_ENEMY_ASSET_KEYS = [
  "magami",
  "tucker",
  "candace",
  "moshik",
  "galit",
  "bezosReal",
  "exiledMaor",
  "exiledLior",
  "exiledMosko",
  "exiledTomer",
];
const BACKGROUND_FISH = [
  { x: 0.1, y: 0.18, size: 22, speed: 0.18, color: "#d7f8ff", dir: 1, alpha: 0.14, bob: 9 },
  { x: 0.78, y: 0.24, size: 17, speed: 0.14, color: "#fff0b8", dir: -1, alpha: 0.1, bob: 7 },
  { x: 0.36, y: 0.5, size: 14, speed: 0.11, color: "#a9f5d0", dir: 1, alpha: 0.08, bob: 11 },
  { x: 0.63, y: 0.66, size: 19, speed: 0.16, color: "#ffd1e0", dir: -1, alpha: 0.09, bob: 8 },
  { x: 0.18, y: 0.76, size: 15, speed: 0.1, color: "#bfe7ff", dir: 1, alpha: 0.07, bob: 6 },
  { x: 0.88, y: 0.42, size: 13, speed: 0.15, color: "#e7fff6", dir: -1, alpha: 0.12, bob: 10 },
  { x: 0.44, y: 0.31, size: 10, speed: 0.2, color: "#8fd4ff", dir: 1, alpha: 0.055, bob: 5 },
  { x: 0.55, y: 0.84, size: 24, speed: 0.075, color: "#b8a7ff", dir: -1, alpha: 0.045, bob: 13 },
];
const BACKGROUND_DRIFTERS = [
  { x: 0.08, y: 0.72, size: 28, speed: 0.055, color: "#c59aff", dir: 1, alpha: 0.055 },
  { x: 0.72, y: 0.38, size: 19, speed: 0.042, color: "#7edcff", dir: -1, alpha: 0.04 },
];
const BACKGROUND_BUBBLES = [
  { x: 0.08, y: 0.86, size: 4, speed: 0.014 },
  { x: 0.16, y: 0.68, size: 6, speed: 0.011 },
  { x: 0.27, y: 0.92, size: 5, speed: 0.016 },
  { x: 0.52, y: 0.74, size: 7, speed: 0.012 },
  { x: 0.71, y: 0.88, size: 4, speed: 0.018 },
  { x: 0.82, y: 0.6, size: 6, speed: 0.013 },
  { x: 0.93, y: 0.81, size: 5, speed: 0.015 },
];
const SEAWEED_CLUSTERS = [
  { x: 0.06, height: 0.16, color: "#58c789", sway: 0.7 },
  { x: 0.14, height: 0.2, color: "#36a66f", sway: 1.1 },
  { x: 0.77, height: 0.18, color: "#5bd68d", sway: 0.9 },
  { x: 0.88, height: 0.23, color: "#2e9467", sway: 1.25 },
];
const CORAL_CLUSTERS = [
  { x: 0.24, color: "#ff8f8f", scale: 1.05 },
  { x: 0.68, color: "#d78bff", scale: 0.92 },
  { x: 0.95, color: "#ffbc66", scale: 1.12 },
];

const assetImages = {};
const tintedSpriteCache = new Map();
const ROUND_PROFILES = [
  {
    name: "מים רגועים",
    color: "#1d2b34",
    accent: "#e7f8ff",
    warmupSeconds: 5,
    maxEnemies: 5,
    maxEnemiesAbsolute: 60,
    spawnStart: 1.45,
    spawnMin: 0.5,
    spawnDecay: 0.007,
    hunterChance: 0.38,
    randomChance: 0.66,
    speedBonus: 4,
    waveEvery: 5,
    waveAdd: 4,
    capGrowth: 4,
  },
  {
    name: "לחץ קל",
    color: "#173d32",
    accent: "#73ffbd",
    warmupSeconds: 5,
    maxEnemies: 5,
    maxEnemiesAbsolute: 60,
    spawnStart: 1.45,
    spawnMin: 0.5,
    spawnDecay: 0.007,
    hunterChance: 0.38,
    randomChance: 0.66,
    speedBonus: 4,
    waveEvery: 5,
    waveAdd: 4,
    capGrowth: 4,
  },
  {
    name: "צוללים עמוק",
    color: "#342052",
    accent: "#d9b5ff",
    warmupSeconds: 5,
    maxEnemies: 5,
    maxEnemiesAbsolute: 60,
    spawnStart: 1.45,
    spawnMin: 0.5,
    spawnDecay: 0.007,
    hunterChance: 0.38,
    randomChance: 0.66,
    speedBonus: 4,
    waveEvery: 5,
    waveAdd: 4,
    capGrowth: 4,
  },
  {
    name: "בלגן תת ימי",
    color: "#4a250e",
    accent: "#ffb25f",
    warmupSeconds: 5,
    maxEnemies: 5,
    maxEnemiesAbsolute: 60,
    spawnStart: 1.45,
    spawnMin: 0.5,
    spawnDecay: 0.007,
    hunterChance: 0.38,
    randomChance: 0.66,
    speedBonus: 4,
    waveEvery: 5,
    waveAdd: 4,
    capGrowth: 4,
  },
  {
    name: "סכנת חתונה",
    color: "#4a111b",
    accent: "#ffd166",
    warmupSeconds: 5,
    maxEnemies: 5,
    maxEnemiesAbsolute: 60,
    spawnStart: 1.45,
    spawnMin: 0.5,
    spawnDecay: 0.007,
    hunterChance: 0.38,
    randomChance: 0.66,
    speedBonus: 4,
    waveEvery: 5,
    waveAdd: 4,
    capGrowth: 4,
  },
];
// Enemy face/asset changes by stage, but tier always owns gameplay danger:
// size, speed, and color tint stay green/yellow/purple/red for every enemy set.
const ENEMY_SIZE_TIERS = [
  {
    id: "small",
    assetType: "magami",
    label: "קטן",
    radiusMin: 28,
    radiusMax: 35,
    speedMin: 54,
    speedMax: 78,
    color: "#28d17c",
    accent: "#d7ffe8",
  },
  {
    id: "medium",
    assetType: "magami",
    label: "בינוני",
    radiusMin: 38,
    radiusMax: 47,
    speedMin: 74,
    speedMax: 102,
    color: "#f4d35e",
    accent: "#fff6bd",
  },
  {
    id: "large",
    assetType: "magami",
    label: "גדול",
    radiusMin: 51,
    radiusMax: 62,
    speedMin: 94,
    speedMax: 126,
    color: "#a855f7",
    accent: "#ead6ff",
  },
  {
    id: "giant",
    assetType: "magami",
    label: "ענק",
    radiusMin: 86,
    radiusMax: 106,
    speedMin: 118,
    speedMax: 154,
    color: "#f04444",
    accent: "#ffd0d0",
  },
];

const TEAMS = [
  {
    id: "chen",
    name: "החן יוספים, ועוזריהם",
    color: "#f04444",
    hudId: "teamTwoHud",
    hudFighterId: "teamTwoHudFighter",
    playerId: "teamTwoPlayer",
    controlsId: "teamTwoControls",
    hitsId: "teamTwoHits",
    startX: 0.28,
    startY: 0.5,
  },
  {
    id: "brazim",
    name: "הבראזים",
    color: "#2f80ff",
    hudId: "teamOneHud",
    hudFighterId: "teamOneHudFighter",
    playerId: "teamOnePlayer",
    controlsId: "teamOneControls",
    hitsId: "teamOneHits",
    startX: 0.72,
    startY: 0.5,
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
const CHARACTER_FACE_SOURCE_FACING = {
  chen: {
    meser: 1,
    magami: 0,
    omri: 1,
    plato: 0,
  },
  brazim: {
    pishuto: -1,
    miki: 1,
    dor: -1,
    gabo: -1,
  },
};
const LEGACY_GABO_ID = ["ge", "vo"].join("");

const CONTROL_SCHEMES = {
  wasd: {
    label: "WASD",
    keys: {
      up: ["KeyW"],
      down: ["KeyS"],
      left: ["KeyA"],
      right: ["KeyD"],
    },
  },
  arrows: {
    label: "↑ ↓ ← →",
    keys: {
      up: ["ArrowUp"],
      down: ["ArrowDown"],
      left: ["ArrowLeft"],
      right: ["ArrowRight"],
    },
  },
};

const els = {
  startScreen: document.querySelector("#startScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  startButton: document.querySelector("#startButton"),
  debugModeBadge: document.querySelector("#debugModeBadge"),
  startValidationMessage: document.querySelector("#startValidationMessage"),
  rulesOverlay: document.querySelector("#rulesOverlay"),
  canvas: document.querySelector("#gameCanvas"),
  countdownOverlay: document.querySelector("#countdownOverlay"),
  assignmentGrid: document.querySelector("#assignmentGrid"),
  assignmentTitle: document.querySelector("#assignmentTitle"),
  roundMessage: document.querySelector("#roundMessage"),
  countdownNumber: document.querySelector("#countdownNumber"),
  feedbackLayer: document.querySelector("#feedbackLayer"),
  gameOverOverlay: document.querySelector("#gameOverOverlay"),
  roundLabel: document.querySelector("#roundLabel"),
  roundTheme: document.querySelector("#roundTheme"),
  scoreLine: document.querySelector("#scoreLine"),
  eliminationsLine: document.querySelector("#eliminationsLine"),
  dangerLine: document.querySelector("#dangerLine"),
  timer: document.querySelector("#timer"),
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

const ctx = els.canvas.getContext("2d");
const pressedKeys = new Set();

let animationFrameId = null;
let lastFrameTime = 0;
let enemySpawnTimer = 0;
let nextEnemySpawn = 1.2;
let roundTimeoutId = null;
let rulesTimeoutId = null;
let rulesCompleteHandler = null;
let roundCountdownIntervalId = null;
let roundTimeoutState = null;
let stageCountdownState = null;
let lastPersistedElapsed = -1;
let canvasViewWidth = 0;
let canvasViewHeight = 0;
let canvasPixelRatio = 1;
let lastDiagnosticLogAt = 0;
let slowFrameCount = 0;
let totalRemovedEnemies = 0;
let totalSpawnedEnemies = 0;
let startIntroStarted = false;
let visibilityFrozen = false;
let visibilityFreezeStartedAt = 0;
let soundsPrimed = false;
let chooseFighterPromptTimerId = null;
let adolfJacksonPresenceAudio = null;
let activeFighterRevealAudio = null;
let activeStageMusicAudio = null;
let activeStageMusicRound = null;
let activeStageMusicFadeFrame = null;
let activeStartMusicAudio = null;
let nextStartMusicAudio = null;
let startMusicIndex = 0;
let startMusicWasStarted = false;
let startMusicCrossfadeInProgress = false;
let isReloadingAfterReset = false;
const startMusicFadeFrames = new Set();
const soundCache = new Map();
const fighterRevealTimers = new WeakMap();
const hudRenderCache = {
  score: "",
  timer: "",
  danger: "",
  players: new Map(),
};

const state = createInitialState();

els.startButton.addEventListener("click", handleStartButtonClick);
els.confirmResetButton.addEventListener("click", confirmPasswordReset);
els.cancelResetButton.addEventListener("click", closeResetModal);
els.startScreen.addEventListener("click", (event) => {
  const card = event.target.closest(".character-card");
  if (!card) return;
  selectCharacter(card.dataset.teamId, card.dataset.characterId);
});
window.addEventListener("keydown", handleKeyDown, { capture: true });
window.addEventListener("keyup", handleKeyUp);
window.addEventListener("resize", resizeCanvas);
window.addEventListener("beforeunload", saveState);
window.addEventListener("blur", () => pressedKeys.clear());
window.addEventListener("wheel", preventGameBrowserZoom, { passive: false, capture: true });
document.addEventListener("visibilitychange", handleVisibilityChange);
window.visualViewport?.addEventListener("resize", resizeCanvas);
window.visualViewport?.addEventListener("scroll", resizeCanvas);

if ("ResizeObserver" in window) {
  const canvasResizeObserver = new ResizeObserver(() => resizeCanvas());
  canvasResizeObserver.observe(els.canvas);
}

initialize();

async function initialize() {
  if (new URLSearchParams(window.location.search).get("init") === "1") {
    await resetRuntimeState();
    window.history.replaceState({}, "", window.location.pathname);
    preloadAssets();
    showStartScreen();
    freezeIfPageAlreadyHidden();
    return;
  }

  if (consumePortalFreshStartFlag()) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      debugWarn("portal-storage-reset-failed");
    }
  }

  preloadAssets();

  if (isFinalScreenVerifyMode()) {
    showFinalScreenVerificationMode();
    freezeIfPageAlreadyHidden();
    return;
  }

  const savedState = loadSavedState();
  const urlStartState = loadUrlStartState();
  if (urlStartState && (!savedState || savedState.phase === "start")) {
    restoreSavedState(urlStartState);
    freezeIfPageAlreadyHidden();
    return;
  }

  if (savedState) {
    restoreSavedState(savedState);
    freezeIfPageAlreadyHidden();
    return;
  }

  showStartScreen();
  freezeIfPageAlreadyHidden();
}

function isFinalScreenVerifyMode() {
  const verifyMode = new URLSearchParams(window.location.search).get("verify");
  return verifyMode === "solo-final-screen-load" || verifyMode === "final-jackson-dvd";
}

function showFinalScreenVerificationMode() {
  stopLoop();
  stopRareAdolfJacksonPresenceSound();
  stopStageMusic();
  stopStartScreenMusic();
  Object.assign(state, createInitialState(), {
    phase: "gameOver",
    debugSolo: true,
    scores: { chen: 2, brazim: 3 },
    selectedCharacters: {
      chen: "magami",
      brazim: "pishuto",
    },
    representatives: {
      chen: "מגמי",
      brazim: "פישוטו",
    },
  });

  state.assignments = getNextAssignments();
  state.players = createPlayers(state.assignments);
  state.enemies = [];
  state.effects = [];

  els.startScreen.classList.add("is-hidden");
  els.gameScreen.classList.remove("is-hidden");
  hideRulesOverlay();
  els.countdownOverlay.classList.add("is-hidden");
  els.feedbackLayer.innerHTML = "";
  els.gameOverOverlay.innerHTML = "";
  resizeCanvas();
  positionPlayers();
  resetHudRenderCache();
  renderHud();
  drawGame(performance.now());
  els.gameOverOverlay.append(createFinalJacksonsBackdrop(), createSoloGameOverCard());
  els.gameOverOverlay.classList.remove("is-hidden");
}

function preloadAssets() {
  registerImageAsset("startImage", ASSET_MANIFEST.startImage, applyStartImage);
  registerImageAsset("background", ASSET_MANIFEST.background);
  registerImageAsset("playerFace", ASSET_MANIFEST.players.face);

  Object.entries(ASSET_MANIFEST.characters).forEach(([teamId, characters]) => {
    Object.entries(characters).forEach(([characterId, src]) => {
      registerImageAsset(`character:${teamId}:${characterId}`, src);
    });
  });

  Object.entries(ASSET_MANIFEST.fighters).forEach(([teamId, characters]) => {
    Object.entries(characters).forEach(([characterId, src]) => {
      registerImageAsset(`fighter:${teamId}:${characterId}`, src);
    });
  });

  TEAMS.forEach((team) => {
    const playerAssets = ASSET_MANIFEST.players[team.id];
    registerImageAsset(`${team.id}:normal`, playerAssets.normal);
    registerImageAsset(`${team.id}:damaged`, playerAssets.damaged);
  });

  Object.entries(ASSET_MANIFEST.enemies).forEach(([enemyType, asset]) => {
    if (Array.isArray(asset.frames)) {
      asset.frames.forEach((frame, index) => {
        registerImageAsset(`enemy:${enemyType}:frame:${index}`, getEnemyFrameSrc(frame));
      });
      registerImageAsset(`enemy:${enemyType}:final`, asset.final);
      asset.finalFrames?.forEach((frame, index) => {
        registerImageAsset(`enemy:${enemyType}:finalFrame:${index}`, frame);
      });
      return;
    }

    registerImageAsset(`enemy:${enemyType}`, asset);
  });
}

function registerImageAsset(key, src, onLoad) {
  if (!src) return;

  const versionedSrc = getVersionedAssetSrc(src);
  const image = new Image();
  assetImages[key] = {
    image,
    loaded: false,
    src,
    versionedSrc,
  };

  image.onload = () => {
    assetImages[key].loaded = true;
    debugLog("asset-loaded", { key, src });
    if (onLoad) onLoad(versionedSrc);
  };

  image.onerror = () => {
    assetImages[key].loaded = false;
    debugWarn("asset-missing", { key, src });
  };

  image.src = versionedSrc;
}

function getVersionedAssetSrc(src) {
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}v=${encodeURIComponent(ASSET_VERSION)}`;
}

function getVersionedSoundSrc(src) {
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}v=${encodeURIComponent(SOUND_ASSET_VERSION)}`;
}

function primeSounds() {
  if (soundsPrimed) return;
  soundsPrimed = true;

  Object.entries(SOUND_MANIFEST).forEach(([key, path]) => {
    const audio = new Audio(getVersionedSoundSrc(path));
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
    // Browser audio may be blocked until a user gesture; gameplay continues silently.
  });
}

function playSoundSoon(key, volume = 0.7) {
  window.setTimeout(() => playSound(key, volume), 0);
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
    // Browser audio may be blocked until a user gesture; selection still works.
  });
}

function playRoundWinnerEliminationSound(eliminatedPlayer) {
  const winningPlayer = state.players.find((player) => player.id !== eliminatedPlayer.id && player.alive);
  if (!winningPlayer?.characterId) {
    playSound("eliminated", 0.88);
    return;
  }

  playFighterRevealSound(winningPlayer.characterId);
}

function playSoundTwice(key, volume = 0.9, delayMs = 620) {
  playSound(key, volume);
  window.setTimeout(() => playSound(key, volume), delayMs);
}

function getStageMusicConfig(roundNumber = state.roundNumber) {
  return STAGE_MUSIC_CONFIG[roundNumber] || null;
}

function startStageMusicForCurrentRound() {
  const config = getStageMusicConfig();
  if (!config) {
    stopStageMusic();
    return;
  }

  if (activeStageMusicAudio && activeStageMusicRound === state.roundNumber) {
    const targetVolume = Number(config.volume) || STAGE_MUSIC_VOLUME;
    activeStageMusicAudio.play().then(() => {
      if (activeStageMusicAudio && activeStageMusicAudio.volume < targetVolume * 0.85) {
        fadeStageMusicTo(targetVolume, STAGE_MUSIC_FADE_IN_MS);
      }
    }).catch(() => {
      // Browser audio may be blocked until a user gesture; gameplay continues silently.
    });
    return;
  }

  stopStageMusic();
  primeSounds();
  const source = soundCache.get(config.soundKey);
  if (!source) return;

  const audio = source.cloneNode(true);
  activeStageMusicAudio = audio;
  activeStageMusicRound = state.roundNumber;
  audio.loop = true;
  audio.volume = 0;

  try {
    audio.currentTime = Math.max(0, Number(config.startAt) || 0);
  } catch {
    // Some browsers refuse seeking before metadata is available. Starting at 0 is OK.
  }

  audio.play().then(() => {
    fadeStageMusicTo(Number(config.volume) || STAGE_MUSIC_VOLUME, STAGE_MUSIC_FADE_IN_MS);
  }).catch(() => {
    // Browser audio may be blocked until a user gesture; gameplay continues silently.
  });
}

function fadeStageMusicTo(targetVolume, durationMs) {
  if (!activeStageMusicAudio) return;
  if (activeStageMusicFadeFrame) {
    window.cancelAnimationFrame(activeStageMusicFadeFrame);
    activeStageMusicFadeFrame = null;
  }

  const audio = activeStageMusicAudio;
  const startVolume = audio.volume;
  const startedAt = performance.now();
  const safeDuration = Math.max(1, durationMs);

  const step = (now) => {
    if (audio !== activeStageMusicAudio) return;
    const progress = Math.min(1, (now - startedAt) / safeDuration);
    audio.volume = clamp(startVolume + (targetVolume - startVolume) * progress, 0, 1);
    if (progress < 1) {
      activeStageMusicFadeFrame = window.requestAnimationFrame(step);
      return;
    }

    activeStageMusicFadeFrame = null;
  };

  activeStageMusicFadeFrame = window.requestAnimationFrame(step);
}

function pauseStageMusic() {
  if (!activeStageMusicAudio) return;
  activeStageMusicAudio.pause();
}

function stopStageMusic() {
  if (activeStageMusicFadeFrame) {
    window.cancelAnimationFrame(activeStageMusicFadeFrame);
    activeStageMusicFadeFrame = null;
  }

  if (!activeStageMusicAudio) {
    activeStageMusicRound = null;
    return;
  }

  const audio = activeStageMusicAudio;
  activeStageMusicAudio = null;
  activeStageMusicRound = null;
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch {
    // Some browsers can refuse seeking while media is not fully ready.
  }
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
  if (!START_SCREEN_MUSIC_MANIFEST.length || state.phase !== "start" && state.phase !== "rules") return;
  startMusicWasStarted = true;

  if (!activeStartMusicAudio) {
    activeStartMusicAudio = createStartMusicAudio(startMusicIndex);
  }

  activeStartMusicAudio.play().then(() => {
    fadeStartMusicAudio(activeStartMusicAudio, START_SCREEN_MUSIC_VOLUME, 900);
  }).catch(() => {
    // Browser audio may be blocked until a user gesture; the screen continues silently.
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
  if (!START_SCREEN_MUSIC_MANIFEST.length || nextStartMusicAudio || state.phase !== "start" && state.phase !== "rules") return;

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
    audio.volume = clamp(startVolume + (targetVolume - startVolume) * progress, 0, 1);

    if (progress < 1) {
      frameRef.id = window.requestAnimationFrame(step);
      return;
    }

    startMusicFadeFrames.delete(frameRef);
    onComplete?.();
  };

  frameRef.id = window.requestAnimationFrame(step);
}

function pauseStartScreenMusic() {
  activeStartMusicAudio?.pause();
  nextStartMusicAudio?.pause();
}

function resumeStartScreenMusic() {
  if (!startMusicWasStarted || state.phase !== "start" && state.phase !== "rules") return;
  activeStartMusicAudio?.play().catch(() => {
    // Browser audio may be blocked until the next user gesture.
  });
  nextStartMusicAudio?.play().catch(() => {
    // Browser audio may be blocked until the next user gesture.
  });
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
    // Some browsers can refuse seeking while media is not fully ready.
  }
}

function startRareAdolfJacksonPresenceSound() {
  if (adolfJacksonPresenceAudio) {
    adolfJacksonPresenceAudio.play().catch(() => {
      // Browser audio may be blocked until a user gesture; gameplay continues silently.
    });
    return;
  }

  primeSounds();
  const source = soundCache.get("adolfJacksonPresence");
  if (!source) return;

  const audio = source.cloneNode(true);
  audio.loop = true;
  audio.volume = RARE_ADOLF_JACKSON_PRESENCE_VOLUME;
  adolfJacksonPresenceAudio = audio;
  audio.play().catch(() => {
    // Browser audio may be blocked until a user gesture; gameplay continues silently.
  });
}

function pauseRareAdolfJacksonPresenceSound() {
  if (!adolfJacksonPresenceAudio) return;
  adolfJacksonPresenceAudio.pause();
}

function stopRareAdolfJacksonPresenceSound() {
  if (!adolfJacksonPresenceAudio) return;

  const audio = adolfJacksonPresenceAudio;
  adolfJacksonPresenceAudio = null;
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch {
    // Some browsers can refuse seeking while media is not fully ready.
  }
}

function hasActiveRareAdolfJacksonPresence() {
  return (
    state.phase === "playing" &&
    state.enemies.some((enemy) => (
      enemy.isRareAdolfJackson &&
      enemy.expiresAt &&
      state.elapsed < enemy.expiresAt
    ))
  );
}

function syncRareAdolfJacksonPresenceSound() {
  if (visibilityFrozen) return;
  if (hasActiveRareAdolfJacksonPresence()) {
    startRareAdolfJacksonPresenceSound();
    return;
  }
  stopRareAdolfJacksonPresenceSound();
}

function applyStartImage(src) {
  const hero = document.querySelector(".start-image-placeholder");
  if (!hero) return;

  hero.classList.add("has-start-image");
  hero.style.backgroundImage = `linear-gradient(90deg, rgba(3, 10, 14, 0.12), rgba(3, 10, 14, 0.26)), url("${src}")`;
}

function createInitialState() {
  return {
    storageVersion: STORAGE_VERSION,
    appVersion: APP_VERSION,
    phase: "start",
    startedAt: 0,
    elapsed: 0,
    roundNumber: 1,
    totalEliminations: 0,
    scores: {
      chen: 0,
      brazim: 0,
    },
    debugSolo: false,
    matchElapsedTotal: 0,
    representatives: {
      chen: "",
      brazim: "",
    },
    selectedCharacters: {
      chen: "",
      brazim: "",
    },
    players: [],
    enemies: [],
    effects: [],
    assignments: {},
    pressureWaveCount: 0,
    rareAdolfJacksonCycleCount: 0,
    rareAdolfJacksonActiveCycle: false,
    rareAdolfJacksonLastHeartAt: null,
    rareAdolfJacksonNextSpawnAt: null,
    rareAdolfJacksonWarningForSpawnAt: null,
    roundResult: null,
    gameOverResult: null,
  };
}

function showStartScreen() {
  stopLoop();
  clearRoundTimeout();
  stopRareAdolfJacksonPresenceSound();
  stopStageMusic();
  stopStartScreenMusic();
  clearChooseFighterPromptTimer();
  closeResetModal();
  clearStartUrlCheckpoint();
  startIntroStarted = false;
  Object.assign(state, createInitialState());
  updateDebugModeBadge();
  clearStartValidation();
  els.startScreen.classList.remove("is-hidden");
  els.startScreen.classList.remove("is-intro-open");
  els.gameScreen.classList.add("is-hidden");
  hideRulesOverlay();
  els.countdownOverlay.classList.add("is-hidden");
  els.gameOverOverlay.classList.add("is-hidden");
  els.gameOverOverlay.innerHTML = "";
  els.feedbackLayer.innerHTML = "";
  resetHudRenderCache();
  els.startButton.disabled = false;
  els.startButton.textContent = "התחל";
  syncCharacterSelectionUI();
  updateStartButtonState();
}

function handleStartButtonClick() {
  primeSounds();
  startStartScreenMusic();
  if (!startIntroStarted) {
    startIntroStarted = true;
    els.startScreen.classList.add("is-intro-open");
    els.startButton.disabled = true;
    saveState();
    window.setTimeout(() => {
      els.startButton.textContent = "התחל משחק";
    }, 450);
    scheduleChooseFighterPrompt();
    window.setTimeout(updateStartButtonState, 4850);
    return;
  }

  startRulesFlow();
}

function isStartIntroOpen() {
  return startIntroStarted || els.startScreen.classList.contains("is-intro-open");
}

function syncStartIntroStateFromScreen() {
  if (!startIntroStarted && els.startScreen.classList.contains("is-intro-open")) {
    startIntroStarted = true;
  }
}

function startRulesFlow() {
  if (!validateStartRepresentatives()) return;

  startStartScreenMusic();
  state.representatives = getRepresentativesFromSelection();
  state.roundNumber = 1;
  state.totalEliminations = 0;
  state.scores = { chen: 0, brazim: 0 };
  state.matchElapsedTotal = 0;
  state.gameOverResult = null;
  state.phase = "rules";
  saveState();
  showRulesOverlay(() => {
    if (state.phase !== "rules") return;
    startCountdownFlow();
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
    hideRulesOverlay();
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
  els.rulesOverlay.classList.add("is-hidden");
  els.rulesOverlay.classList.remove("is-running");
  onComplete();
}

function startCountdownFlow() {
  stopStartScreenMusic();
  beginRoundCountdown(null);
}

function beginRoundCountdown(roundResult = null) {
  clearRoundTimeout();
  stopRareAdolfJacksonPresenceSound();
  stopStartScreenMusic();
  if (!roundResult) {
    stopStageMusic();
  }
  const assignments = getNextAssignments();
  state.assignments = assignments;
  state.players = createPlayers(assignments);
  state.enemies = [];
  state.effects = [];
  state.phase = "countdown";
  state.elapsed = 0;
  state.rareAdolfJacksonCycleCount = 0;
  state.rareAdolfJacksonActiveCycle = false;
  state.rareAdolfJacksonLastHeartAt = null;
  state.rareAdolfJacksonNextSpawnAt = null;
  state.rareAdolfJacksonWarningForSpawnAt = null;
  state.roundResult = roundResult;
  lastPersistedElapsed = -1;
  resetHudRenderCache();

  els.startScreen.classList.add("is-hidden");
  hideRulesOverlay();
  els.gameScreen.classList.remove("is-hidden");
  els.countdownOverlay.classList.remove("is-hidden");
  els.gameOverOverlay.classList.add("is-hidden");
  els.gameOverOverlay.innerHTML = "";
  clearStartUrlCheckpoint();
  resizeCanvas();
  renderHud();
  saveState();

  if (roundResult) {
    renderRoundSummaryOverlay(roundResult);
    runRoundSummaryThenStageCountdown();
    return;
  }

  renderAssignmentOverlay();
  runStageScreenCountdown();
}

function getNextAssignments() {
  return {
    chen: "wasd",
    brazim: "arrows",
  };
}

function createPlayers(assignments) {
  const activeTeams = state.debugSolo ? TEAMS.filter((team) => team.id === "chen") : TEAMS;

  return activeTeams.map((team) => ({
    ...team,
    characterId: getSelectedCharacterId(team.id),
    representative: getRepresentative(team.id) || state.representatives[team.id] || "",
    controlScheme: assignments[team.id],
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    facing: team.id === "chen" ? 1 : -1,
    radius: PLAYER_RADIUS,
    speed: 282,
    hits: 0,
    alive: true,
    invulnerableUntil: 0,
    damageFlashUntil: 0,
    lastHitAt: 0,
    eliminatedAt: null,
  }));
}

function getRepresentative(teamId) {
  return getSelectedCharacter(teamId)?.name || state.representatives[teamId] || "";
}

function getRepresentativesFromSelection() {
  return Object.fromEntries(TEAMS.map((team) => [team.id, getRepresentative(team.id)]));
}

function getSelectedCharacterId(teamId) {
  return normalizeCharacterId(state.selectedCharacters?.[teamId]);
}

function getSelectedCharacter(teamId) {
  const characterId = getSelectedCharacterId(teamId);
  return CHARACTER_ROSTER[teamId]?.find((character) => character.id === characterId) || null;
}

function getCharacterById(teamId, characterId) {
  characterId = normalizeCharacterId(characterId);
  return CHARACTER_ROSTER[teamId]?.find((character) => character.id === characterId) || null;
}

function getCharacterIdByName(teamId, name) {
  return CHARACTER_ROSTER[teamId]?.find((character) => character.name === name)?.id || "";
}

function normalizeCharacterId(characterId) {
  return characterId === LEGACY_GABO_ID ? "gabo" : characterId || "";
}

function selectCharacter(teamId, characterId) {
  const character = getCharacterById(teamId, characterId);
  syncStartIntroStateFromScreen();
  if (!character || state.phase !== "start" || !isStartIntroOpen()) return;

  state.selectedCharacters = {
    ...state.selectedCharacters,
    [teamId]: character.id,
  };
  state.representatives = {
    ...state.representatives,
    [teamId]: character.name,
  };

  clearStartValidation(getTeamConfigById(teamId));
  syncCharacterSelectionUI(teamId, character.id);
  playFighterRevealSound(character.id);
  updateStartButtonState();
  saveState();
}

function syncCharacterSelectionUI(animateTeamId = null, animateCharacterId = null) {
  document.querySelectorAll(".character-card").forEach((card) => {
    const teamId = card.dataset.teamId;
    const characterId = card.dataset.characterId;
    card.classList.toggle("is-selected", getSelectedCharacterId(teamId) === characterId);
  });

  const canShowFighterPreviews = isStartIntroOpen() && state.phase === "start";
  setFighterPreviewVisible(
    els.messerFighterPreview,
    canShowFighterPreviews && getSelectedCharacterId("chen") === "meser",
    animateTeamId === "chen" && animateCharacterId === "meser",
  );
  setFighterPreviewVisible(
    els.magamiFighterPreview,
    canShowFighterPreviews && getSelectedCharacterId("chen") === "magami",
    animateTeamId === "chen" && animateCharacterId === "magami",
  );
  setFighterPreviewVisible(
    els.platoFighterPreview,
    canShowFighterPreviews && getSelectedCharacterId("chen") === "plato",
    animateTeamId === "chen" && animateCharacterId === "plato",
  );
  setFighterPreviewVisible(
    els.omriFighterPreview,
    canShowFighterPreviews && getSelectedCharacterId("chen") === "omri",
    animateTeamId === "chen" && animateCharacterId === "omri",
  );
  setFighterPreviewVisible(
    els.pishutoFighterPreview,
    canShowFighterPreviews && getSelectedCharacterId("brazim") === "pishuto",
    animateTeamId === "brazim" && animateCharacterId === "pishuto",
  );
  setFighterPreviewVisible(
    els.mikiFighterPreview,
    canShowFighterPreviews && getSelectedCharacterId("brazim") === "miki",
    animateTeamId === "brazim" && animateCharacterId === "miki",
  );
  setFighterPreviewVisible(
    els.dorFighterPreview,
    canShowFighterPreviews && getSelectedCharacterId("brazim") === "dor",
    animateTeamId === "brazim" && animateCharacterId === "dor",
  );
  setFighterPreviewVisible(
    els.gaboFighterPreview,
    canShowFighterPreviews && getSelectedCharacterId("brazim") === "gabo",
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
  fighterRevealTimers.set(element, window.setTimeout(() => {
    element.classList.remove("is-appearing");
    fighterRevealTimers.delete(element);
  }, 1500));
}

function clearFighterRevealTimer(element) {
  const timerId = fighterRevealTimers.get(element);
  if (!timerId) return;

  window.clearTimeout(timerId);
  fighterRevealTimers.delete(element);
}

function syncCharacterFocusFromState() {
  TEAMS.forEach((team) => {
    const selectedCharacter = getSelectedCharacter(team.id);
    if (selectedCharacter) {
      state.representatives[team.id] = selectedCharacter.name;
      return;
    }

    const restoredCharacterId = getCharacterIdByName(team.id, state.representatives[team.id] || "");
    if (restoredCharacterId) {
      state.selectedCharacters[team.id] = restoredCharacterId;
      return;
    }

    state.selectedCharacters[team.id] = "";
    state.representatives[team.id] = "";
  });
}

function updateStartButtonState() {
  if (state.phase !== "start") return;
  syncStartIntroStateFromScreen();
  if (!isStartIntroOpen()) {
    els.startButton.disabled = false;
    return;
  }
  const requiredTeams = getRequiredRepresentativeTeams();
  els.startButton.disabled = requiredTeams.some((team) => !getSelectedCharacterId(team.id));
}

function getTeamConfigById(teamId) {
  return TEAMS.find((team) => team.id === teamId);
}

function getRequiredRepresentativeTeams() {
  return state.debugSolo ? TEAMS.filter((team) => team.id === "chen") : TEAMS;
}

function validateStartRepresentatives() {
  const requiredTeams = getRequiredRepresentativeTeams();
  const missingTeams = requiredTeams.filter((team) => !getSelectedCharacterId(team.id));

  TEAMS.forEach((team) => {
    const missing = missingTeams.includes(team);
    const setup = document.querySelector(`#${team.id === "brazim" ? "teamOneSetup" : "teamTwoSetup"}`);
    setup.classList.toggle("is-invalid", missing);
    setup.setAttribute("aria-invalid", String(missing));
  });

  if (!missingTeams.length) {
    els.startValidationMessage.textContent = "";
    return true;
  }

  els.startValidationMessage.textContent = "בחרו שחקנים";
  return false;
}

function clearStartValidation(team = null) {
  const teamsToClear = team ? [team] : TEAMS;

  teamsToClear.forEach((entry) => {
    const setup = document.querySelector(`#${entry.id === "brazim" ? "teamOneSetup" : "teamTwoSetup"}`);
    setup.classList.remove("is-invalid");
    setup.setAttribute("aria-invalid", "false");
  });

  if (!TEAMS.some((entry) => document.querySelector(`#${entry.id === "brazim" ? "teamOneSetup" : "teamTwoSetup"}`).classList.contains("is-invalid"))) {
    els.startValidationMessage.textContent = "";
  }
}

function renderAssignmentOverlay() {
  els.assignmentGrid.innerHTML = "";
  els.assignmentGrid.classList.remove("is-solo");
  const card = document.querySelector(".assignment-card");
  card?.classList.remove("is-summary-screen", "is-final-stage");
  card?.classList.add("is-stage-screen");
  renderAssignmentStageTitle();
  renderCountdownFaces();
  renderRoundMessage(null);
  els.roundTheme.classList.remove("is-debug-visible");
  els.roundTheme.textContent = "";
}

function renderCountdownFaces() {
  const activeTeams = getRequiredRepresentativeTeams();
  const faceStrip = document.createElement("div");
  faceStrip.className = "countdown-face-strip";
  faceStrip.classList.toggle("is-solo", activeTeams.length === 1);

  const teamsByVisualSide = state.debugSolo
    ? activeTeams
    : [TEAMS.find((team) => team.id === "chen"), TEAMS.find((team) => team.id === "brazim")].filter(Boolean);

  teamsByVisualSide.forEach((team) => {
    const selectedCharacter = getSelectedCharacter(team.id);
    const src = getSelectedCharacterAssetSrc(team.id, selectedCharacter?.id, "characters");
    if (!selectedCharacter || !src) return;

    const frame = document.createElement("span");
    frame.className = `countdown-face-frame ${team.id === "chen" ? "team-two" : "team-one"}`;
    frame.style.setProperty("--team-color", team.color);

    const image = document.createElement("img");
    image.src = getVersionedAssetSrc(src);
    image.alt = selectedCharacter.name;

    frame.append(image);
    faceStrip.append(frame);
  });

  if (faceStrip.children.length > 0) {
    els.assignmentGrid.append(faceStrip);
  }
}

function renderRoundSummaryOverlay(roundResult) {
  els.assignmentGrid.innerHTML = "";
  els.assignmentGrid.classList.remove("is-solo");
  const card = document.querySelector(".assignment-card");
  card?.classList.remove("is-stage-screen", "is-final-stage");
  card?.classList.add("is-summary-screen");
  els.assignmentTitle.textContent = "";
  renderRoundMessage(roundResult);
  els.roundTheme.classList.remove("is-debug-visible");
  els.roundTheme.textContent = "";
  els.countdownNumber.textContent = "";
}

function renderAssignmentStageTitle() {
  const stage = getRoundStageTitle();
  document.querySelector(".assignment-card")?.classList.toggle("is-final-stage", Boolean(stage.isFinal));

  const label = document.createElement("span");
  label.className = "assignment-stage-label";
  label.textContent = stage.label;

  const name = document.createElement("strong");
  name.className = "assignment-stage-name";
  name.textContent = stage.name;
  name.dataset.text = stage.name;

  els.assignmentTitle.replaceChildren(label, name);
}

function getRoundStageTitle() {
  return ROUND_STAGE_TITLES[state.roundNumber - 1] || {
    label: `שלב ${state.roundNumber}:`,
    name: "TODO",
  };
}

function renderRoundMessage(roundResult) {
  els.roundMessage.innerHTML = "";
  els.roundMessage.classList.toggle("is-empty", !roundResult);

  if (!roundResult) {
    els.roundMessage.removeAttribute("style");
    document.querySelector(".assignment-card")?.removeAttribute("style");
    return;
  }

  const card = document.querySelector(".assignment-card");
  const winner = getPlayerById(roundResult.scoringId);
  const eliminated = roundResult.eliminatedLabel;

  if (card && winner) {
    card.style.setProperty("--round-winner-color", winner.color);
  }

  const eliminatedLine = document.createElement("span");
  eliminatedLine.className = "round-message-line is-loser-only";
  eliminatedLine.textContent = `${eliminated} אכל אותה`;

  const durationLine = document.createElement("b");
  durationLine.className = "round-duration-line";
  durationLine.textContent = `זמן הישרדות - ${formatSurvivalDuration(roundResult.durationSeconds || 0)}`;
  eliminatedLine.append(durationLine);
  els.roundMessage.append(eliminatedLine);
}

function runStageScreenCountdown() {
  startStageMusicForCurrentRound();
  stageCountdownState = {
    current: NEXT_STAGE_SCREEN_SECONDS,
    remainingMs: 1000,
    startedAt: performance.now(),
  };
  els.countdownNumber.textContent = `מתחילים בעוד ${stageCountdownState.current}`;
  scheduleStageCountdownTick(1000);
}

function runRoundSummaryThenStageCountdown() {
  els.countdownNumber.textContent = "";
  scheduleRoundTimeout(() => {
    renderAssignmentOverlay();
    saveState();
    runStageScreenCountdown();
  }, ROUND_RESULT_SCREEN_SECONDS * 1000);
}

function startGame() {
  const profile = getRoundProfile();
  state.phase = "playing";
  stopRareAdolfJacksonPresenceSound();
  startStageMusicForCurrentRound();
  playSound("roundStart", 0.86);
  state.startedAt = performance.now();
  state.elapsed = 0;
  state.pressureWaveCount = 0;
  state.rareAdolfJacksonCycleCount = 0;
  state.rareAdolfJacksonActiveCycle = false;
  state.rareAdolfJacksonLastHeartAt = null;
  state.rareAdolfJacksonNextSpawnAt = null;
  state.rareAdolfJacksonWarningForSpawnAt = null;
  enemySpawnTimer = 0;
  nextEnemySpawn = getCurrentSpawnInterval(profile, 0);
  els.countdownOverlay.classList.add("is-hidden");
  resizeCanvas();
  positionPlayers();
  resetHudRenderCache();
  renderHud();
  lastFrameTime = performance.now();
  lastDiagnosticLogAt = lastFrameTime;
  slowFrameCount = 0;
  debugLog("round-start", {
    round: state.roundNumber,
    players: state.players.map((player) => player.id),
    profile: getRoundProfileDiagnostics(profile),
    canvas: getCanvasDiagnostics(),
  });
  saveState();
  animationFrameId = window.requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
  const rect = els.canvas.getBoundingClientRect();
  const fallbackWidth = window.innerWidth || document.documentElement.clientWidth || 0;
  const fallbackHeight = (window.innerHeight || document.documentElement.clientHeight || 0) - Math.max(0, rect.top);
  const cssWidth = Math.max(1, Math.round(rect.width || fallbackWidth || 1));
  const cssHeight = Math.max(1, Math.round(rect.height || fallbackHeight || 1));
  const scale = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
  const pixelWidth = Math.max(1, Math.round(cssWidth * scale));
  const pixelHeight = Math.max(1, Math.round(cssHeight * scale));

  canvasViewWidth = cssWidth;
  canvasViewHeight = cssHeight;
  canvasPixelRatio = scale;

  if (els.canvas.width !== pixelWidth) {
    els.canvas.width = pixelWidth;
  }

  if (els.canvas.height !== pixelHeight) {
    els.canvas.height = pixelHeight;
  }

  ctx.resetTransform?.();
  ctx.setTransform(scale, 0, 0, scale, 0, 0);

  if (state.players.length) {
    state.players.forEach((player) => {
      if (!player.x || !player.y) return;
      player.x = clamp(player.x, player.radius, canvasViewWidth - player.radius);
      player.y = clamp(player.y, player.radius, canvasViewHeight - player.radius);
    });
  }
}

function positionPlayers() {
  const rect = getCanvasRect();
  state.players.forEach((player) => {
    player.x = rect.width * player.startX;
    player.y = rect.height * player.startY;
  });

  TEAMS.forEach(updateHudCharacterFighter);
}

function updateHudCharacterFighter(team) {
  const fighterNode = document.querySelector(`#${team.hudFighterId}`);
  if (!fighterNode) return;

  const selectedCharacter = getSelectedCharacter(team.id);
  const src = getSelectedCharacterAssetSrc(team.id, selectedCharacter?.id, "fighters");

  if (!selectedCharacter || !src) {
    fighterNode.classList.add("is-hidden");
    fighterNode.removeAttribute("src");
    fighterNode.alt = "";
    return;
  }

  const versionedSrc = getVersionedAssetSrc(src);
  const revealLoadedFighter = () => {
    if (fighterNode.getAttribute("src") !== versionedSrc) return;
    if (!fighterNode.complete || fighterNode.naturalWidth <= 0) return;
    fighterNode.alt = selectedCharacter.name;
    fighterNode.classList.remove("is-hidden");
  };

  fighterNode.onload = revealLoadedFighter;
  fighterNode.onerror = () => {
    fighterNode.classList.add("is-hidden");
    fighterNode.removeAttribute("src");
    fighterNode.alt = "";
  };

  if (fighterNode.getAttribute("src") !== versionedSrc) {
    fighterNode.classList.add("is-hidden");
    fighterNode.src = versionedSrc;
  } else {
    revealLoadedFighter();
  }
}

function getSelectedCharacterAssetSrc(teamId, characterId, assetGroup) {
  const normalizedCharacterId = normalizeCharacterId(characterId);
  return ASSET_MANIFEST[assetGroup]?.[teamId]?.[normalizedCharacterId] || "";
}

function ensureCanvasReady() {
  const rect = els.canvas.getBoundingClientRect();
  const fallbackWidth = window.innerWidth || document.documentElement.clientWidth || 0;
  const fallbackHeight = (window.innerHeight || document.documentElement.clientHeight || 0) - Math.max(0, rect.top);
  const width = Math.max(1, Math.round(rect.width || fallbackWidth || 1));
  const height = Math.max(1, Math.round(rect.height || fallbackHeight || 1));
  const scale = Math.max(1, Math.min(3, window.devicePixelRatio || 1));

  if (
    width !== canvasViewWidth ||
    height !== canvasViewHeight ||
    scale !== canvasPixelRatio ||
    els.canvas.width !== Math.round(width * scale) ||
    els.canvas.height !== Math.round(height * scale)
  ) {
    resizeCanvas();
    return;
  }

  ctx.resetTransform?.();
  ctx.setTransform(canvasPixelRatio, 0, 0, canvasPixelRatio, 0, 0);
}

function getCanvasRect() {
  return {
    width: canvasViewWidth || Math.max(1, els.canvas.clientWidth || els.canvas.getBoundingClientRect().width || window.innerWidth),
    height: canvasViewHeight || Math.max(1, els.canvas.clientHeight || els.canvas.getBoundingClientRect().height || window.innerHeight),
  };
}

function gameLoop(now) {
  if (visibilityFrozen) {
    animationFrameId = null;
    return;
  }

  const rawDelta = (now - lastFrameTime) / 1000;
  const delta = Math.min(0.033, rawDelta);
  lastFrameTime = now;
  if (rawDelta > 0.08) {
    slowFrameCount += 1;
    if (slowFrameCount <= 5 || slowFrameCount % 20 === 0) {
      debugWarn("slow-frame", {
        rawDeltaMs: Math.round(rawDelta * 1000),
        enemies: state.enemies.length,
        tintCache: tintedSpriteCache.size,
        canvas: getCanvasDiagnostics(),
      });
    }
  }

  if (state.phase === "playing") {
    updateGame(delta, now);
  } else if (state.phase === "eliminating") {
    renderHud();
  }

  drawGame(now);

  if (state.phase === "playing" || state.phase === "eliminating") {
    animationFrameId = window.requestAnimationFrame(gameLoop);
  }
}

function updateGame(delta, now) {
  state.elapsed = (now - state.startedAt) / 1000;
  updatePlayers(delta);
  updateEnemies(delta);
  spawnEnemies(delta);
  spawnPressureWave();
  updateRareAdolfJacksonEvent();
  state.effects = state.effects.filter((effect) => now - effect.createdAt < effect.duration);
  resolveCollisions(now);
  syncRareAdolfJacksonPresenceSound();
  renderHud();
  logRuntimeDiagnostics(now);
  persistPlayingProgress();
}

function updatePlayers(delta) {
  const rect = getCanvasRect();

  state.players.forEach((player) => {
    if (!player.alive) return;

    const input = getMovementVector(player.controlScheme);
    if (input.x < 0) {
      player.facing = -1;
    } else if (input.x > 0) {
      player.facing = 1;
    }
    player.vx = input.x * player.speed;
    player.vy = input.y * player.speed;
    player.x = clamp(player.x + player.vx * delta, player.radius, rect.width - player.radius);
    player.y = clamp(player.y + player.vy * delta, player.radius, rect.height - player.radius);
  });
}

function getMovementVector(controlScheme) {
  const scheme = CONTROL_SCHEMES[controlScheme];
  let x = 0;
  let y = 0;

  if (scheme.keys.left.some((key) => pressedKeys.has(key))) x -= 1;
  if (scheme.keys.right.some((key) => pressedKeys.has(key))) x += 1;
  if (scheme.keys.up.some((key) => pressedKeys.has(key))) y -= 1;
  if (scheme.keys.down.some((key) => pressedKeys.has(key))) y += 1;

  if (x !== 0 && y !== 0) {
    x *= Math.SQRT1_2;
    y *= Math.SQRT1_2;
  }

  return { x, y };
}

function spawnEnemies(delta) {
  const profile = getRoundProfile();
  if (state.enemies.length >= getCurrentEnemyCap()) return;

  enemySpawnTimer += delta;

  if (enemySpawnTimer < nextEnemySpawn) return;

  enemySpawnTimer = 0;
  const pressureElapsed = getPressureElapsed(profile);
  nextEnemySpawn = getCurrentSpawnInterval(profile, pressureElapsed);
  addEnemy(createEnemy(), "timer");
}

function spawnPressureWave() {
  const profile = getRoundProfile();
  const pressureElapsed = state.elapsed - (profile.warmupSeconds || 0);
  if (pressureElapsed < 0) return;

  const nextWaveCount = Math.floor(pressureElapsed / profile.waveEvery) + 1;
  if (nextWaveCount <= state.pressureWaveCount) return;

  state.pressureWaveCount = nextWaveCount;
  const openSlots = Math.max(0, getCurrentEnemyCap() - state.enemies.length);
  const waveSize = Math.min(openSlots, getCurrentWaveSize(profile));

  for (let index = 0; index < waveSize; index += 1) {
    addEnemy(createEnemy({ forceRandom: index % 4 !== 3 }), "wave");
  }
  debugLog("pressure-wave", {
    round: state.roundNumber,
    wave: state.pressureWaveCount,
    latePressureLevel: getLatePressureLevel(profile),
    added: waveSize,
    enemies: summarizeEnemies(),
    cap: getCurrentEnemyCap(),
  });
}

function updateRareAdolfJacksonEvent() {
  if (!ASSET_MANIFEST.enemies.adolfJackson) return;
  if (!Number.isFinite(state.rareAdolfJacksonLastHeartAt)) return;

  const activeRareEnemies = state.enemies.filter((enemy) => enemy.isRareAdolfJackson);
  if (state.rareAdolfJacksonActiveCycle && activeRareEnemies.length === 0) {
    state.rareAdolfJacksonActiveCycle = false;
    state.rareAdolfJacksonNextSpawnAt = null;
    state.rareAdolfJacksonWarningForSpawnAt = null;
    debugLog("rare-adolf-jackson-complete", {
      round: state.roundNumber,
      elapsed: Math.round(state.elapsed),
      cycle: state.rareAdolfJacksonCycleCount,
    });
  }

  if (activeRareEnemies.length > 0) return;
  if (state.rareAdolfJacksonCycleCount > 0) return;

  if (!Number.isFinite(state.rareAdolfJacksonNextSpawnAt)) {
    state.rareAdolfJacksonNextSpawnAt = state.rareAdolfJacksonLastHeartAt + RARE_ADOLF_JACKSON_LAST_HEART_DELAY_SECONDS;
  }

  const nextSpawnAt = state.rareAdolfJacksonNextSpawnAt;
  const warningAt = nextSpawnAt - RARE_ADOLF_JACKSON_PRE_ARRIVAL_SOUND_SECONDS;
  if (state.rareAdolfJacksonWarningForSpawnAt !== nextSpawnAt && state.elapsed >= warningAt) {
    if (state.elapsed >= nextSpawnAt) {
      state.rareAdolfJacksonNextSpawnAt = state.elapsed + RARE_ADOLF_JACKSON_PRE_ARRIVAL_SOUND_SECONDS;
      state.rareAdolfJacksonWarningForSpawnAt = state.rareAdolfJacksonNextSpawnAt;
    } else {
      state.rareAdolfJacksonWarningForSpawnAt = nextSpawnAt;
    }
    playSoundTwice("adolfJacksonArrival", 1, 700);
    debugLog("rare-adolf-jackson-warning", {
      round: state.roundNumber,
      elapsed: Math.round(state.elapsed),
      spawnAt: Math.round(state.rareAdolfJacksonNextSpawnAt),
    });
    return;
  }

  if (state.elapsed < state.rareAdolfJacksonNextSpawnAt) return;

  const targets = state.players.filter((player) => player.alive);
  if (!targets.length) return;

  state.rareAdolfJacksonCycleCount += 1;
  state.rareAdolfJacksonActiveCycle = true;
  state.rareAdolfJacksonNextSpawnAt = null;
  state.rareAdolfJacksonWarningForSpawnAt = null;
  targets.slice(0, 2).forEach((target, index) => {
    addEnemy(createRareAdolfJacksonEnemy(target, index), "rare-adolf-jackson");
  });
  debugLog("rare-adolf-jackson", {
    round: state.roundNumber,
    cycle: state.rareAdolfJacksonCycleCount,
    elapsed: Math.round(state.elapsed),
    lastHeartAt: Math.round(state.rareAdolfJacksonLastHeartAt),
    targets: targets.slice(0, 2).map((target) => target.id),
  });
}

function createRareAdolfJacksonEnemy(target, index = 0) {
  const rect = getCanvasRect();
  const tier = getEnemyTierById("giant");
  const radius = randomBetween(tier.radiusMin * 0.9, tier.radiusMax * 0.98);
  const side = chooseRareEnemySpawnSide(target, index);
  const { x, y } = getSpawnPointForSide(side, radius, rect);
  const angle = Math.atan2(target.y - y, target.x - x);
  const baseSpeed = randomBetween(tier.speedMin, tier.speedMax) + getRoundProfile().speedBonus + 20 + Math.min(34, state.elapsed * 0.58);
  const speed = getEasedEnemySpeed(baseSpeed);

  return {
    x,
    y,
    radius,
    typeId: "adolfJackson",
    sizeTierId: "giant",
    behavior: "hunter",
    color: tier.color,
    accent: tier.accent,
    speed,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    facing: Math.cos(angle) >= 0 ? 1 : -1,
    wobble: Math.random() * Math.PI * 2,
    animationOffset: Math.random() * ENEMY_FRAME_MS,
    targetId: target.id,
    expiresAt: state.elapsed + RARE_ADOLF_JACKSON_VISIBLE_SECONDS,
    fadeDuration: RARE_ADOLF_JACKSON_FADE_SECONDS,
    isRareAdolfJackson: true,
  };
}

function chooseRareEnemySpawnSide(target, index = 0) {
  const rect = getCanvasRect();
  const horizontalSide = target.x < rect.width / 2 ? 1 : 0;
  const verticalSide = target.y < rect.height / 2 ? 3 : 2;
  return index % 2 === 0 ? horizontalSide : verticalSide;
}

function getSpawnPointForSide(side, radius, rect = getCanvasRect()) {
  if (side === 0) {
    return { x: -radius, y: randomBetween(radius, rect.height - radius) };
  }
  if (side === 1) {
    return { x: rect.width + radius, y: randomBetween(radius, rect.height - radius) };
  }
  if (side === 2) {
    return { x: randomBetween(radius, rect.width - radius), y: -radius };
  }
  return { x: randomBetween(radius, rect.width - radius), y: rect.height + radius };
}

function getCurrentEnemyCap() {
  const profile = getRoundProfile();
  const latePressureLevel = getLatePressureLevel(profile);
  const lateCapGrowth = profile.lateCapGrowth || LATE_PRESSURE_CAP_BONUS;
  const baseCap = Math.min(
    profile.maxEnemiesAbsolute,
    profile.maxEnemies + (state.pressureWaveCount * profile.capGrowth + latePressureLevel * lateCapGrowth) * GLOBAL_ENEMY_RAMP_MULTIPLIER,
  );
  const easierCap = baseCap * GLOBAL_ENEMY_CAP_MULTIPLIER;
  const easedCap = Math.floor(easierCap * getEarlyEaseValue(1, EARLY_EASE_CAP_MULTIPLIER));
  return Math.max(3, easedCap);
}

function getPressureElapsed(profile = getRoundProfile()) {
  return Math.max(0, state.elapsed - (profile.warmupSeconds || 0));
}

function getLatePressureLevel(profile = getRoundProfile()) {
  const pressureElapsed = getPressureElapsed(profile);
  const start = profile.latePressureStart || LATE_PRESSURE_START_SECONDS;
  if (pressureElapsed < start) return 0;

  const step = profile.latePressureStep || LATE_PRESSURE_STEP_SECONDS;
  return 1 + Math.floor((pressureElapsed - start) / step);
}

function getCurrentWaveSize(profile = getRoundProfile()) {
  const latePressureLevel = getLatePressureLevel(profile);
  const lateWaveBonus = profile.lateWaveBonus || LATE_PRESSURE_WAVE_BONUS;
  const maxLateWaveBonus = profile.maxLateWaveBonus || 12;
  const baseWaveSize = (profile.waveAdd + Math.min(maxLateWaveBonus, latePressureLevel * lateWaveBonus) * GLOBAL_ENEMY_RAMP_MULTIPLIER) * GLOBAL_ENEMY_WAVE_MULTIPLIER;
  return Math.max(2, Math.round(baseWaveSize - EARLY_EASE_WAVE_REDUCTION * getEarlyEaseStrength()));
}

function getCurrentSpawnInterval(profile = getRoundProfile(), pressureElapsed = getPressureElapsed(profile)) {
  const latePressureLevel = getLatePressureLevel(profile);
  const minSpawn = latePressureLevel > 0 ? (profile.spawnMinLate || LATE_PRESSURE_SPAWN_MIN) : profile.spawnMin;
  const lateSpawnBoost = latePressureLevel * (profile.lateSpawnBoost || 0.025) * GLOBAL_ENEMY_RAMP_MULTIPLIER;
  const baseInterval = Math.max(minSpawn, profile.spawnStart - pressureElapsed * profile.spawnDecay * GLOBAL_ENEMY_RAMP_MULTIPLIER - lateSpawnBoost);
  return baseInterval * GLOBAL_ENEMY_SPAWN_INTERVAL_MULTIPLIER * getEarlyEaseValue(1, EARLY_EASE_SPAWN_INTERVAL_MULTIPLIER);
}

function getEarlyEaseStrength(elapsed = state.elapsed) {
  if (elapsed <= EARLY_EASE_SECONDS) return 1;
  if (elapsed >= EARLY_EASE_SECONDS + EARLY_EASE_FADE_SECONDS) return 0;
  return 1 - ((elapsed - EARLY_EASE_SECONDS) / EARLY_EASE_FADE_SECONDS);
}

function getEarlyEaseValue(normalValue, easedValue) {
  const easeStrength = getEarlyEaseStrength();
  return normalValue + (easedValue - normalValue) * easeStrength;
}

function getEasedRandomChance(profile = getRoundProfile()) {
  return Math.min(0.9, profile.randomChance + GLOBAL_DRIFTER_CHANCE_BONUS + EARLY_EASE_DRIFTER_BONUS * getEarlyEaseStrength());
}

function getEasedEnemySpeed(baseSpeed) {
  return baseSpeed * GLOBAL_ENEMY_SPEED_MULTIPLIER * getEarlyEaseValue(1, EARLY_EASE_SPEED_MULTIPLIER);
}

function getDebugPressureIntroText(profile = getRoundProfile()) {
  return `דיבאג רעים: מתחיל ${profile.maxEnemies} | כל ${profile.waveEvery} שניות +${profile.waveAdd} | נחילים מאוחרים +${LATE_PRESSURE_WAVE_BONUS} | מקס ${profile.maxEnemiesAbsolute}`;
}

function getDebugPressureLiveText() {
  const profile = getRoundProfile();
  return `דיבאג רעים: גל ${state.pressureWaveCount} | +${getCurrentWaveSize(profile)} כל ${profile.waveEvery} שניות | לחץ ${getLatePressureLevel(profile)} | ${state.enemies.length}/${getCurrentEnemyCap()}`;
}

function createEnemy(options = {}) {
  const rect = getCanvasRect();
  const profile = getRoundProfile();
  const side = Math.floor(Math.random() * 4);
  const spawnSpec = chooseEnemySpawnSpec(options);
  const tier = spawnSpec.tier;
  const radius = randomBetween(tier.radiusMin, tier.radiusMax) * getEnemyRadiusScaleForCurrentStage();
  let x = 0;
  let y = 0;

  if (side === 0) {
    x = -radius;
    y = randomBetween(radius, rect.height - radius);
  } else if (side === 1) {
    x = rect.width + radius;
    y = randomBetween(radius, rect.height - radius);
  } else if (side === 2) {
    x = randomBetween(radius, rect.width - radius);
    y = -radius;
  } else {
    x = randomBetween(radius, rect.width - radius);
    y = rect.height + radius;
  }

  const behavior = spawnSpec.behavior || (options.forceRandom || Math.random() < getEasedRandomChance(profile) ? "drifter" : "hunter");
  const angle = getEnemyStartAngle(side, behavior);
  const baseSpeed = randomBetween(tier.speedMin, tier.speedMax) + profile.speedBonus + (spawnSpec.speedBonus || 0) + Math.min(34, state.elapsed * 0.58);
  const speed = getEasedEnemySpeed(baseSpeed);

  const enemy = {
    x,
    y,
    radius,
    typeId: spawnSpec.typeId,
    sizeTierId: tier.id,
    behavior,
    color: tier.color,
    accent: tier.accent,
    speed,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    facing: Math.cos(angle) >= 0 ? 1 : -1,
    wobble: Math.random() * Math.PI * 2,
    animationOffset: Math.random() * ENEMY_FRAME_MS,
    targetId: null,
  };

  enemy.targetId = behavior === "hunter" ? getBalancedHunterTarget(enemy)?.id || null : null;
  return enemy;
}

function chooseEnemySpawnSpec(options = {}) {
  if (state.roundNumber === CHMIROZON_STAGE_ROUND) {
    return chooseChmirozonEnemySpec(options);
  }

  const tier = chooseEnemySizeTier();
  return {
    tier,
    typeId: chooseEnemyType(tier),
  };
}

function getEnemyRadiusScaleForCurrentStage() {
  if (state.roundNumber === SALTY_ANTISEMITES_STAGE_ROUND) {
    return SALTY_ANTISEMITES_RADIUS_SCALE;
  }

  return 1;
}

function chooseChmirozonEnemySpec(options = {}) {
  const elapsed = Math.max(0, state.elapsed);
  const earlyEaseStrength = getEarlyEaseStrength(elapsed);
  const spUnlocked = elapsed >= CHMIROZON_SP_UNLOCK_SECONDS;
  const spCount = state.enemies.filter((enemy) => enemy.typeId === "bezosSp").length;
  const spLimit = spUnlocked
    ? Math.min(
        CHMIROZON_SP_MAX_ACTIVE,
        1 + Math.floor((elapsed - CHMIROZON_SP_UNLOCK_SECONDS) / CHMIROZON_SP_LIMIT_GROWTH_SECONDS),
      )
    : 0;
  const canSpawnSp = spUnlocked && spCount < spLimit && !options.forceRandom;
  const roll = Math.random();
  const spChance = CHMIROZON_SP_SPAWN_CHANCE - CHMIROZON_SP_EARLY_EASE_REDUCTION * earlyEaseStrength;
  const amazonChance = 0.68 + 0.08 * earlyEaseStrength;

  if (canSpawnSp && roll < spChance) {
    return {
      tier: getEnemyTierById("giant"),
      typeId: "bezosSp",
      behavior: "hunter",
      speedBonus: 22,
    };
  }

  if (roll < amazonChance) {
    return {
      tier: getEnemyTierById("small"),
      typeId: "amazonPrime",
      behavior: "drifter",
    };
  }

  return {
    tier: getEnemyTierById(roll < 0.84 ? "medium" : "large"),
    typeId: "bezosReal",
  };
}

function chooseEnemyType(tier) {
  // Stage-specific enemy types change the face only; the tier keeps size/color/speed consistent.
  const roundEnemyTypes = ROUND_ENEMY_TYPES[state.roundNumber - 1] || [tier.assetType || "magami"];
  const availableTypes = roundEnemyTypes.filter((typeId) => ASSET_MANIFEST.enemies[typeId]);
  const enemyTypes = availableTypes.length ? availableTypes : [tier.assetType || "magami"];
  return enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
}

function addEnemy(enemy, reason) {
  state.enemies.push(enemy);
  totalSpawnedEnemies += 1;
  if (totalSpawnedEnemies <= 12 || totalSpawnedEnemies % 20 === 0 || enemy.sizeTierId === "giant") {
    debugLog("enemy-spawn", {
      reason,
      totalSpawned: totalSpawnedEnemies,
      behavior: enemy.behavior,
      type: enemy.typeId,
      tier: enemy.sizeTierId,
      speed: Math.round(enemy.speed),
      position: roundPoint(enemy),
      enemies: state.enemies.length,
      cap: getCurrentEnemyCap(),
    });
  }
}

function chooseEnemySizeTier() {
  const pressureElapsed = Math.max(0, state.elapsed - (getRoundProfile().warmupSeconds || 0));
  const giantCount = state.enemies.filter((enemy) => enemy.sizeTierId === "giant").length;
  const giantLimit = getGiantLimit();

  if (pressureElapsed < 5) {
    return ENEMY_SIZE_TIERS[0];
  }

  if (pressureElapsed < 10) {
    return weightedEnemyTier([
      ["small", 0.75],
      ["medium", 0.25],
    ]);
  }

  if (pressureElapsed < 15) {
    return weightedEnemyTier([
      ["small", 0.58],
      ["medium", 0.32],
      ["large", 0.1],
    ]);
  }

  if (giantCount >= giantLimit) {
    return weightedEnemyTier([
      ["small", 0.5],
      ["medium", 0.32],
      ["large", 0.18],
    ]);
  }

  if (getEarlyEaseStrength() > 0) {
    return weightedEnemyTier([
      ["small", 0.55],
      ["medium", 0.32],
      ["large", 0.11],
      ["giant", 0.02],
    ]);
  }

  return weightedEnemyTier([
    ["small", 0.45],
    ["medium", 0.3],
    ["large", 0.18],
    ["giant", 0.07],
  ]);
}

function getGiantLimit() {
  const pressureElapsed = Math.max(0, state.elapsed - (getRoundProfile().warmupSeconds || 0));
  if (pressureElapsed < 15) return 0;
  return Math.min(3, 1 + Math.floor((pressureElapsed - 15) / 22));
}

function weightedEnemyTier(entries) {
  const roll = Math.random();
  let cumulative = 0;

  for (const [tierId, weight] of entries) {
    cumulative += weight;
    if (roll <= cumulative) {
      return getEnemyTierById(tierId);
    }
  }

  return getEnemyTierById(entries[entries.length - 1][0]);
}

function getEnemyTierById(tierId) {
  return ENEMY_SIZE_TIERS.find((tier) => tier.id === tierId) || ENEMY_SIZE_TIERS[0];
}

function getEnemyStartAngle(side, behavior) {
  if (behavior !== "drifter") return 0;

  const baseAngles = [
    0,
    Math.PI,
    Math.PI / 2,
    -Math.PI / 2,
  ];
  return baseAngles[side] + randomBetween(-0.7, 0.7);
}

function getRoundProfile() {
  return ROUND_PROFILES[(state.roundNumber - 1) % ROUND_PROFILES.length];
}

function updateEnemies(delta) {
  const rect = getCanvasRect();

  state.enemies.forEach((enemy) => {
    if (enemy.behavior === "drifter") {
      enemy.wobble += delta * 3.2;
      enemy.x += enemy.vx * delta;
      enemy.y += enemy.vy * delta;
      enemy.y += Math.sin(enemy.wobble) * 14 * delta;
      if (Math.abs(enemy.vx) > 0.1) {
        enemy.facing = enemy.vx >= 0 ? 1 : -1;
      }
      return;
    }

    let target = getPlayerById(enemy.targetId);
    if (!target || !target.alive) {
      target = getBalancedHunterTarget(enemy);
      enemy.targetId = target?.id || null;
    }
    if (!target) return;

    const angle = Math.atan2(target.y - enemy.y, target.x - enemy.x);
    enemy.facing = Math.cos(angle) >= 0 ? 1 : -1;
    enemy.wobble += delta * 4.2;
    enemy.x += Math.cos(angle) * enemy.speed * delta;
    enemy.y += Math.sin(angle) * enemy.speed * delta;
    enemy.y += Math.sin(enemy.wobble) * 18 * delta;
  });

  const beforeCleanup = state.enemies.length;
  state.enemies = state.enemies.filter((enemy) => {
    if (isEnemyExpired(enemy)) return false;
    const safeMargin = Math.max(180, enemy.radius * 3.4);
    return (
      enemy.x > -safeMargin &&
      enemy.x < rect.width + safeMargin &&
      enemy.y > -safeMargin &&
      enemy.y < rect.height + safeMargin
    );
  });

  const removed = beforeCleanup - state.enemies.length;
  if (removed > 0) {
    totalRemovedEnemies += removed;
    debugLog("enemy-cleanup", {
      removed,
      totalRemovedEnemies,
      remaining: state.enemies.length,
      canvas: getCanvasDiagnostics(),
    });
  }

  rebalanceGiantHunterTargets();
}

function getBalancedHunterTarget(enemy = null) {
  if (enemy?.sizeTierId === "giant") {
    return getLeastTargetedLivingPlayer((candidate) => (
      candidate !== enemy &&
      candidate.behavior === "hunter" &&
      candidate.sizeTierId === "giant"
    ));
  }

  return getLeastTargetedLivingPlayer((candidate) => (
    candidate !== enemy &&
    candidate.behavior === "hunter"
  ));
}

function getLeastTargetedLivingPlayer(enemyFilter = () => true) {
  const livingPlayers = state.players.filter((player) => player.alive);
  if (!livingPlayers.length) return null;

  const targetCounts = new Map(livingPlayers.map((player) => [player.id, 0]));
  state.enemies.forEach((enemy) => {
    if (enemyFilter(enemy) && targetCounts.has(enemy.targetId)) {
      targetCounts.set(enemy.targetId, targetCounts.get(enemy.targetId) + 1);
    }
  });

  const lowestCount = Math.min(...targetCounts.values());
  const candidates = livingPlayers.filter((player) => targetCounts.get(player.id) === lowestCount);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function rebalanceGiantHunterTargets() {
  const livingPlayers = state.players.filter((player) => player.alive);
  if (livingPlayers.length < 2) return;

  const giantHunters = state.enemies.filter((enemy) => (
    enemy.behavior === "hunter" &&
    enemy.sizeTierId === "giant" &&
    !enemy.isRareAdolfJackson &&
    livingPlayers.some((player) => player.id === enemy.targetId)
  ));
  if (giantHunters.length < 2) return;

  const targetCounts = new Map(livingPlayers.map((player) => [player.id, 0]));
  giantHunters.forEach((enemy) => {
    targetCounts.set(enemy.targetId, (targetCounts.get(enemy.targetId) || 0) + 1);
  });

  let highestPlayer = livingPlayers.reduce((highest, player) => (
    targetCounts.get(player.id) > targetCounts.get(highest.id) ? player : highest
  ), livingPlayers[0]);
  let lowestPlayer = livingPlayers.reduce((lowest, player) => (
    targetCounts.get(player.id) < targetCounts.get(lowest.id) ? player : lowest
  ), livingPlayers[0]);

  while (targetCounts.get(highestPlayer.id) - targetCounts.get(lowestPlayer.id) > 1) {
    const enemyToMove = giantHunters.find((enemy) => enemy.targetId === highestPlayer.id);
    if (!enemyToMove) break;

    enemyToMove.targetId = lowestPlayer.id;
    targetCounts.set(highestPlayer.id, targetCounts.get(highestPlayer.id) - 1);
    targetCounts.set(lowestPlayer.id, targetCounts.get(lowestPlayer.id) + 1);

    highestPlayer = livingPlayers.reduce((highest, player) => (
      targetCounts.get(player.id) > targetCounts.get(highest.id) ? player : highest
    ), livingPlayers[0]);
    lowestPlayer = livingPlayers.reduce((lowest, player) => (
      targetCounts.get(player.id) < targetCounts.get(lowest.id) ? player : lowest
    ), livingPlayers[0]);
  }
}

function getPlayerById(playerId) {
  return state.players.find((player) => player.id === playerId);
}

function resolveCollisions(now) {
  state.players.forEach((player) => {
    if (state.phase !== "playing") return;
    if (!player.alive || now < player.invulnerableUntil) return;

    const hitEnemy = state.enemies.find((enemy) => (
      isEnemyCollidable(enemy) &&
      doesEnemyHitPlayer(enemy, player)
    ));
    if (!hitEnemy) return;

    player.hits += 1;
    player.lastHitAt = now;
    player.damageFlashUntil = now + HIT_FLASH_MS;
    player.invulnerableUntil = now + HIT_INVULNERABLE_MS;
    state.enemies = state.enemies.filter((enemy) => enemy !== hitEnemy);
    totalRemovedEnemies += 1;
    debugLog("player-hit", {
      player: player.id,
      hits: player.hits,
      enemy: {
        behavior: hitEnemy.behavior,
        tier: hitEnemy.sizeTierId,
        radius: Math.round(hitEnemy.radius),
      },
      enemiesRemaining: state.enemies.length,
    });
    state.effects.push({
      type: "hit",
      x: player.x,
      y: player.y,
      color: player.color,
      createdAt: now,
      duration: 900,
    });
    showLostHeartEffect(player);

    if (player.hits === HIT_LIMIT - 1 && !Number.isFinite(state.rareAdolfJacksonLastHeartAt)) {
      state.rareAdolfJacksonLastHeartAt = state.elapsed;
      state.rareAdolfJacksonNextSpawnAt = state.elapsed + RARE_ADOLF_JACKSON_LAST_HEART_DELAY_SECONDS;
      state.rareAdolfJacksonWarningForSpawnAt = null;
      debugLog("rare-adolf-jackson-armed", {
        round: state.roundNumber,
        elapsed: Math.round(state.elapsed),
        player: player.id,
        firstSpawnAt: Math.round(state.rareAdolfJacksonNextSpawnAt),
        delaySeconds: RARE_ADOLF_JACKSON_LAST_HEART_DELAY_SECONDS,
      });
    }

    if (player.hits >= HIT_LIMIT) {
      startEliminationSequence(player, now);
      return;
    }

    playSoundSoon("hit", 0.72);
  });
}

function doesEnemyHitPlayer(enemy, player) {
  return getPlayerCollisionPoints(player).some((point) => (
    getDistance(enemy, point) < enemy.radius + point.radius
  ));
}

function getPlayerCollisionPoints(player) {
  const facing = player.facing || (player.id === "chen" ? 1 : -1);
  return PLAYER_COLLISION_POINTS.map((point) => ({
    x: player.x + point.x * SUBMARINE_VISUAL_SCALE * facing,
    y: player.y + point.y * SUBMARINE_VISUAL_SCALE,
    radius: PLAYER_COLLISION_RADIUS * point.radiusScale,
  }));
}

function isEnemyCollidable(enemy) {
  return !(enemy.isRareAdolfJackson && enemy.expiresAt && state.elapsed >= enemy.expiresAt);
}

function startEliminationSequence(player, now) {
  state.phase = "eliminating";
  playRoundWinnerEliminationSound(player);
  player.alive = false;
  player.eliminatedAt = state.elapsed;
  player.damageFlashUntil = now + ELIMINATION_FREEZE_MS;
  player.invulnerableUntil = 0;
  state.effects.push({
    type: "elimination",
    playerId: player.id,
    x: player.x,
    y: player.y,
    color: player.color,
    createdAt: now,
    duration: ELIMINATION_FREEZE_MS,
  });
  debugWarn("player-eliminated", {
    player: player.id,
    elapsed: Math.round(state.elapsed),
    score: state.scores,
    enemies: summarizeEnemies(),
  });

  clearRoundTimeout();
  scheduleRoundTimeout(() => {
    finishRound(player);
  }, ELIMINATION_FREEZE_MS);
}

function renderHud() {
  const profile = getRoundProfile();
  els.roundLabel.textContent = `ROUND ${state.roundNumber}`;
  const scoreText = getScoreText();
  if (hudRenderCache.score !== scoreText) {
    hudRenderCache.score = scoreText;
    els.scoreLine.textContent = scoreText;
  }
  els.eliminationsLine.textContent = `פסילות ${state.totalEliminations}/${MAX_TOTAL_ELIMINATIONS}`;
  const dangerText = getDebugPressureLiveText();
  if (hudRenderCache.danger !== dangerText) {
    hudRenderCache.danger = dangerText;
    els.dangerLine.textContent = dangerText;
  }
  els.dangerLine.classList.toggle("is-debug-visible", state.debugSolo);
  els.dangerLine.style.setProperty("--enemy-color", profile.color);
  els.dangerLine.style.setProperty("--enemy-accent", profile.accent);
  const timerText = formatTime(state.elapsed);
  if (hudRenderCache.timer !== timerText) {
    hudRenderCache.timer = timerText;
    els.timer.textContent = timerText;
  }

  TEAMS.forEach(updateHudCharacterFighter);

  TEAMS.forEach((team) => {
    const hud = document.querySelector(`#${team.hudId}`);
    hud.classList.toggle("is-inactive", !state.players.some((player) => player.id === team.id));
  });

  state.players.forEach((player) => {
    const hud = document.querySelector(`#${player.hudId}`);
    hud.classList.toggle("is-damaged", player.alive && player.hits > 0);
    hud.classList.toggle("is-eliminated", !player.alive);
    const playerLabel = player.representative || player.name;
    const controlsLabel = `שליטה: ${CONTROL_SCHEMES[player.controlScheme].label}`;
    const playerNameNode = document.querySelector(`#${player.playerId}`);
    const controlsNode = document.querySelector(`#${player.controlsId}`);
    if (playerNameNode.textContent !== playerLabel) {
      playerNameNode.textContent = playerLabel;
    }
    if (controlsNode.textContent !== controlsLabel) {
      controlsNode.textContent = controlsLabel;
    }
    const hitsNode = document.querySelector(`#${player.hitsId}`);
    const playerCache = hudRenderCache.players.get(player.id) || {};
    if (player.alive) {
      const hitStatus = getHitStatus(player);
      const hitKey = `alive:${player.hits}`;
      if (playerCache.hitKey !== hitKey) {
        hitsNode.innerHTML = hitStatus;
        playerCache.hitKey = hitKey;
        hudRenderCache.players.set(player.id, playerCache);
      }
    } else {
      const hitStatus = getHitStatus(player);
      const hitKey = `dead:${hitStatus}`;
      if (playerCache.hitKey !== hitKey) {
        hitsNode.textContent = hitStatus;
        playerCache.hitKey = hitKey;
        hudRenderCache.players.set(player.id, playerCache);
      }
    }
  });
}

function resetHudRenderCache() {
  hudRenderCache.score = "";
  hudRenderCache.timer = "";
  hudRenderCache.danger = "";
  hudRenderCache.players.clear();
}

function finishRound(eliminatedPlayer) {
  state.phase = "roundOver";
  stopLoop();
  stopRareAdolfJacksonPresenceSound();
  const roundDuration = Math.max(0, state.elapsed);
  state.matchElapsedTotal += roundDuration;

  const scoringPlayer = state.players.find((player) => player.id !== eliminatedPlayer.id);
  state.totalEliminations += 1;
  if (scoringPlayer) {
    state.scores[scoringPlayer.id] += 1;
  }

  state.roundResult = {
    roundNumber: state.roundNumber,
    eliminatedId: eliminatedPlayer.id,
    scoringId: scoringPlayer?.id || null,
    totalEliminations: state.totalEliminations,
    durationSeconds: roundDuration,
  };
  saveState();

  renderHud();
  drawGame(performance.now());

  if (state.totalEliminations >= MAX_TOTAL_ELIMINATIONS) {
    endMatch();
    return;
  }

  state.roundNumber += 1;
  beginRoundCountdown(createRoundResult(eliminatedPlayer, scoringPlayer, roundDuration));
}

function getHitStatus(player) {
  if (!player.alive) return "נפסל";
  return renderHearts(player.hits);
}

function createRoundResult(eliminatedPlayer, scoringPlayer, durationSeconds = state.elapsed) {
  return {
    eliminatedLabel: getPlayerLabel(eliminatedPlayer),
    eliminatedId: eliminatedPlayer.id,
    eliminatedHadRepresentative: Boolean(eliminatedPlayer.representative),
    scoringId: scoringPlayer?.id || null,
    durationSeconds,
  };
}

function getScoreText() {
  if (state.debugSolo) {
    return "מצב לבד";
  }

  return `${state.scores.brazim} - ${state.scores.chen}`;
}

function getFinalScoreText() {
  return `${state.scores.chen} : ${state.scores.brazim}`;
}

function renderHearts(hits) {
  const safeHits = Math.min(HIT_LIMIT, Math.max(0, hits));
  return Array.from({ length: HIT_LIMIT }, (_, index) => {
    const empty = index >= HIT_LIMIT - safeHits;
    return `<span class="heart ${empty ? "is-empty" : "is-full"}" aria-hidden="true">${renderHeartSvg()}</span>`;
  }).join("");
}

function renderHeartSvg() {
  return `<svg viewBox="0 0 24 24" focusable="false"><path d="${HEART_ICON_PATH}"></path></svg>`;
}

function drawGame(now) {
  ensureCanvasReady();
  const rect = getCanvasRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  drawWater(rect, now);
  state.enemies.forEach((enemy) => drawEnemy(enemy, now));
  state.players.forEach((player) => drawPlayer(player, now));
  drawEffects(now);
}

function drawWater(rect, now) {
  if (ARCADE_VISUAL_MODE) {
    drawArcadeWaterBase(rect, now);
  } else {
    const background = getLoadedImage("background");
    if (background) {
      drawImageCover(background, 0, 0, rect.width, rect.height);
      ctx.save();
      ctx.fillStyle = "rgba(5, 47, 66, 0.38)";
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.restore();
    } else {
      const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
      gradient.addColorStop(0, "#0a7897");
      gradient.addColorStop(0.55, "#0b5573");
      gradient.addColorStop(1, "#063449");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
    }
  }

  if (ARCADE_VISUAL_MODE) {
    drawArcadeWaterLightRays(rect, now);
  } else {
    drawWaterLightRays(rect, now);
  }
  drawBackgroundFish(rect, now);
  drawDeepSeaDrifters(rect, now);
  drawSeaFloor(rect, now);
  drawBackgroundBubbles(rect, now);
  drawWaterParticles(rect, now);

  if (ARCADE_VISUAL_MODE) {
    drawArcadeWaterCurrentLines(rect, now);
  } else {
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = "#fff7e6";
    ctx.lineWidth = 1.7;
    for (let y = 42; y < rect.height; y += 72) {
      ctx.beginPath();
      for (let x = 0; x <= rect.width; x += 28) {
        const waveY = y + Math.sin(x * 0.015 + now * 0.0015) * 7;
        if (x === 0) ctx.moveTo(x, waveY);
        else ctx.lineTo(x, waveY);
      }
      ctx.stroke();
    }
    ctx.restore();
  }
}

function arcadeSnap(value, grid = 4) {
  return Math.round(value / grid) * grid;
}

function drawArcadeWaterBase(rect, now) {
  const bands = [
    "#0a6e8d",
    "#085f7e",
    "#07506e",
    "#053f5c",
    "#043149",
    "#03263c",
  ];

  ctx.save();
  const bandHeight = 18;
  for (let y = 0; y < rect.height; y += bandHeight) {
    const depth = y / Math.max(1, rect.height);
    const colorIndex = Math.min(bands.length - 1, Math.floor(depth * bands.length));
    ctx.fillStyle = bands[colorIndex];
    ctx.fillRect(0, y, rect.width, bandHeight);
  }

  const drift = Math.floor(now * 0.012) % 32;
  for (let y = 8; y < rect.height; y += 22) {
    for (let x = -32; x < rect.width + 32; x += 32) {
      const stagger = (Math.floor(y / 22) % 2) * 16;
      const pulse = (x + y + drift) % 64 === 0;
      ctx.globalAlpha = pulse ? 0.12 : 0.055;
      ctx.fillStyle = y > rect.height * 0.58 ? "#6ed7ee" : "#bdf8ff";
      ctx.fillRect(x + stagger + drift, y, 12, 3);
    }
  }

  ctx.globalAlpha = 0.08;
  ctx.fillStyle = "#e7ffff";
  for (let y = 0; y < rect.height; y += 4) {
    ctx.fillRect(0, y, rect.width, 1);
  }

  ctx.globalAlpha = 0.04;
  ctx.fillStyle = "#00111f";
  for (let x = 0; x < rect.width; x += 32) {
    ctx.fillRect(x, 0, 2, rect.height);
  }

  ctx.globalAlpha = 0.2;
  ctx.fillStyle = "#021a2c";
  ctx.fillRect(0, rect.height - Math.max(52, rect.height * 0.08), rect.width, Math.max(52, rect.height * 0.08));
  ctx.restore();
}

function drawArcadeWaterLightRays(rect, now) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let index = 0; index < 5; index += 1) {
    const startX = arcadeSnap(rect.width * (0.1 + index * 0.19) + Math.sin(now * 0.00025 + index) * 18, 8);
    const stepWidth = arcadeSnap(rect.width * (0.035 + index * 0.004), 4);
    ctx.globalAlpha = 0.08;
    ctx.fillStyle = "#b9fbff";
    for (let y = 0; y < rect.height; y += 18) {
      const x = startX - y * 0.18 + Math.floor(y / 54) * 8;
      const width = stepWidth + Math.floor(y / 90) * 4;
      ctx.fillRect(arcadeSnap(x, 4), y, width, 12);
    }
  }
  ctx.restore();
}

function drawArcadeWaterCurrentLines(rect, now) {
  ctx.save();
  ctx.globalAlpha = 0.13;
  ctx.fillStyle = "#fff7e6";
  for (let y = 44; y < rect.height - 28; y += 74) {
    const offset = Math.floor(now * 0.018 + y) % 64;
    for (let x = -64; x < rect.width + 64; x += 88) {
      const lineY = arcadeSnap(y + Math.sin((x + now * 0.02) * 0.02) * 6, 4);
      ctx.fillRect(x + offset, lineY, 44, 2);
      ctx.fillRect(x + offset + 52, lineY + 4, 18, 2);
    }
  }
  ctx.restore();
}

function drawWaterLightRays(rect, now) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let index = 0; index < 5; index += 1) {
    const offset = Math.sin(now * 0.00035 + index * 1.7) * rect.width * 0.035;
    const startX = rect.width * (0.12 + index * 0.19) + offset;
    const rayWidth = rect.width * (0.08 + index * 0.012);
    const gradient = ctx.createLinearGradient(startX, 0, startX + rayWidth * 0.55, rect.height);
    gradient.addColorStop(0, "rgba(210, 250, 255, 0.13)");
    gradient.addColorStop(0.45, "rgba(210, 250, 255, 0.045)");
    gradient.addColorStop(1, "rgba(210, 250, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX + rayWidth, 0);
    ctx.lineTo(startX + rayWidth * 0.55, rect.height);
    ctx.lineTo(startX - rayWidth * 0.45, rect.height);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawBackgroundFish(rect, now) {
  ctx.save();
  BACKGROUND_FISH.forEach((fish, index) => {
    const travel = ((fish.x + now * 0.00004 * fish.speed * fish.dir) % 1 + 1) % 1;
    const x = travel * rect.width;
    const y = fish.y * rect.height + Math.sin(now * 0.0012 + index) * fish.bob;
    ctx.globalAlpha = fish.alpha;
    drawBackgroundFishShape(x, y, fish.size, fish.dir, fish.color);
  });
  ctx.restore();
}

function drawBackgroundFishShape(x, y, size, dir, color) {
  if (ARCADE_VISUAL_MODE) {
    drawArcadeBackgroundFishShape(x, y, size, dir, color);
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(dir, 1);
  ctx.fillStyle = color;
  ctx.strokeStyle = "rgba(255, 247, 230, 0.42)";
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.72, size * 0.33, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-size * 0.68, 0);
  ctx.lineTo(-size * 1.08, -size * 0.32);
  ctx.lineTo(-size * 1.08, size * 0.32);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawArcadeBackgroundFishShape(x, y, size, dir, color) {
  const pixel = Math.max(3, arcadeSnap(size * 0.16, 1));
  const bodyWidth = arcadeSnap(size * 1.25, pixel);
  const bodyHeight = arcadeSnap(size * 0.48, pixel);

  ctx.save();
  ctx.translate(arcadeSnap(x), arcadeSnap(y));
  ctx.scale(dir, 1);
  ctx.fillStyle = color;
  ctx.fillRect(-bodyWidth * 0.45, -bodyHeight * 0.5, bodyWidth * 0.75, bodyHeight);
  ctx.fillRect(-bodyWidth * 0.18, -bodyHeight * 0.75, bodyWidth * 0.34, pixel);
  ctx.fillRect(-bodyWidth * 0.18, bodyHeight * 0.5, bodyWidth * 0.34, pixel);
  ctx.fillRect(-bodyWidth * 0.8, -bodyHeight * 0.35, bodyWidth * 0.3, bodyHeight * 0.7);
  ctx.fillStyle = "rgba(255, 247, 230, 0.5)";
  ctx.fillRect(bodyWidth * 0.18, -pixel, pixel, pixel);
  ctx.restore();
}

function drawDeepSeaDrifters(rect, now) {
  BACKGROUND_DRIFTERS.forEach((drifter, index) => {
    const travel = ((drifter.x + now * 0.00004 * drifter.speed * drifter.dir) % 1 + 1) % 1;
    const x = travel * rect.width;
    const y = drifter.y * rect.height + Math.sin(now * 0.0008 + index * 2.4) * 18;
    drawBackgroundOctopus(x, y, drifter.size, drifter.dir, drifter.color, drifter.alpha, now + index * 900);
  });
}

function drawBackgroundOctopus(x, y, size, dir, color, alpha, now) {
  if (ARCADE_VISUAL_MODE) {
    drawArcadeBackgroundOctopus(x, y, size, dir, color, alpha, now);
    return;
  }

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(dir, 1);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.strokeStyle = "rgba(220, 250, 255, 0.18)";
  ctx.lineWidth = Math.max(1, size * 0.045);

  ctx.beginPath();
  ctx.ellipse(0, -size * 0.14, size * 0.48, size * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  for (let leg = -3; leg <= 3; leg += 1) {
    const startX = leg * size * 0.12;
    const sway = Math.sin(now * 0.002 + leg * 0.8) * size * 0.16;
    ctx.beginPath();
    ctx.moveTo(startX, size * 0.18);
    ctx.quadraticCurveTo(startX + sway, size * 0.48, startX + leg * size * 0.08 + sway * 0.6, size * 0.76);
    ctx.stroke();
  }

  ctx.restore();
}

function drawArcadeBackgroundOctopus(x, y, size, dir, color, alpha, now) {
  const pixel = Math.max(4, arcadeSnap(size * 0.09, 2));
  const bodyWidth = arcadeSnap(size * 0.86, pixel);
  const bodyHeight = arcadeSnap(size * 0.62, pixel);

  ctx.save();
  ctx.translate(arcadeSnap(x), arcadeSnap(y));
  ctx.scale(dir, 1);
  ctx.globalAlpha = alpha * 1.12;
  ctx.fillStyle = color;
  ctx.fillRect(-bodyWidth / 2, -bodyHeight * 0.66, bodyWidth, bodyHeight);
  ctx.fillRect(-bodyWidth * 0.35, -bodyHeight * 0.9, bodyWidth * 0.7, pixel * 2);
  ctx.fillStyle = "rgba(220, 250, 255, 0.25)";
  ctx.fillRect(-bodyWidth * 0.22, -bodyHeight * 0.35, pixel, pixel);
  ctx.fillRect(bodyWidth * 0.14, -bodyHeight * 0.35, pixel, pixel);

  ctx.fillStyle = color;
  for (let leg = -3; leg <= 3; leg += 1) {
    const startX = leg * pixel * 1.55;
    const sway = Math.round(Math.sin(now * 0.0016 + leg) * pixel);
    ctx.fillRect(startX, -pixel * 0.1, pixel, pixel * 4);
    ctx.fillRect(startX + sway, pixel * 3.3, pixel * 2, pixel);
  }
  ctx.restore();
}

function drawSeaFloor(rect, now) {
  const floorY = rect.height;
  const floorDepth = Math.max(52, rect.height * 0.08);

  ctx.save();
  if (ARCADE_VISUAL_MODE) {
    ctx.globalAlpha = 0.34;
    ctx.fillStyle = "#011421";
    ctx.fillRect(0, rect.height - floorDepth, rect.width, floorDepth);
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = "#164c57";
    for (let x = 0; x < rect.width; x += 24) {
      const height = 6 + ((x / 24) % 4) * 3;
      ctx.fillRect(x, rect.height - height, 16, height);
    }
  } else {
    const floorGradient = ctx.createLinearGradient(0, rect.height - floorDepth, 0, rect.height);
    floorGradient.addColorStop(0, "rgba(4, 37, 48, 0)");
    floorGradient.addColorStop(1, "rgba(3, 22, 30, 0.52)");
    ctx.fillStyle = floorGradient;
    ctx.fillRect(0, rect.height - floorDepth, rect.width, floorDepth);
  }
  ctx.restore();

  SEAWEED_CLUSTERS.forEach((weed, index) => drawSeaweedCluster(rect, floorY, weed, index, now));
  CORAL_CLUSTERS.forEach((coral) => drawCoralCluster(rect, floorY, coral));
}

function drawSeaweedCluster(rect, floorY, weed, index, now) {
  const baseX = weed.x * rect.width;
  const height = weed.height * rect.height;

  ctx.save();
  ctx.globalAlpha = ARCADE_VISUAL_MODE ? 0.24 : 0.34;
  ctx.strokeStyle = weed.color;
  ctx.lineWidth = ARCADE_VISUAL_MODE ? 5 : 4;
  ctx.lineCap = ARCADE_VISUAL_MODE ? "butt" : "round";
  for (let blade = -2; blade <= 2; blade += 1) {
    const x = baseX + blade * 9;
    const sway = Math.sin(now * 0.0012 + index + blade) * 13 * weed.sway;
    if (ARCADE_VISUAL_MODE) {
      const snappedX = arcadeSnap(x, 4);
      const topY = arcadeSnap(floorY - height, 4);
      const midY = arcadeSnap(floorY - height * 0.52, 4);
      const swayX = arcadeSnap(sway * 0.35, 4);
      ctx.beginPath();
      ctx.moveTo(snappedX, floorY);
      ctx.lineTo(snappedX, midY);
      ctx.lineTo(snappedX + swayX, midY);
      ctx.lineTo(snappedX + swayX, topY);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(x, floorY + 14);
      ctx.bezierCurveTo(x + sway * 0.18, floorY - height * 0.36, x + sway, floorY - height * 0.72, x + sway * 0.55, floorY - height);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawCoralCluster(rect, floorY, coral) {
  const baseX = coral.x * rect.width;
  const scale = coral.scale;

  ctx.save();
  ctx.globalAlpha = ARCADE_VISUAL_MODE ? 0.22 : 0.3;
  ctx.strokeStyle = coral.color;
  ctx.lineWidth = (ARCADE_VISUAL_MODE ? 6 : 5) * scale;
  ctx.lineCap = ARCADE_VISUAL_MODE ? "square" : "round";
  const branchHeight = 44 * scale;
  [-18, 0, 18].forEach((offset, index) => {
    const x = baseX + offset * scale;
    const height = branchHeight * (0.72 + index * 0.18);
    ctx.beginPath();
    if (ARCADE_VISUAL_MODE) {
      const snappedX = arcadeSnap(x, 4);
      const topY = arcadeSnap(floorY - height, 4);
      const midY = arcadeSnap(floorY - height * 0.55, 4);
      ctx.moveTo(snappedX, floorY);
      ctx.lineTo(snappedX, topY);
      ctx.moveTo(snappedX, midY);
      ctx.lineTo(snappedX - arcadeSnap(12 * scale, 4), midY);
      ctx.moveTo(snappedX, topY + 12);
      ctx.lineTo(snappedX + arcadeSnap(12 * scale, 4), topY + 12);
    } else {
      ctx.moveTo(x, floorY + 12);
      ctx.lineTo(x, floorY - height);
      ctx.moveTo(x, floorY - height * 0.48);
      ctx.lineTo(x - 12 * scale, floorY - height * 0.7);
      ctx.moveTo(x, floorY - height * 0.58);
      ctx.lineTo(x + 13 * scale, floorY - height * 0.82);
    }
    ctx.stroke();
  });
  ctx.restore();
}

function drawBackgroundBubbles(rect, now) {
  if (ARCADE_VISUAL_MODE) {
    drawArcadeBackgroundBubbles(rect, now);
    return;
  }

  ctx.save();
  ctx.globalAlpha = 0.28;
  ctx.strokeStyle = "rgba(220, 250, 255, 0.78)";
  ctx.lineWidth = 1.5;
  BACKGROUND_BUBBLES.forEach((bubble, index) => {
    const loop = ((bubble.y - now * 0.00005 * bubble.speed) % 1 + 1) % 1;
    const drift = Math.sin(now * 0.001 + index * 2.1) * 15;
    const x = bubble.x * rect.width + drift;
    const y = loop * rect.height;
    ctx.beginPath();
    ctx.arc(x, y, bubble.size, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
}

function drawArcadeBackgroundBubbles(rect, now) {
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = "rgba(220, 250, 255, 0.78)";
  ctx.lineWidth = 2;
  BACKGROUND_BUBBLES.forEach((bubble, index) => {
    const loop = ((bubble.y - now * 0.000045 * bubble.speed) % 1 + 1) % 1;
    const drift = Math.sin(now * 0.0008 + index * 2.1) * 12;
    const size = Math.max(4, arcadeSnap(bubble.size * 1.35, 2));
    const x = arcadeSnap(bubble.x * rect.width + drift, 2);
    const y = arcadeSnap(loop * rect.height, 2);
    ctx.strokeRect(x - size / 2, y - size / 2, size, size);
  });
  ctx.restore();
}

function drawWaterParticles(rect, now) {
  if (ARCADE_VISUAL_MODE) {
    drawArcadeWaterParticles(rect, now);
    return;
  }

  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = "#d7fbff";
  for (let index = 0; index < 34; index += 1) {
    const x = ((index * 97.3 + now * 0.006) % rect.width + rect.width) % rect.width;
    const y = ((index * 53.7 + Math.sin(now * 0.0008 + index) * 20) % rect.height + rect.height) % rect.height;
    const radius = 0.9 + (index % 4) * 0.34;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawArcadeWaterParticles(rect, now) {
  ctx.save();
  ctx.globalAlpha = 0.14;
  ctx.fillStyle = "#d7fbff";
  for (let index = 0; index < 44; index += 1) {
    const x = arcadeSnap(((index * 97.3 + now * 0.004) % rect.width + rect.width) % rect.width, 2);
    const y = arcadeSnap(((index * 53.7 + Math.sin(now * 0.0006 + index) * 16) % rect.height + rect.height) % rect.height, 2);
    const size = 1 + (index % 3);
    ctx.fillRect(x, y, size, size);
  }
  ctx.restore();
}

function drawPlayer(player, now) {
  if (!player.alive) {
    drawSubmarine(player, "#5b6469", true, now, HIT_LIMIT);
    return;
  }

  const damaged = player.hits > 0;
  const flashing = now < player.invulnerableUntil && Math.floor(now / 110) % 2 === 0;
  if (now < player.invulnerableUntil) {
    drawInvulnerabilityRing(player, now);
  }

  ctx.save();
  if (flashing) {
    ctx.globalAlpha = 0.55;
  }
  drawSubmarine(player, player.color, damaged, now, player.hits);
  ctx.restore();
}

function drawInvulnerabilityRing(player, now) {
  const pulse = 0.5 + Math.sin(now * 0.012) * 0.5;
  ctx.save();
  ctx.globalAlpha = 0.34 + pulse * 0.16;
  ctx.strokeStyle = "#fff7e6";
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.ellipse(player.x, player.y, 58 + pulse * 8, 38 + pulse * 6, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawSubmarine(player, color, damaged, now, damageLevel = 0) {
  const dir = player.facing || (player.id === "chen" ? 1 : -1);
  const safeDamageLevel = Math.min(HIT_LIMIT, Math.max(0, damageLevel));
  const bob = player.alive ? Math.sin(now * 0.004 + player.x * 0.02) * 3 : Math.sin(now * 0.02) * 1.5;
  const damageFlash = now < player.damageFlashUntil;
  const damagedAsset = getLoadedImage(`${player.id}:damaged`);
  const normalAsset = getLoadedImage(`${player.id}:normal`);
  const sprite = damaged ? (damagedAsset || normalAsset) : normalAsset;

  ctx.save();
  ctx.translate(player.x, player.y + bob);
  ctx.scale(dir, 1);
  ctx.scale(SUBMARINE_VISUAL_SCALE, SUBMARINE_VISUAL_SCALE);
  if (!player.alive) {
    ctx.rotate(Math.sin(now * 0.018) * 0.06);
  }

  if (damageFlash) {
    ctx.save();
    ctx.globalAlpha = 0.42;
    ctx.fillStyle = "#ff3d3d";
    ctx.beginPath();
    ctx.ellipse(0, 0, 58, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  if (sprite) {
    drawImageContain(sprite, -64, -43, 128, 86);
    drawSubmarineHardware(color, now, true);
    drawArcadeSubmarineAccents(color, true);
    drawCrewFacesOnSubmarine(player);
    if (damaged) {
      drawDamageOverlay(now, safeDamageLevel);
    }
    ctx.restore();
    return;
  }

  drawSubmarineBody(color, now);
  drawSubmarineHardware(color, now, false);
  drawArcadeSubmarineAccents(color, false);
  drawCrewFacesOnSubmarine(player);

  if (damaged) {
    drawDamageOverlay(now, safeDamageLevel);
  }

  ctx.restore();
}

function drawCrewFacesOnSubmarine(player) {
  const dorFace = getLoadedImage("playerFace");
  const selectedFace = getSelectedCharacterFace(player);
  const characterId = normalizeCharacterId(player.characterId || getSelectedCharacterId(player.id));

  if (dorFace) {
    drawSubmarineCrewFace(dorFace, -57, -25, 31, 43, { mirror: true });
  }

  if (selectedFace) {
    const bounds = getSelectedCrewFaceBounds(characterId);
    drawSubmarineCrewFace(selectedFace, bounds.x, bounds.y, bounds.width, bounds.height, {
      mirror: shouldMirrorSelectedCrewFace(player.id, characterId),
    });
  }
}

function getSelectedCrewFaceBounds(characterId) {
  const baseBounds = { x: 29, y: -27, width: 39, height: 50 };
  if (characterId !== "dor") return baseBounds;

  const centerX = baseBounds.x + baseBounds.width / 2;
  const centerY = baseBounds.y + baseBounds.height / 2;
  const width = baseBounds.width * DOR_SELECTED_CREW_FACE_SCALE;
  const height = baseBounds.height * DOR_SELECTED_CREW_FACE_SCALE;
  return {
    x: centerX - width / 2,
    y: centerY - height / 2,
    width,
    height,
  };
}

function shouldMirrorSelectedCrewFace(teamId, characterId) {
  const sourceFacing = CHARACTER_FACE_SOURCE_FACING[teamId]?.[characterId] ?? 1;
  return sourceFacing < 0;
}

function getSelectedCharacterFace(player) {
  const characterId = normalizeCharacterId(player.characterId || getSelectedCharacterId(player.id));
  if (!characterId) return null;
  return getLoadedImage(`character:${player.id}:${characterId}`);
}

function drawSubmarineCrewFace(image, x, y, width, height, options = {}) {
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.34)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetY = 1;

  if (options.mirror) {
    ctx.translate(centerX, centerY);
    ctx.scale(-1, 1);
    drawImageContain(image, -width / 2, -height / 2, width, height);
  } else {
    drawImageContain(image, x, y, width, height);
  }

  ctx.restore();
}

function drawSubmarineBody(color, now) {
  if (ARCADE_VISUAL_MODE && ARCADE_PIXEL_SUBMARINES) {
    drawArcadeSubmarineBody(color, now);
    return;
  }

  const shine = Math.sin(now * 0.004) * 0.04;

  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = "#fff7e6";
  ctx.lineWidth = 3.2;

  roundedEllipse(-55, -22, 110, 44);
  ctx.fill();
  ctx.stroke();

  ctx.globalAlpha = 0.2 + shine;
  ctx.fillStyle = "#fff7e6";
  roundedEllipse(-42, -16, 82, 13);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = color;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(-20, -43, 36, 23, 7);
  } else {
    ctx.rect(-20, -43, 36, 23);
  }
  ctx.fill();
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-4, -43);
  ctx.lineTo(-4, -59);
  ctx.lineTo(14, -59);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.strokeStyle = "#fff7e6";
  ctx.lineWidth = 3;

  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(-76, -13, 22, 26, 6);
  } else {
    ctx.rect(-76, -13, 22, 26);
  }
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#fff7e6";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-76, 0);
  ctx.lineTo(-88, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(-95, 0, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawArcadeSubmarineBody(color, now) {
  const shine = Math.sin(now * 0.004) * 0.035;

  ctx.save();
  ctx.lineJoin = "miter";
  ctx.lineCap = "square";
  ctx.fillStyle = color;
  ctx.strokeStyle = "#fff7e6";
  ctx.lineWidth = 3.4;

  ctx.beginPath();
  ctx.moveTo(-68, -18);
  ctx.lineTo(-58, -30);
  ctx.lineTo(34, -30);
  ctx.lineTo(52, -18);
  ctx.lineTo(64, -8);
  ctx.lineTo(64, 8);
  ctx.lineTo(52, 18);
  ctx.lineTo(34, 30);
  ctx.lineTo(-58, 30);
  ctx.lineTo(-68, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(-62, 19, 92, 8);
  ctx.fillRect(40, 9, 16, 8);

  ctx.globalAlpha = 0.18 + shine;
  ctx.fillStyle = "#fff7e6";
  ctx.fillRect(-52, -22, 62, 6);
  ctx.fillRect(16, -18, 28, 5);
  ctx.globalAlpha = 1;

  ctx.fillStyle = color;
  ctx.strokeStyle = "#fff7e6";
  ctx.lineWidth = 3;
  ctx.fillRect(-24, -48, 42, 18);
  ctx.strokeRect(-24, -48, 42, 18);
  ctx.fillRect(-14, -58, 10, 10);
  ctx.fillRect(-4, -64, 24, 8);
  ctx.strokeRect(-14, -58, 10, 10);
  ctx.strokeRect(-4, -64, 24, 8);

  ctx.fillRect(-82, -14, 18, 28);
  ctx.strokeRect(-82, -14, 18, 28);
  ctx.fillRect(-98, -6, 16, 12);
  ctx.strokeRect(-98, -6, 16, 12);

  ctx.restore();
}

function drawSubmarineHardware(color, now, overSprite) {
  if (ARCADE_VISUAL_MODE && ARCADE_PIXEL_SUBMARINES) {
    drawArcadeSubmarineHardware(color, now, overSprite);
    return;
  }

  const glass = overSprite ? "rgba(255, 247, 230, 0.88)" : "rgba(210, 244, 255, 0.96)";

  ctx.save();
  if (overSprite) {
    ctx.globalAlpha = 0.94;
  }

  ctx.strokeStyle = "#fff7e6";
  ctx.fillStyle = glass;
  ctx.lineWidth = 2.6;

  [-25, 0, 25].forEach((x) => {
    ctx.beginPath();
    ctx.arc(x, 0, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  ctx.strokeStyle = "rgba(255, 247, 230, 0.72)";
  ctx.lineWidth = 1.8;
  [-42, -14, 14, 42].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, 16);
    ctx.lineTo(x + 7, 21);
    ctx.stroke();
  });

  ctx.strokeStyle = "#fff7e6";
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.arc(-95, 0, 11, 0, Math.PI * 2);
  ctx.moveTo(-95, -11);
  ctx.lineTo(-95, 11);
  ctx.moveTo(-106, 0);
  ctx.lineTo(-84, 0);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 247, 230, 0.92)";
  ctx.beginPath();
  ctx.arc(55, -2, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawArcadeSubmarineHardware(color, now, overSprite) {
  const glass = overSprite ? "rgba(255, 247, 230, 0.9)" : "rgba(210, 244, 255, 0.95)";

  ctx.save();
  if (overSprite) {
    ctx.globalAlpha = 0.94;
  }

  ctx.lineJoin = "miter";
  ctx.lineCap = "square";
  ctx.strokeStyle = "#fff7e6";
  ctx.fillStyle = glass;
  ctx.lineWidth = 2.5;

  [-28, 0, 28].forEach((x) => {
    ctx.fillRect(x - 7, -7, 14, 14);
    ctx.strokeRect(x - 7, -7, 14, 14);
    ctx.fillStyle = "rgba(255, 247, 230, 0.32)";
    ctx.fillRect(x - 4, -4, 5, 5);
    ctx.fillStyle = glass;
  });

  ctx.strokeStyle = "rgba(255, 247, 230, 0.7)";
  ctx.lineWidth = 2;
  [-44, -16, 16, 44].forEach((x, index) => {
    const drop = 17 + (index % 2) * 3;
    ctx.beginPath();
    ctx.moveTo(x, 16);
    ctx.lineTo(x + 8, 16);
    ctx.lineTo(x + 8, drop);
    ctx.stroke();
  });

  ctx.strokeStyle = "#fff7e6";
  ctx.lineWidth = 3;
  ctx.strokeRect(-106, -11, 22, 22);
  ctx.beginPath();
  ctx.moveTo(-95, -11);
  ctx.lineTo(-95, 11);
  ctx.moveTo(-106, 0);
  ctx.lineTo(-84, 0);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 247, 230, 0.92)";
  ctx.fillRect(50, -7, 10, 10);
  ctx.strokeRect(50, -7, 10, 10);

  ctx.fillStyle = "rgba(0, 0, 0, 0.24)";
  ctx.fillRect(-60, 30, 76, 4);
  ctx.restore();
}

function drawArcadeSubmarineAccents(color, overSprite) {
  if (!ARCADE_VISUAL_MODE || !ARCADE_PIXEL_SUBMARINES) return;

  ctx.save();
  ctx.globalAlpha = overSprite ? 0.26 : 0.18;
  ctx.fillStyle = "#fff7e6";
  ctx.fillRect(-48, -21, 42, 4);
  ctx.fillRect(-2, -19, 28, 4);
  ctx.fillRect(38, 10, 18, 4);
  ctx.fillStyle = "rgba(0, 0, 0, 0.38)";
  ctx.fillRect(-64, 25, 78, 5);
  ctx.fillRect(22, 22, 36, 5);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.strokeRect(-66, -28, 126, 56);
  ctx.restore();
}

function drawDamageOverlay(now, severity = 1) {
  const safeSeverity = Math.min(HIT_LIMIT, Math.max(1, severity));
  ctx.strokeStyle = "#101314";
  ctx.lineWidth = 3 + safeSeverity;
  ctx.beginPath();
  ctx.moveTo(-4, -12);
  ctx.lineTo(7, 0);
  ctx.lineTo(-1, 13);
  ctx.lineTo(13, 22);
  ctx.stroke();

  ctx.lineWidth = 2 + safeSeverity;
  ctx.beginPath();
  ctx.moveTo(-22, 4);
  ctx.lineTo(-10, -2);
  ctx.lineTo(-19, -15);
  if (safeSeverity >= 2) {
    ctx.moveTo(20, 11);
    ctx.lineTo(33, 0);
    ctx.lineTo(27, -14);
    ctx.moveTo(-42, -4);
    ctx.lineTo(-28, 8);
  }
  if (safeSeverity >= 3) {
    ctx.moveTo(-8, -27);
    ctx.lineTo(5, -12);
    ctx.lineTo(-6, -2);
    ctx.lineTo(10, 14);
    ctx.moveTo(42, 15);
    ctx.lineTo(54, 29);
  }
  ctx.stroke();

  ctx.fillStyle = "#b3132b";
  ctx.beginPath();
  ctx.arc(-25, 18, 4 + safeSeverity * 3, 0, Math.PI * 2);
  ctx.arc(-18, 27, 2 + safeSeverity * 2, 0, Math.PI * 2);
  ctx.arc(2, 23, 3 + safeSeverity * 2, 0, Math.PI * 2);
  if (safeSeverity >= 2) {
    ctx.arc(25, 23, 4 + safeSeverity, 0, Math.PI * 2);
  }
  ctx.fill();

  ctx.fillStyle = `rgba(20, 20, 20, ${0.32 + safeSeverity * 0.13})`;
  ctx.beginPath();
  ctx.arc(-34, -25 + Math.sin(now * 0.006) * 2, 3 + safeSeverity * 2, 0, Math.PI * 2);
  ctx.arc(-45, -36 + Math.sin(now * 0.005) * 2, 2 + safeSeverity, 0, Math.PI * 2);
  ctx.arc(-54, -46 + Math.sin(now * 0.004) * 2, 1.5 + safeSeverity, 0, Math.PI * 2);
  if (safeSeverity >= 2) {
    ctx.arc(20, -34 + Math.sin(now * 0.004) * 2, 2.5 + safeSeverity, 0, Math.PI * 2);
    ctx.arc(31, -47 + Math.sin(now * 0.005) * 2, 1.7 + safeSeverity, 0, Math.PI * 2);
  }
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 247, 230, 0.72)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(28, -13);
  ctx.lineTo(38, -22);
  ctx.moveTo(31, -4);
  ctx.lineTo(43, -7);
  ctx.stroke();
}

function drawEffects(now) {
  state.effects.forEach((effect) => {
    if (effect.type === "heart-loss") {
      drawLostHeartEffect(effect, now);
      return;
    }

    if (effect.type === "elimination") {
      drawEliminationEffect(effect, now);
      return;
    }

    if (effect.type !== "hit") return;

    const progress = clamp((now - effect.createdAt) / effect.duration, 0, 1);
    const radius = 26 + progress * 46;

    ctx.save();
    ctx.globalAlpha = 1 - progress;
    ctx.strokeStyle = effect.color;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 247, 230, 0.72)";
    for (let index = 0; index < 8; index += 1) {
      const angle = (Math.PI * 2 * index) / 8;
      const x = effect.x + Math.cos(angle) * radius * 0.82;
      const y = effect.y + Math.sin(angle) * radius * 0.82;
      ctx.beginPath();
      ctx.arc(x, y, 4 * (1 - progress), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });
}

function drawEliminationEffect(effect, now) {
  const progress = clamp((now - effect.createdAt) / effect.duration, 0, 1);
  const burst = Math.sin(progress * Math.PI);
  const radius = 34 + progress * 130;

  ctx.save();
  ctx.globalAlpha = 1 - progress * 0.18;
  ctx.strokeStyle = effect.color;
  ctx.lineWidth = 10 - progress * 5;
  ctx.beginPath();
  ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = `rgba(255, 247, 230, ${0.55 * burst})`;
  ctx.beginPath();
  ctx.arc(effect.x, effect.y, 42 + burst * 42, 0, Math.PI * 2);
  ctx.fill();

  for (let index = 0; index < 18; index += 1) {
    const angle = (Math.PI * 2 * index) / 18 + progress * 0.8;
    const distance = 22 + progress * (92 + (index % 4) * 16);
    const x = effect.x + Math.cos(angle) * distance;
    const y = effect.y + Math.sin(angle) * distance;
    ctx.fillStyle = index % 3 === 0 ? effect.color : "rgba(255, 247, 230, 0.88)";
    ctx.beginPath();
    ctx.arc(x, y, Math.max(2, 8 - progress * 5), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "1000 52px Arial, Helvetica, sans-serif";
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#041018";
  ctx.fillStyle = "#fff7e6";
  ctx.strokeText("לוזר!!!", effect.x, effect.y - 92 - progress * 18);
  ctx.fillText("לוזר!!!", effect.x, effect.y - 92 - progress * 18);
  ctx.restore();
}

function showLostHeartEffect(player) {
  state.effects.push({
    type: "heart-loss",
    playerId: player.id,
    color: player.color,
    beforeHits: Math.max(0, player.hits - 1),
    afterHits: player.hits,
    createdAt: performance.now(),
    duration: 1500,
  });
}

function drawLostHeartEffect(effect, now) {
  const player = getPlayerById(effect.playerId);
  if (!player) return;

  const progress = clamp((now - effect.createdAt) / effect.duration, 0, 1);
  const y = player.y - 80 - progress * 16;
  const scale = 1 + Math.sin(progress * Math.PI) * 0.16;

  ctx.save();
  ctx.globalAlpha = progress < 0.74 ? 1 : 1 - (progress - 0.74) / 0.26;
  ctx.translate(player.x, y);
  ctx.scale(scale, scale);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  drawCanvasHeartRow(effect.afterHits, 0, 0, 40, HIT_LIMIT - effect.afterHits, progress);
  ctx.restore();
}

function drawCanvasHeartRow(hits, centerX, centerY, size, blinkingIndex = -1, progress = 1) {
  const safeHits = Math.min(HIT_LIMIT, Math.max(0, hits));
  const gap = size * 0.24;
  const totalWidth = HIT_LIMIT * size + (HIT_LIMIT - 1) * gap;
  const startX = centerX - totalWidth / 2 + size / 2;

  for (let index = 0; index < HIT_LIMIT; index += 1) {
    const shouldBlink = index === blinkingIndex && progress < 0.78;
    const filled = shouldBlink
      ? Math.floor(progress * 12) % 2 === 0
      : index < HIT_LIMIT - safeHits;
    drawCanvasHeart(startX + index * (size + gap), centerY, size, filled);
  }
}

function drawCanvasHeart(centerX, centerY, size, filled) {
  const scale = size / 24;

  ctx.save();
  ctx.translate(centerX - size / 2, centerY - size / 2);
  ctx.scale(scale, scale);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 2.35;
  ctx.strokeStyle = "#041018";
  ctx.stroke(HEART_PATH);
  ctx.lineWidth = 1.85;
  ctx.strokeStyle = "#ff5f7a";
  ctx.fillStyle = filled ? "#ff5f7a" : "rgba(7, 16, 23, 0.72)";
  ctx.fill(HEART_PATH);
  ctx.stroke(HEART_PATH);
  ctx.restore();
}

function roundedEllipse(x, y, width, height) {
  ctx.beginPath();
  ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
}

function drawEnemy(enemy, now) {
  const enemySpriteFrame = getEnemySprite(enemy, now);
  const enemySprite = enemySpriteFrame?.image;
  const tier = getEnemyTierById(enemy.sizeTierId);

  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  ctx.scale(getEnemyDrawDirection(enemy), 1);

  if (enemySprite) {
    const tierSize = enemy.radius * (tier.id === "giant" ? 2.95 : tier.id === "large" ? 2.7 : 2.48);
    const size = tierSize * getEnemyTypeVisualScale(enemy.typeId) * (enemySpriteFrame.scale || 1);
    const tintAlpha = getEnemyTintAlpha(enemy, now);
    const shouldPixelate = shouldPixelateArcadeEnemy(enemy);
    const baseSprite = shouldPixelate ? (getPixelatedSprite(enemySprite) || enemySprite) : enemySprite;
    const displaySprite = getTintedSprite(baseSprite, enemy.color || tier.color, tintAlpha) || baseSprite;
    ctx.globalAlpha = getEnemyFadeAlpha(enemy);
    drawImageContain(displaySprite, -size / 2, -size / 2, size, size, {
      pixelated: shouldPixelate,
    });
    ctx.restore();
    return;
  }

  ctx.globalAlpha = getEnemyBodyAlpha(enemy, now) * getEnemyFadeAlpha(enemy);
  ctx.fillStyle = enemy.color || "#13242d";
  ctx.strokeStyle = enemy.accent || "#e7f8ff";
  ctx.lineWidth = 3;
  roundedEllipse(-enemy.radius * 1.1, -enemy.radius * 0.58, enemy.radius * 2.2, enemy.radius * 1.16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = enemy.accent || "#e7f8ff";
  ctx.beginPath();
  ctx.arc(enemy.radius * 0.42, -enemy.radius * 0.12, enemy.radius * 0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = enemy.accent || "#e7f8ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(enemy.radius * 0.65, enemy.radius * 0.12);
  ctx.lineTo(enemy.radius * 0.32, enemy.radius * 0.2);
  ctx.lineTo(enemy.radius * 0.62, enemy.radius * 0.32);
  ctx.stroke();

  ctx.fillStyle = enemy.color || "#13242d";
  ctx.beginPath();
  ctx.moveTo(-enemy.radius * 1.05, 0);
  ctx.lineTo(-enemy.radius * 1.55, -enemy.radius * 0.48);
  ctx.lineTo(-enemy.radius * 1.55, enemy.radius * 0.48);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (tier.id === "large" || tier.id === "giant") {
    ctx.strokeStyle = enemy.accent || "#ffcf7a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-enemy.radius * 0.15, -enemy.radius * 0.54);
    ctx.lineTo(enemy.radius * 0.05, -enemy.radius * 0.92);
    ctx.lineTo(enemy.radius * 0.25, -enemy.radius * 0.52);
    ctx.stroke();
  }

  ctx.restore();
}

function getEnemyTintAlpha(enemy, now) {
  if (shouldUseOriginalEnemyColors(enemy)) return 0;
  if (enemy.behavior !== "hunter") return 0.42;
  return 0.34 + (Math.sin(now * 0.012 + enemy.animationOffset * 0.01) + 1) * 0.2;
}

function isEnemyExpired(enemy) {
  if (!enemy.expiresAt) return false;
  return state.elapsed >= enemy.expiresAt + (enemy.fadeDuration || 0);
}

function getEnemyFadeAlpha(enemy) {
  if (!enemy.expiresAt || state.elapsed <= enemy.expiresAt) return 1;
  const fadeDuration = Math.max(0.001, enemy.fadeDuration || 1);
  return clamp(1 - (state.elapsed - enemy.expiresAt) / fadeDuration, 0, 1);
}

function shouldMirrorEnemy(enemy) {
  return !NON_MIRRORED_ENEMY_TYPES.has(enemy.typeId);
}

function getEnemyDrawDirection(enemy) {
  if (!shouldMirrorEnemy(enemy)) return 1;
  const movementFacing = enemy.facing || 1;
  return SOURCE_FACES_LEFT_ENEMY_TYPES.has(enemy.typeId) ? -movementFacing : movementFacing;
}

function shouldUseOriginalEnemyColors(enemy) {
  return NON_TINTED_ENEMY_TYPES.has(enemy.typeId);
}

function shouldPixelateArcadeEnemy(enemy) {
  return false;
}

function getEnemyTypeVisualScale(typeId) {
  return ENEMY_TYPE_VISUAL_SCALE[typeId] || 1;
}

function getEnemyBodyAlpha(enemy, now) {
  if (enemy.behavior !== "hunter") return 1;
  return 0.72 + (Math.sin(now * 0.012 + enemy.animationOffset * 0.01) + 1) * 0.14;
}

function getEnemySprite(enemy, now) {
  const enemyAsset = ASSET_MANIFEST.enemies[enemy.typeId];

  if (enemyAsset && Array.isArray(enemyAsset.frames)) {
    const frameCount = enemyAsset.frames.length;
    const frameMs = enemyAsset.frameMs || ENEMY_FRAME_MS;
    const frameIndex = Math.floor((now + enemy.animationOffset) / frameMs) % frameCount;
    const currentFrame = getLoadedImage(`enemy:${enemy.typeId}:frame:${frameIndex}`);
    if (currentFrame) {
      return {
        image: currentFrame,
        scale: getEnemyFrameScale(enemyAsset.frames[frameIndex]),
      };
    }

    for (let index = 0; index < frameCount; index += 1) {
      const fallbackFrame = getLoadedImage(`enemy:${enemy.typeId}:frame:${index}`);
      if (fallbackFrame) {
        return {
          image: fallbackFrame,
          scale: getEnemyFrameScale(enemyAsset.frames[index]),
        };
      }
    }

    return null;
  }

  const image = getLoadedImage(`enemy:${enemy.typeId}`);
  return image ? { image, scale: 1 } : null;
}

function getEnemyFrameSrc(frame) {
  return typeof frame === "string" ? frame : frame?.src;
}

function getEnemyFrameScale(frame) {
  if (!frame || typeof frame === "string") return 1;
  return Number.isFinite(frame.scale) ? frame.scale : 1;
}

function getLoadedImage(key) {
  const asset = assetImages[key];
  return asset?.loaded ? asset.image : null;
}

function getTintedSprite(image, color, alpha) {
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  if (!width || !height) return null;

  const safeAlpha = normalizeTintAlpha(alpha);
  const cacheKey = `${getSpriteCacheKey(image)}:${color}:${safeAlpha.toFixed(2)}`;
  if (tintedSpriteCache.has(cacheKey)) {
    return tintedSpriteCache.get(cacheKey);
  }

  if (tintedSpriteCache.size >= TINT_CACHE_LIMIT) {
    debugWarn("tint-cache-cleared", {
      size: tintedSpriteCache.size,
      limit: TINT_CACHE_LIMIT,
      enemies: summarizeEnemies(),
    });
    tintedSpriteCache.clear();
  }

  const canvas = document.createElement("canvas");
  const tintCtx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  tintCtx.drawImage(image, 0, 0, width, height);
  tintCtx.globalCompositeOperation = "source-atop";
  tintCtx.globalAlpha = safeAlpha;
  tintCtx.fillStyle = color;
  tintCtx.fillRect(0, 0, width, height);
  tintCtx.globalAlpha = 1;
  tintCtx.globalCompositeOperation = "source-over";
  canvas.dataset.spriteCacheKey = cacheKey;

  tintedSpriteCache.set(cacheKey, canvas);
  return canvas;
}

function normalizeTintAlpha(alpha) {
  return Math.round(clamp(alpha, 0, 1) * 20) / 20;
}

function getPixelatedSprite(image) {
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  if (!width || !height) return null;

  const cacheKey = `${getSpriteCacheKey(image)}:pixel:${ARCADE_ENEMY_PIXEL_MAX_DIMENSION}`;
  if (pixelatedSpriteCache.has(cacheKey)) {
    return pixelatedSpriteCache.get(cacheKey);
  }

  if (pixelatedSpriteCache.size >= PIXELATED_SPRITE_CACHE_LIMIT) {
    debugWarn("pixel-cache-cleared", {
      size: pixelatedSpriteCache.size,
      limit: PIXELATED_SPRITE_CACHE_LIMIT,
      enemies: summarizeEnemies(),
    });
    pixelatedSpriteCache.clear();
  }

  const ratio = width / height;
  const canvas = document.createElement("canvas");
  if (ratio >= 1) {
    canvas.width = ARCADE_ENEMY_PIXEL_MAX_DIMENSION;
    canvas.height = Math.max(1, Math.round(ARCADE_ENEMY_PIXEL_MAX_DIMENSION / ratio));
  } else {
    canvas.height = ARCADE_ENEMY_PIXEL_MAX_DIMENSION;
    canvas.width = Math.max(1, Math.round(ARCADE_ENEMY_PIXEL_MAX_DIMENSION * ratio));
  }

  const pixelCtx = canvas.getContext("2d");
  pixelCtx.imageSmoothingEnabled = true;
  pixelCtx.drawImage(image, 0, 0, canvas.width, canvas.height);
  canvas.dataset.spriteCacheKey = cacheKey;
  pixelatedSpriteCache.set(cacheKey, canvas);
  return canvas;
}

function getSpriteCacheKey(image) {
  return image.dataset?.spriteCacheKey || image.currentSrc || image.src || `${image.width}x${image.height}`;
}

function drawImageContain(image, x, y, width, height, options = {}) {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;
  const imageRatio = imageWidth / imageHeight;
  const boxRatio = width / height;
  let drawWidth = width;
  let drawHeight = height;

  if (imageRatio > boxRatio) {
    drawHeight = width / imageRatio;
  } else {
    drawWidth = height * imageRatio;
  }

  const previousSmoothing = ctx.imageSmoothingEnabled;
  if (options.pixelated) {
    ctx.imageSmoothingEnabled = false;
  }

  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);

  if (options.pixelated) {
    ctx.imageSmoothingEnabled = previousSmoothing;
  }
}

function drawImageCover(image, x, y, width, height) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const boxRatio = width / height;
  let sourceWidth = image.naturalWidth;
  let sourceHeight = image.naturalHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (imageRatio > boxRatio) {
    sourceWidth = image.naturalHeight * boxRatio;
    sourceX = (image.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = image.naturalWidth / boxRatio;
    sourceY = (image.naturalHeight - sourceHeight) / 2;
  }

  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function endMatch() {
  state.phase = "gameOver";
  stopRareAdolfJacksonPresenceSound();
  playSound("gameOver", 0.65);
  stopLoop();
  saveState();
  renderHud();
  drawGame(performance.now());

  if (state.debugSolo) {
    els.gameOverOverlay.innerHTML = "";
    els.gameOverOverlay.append(createFinalJacksonsBackdrop(), createSoloGameOverCard());
    els.gameOverOverlay.classList.remove("is-hidden");
    return;
  }

  const playersByScore = [...state.players].sort((a, b) => state.scores[b.id] - state.scores[a.id]);
  const [winner, runnerUp] = playersByScore;
  const tie = state.scores[winner.id] === state.scores[runnerUp.id];

  els.gameOverOverlay.innerHTML = "";
  els.gameOverOverlay.append(createFinalJacksonsBackdrop(), createGameOverCard(winner, runnerUp, tie));
  els.gameOverOverlay.classList.remove("is-hidden");
}

function createFinalJacksonsBackdrop() {
  const backdrop = document.createElement("div");
  backdrop.className = "final-jacksons-backdrop";
  backdrop.setAttribute("aria-hidden", "true");

  ["left", "right"].forEach((side) => {
    const wrap = document.createElement("span");
    wrap.className = `final-jackson final-jackson-${side}`;

    const image = document.createElement("img");
    image.src = getVersionedAssetSrc(ASSET_MANIFEST.enemies.adolfJackson);
    image.alt = "";
    image.draggable = false;

    wrap.append(image);
    backdrop.append(wrap);
  });

  return backdrop;
}

function createGameOverCard(winner, runnerUp, tie) {
  const card = document.createElement("div");
  card.className = "game-over-card";

  const eyebrow = document.createElement("p");
  eyebrow.className = "game-over-eyebrow";
  eyebrow.textContent = tie ? "אין מנצחים:" : "המנצחים:";

  const title = document.createElement("h2");
  title.append(createTeamNameDisplay(tie ? null : winner, "winner-name"));
  title.style.setProperty("--winner-color", tie ? "#f6c85f" : winner.color);

  const results = createGameOverScoreboard();
  const finalStage = createFinalStageEnemies();

  card.append(eyebrow, title, results, finalStage, createGameOverResetButton());
  return card;
}

function createSoloGameOverCard() {
  const card = document.createElement("div");
  card.className = "game-over-card";

  const eyebrow = document.createElement("p");
  eyebrow.className = "game-over-eyebrow";
  eyebrow.textContent = "מצב דיבאג";

  const title = document.createElement("h2");
  title.textContent = "הניסוי נגמר";
  title.style.setProperty("--winner-color", "#f6c85f");

  card.append(eyebrow, title, createGameOverScoreboard(), createFinalStageEnemies(), createGameOverResetButton());
  return card;
}

function createGameOverResetButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "reset-button game-over-reset-button";
  button.textContent = "איפוס תוצאה";
  button.addEventListener("click", resetToHomeWithReload);
  return button;
}

function createGameOverScoreboard() {
  const board = document.createElement("div");
  board.className = "game-over-final-score";

  const chen = getPlayerById("chen") || TEAMS.find((team) => team.id === "chen");
  const brazim = getPlayerById("brazim") || TEAMS.find((team) => team.id === "brazim");
  const chenTeam = createTeamNameDisplay(chen, "final-team final-team-chen");
  const brazimTeam = createTeamNameDisplay(brazim, "final-team final-team-brazim");

  const score = document.createElement("strong");
  score.className = "final-score-number";
  score.textContent = getFinalScoreText();

  board.append(chenTeam, score, brazimTeam);
  return board;
}

function createFinalStageEnemies() {
  const stage = document.createElement("section");
  stage.className = "final-stage-enemies";
  stage.setAttribute("aria-hidden", "true");

  const leftBezos = createFinalBezosSprite("left");
  const rightBezos = createFinalBezosSprite("right");
  const enemyStrip = createFinalEnemyStrip();

  stage.append(leftBezos, enemyStrip, rightBezos);
  return stage;
}

function createFinalBezosSprite(side) {
  const wrap = document.createElement("div");
  wrap.className = `final-bezos final-bezos-${side}`;

  const image = document.createElement("img");
  image.src = ASSET_MANIFEST.enemies.bezosSp;
  image.alt = "";
  image.draggable = false;

  wrap.append(image);
  return wrap;
}

function createFinalEnemyStrip() {
  const strip = document.createElement("div");
  strip.className = "final-enemy-strip";

  FINAL_SCREEN_ENEMY_ASSET_KEYS.forEach((key, index) => {
    const sources = getFinalEnemyAssetSources(key);
    if (!sources.length) return;

    const item = document.createElement("span");
    item.className = "final-enemy-face";
    item.dataset.enemyKey = key;
    item.style.setProperty("--mirror-delay", `${index * -0.13}s`);

    if (sources.length > 1) {
      item.classList.add("is-frame-swapping");
    }

    sources.forEach((src) => {
      const image = document.createElement("img");
      image.src = src;
      image.alt = "";
      image.draggable = false;
      item.append(image);
    });
    strip.append(item);
  });

  return strip;
}

function getFinalEnemyAssetSources(key) {
  const asset = ASSET_MANIFEST.enemies[key];

  if (!asset) return [];
  if (typeof asset === "string") return [asset];
  if (Array.isArray(asset.finalFrames) && asset.finalFrames.length) return asset.finalFrames;
  if (asset.final) return [asset.final];
  if (Array.isArray(asset.frames)) {
    return [getEnemyFrameSrc(asset.frames[0])];
  }

  return [];
}

function createTeamNameDisplay(player, className) {
  const wrap = document.createElement("span");
  wrap.className = className;
  if (!player) {
    wrap.textContent = "תיקו";
    return wrap;
  }

  wrap.style.setProperty("--team-color", player.color);

  if (player.id === "chen") {
    const main = document.createElement("span");
    main.className = "team-display-main";
    main.textContent = "החן יוספים";

    const sub = document.createElement("span");
    sub.className = "team-display-sub";
    sub.textContent = "ועוזריהם";

    wrap.append(main, sub);
    return wrap;
  }

  wrap.textContent = player.name;
  return wrap;
}

function getPlayerLabel(player) {
  return player.representative || player.name;
}

function getPointTargetLabel(player) {
  return player.representative || removeLeadingHebrewArticle(player.name);
}

function removeLeadingHebrewArticle(label) {
  return label.replace(/^ה(?=\S)/, "");
}

function getSurvivalSeconds(player) {
  return player.eliminatedAt || state.elapsed;
}

async function resetToStart() {
  await resetRuntimeState();
  showStartScreen();
}

async function resetRuntimeState() {
  clearRoundTimeout();
  clearRulesTimeout();
  stopRareAdolfJacksonPresenceSound();
  stopStageMusic();
  Object.assign(state, createInitialState());
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    debugWarn("storage-reset-failed");
  }
  clearStartUrlCheckpoint();
}

async function confirmPasswordReset() {
  closeResetModal(false);
  await resetToHomeWithReload();
}

function openResetModal() {
  els.resetModal.classList.remove("is-hidden");
  els.resetError.textContent = "";
  if (state.phase === "playing" || state.phase === "eliminating") {
    stopLoop();
  }
  window.setTimeout(() => els.confirmResetButton.focus(), 0);
}

function closeResetModal(shouldResume = true) {
  if (!els.resetModal || els.resetModal.classList.contains("is-hidden")) return;

  els.resetModal.classList.add("is-hidden");
  els.resetError.textContent = "";

  if (shouldResume && !visibilityFrozen && (state.phase === "playing" || state.phase === "eliminating") && !animationFrameId) {
    lastFrameTime = performance.now();
    animationFrameId = window.requestAnimationFrame(gameLoop);
  }
}

async function resetToHomeWithReload() {
  closeResetModal(false);
  await resetRuntimeState();
  isReloadingAfterReset = true;
  window.location.replace(window.location.pathname);
}

function saveState() {
  if (isReloadingAfterReset) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      storageVersion: STORAGE_VERSION,
      appVersion: APP_VERSION,
      phase: state.phase,
      startIntroOpen: state.phase === "start" ? isStartIntroOpen() : false,
      roundNumber: state.roundNumber,
      totalEliminations: state.totalEliminations,
      scores: {
        chen: Number(state.scores.chen) || 0,
        brazim: Number(state.scores.brazim) || 0,
      },
      debugSolo: Boolean(state.debugSolo),
      matchElapsedTotal: Number(state.matchElapsedTotal) || 0,
      elapsed: Number(state.elapsed) || 0,
      representatives: {
        chen: state.representatives.chen || "",
        brazim: state.representatives.brazim || "",
      },
      selectedCharacters: {
        chen: state.selectedCharacters.chen || "",
        brazim: state.selectedCharacters.brazim || "",
      },
      roundResult: state.phase === "countdown" ? normalizeRoundResultForStorage(state.roundResult) : null,
    }));
  } catch {
    debugWarn("storage-save-failed", { phase: state.phase });
  }

  clearStartUrlCheckpoint();
}

function updateStartUrlCheckpoint() {
  if (state.phase !== "start") return;
  const url = new URL(window.location.href);
  const hasStartCheckpoint = isStartIntroOpen() || state.debugSolo || state.selectedCharacters.chen || state.selectedCharacters.brazim;

  if (!hasStartCheckpoint) {
    clearStartUrlCheckpoint();
    return;
  }

  url.searchParams.set("subSelect", isStartIntroOpen() ? "1" : "0");
  setOptionalSearchParam(url, "subChen", state.selectedCharacters.chen);
  setOptionalSearchParam(url, "subBrazim", state.selectedCharacters.brazim);
  setOptionalSearchParam(url, "subSolo", state.debugSolo ? "1" : "");
  replaceUrlWithoutReload(url);
}

function clearStartUrlCheckpoint() {
  const url = new URL(window.location.href);
  let changed = false;

  START_CHECKPOINT_PARAMS.forEach((param) => {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      changed = true;
    }
  });

  if (changed) replaceUrlWithoutReload(url);
}

function setOptionalSearchParam(url, key, value) {
  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }
}

function replaceUrlWithoutReload(url) {
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
    window.history.replaceState({}, "", nextUrl);
  }
}

function persistPlayingProgress() {
  if (state.phase !== "playing") return;
  const elapsedFloor = Math.floor(state.elapsed);
  if (elapsedFloor === lastPersistedElapsed || elapsedFloor % 1 !== 0) return;

  lastPersistedElapsed = elapsedFloor;
  saveState();
}

function loadSavedState() {
  let rawState = null;
  try {
    rawState = localStorage.getItem(STORAGE_KEY);
  } catch {
    debugWarn("storage-load-failed");
    return null;
  }

  if (!rawState) return null;

  try {
    const savedState = JSON.parse(rawState);
    if (!isValidSavedState(savedState)) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        debugWarn("storage-invalid-clear-failed");
      }
      return null;
    }

    return savedState;
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      debugWarn("storage-parse-clear-failed");
    }
    return null;
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

function loadUrlStartState() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("subSelect") && !params.has("subChen") && !params.has("subBrazim") && !params.has("subSolo")) return null;

  const chenCharacter = getCharacterById("chen", params.get("subChen")) ? params.get("subChen") : "";
  const brazimCharacter = getCharacterById("brazim", params.get("subBrazim")) ? params.get("subBrazim") : "";

  return {
    storageVersion: STORAGE_VERSION,
    appVersion: APP_VERSION,
    phase: "start",
    startIntroOpen: params.get("subSelect") === "1" || Boolean(chenCharacter || brazimCharacter),
    roundNumber: 1,
    totalEliminations: 0,
    scores: { chen: 0, brazim: 0 },
    debugSolo: params.get("subSolo") === "1",
    matchElapsedTotal: 0,
    elapsed: 0,
    representatives: {
      chen: getCharacterById("chen", chenCharacter)?.name || "",
      brazim: getCharacterById("brazim", brazimCharacter)?.name || "",
    },
    selectedCharacters: {
      chen: chenCharacter,
      brazim: brazimCharacter,
    },
    roundResult: null,
  };
}

function isValidSavedState(savedState) {
  return (
    savedState &&
    savedState.storageVersion === STORAGE_VERSION &&
    typeof savedState.phase === "string" &&
    savedState.scores &&
    Number.isFinite(Number(savedState.scores.chen)) &&
    Number.isFinite(Number(savedState.scores.brazim))
  );
}

function restoreSavedState(savedState) {
  stopLoop();
  clearRoundTimeout();
  Object.assign(state, createInitialState(), {
    phase: savedState.phase,
    roundNumber: Math.max(1, Number(savedState.roundNumber) || 1),
    totalEliminations: clamp(Number(savedState.totalEliminations) || 0, 0, MAX_TOTAL_ELIMINATIONS),
    scores: {
      chen: Math.max(0, Number(savedState.scores.chen) || 0),
      brazim: Math.max(0, Number(savedState.scores.brazim) || 0),
    },
    debugSolo: Boolean(savedState.debugSolo),
    matchElapsedTotal: Math.max(0, Number(savedState.matchElapsedTotal) || 0),
    elapsed: Math.max(0, Number(savedState.elapsed) || 0),
    representatives: {
      chen: savedState.representatives?.chen || "",
      brazim: savedState.representatives?.brazim || "",
    },
    selectedCharacters: {
      chen: normalizeCharacterId(
        savedState.selectedCharacters?.chen || getCharacterIdByName("chen", savedState.representatives?.chen || ""),
      ),
      brazim: normalizeCharacterId(
        savedState.selectedCharacters?.brazim || getCharacterIdByName("brazim", savedState.representatives?.brazim || ""),
      ),
    },
    roundResult: normalizeRoundResultForStorage(savedState.roundResult),
  });

  syncCharacterFocusFromState();
  syncCharacterSelectionUI();
  updateStartButtonState();
  updateDebugModeBadge();
  clearStartValidation();

  if (state.phase === "start") {
    showStartScreen();
    saveState();
    return;
  }

  if (state.phase === "rules") {
    restoreRulesState();
    return;
  }

  if (state.phase === "gameOver") {
    restoreGameOverState();
    return;
  }

  restoreToRoundStart(savedState.phase === "countdown" ? state.roundResult : null);
}

function restoreStartSelectionState(shouldOpenSelection) {
  startIntroStarted = shouldOpenSelection;
  els.startScreen.classList.remove("is-hidden");
  els.startScreen.classList.toggle("is-intro-open", shouldOpenSelection);
  els.gameScreen.classList.add("is-hidden");
  hideRulesOverlay();
  els.countdownOverlay.classList.add("is-hidden");
  els.gameOverOverlay.classList.add("is-hidden");
  els.gameOverOverlay.innerHTML = "";
  els.feedbackLayer.innerHTML = "";
  els.startButton.textContent = shouldOpenSelection ? "התחל משחק" : "התחל";
  syncCharacterSelectionUI();
  updateStartButtonState();
  updateDebugModeBadge();
  clearStartValidation();
}

function restoreRulesState() {
  startIntroStarted = true;
  els.startScreen.classList.remove("is-hidden");
  els.startScreen.classList.add("is-intro-open");
  els.gameScreen.classList.add("is-hidden");
  els.countdownOverlay.classList.add("is-hidden");
  els.gameOverOverlay.classList.add("is-hidden");
  els.gameOverOverlay.innerHTML = "";
  els.feedbackLayer.innerHTML = "";
  els.startButton.textContent = "התחל משחק";
  els.startButton.disabled = true;
  syncCharacterSelectionUI();
  updateDebugModeBadge();
  clearStartValidation();
  showRulesOverlay(() => {
    if (state.phase !== "rules") return;
    startCountdownFlow();
  });
  startStartScreenMusic();
}

function restoreToRoundStart(roundResult = null) {
  state.phase = "countdown";
  beginRoundCountdown(roundResult);
}

function restoreGameOverState() {
  stopStartScreenMusic();
  state.assignments = getNextAssignments();
  state.players = createPlayers(state.assignments);
  state.enemies = [];
  state.effects = [];

  els.startScreen.classList.add("is-hidden");
  els.gameScreen.classList.remove("is-hidden");
  els.countdownOverlay.classList.add("is-hidden");
  els.gameOverOverlay.classList.add("is-hidden");
  els.gameOverOverlay.innerHTML = "";
  resizeCanvas();
  positionPlayers();
  endMatch();
}

function normalizeRoundResultForStorage(roundResult) {
  if (!roundResult || typeof roundResult !== "object") return null;

  return {
    eliminatedLabel: String(roundResult.eliminatedLabel || ""),
    eliminatedId: roundResult.eliminatedId || null,
    eliminatedHadRepresentative: Boolean(roundResult.eliminatedHadRepresentative),
    scoringId: roundResult.scoringId || null,
    durationSeconds: Math.max(0, Number(roundResult.durationSeconds) || 0),
  };
}

function toggleDebugSoloMode() {
  if (state.phase !== "start") return;

  state.debugSolo = !state.debugSolo;
  clearStartValidation();
  updateDebugModeBadge();
  updateStartButtonState();
  saveState();
}

function updateDebugModeBadge() {
  if (!els.debugModeBadge) return;

  els.debugModeBadge.classList.toggle("is-hidden", !state.debugSolo);
}

function stopLoop() {
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function handleKeyDown(event) {
  const code = event.code;
  if (state.phase === "rules" && code === "Space" && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    event.stopPropagation();
    completeRulesOverlayNow();
    return;
  }

  if (state.phase === "countdown" && code === "Space" && !event.metaKey && !event.ctrlKey && !event.altKey) {
    if (skipDebugStageCountdownNow()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
  }

  if ((event.metaKey || event.ctrlKey) && code === "KeyD") {
    event.preventDefault();
    event.stopPropagation();
    if (state.phase === "start") {
      toggleDebugSoloMode();
    } else {
      openResetModal();
    }
    return;
  }

  if (shouldBlockBrowserShortcut(event)) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  if (shouldIgnoreGameKeyEvent(event)) return;
  if (state.phase !== "playing") return;
  if (isGameCode(code)) {
    event.preventDefault();
    event.stopPropagation();
  }
  pressedKeys.add(code);
}

function handleKeyUp(event) {
  if (shouldIgnoreGameKeyEvent(event)) return;
  pressedKeys.delete(event.code);
}

function skipDebugStageCountdownNow() {
  if (!state.debugSolo || state.phase !== "countdown") return false;
  const hasActiveStageCountdown = Boolean(stageCountdownState);
  const hasPendingRoundStart = roundTimeoutState?.callback === startGame;
  if (!hasActiveStageCountdown && !hasPendingRoundStart) return false;

  if (roundCountdownIntervalId) {
    window.clearTimeout(roundCountdownIntervalId);
    roundCountdownIntervalId = null;
  }

  if (roundTimeoutId) {
    window.clearTimeout(roundTimeoutId);
    roundTimeoutId = null;
  }

  stageCountdownState = null;
  roundTimeoutState = null;
  els.countdownNumber.textContent = "";
  startGame();
  return true;
}

function shouldBlockBrowserShortcut(event) {
  if (!isGameSessionActive()) return false;
  if (!(event.metaKey || event.ctrlKey || event.altKey)) return false;
  return true;
}

function preventGameBrowserZoom(event) {
  if (!isGameSessionActive()) return;
  if (!event.metaKey && !event.ctrlKey) return;

  event.preventDefault();
  event.stopPropagation();
}

function isGameSessionActive() {
  return state.phase !== "start";
}

function shouldIgnoreGameKeyEvent(event) {
  return ["INPUT", "TEXTAREA", "SELECT"].includes(event.target?.tagName);
}

function isGameCode(code) {
  return ["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(code);
}

function clearRoundTimeout() {
  clearRulesTimeout();
  if (roundTimeoutId) {
    window.clearTimeout(roundTimeoutId);
    roundTimeoutId = null;
  }
  roundTimeoutState = null;

  if (roundCountdownIntervalId) {
    window.clearTimeout(roundCountdownIntervalId);
    roundCountdownIntervalId = null;
  }
  stageCountdownState = null;
}

function scheduleRoundTimeout(callback, delayMs) {
  if (roundTimeoutId) {
    window.clearTimeout(roundTimeoutId);
    roundTimeoutId = null;
  }

  roundTimeoutState = {
    callback,
    remainingMs: Math.max(0, delayMs),
    startedAt: performance.now(),
  };

  if (visibilityFrozen) return;
  resumeRoundTimeout();
}

function resumeRoundTimeout() {
  if (!roundTimeoutState || roundTimeoutId) return;

  roundTimeoutState.startedAt = performance.now();
  roundTimeoutId = window.setTimeout(() => {
    const callback = roundTimeoutState?.callback;
    roundTimeoutId = null;
    roundTimeoutState = null;
    callback?.();
  }, roundTimeoutState.remainingMs);
}

function scheduleStageCountdownTick(delayMs) {
  if (!stageCountdownState) return;
  if (roundCountdownIntervalId) {
    window.clearTimeout(roundCountdownIntervalId);
    roundCountdownIntervalId = null;
  }

  stageCountdownState.remainingMs = Math.max(0, delayMs);
  stageCountdownState.startedAt = performance.now();

  if (visibilityFrozen) return;
  resumeStageCountdownTick();
}

function resumeStageCountdownTick() {
  if (!stageCountdownState || roundCountdownIntervalId) return;

  stageCountdownState.startedAt = performance.now();
  roundCountdownIntervalId = window.setTimeout(handleStageCountdownTick, stageCountdownState.remainingMs);
}

function handleStageCountdownTick() {
  roundCountdownIntervalId = null;
  if (!stageCountdownState || visibilityFrozen) return;

  stageCountdownState.current -= 1;

  if (stageCountdownState.current <= 0) {
    stageCountdownState = null;
    els.countdownNumber.textContent = "יאללה!";
    scheduleRoundTimeout(startGame, 320);
    return;
  }

  els.countdownNumber.textContent = `מתחילים בעוד ${stageCountdownState.current}`;
  scheduleStageCountdownTick(1000);
}

function handleVisibilityChange() {
  if (document.hidden) {
    freezeForHiddenPage();
    return;
  }

  resumeFromHiddenPage();
}

function freezeIfPageAlreadyHidden() {
  if (document.hidden) freezeForHiddenPage();
}

function freezeForHiddenPage() {
  if (visibilityFrozen) return;

  visibilityFrozen = true;
  visibilityFreezeStartedAt = performance.now();
  if ((state.phase === "playing" || state.phase === "eliminating") && state.startedAt) {
    state.elapsed = Math.max(0, (visibilityFreezeStartedAt - state.startedAt) / 1000);
  }
  pressedKeys.clear();
  pauseRareAdolfJacksonPresenceSound();
  pauseStageMusic();
  pauseStartScreenMusic();
  pauseRoundTimers();
  stopLoop();
  saveState();
}

function resumeFromHiddenPage() {
  if (!visibilityFrozen) return;

  const pausedMs = Math.max(0, performance.now() - visibilityFreezeStartedAt);
  visibilityFrozen = false;
  visibilityFreezeStartedAt = 0;
  adjustAbsoluteRuntimeTimes(pausedMs);
  resumeRoundTimers();
  syncRareAdolfJacksonPresenceSound();
  resumeStartScreenMusic();
  if (activeStageMusicAudio && (state.phase === "countdown" || state.phase === "playing" || state.phase === "eliminating")) {
    activeStageMusicAudio.play().catch(() => {
      // Browser audio may be blocked until a user gesture; gameplay continues silently.
    });
  }

  if ((state.phase === "playing" || state.phase === "eliminating") && !animationFrameId) {
    lastFrameTime = performance.now();
    animationFrameId = window.requestAnimationFrame(gameLoop);
  }
}

function pauseRoundTimers() {
  const now = performance.now();

  if (roundTimeoutId && roundTimeoutState) {
    roundTimeoutState.remainingMs = Math.max(0, roundTimeoutState.remainingMs - (now - roundTimeoutState.startedAt));
    window.clearTimeout(roundTimeoutId);
    roundTimeoutId = null;
  }

  if (roundCountdownIntervalId && stageCountdownState) {
    stageCountdownState.remainingMs = Math.max(0, stageCountdownState.remainingMs - (now - stageCountdownState.startedAt));
    window.clearTimeout(roundCountdownIntervalId);
    roundCountdownIntervalId = null;
  }
}

function resumeRoundTimers() {
  resumeRoundTimeout();
  resumeStageCountdownTick();
}

function adjustAbsoluteRuntimeTimes(pausedMs) {
  if (!pausedMs || (state.phase !== "playing" && state.phase !== "eliminating")) return;

  state.startedAt += pausedMs;
  state.effects.forEach((effect) => {
    effect.createdAt += pausedMs;
  });
  state.players.forEach((player) => {
    if (player.damageFlashUntil) player.damageFlashUntil += pausedMs;
    if (player.invulnerableUntil) player.invulnerableUntil += pausedMs;
  });
  lastDiagnosticLogAt += pausedMs;
}

function logRuntimeDiagnostics(now) {
  if (!DEBUG_LOGS || now - lastDiagnosticLogAt < DIAGNOSTIC_INTERVAL_MS) return;

  lastDiagnosticLogAt = now;
  const rect = getCanvasRect();
  const invisibleEnemies = state.enemies.filter((enemy) => (
    enemy.x + enemy.radius < 0 ||
    enemy.x - enemy.radius > rect.width ||
    enemy.y + enemy.radius < 0 ||
    enemy.y - enemy.radius > rect.height
  )).length;

  debugLog("runtime-diagnostics", {
    phase: state.phase,
    round: state.roundNumber,
    elapsed: Math.round(state.elapsed),
    score: state.scores,
    enemies: summarizeEnemies(),
    invisibleEnemies,
    cap: getCurrentEnemyCap(),
    spawned: totalSpawnedEnemies,
    removed: totalRemovedEnemies,
    tintCache: tintedSpriteCache.size,
    slowFrames: slowFrameCount,
    canvas: getCanvasDiagnostics(),
  });

  if (tintedSpriteCache.size > TINT_CACHE_LIMIT * 0.75) {
    debugWarn("tint-cache-high", {
      size: tintedSpriteCache.size,
      limit: TINT_CACHE_LIMIT,
    });
  }
}

function summarizeEnemies() {
  return state.enemies.reduce((summary, enemy) => {
    summary.total += 1;
    summary.behavior[enemy.behavior] = (summary.behavior[enemy.behavior] || 0) + 1;
    summary.tier[enemy.sizeTierId] = (summary.tier[enemy.sizeTierId] || 0) + 1;
    summary.type[enemy.typeId] = (summary.type[enemy.typeId] || 0) + 1;
    return summary;
  }, {
    total: 0,
    behavior: {},
    tier: {},
    type: {},
  });
}

function getCanvasDiagnostics() {
  return {
    cssWidth: Math.round(canvasViewWidth),
    cssHeight: Math.round(canvasViewHeight),
    pixelWidth: els.canvas.width,
    pixelHeight: els.canvas.height,
    ratio: canvasPixelRatio,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  };
}

function getRoundProfileDiagnostics(profile) {
  return {
    warmupSeconds: profile.warmupSeconds,
    maxEnemies: profile.maxEnemies,
    maxEnemiesAbsolute: profile.maxEnemiesAbsolute,
    waveEvery: profile.waveEvery,
    waveAdd: profile.waveAdd,
    capGrowth: profile.capGrowth,
    randomChance: profile.randomChance,
  };
}

function roundPoint(point) {
  return {
    x: Math.round(point.x),
    y: Math.round(point.y),
  };
}

function debugLog(label, details = {}) {
  if (!DEBUG_LOGS) return;
  console.log(`[submarine:${label}]`, details);
}

function debugWarn(label, details = {}) {
  if (!DEBUG_LOGS) return;
  console.warn(`[submarine:${label}]`, details);
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function formatSurvivalDuration(seconds) {
  return formatTime(seconds);
}

function getDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}
