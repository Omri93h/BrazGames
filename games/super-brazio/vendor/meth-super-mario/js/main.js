import Level from './Level.js';
import Timer from './Timer.js';
import Pipe from './traits/Pipe.js';
import {createLevelLoader} from './loaders/level.js';
import {loadFont} from './loaders/font.js';
import {loadEntities} from './entities.js';
import {makePlayer, bootstrapPlayer, resetPlayer, findPlayers} from './player.js';
import {setupKeyboard} from './input.js';
import {createColorLayer} from './layers/color.js';
import {createTextLayer} from './layers/text.js';
import Go from './traits/Go.js';
import Killable from './traits/Killable.js';
import Player from './traits/Player.js';
import Pole from './traits/Pole.js';
import PipeTraveller from './traits/PipeTraveller.js';
import SceneRunner from './SceneRunner.js';
import Scene from './Scene.js';
import {Vec2} from './math.js';
import { connectEntity } from './traits/Pipe.js';
import {createPsychedelicEffect} from './effects/psychedelic.js';
import {collectReachedCheckpoints, getActiveCheckpoint} from './checkpoints.js';

const params = new URLSearchParams(window.location.search);
const playerTeam = params.get('team') || 'unknown';
window.superBrazioPlayerTeam = playerTeam;
window.superBrazioDisableLevelMusic = params.get('parentMusic') === '1';
const startLevelName = params.get('level') || '1-1';
const finalLevelName = params.get('finalLevel') || 'brazio-2';
const finishX = Number(params.get('finishX') || 3292);
const pitDeathY = Number(params.get('pitDeathY') || 285);
const debugMode = params.get('debug') === '1';
let debugOverlayEnabled = debugMode || params.get('debugHud') === '1';
const firstWorldName = '1-1';
const secondWorldName = 'brazio-2';
const FADE_OUT_SECONDS = 0.45;
const FADE_HOLD_SECONDS = 0.24;
const FADE_IN_SECONDS = 0.55;
const ENEMY_DEATH_FLASH_SECONDS = 3;
const PIT_RESPAWN_SECONDS = 0.55;
const RESPAWN_GRACE_SECONDS = 3;
const DEATH_FLASH_INTERVAL_SECONDS = 0.15;
const SPEED_BOOST_SECONDS = 10;
const CONTROLS_INVERTED_SECONDS = 10;
const SPEED_BOOST_ACCELERATION_MULTIPLIER = 1.18;
const SPEED_BOOST_DRAG_MULTIPLIER = 0.72;
const DEBUG_STATE_POST_INTERVAL_SECONDS = 0.15;
const DEBUG_SAFE_SPOT_MAX_DISTANCE = 160;
const DEBUG_RESCUE_SCAN_TILES = 18;
const RESPAWN_GRAYSCALE_FILTER = 'grayscale(1) contrast(1.08)';
window.superBrazioParentControlled = params.get('autostart') === '1';

async function main(canvas) {
    const videoContext = canvas.getContext('2d');
    const audioContext = new AudioContext();
    const psychedelicEffect = createPsychedelicEffect(canvas);
    let hasReportedFinish = false;

    const [entityFactory, font] = await Promise.all([
        loadEntities(audioContext),
        loadFont(),
    ]);


    const loadLevel = await createLevelLoader(entityFactory);

    const sceneRunner = new SceneRunner();
    window.sceneRunner = sceneRunner;

    const mario = entityFactory.mario();
    makePlayer(mario, "MARIO");
    const goTrait = mario.traits.get(Go);
    const baseGoTuning = {
        acceleration: goTrait.acceleration,
        dragFactor: goTrait.dragFactor,
    };
    let speedBoostSeconds = 0;
    let controlsInvertedSeconds = 0;
    let respawnLock = false;
    let deathFlashElapsed = 0;
    let respawnDelaySeconds = PIT_RESPAWN_SECONDS;
    let respawnLevel = null;
    let debugSafeSpot = null;
    let pendingDebugRespawnSpot = null;
    let worldTransition = null;
    let lastDebugStatePostAt = -Infinity;
    window.superBrazioInputLocked = false;
    window.superBrazioPsychedelic = {
        activate: () => psychedelicEffect.activate(),
        clear: () => psychedelicEffect.clear(),
        get active() {
            return psychedelicEffect.active;
        },
    };
    window.superBrazioPowerupState = {
        activate(type) {
            activateTimedPowerup(type);
        },
        clear() {
            clearTimedPowerups();
        },
        get speedBoostActive() {
            return speedBoostSeconds > 0;
        },
        get controlsInverted() {
            return controlsInvertedSeconds > 0;
        },
    };

    window.mario = mario;

    const inputRouter = setupKeyboard(window);
    inputRouter.addReceiver(mario);
    window.superBrazioReleaseInput = ({locked = window.superBrazioInputLocked} = {}) => {
        window.superBrazioInputLocked = Boolean(locked);
        resetControlState();
    };

    function createLoadingScreen(name) {
        const scene = new Scene();
        scene.comp.layers.push(createColorLayer('#000'));
        scene.comp.layers.push(createTextLayer(font, `Loading ${name}...`));
        return scene;
    }

    async function setupLevel(name, {showLoading = true, resetPower = true} = {}) {
        if (showLoading) {
            const loadingScreen = createLoadingScreen(name);
            sceneRunner.addScene(loadingScreen);
            sceneRunner.runNext();
        }

        const level = await loadLevel(name);
        const player = mario.traits.get(Player);
        if (resetPower) {
            player.powerDown(mario, {preserveBottom: false});
        }
        player.resetDamageGrace();
        bootstrapPlayer(mario, level);
        snapMarioToSpawnFloor(level);
        if (debugMode) {
            debugSafeSpot = new Vec2(mario.pos.x, mario.pos.y);
        }

        level.events.listen(Level.EVENT_TRIGGER, (spec, trigger, touches) => {
            if (spec.type === "goto") {
                for (const _ of findPlayers(touches)) {
                    startWorld(spec.name);
                    return;
                }
            }
        });

        level.events.listen(Pole.EVENT_TRAVEL_COMPLETE, () => {
            if (level.name === firstWorldName && !worldTransition && !hasReportedFinish) {
                startWorldTransition(level, secondWorldName);
            }
        });

        level.events.listen(Pipe.EVENT_PIPE_COMPLETE, async pipe => {
            if (pipe.props.goesTo) {
                const nextLevel = await setupLevel(pipe.props.goesTo.name);
                sceneRunner.addScene(nextLevel);
                sceneRunner.runNext();
                if (pipe.props.backTo) {
                    console.log(pipe.props);
                    nextLevel.events.listen(Level.EVENT_COMPLETE, async () => {
                        const level = await setupLevel(name);
                        const exitPipe = level.entities.get(pipe.props.backTo);
                        connectEntity(exitPipe, mario);
                        sceneRunner.addScene(level);
                        sceneRunner.runNext();
                    });
                }
            } else {
                level.events.emit(Level.EVENT_COMPLETE);
            }
        });

        return level;
    }

    async function startWorld(name) {
        const level = await setupLevel(name);
        resetPlayer(mario, name);
        const player = mario.traits.get(Player);
        player.lives = 3;
        player.powerDown(mario, {preserveBottom: false});
        player.resetDamageGrace();

        sceneRunner.addScene(level);
        sceneRunner.runNext();
        window.parent.postMessage({
            source: 'super-brazio-vendor',
            type: 'ready',
            team: playerTeam,
            level: name,
        }, '*');
    }

    const gameContext = {
        audioContext,
        videoContext,
        entityFactory,
        deltaTime: null,
        tick: 0,
    };

    const timer = new Timer(1/60);
    timer.update = function update(deltaTime) {
        gameContext.tick++;
        gameContext.deltaTime = deltaTime;

        const currentScene = sceneRunner.scenes[sceneRunner.sceneIndex];
        if (currentScene instanceof Level) {
            if (worldTransition) {
                currentScene.draw(gameContext);
                psychedelicEffect.clear();
                drawWorldTransition(deltaTime, currentScene);
                return;
            }

            if (respawnLock) {
                updateRespawnLock(deltaTime);
                currentScene.draw(gameContext);
                updateDebugOverlay(currentScene);
                return;
            }

            updateTimedPowerups(deltaTime);
            rememberDebugSafeSpot();
            currentScene.update(gameContext);
            handleCheckpointFlags(currentScene);
            handlePlayerDeath(currentScene);
            const killable = mario.traits.get(Killable);
            if (!hasReportedFinish &&
                !respawnLock &&
                !killable.dead &&
                currentScene.name === finalLevelName &&
                mario.pos.y < pitDeathY &&
                mario.pos.x >= finishX) {
                hasReportedFinish = true;
                psychedelicEffect.clear();
                window.parent.postMessage({
                    source: 'super-brazio-vendor',
                    type: 'finish',
                    team: playerTeam,
                    level: currentScene.name,
                    x: mario.pos.x,
                }, '*');
            }
            currentScene.draw(gameContext);
            psychedelicEffect.update(deltaTime);
            psychedelicEffect.draw(videoContext);
            updateDebugOverlay(currentScene);
            return;
        }

        sceneRunner.update(gameContext);
    }

    function activateTimedPowerup(type) {
        if (type === 'yellow') {
            speedBoostSeconds = SPEED_BOOST_SECONDS;
            updateSpeedBoostTuning();
        } else if (type === 'purple') {
            controlsInvertedSeconds = CONTROLS_INVERTED_SECONDS;
        }
    }

    function updateTimedPowerups(deltaTime) {
        if (speedBoostSeconds > 0) {
            speedBoostSeconds = Math.max(0, speedBoostSeconds - deltaTime);
            updateSpeedBoostTuning();
        }

        if (controlsInvertedSeconds > 0) {
            controlsInvertedSeconds = Math.max(0, controlsInvertedSeconds - deltaTime);
            if (controlsInvertedSeconds === 0) {
                releaseInputState();
            }
        }
    }

    function clearTimedPowerups() {
        speedBoostSeconds = 0;
        controlsInvertedSeconds = 0;
        updateSpeedBoostTuning();
    }

    function updateSpeedBoostTuning() {
        const active = speedBoostSeconds > 0;
        goTrait.acceleration = baseGoTuning.acceleration * (active ? SPEED_BOOST_ACCELERATION_MULTIPLIER : 1);
        goTrait.dragFactor = baseGoTuning.dragFactor * (active ? SPEED_BOOST_DRAG_MULTIPLIER : 1);
    }

    function handlePlayerDeath(level) {
        const killable = mario.traits.get(Killable);
        const fellInPit = mario.pos.y > pitDeathY;
        if (!killable.dead && fellInPit) {
            killable.dead = true;
        }

        if (!killable.dead || respawnLock || hasReportedFinish) {
            return;
        }

        respawnLock = true;
        setRespawnVisualState(true);
        deathFlashElapsed = 0;
        respawnDelaySeconds = fellInPit ? PIT_RESPAWN_SECONDS : ENEMY_DEATH_FLASH_SECONDS;
        respawnLevel = level;
        pendingDebugRespawnSpot = debugMode && !fellInPit
            ? getDebugRespawnSpot(level, mario.pos.x)
            : null;
        window.superBrazioInputLocked = true;
        psychedelicEffect.clear();
        resetControlState();
        mario.hidden = false;
        const player = mario.traits.get(Player);
        if (debugMode && pendingDebugRespawnSpot) {
            respawnDelaySeconds = ENEMY_DEATH_FLASH_SECONDS;
        } else {
            player.lives = Math.max(0, player.lives - 1);
        }

        window.parent.postMessage({
            source: 'super-brazio-vendor',
            type: 'damage',
            team: playerTeam,
            lives: player.lives,
        }, '*');
    }

    function updateRespawnLock(deltaTime) {
        if (!respawnLevel) {
            return;
        }

        deathFlashElapsed += deltaTime;
        if (respawnDelaySeconds >= ENEMY_DEATH_FLASH_SECONDS) {
            mario.hidden = Math.floor(deathFlashElapsed / DEATH_FLASH_INTERVAL_SECONDS) % 2 === 1;
        }

        if (deathFlashElapsed >= respawnDelaySeconds) {
            finishRespawn(respawnLevel);
        }
    }

    function finishRespawn(level) {
        const checkpoint = debugMode && pendingDebugRespawnSpot
            ? pendingDebugRespawnSpot
            : getActiveCheckpoint(level);
        const player = mario.traits.get(Player);
        const killable = mario.traits.get(Killable);
        mario.hidden = false;
        player.powerDown(mario, {preserveBottom: false});
        player.resetDamageGrace();
        mario.pos.copy(checkpoint);
        window.__SUPER_BRAZIO_LAST_RESPAWN__ = {
            x: checkpoint.x,
            y: checkpoint.y,
            debug: debugMode,
            level: level.name,
        };
        snapMarioToSpawnFloor(level);
        resetControlState();
        killable.revive();
        player.damageGrace = RESPAWN_GRACE_SECONDS;
        if (player.lives <= 0) {
            player.lives = 3;
            player.coins = 0;
            player.score = 0;
        }
        respawnLock = false;
        setRespawnVisualState(false);
        deathFlashElapsed = 0;
        respawnDelaySeconds = PIT_RESPAWN_SECONDS;
        respawnLevel = null;
        pendingDebugRespawnSpot = null;
        window.superBrazioInputLocked = false;
    }

    function setRespawnVisualState(enabled) {
        canvas.style.transition = enabled
            ? 'filter 80ms linear'
            : 'filter 180ms ease-out';
        canvas.style.filter = enabled ? RESPAWN_GRAYSCALE_FILTER : '';
    }

    function rememberDebugSafeSpot() {
        if (!debugMode || respawnLock || worldTransition) {
            return;
        }
        const killable = mario.traits.get(Killable);
        if (killable.dead || mario.pos.y >= pitDeathY - 24 || Math.abs(mario.vel.y) > 1) {
            return;
        }
        if (!debugSafeSpot) {
            debugSafeSpot = new Vec2(mario.pos.x, mario.pos.y);
            return;
        }
        debugSafeSpot.set(mario.pos.x, mario.pos.y);
    }

    function getDebugRespawnSpot(level, failureX) {
        if (debugSafeSpot && Math.abs(debugSafeSpot.x - failureX) <= DEBUG_SAFE_SPOT_MAX_DISTANCE) {
            return new Vec2(debugSafeSpot.x, debugSafeSpot.y);
        }
        const rescueSpot = findDebugRescueSpot(level, failureX);
        if (rescueSpot) {
            return rescueSpot;
        }
        const checkpoint = getActiveCheckpoint(level);
        return new Vec2(checkpoint.x, checkpoint.y);
    }

    function findDebugRescueSpot(level, failureX) {
        const tileSize = 16;
        const centerTile = Math.max(0, Math.floor(failureX / tileSize));
        const candidates = [];
        for (const resolver of level.tileCollider.resolvers) {
            for (let dx = 0; dx <= DEBUG_RESCUE_SCAN_TILES; dx++) {
                const offsets = dx === 0 ? [0] : [-dx, dx];
                for (const offset of offsets) {
                    const tileX = centerTile + offset;
                    if (tileX < 0) continue;
                    collectDebugRescueCandidates(level, resolver, tileX, candidates, tileSize);
                }
            }
        }

        candidates.sort((a, b) => {
            const distanceA = Math.abs(a.x - failureX);
            const distanceB = Math.abs(b.x - failureX);
            return distanceA - distanceB || a.y - b.y;
        });

        return candidates[0] ? new Vec2(candidates[0].x, candidates[0].y) : null;
    }

    function collectDebugRescueCandidates(level, resolver, tileX, candidates, tileSize) {
        for (let tileY = 0; tileY <= Math.floor(pitDeathY / tileSize); tileY++) {
            const floor = resolver.getByIndex(tileX, tileY);
            if (!isSolidTile(floor?.tile)) {
                continue;
            }

            const floorTop = floor.y1;
            const candidate = new Vec2(
                floor.x1 + Math.max(1, (tileSize - 14) / 2),
                floorTop - 16,
            );
            if (isDebugRespawnCandidateClear(level, candidate)) {
                candidates.push(candidate);
            }
        }
    }

    function isDebugRespawnCandidateClear(level, candidate) {
        const left = candidate.x + 1;
        const right = candidate.x + 13;
        const top = candidate.y + 1;
        const bottom = candidate.y + 15;
        for (const resolver of level.tileCollider.resolvers) {
            const blockers = resolver.searchByRange(left, right, top, bottom)
                .filter(match => isSolidTile(match.tile));
            if (blockers.length) {
                return false;
            }
        }
        return true;
    }

    function isSolidTile(tile) {
        return Boolean(tile && (
            tile.behavior === 'ground' ||
            tile.behavior === 'brick' ||
            tile.style === 'chance'
        ));
    }

    function handleCheckpointFlags(level) {
        if (respawnLock || worldTransition) {
            return;
        }

        collectReachedCheckpoints(level, mario).forEach(flag => {
            mario.sounds.add('coin');
            window.parent.postMessage({
                source: 'super-brazio-vendor',
                type: 'checkpoint',
                team: playerTeam,
                level: level.name,
                index: flag.index + 1,
                x: flag.pos.x,
            }, '*');
        });
    }

    function startWorldTransition(level, nextLevelName) {
        worldTransition = {
            phase: 'fadeOut',
            alpha: 0,
            elapsed: 0,
            holdElapsed: 0,
            nextLevelName,
            loadPromise: null,
            levelLoaded: false,
        };
        window.superBrazioInputLocked = true;
        psychedelicEffect.clear();
        resetControlState();
        level.pause();
    }

    function drawWorldTransition(deltaTime, currentScene) {
        if (!worldTransition) {
            return;
        }

        const transition = worldTransition;
        if (transition.phase === 'fadeOut') {
            transition.elapsed += deltaTime;
            transition.alpha = Math.min(1, transition.elapsed / FADE_OUT_SECONDS);
            if (transition.alpha >= 1) {
                transition.phase = 'hold';
                transition.holdElapsed = 0;
                transition.loadPromise = loadTransitionLevel(transition.nextLevelName);
            }
        } else if (transition.phase === 'hold') {
            transition.holdElapsed += deltaTime;
            if (transition.levelLoaded && transition.holdElapsed >= FADE_HOLD_SECONDS) {
                transition.phase = 'fadeIn';
                transition.elapsed = 0;
                transition.alpha = 1;
            }
        } else if (transition.phase === 'fadeIn') {
            transition.elapsed += deltaTime;
            transition.alpha = Math.max(0, 1 - transition.elapsed / FADE_IN_SECONDS);
            if (transition.alpha <= 0) {
                worldTransition = null;
                window.superBrazioInputLocked = false;
            }
        }

        videoContext.save();
        videoContext.globalAlpha = transition.alpha;
        videoContext.fillStyle = '#000';
        videoContext.fillRect(0, 0, canvas.width, canvas.height);
        videoContext.restore();
    }

    async function loadTransitionLevel(nextLevelName) {
        try {
            const nextLevel = await setupLevel(nextLevelName, {
                showLoading: false,
                resetPower: false,
            });
            resetPlayer(mario, nextLevelName);
            resetControlState();
            sceneRunner.addScene(nextLevel);
            sceneRunner.runNext();
            window.parent.postMessage({
                source: 'super-brazio-vendor',
                type: 'level-change',
                team: playerTeam,
                level: nextLevelName,
            }, '*');
            if (worldTransition) {
                worldTransition.levelLoaded = true;
            }
        } catch (error) {
            console.error(error);
            window.parent.postMessage({
                source: 'super-brazio-vendor',
                type: 'load-error',
                message: error.message,
            }, '*');
        }
    }

    function snapMarioToSpawnFloor(level) {
        const searchBottom = mario.bounds.bottom + 40;
        const matches = [];
        for (const resolver of level.tileCollider.resolvers) {
            matches.push(...resolver.searchByRange(
                mario.bounds.left + 1,
                mario.bounds.right - 1,
                mario.bounds.bottom,
                searchBottom,
            ));
        }

        const floor = matches
            .filter(match => match.tile.behavior === 'ground' || match.tile.behavior === 'brick' || match.tile.style === 'chance')
            .sort((a, b) => a.y1 - b.y1)[0];

        if (floor) {
            mario.bounds.bottom = floor.y1;
        }
    }

    function stopMarioMotion() {
        mario.vel.set(0, 0);
        mario.traits.get(Go).dir = 0;
        mario.traits.get(PipeTraveller).direction.set(0, 0);
    }

    function releaseInputState() {
        inputRouter.reset?.();
        stopMarioMotion();
    }

    function resetControlState() {
        releaseInputState();
        clearTimedPowerups();
    }

    function updateDebugOverlay(level) {
        if (!debugOverlayEnabled) {
            return;
        }

        const tileSize = 16;
        const camera = level.camera;
        const cameraStartTile = Math.floor(camera.pos.x / tileSize);
        const cameraEndTile = Math.floor((camera.pos.x + camera.size.x) / tileSize);
        const nearbyEnemies = getNearbyDebugEnemies(level, tileSize);
        const nearbyFlags = getNearbyDebugFlags(level, tileSize);

        drawDebugGrid(level, tileSize, cameraStartTile, cameraEndTile);
        drawDebugEnemyMarkers(level, nearbyEnemies);
        drawDebugFlagMarkers(level, nearbyFlags);
        postDebugState(level, tileSize, cameraStartTile, cameraEndTile, nearbyEnemies, nearbyFlags);
    }

    function postDebugState(level, tileSize, cameraStartTile, cameraEndTile, nearbyEnemies, nearbyFlags) {
        if (level.totalTime - lastDebugStatePostAt < DEBUG_STATE_POST_INTERVAL_SECONDS) {
            return;
        }

        lastDebugStatePostAt = level.totalTime;
        const tileX = Math.floor(mario.bounds.meridian / tileSize);
        const tileY = Math.floor((mario.bounds.bottom - 1) / tileSize);
        window.parent.postMessage({
            source: 'super-brazio-vendor',
            type: 'debug-state',
            level: level.name,
            cameraStartTile,
            cameraEndTile,
            marioX: mario.pos.x,
            marioY: mario.pos.y,
            marioTileX: tileX,
            marioTileY: tileY,
            velX: mario.vel.x,
            velY: mario.vel.y,
            under: getTileSummary(level, tileX, tileY + 1),
            body: getTileSummary(level, tileX, tileY),
            nearbyIce: nearbyEnemies,
            nearbyFlags,
        }, '*');
    }

    function getTileSummary(level, tileX, tileY) {
        const tiles = [];
        for (const resolver of level.tileCollider.resolvers) {
            const match = resolver.getByIndex(tileX, tileY);
            if (match) {
                tiles.push(match.tile.style || match.tile.behavior || 'tile');
            }
        }
        return tiles.join('+');
    }

    function getNearbyDebugEnemies(level, tileSize) {
        return [...level.entities]
            .filter(entity => entity.debugName && entity.debugName.startsWith('ice-agent'))
            .map(entity => {
                const killable = entity.traits.get(Killable);
                return {
                    id: entity.debugId,
                    name: entity.debugName,
                    dead: Boolean(killable?.dead),
                    x: entity.pos.x,
                    y: entity.pos.y,
                    tileX: Math.floor(entity.bounds.meridian / tileSize),
                    tileY: Math.floor((entity.bounds.bottom - 1) / tileSize),
                    dx: Math.round(entity.pos.x - mario.pos.x),
                };
            })
            .filter(enemy => Math.abs(enemy.dx) <= 420)
            .sort((a, b) => Math.abs(a.dx) - Math.abs(b.dx))
            .slice(0, 5);
    }

    function getNearbyDebugFlags(level, tileSize) {
        return (level.checkpointFlags || [])
            .map(flag => ({
                id: flag.index + 1,
                reached: Boolean(flag.reached),
                x: flag.pos.x,
                y: flag.pos.y,
                tileX: Math.floor(flag.pos.x / tileSize),
                tileY: Math.floor((flag.pos.y - 1) / tileSize),
                dx: Math.round(flag.pos.x - mario.pos.x),
            }))
            .filter(flag => Math.abs(flag.dx) <= 520)
            .sort((a, b) => Math.abs(a.dx) - Math.abs(b.dx));
    }

    function drawDebugGrid(level, tileSize, startTile, endTile) {
        videoContext.save();
        videoContext.strokeStyle = 'rgba(104, 214, 255, 0.18)';
        for (let tileX = startTile; tileX <= endTile; tileX++) {
            const screenX = Math.round(tileX * tileSize - level.camera.pos.x);
            if (tileX % 5 === 0) {
                videoContext.strokeStyle = 'rgba(104, 214, 255, 0.28)';
                videoContext.beginPath();
                videoContext.moveTo(screenX + 0.5, 48);
                videoContext.lineTo(screenX + 0.5, 240);
                videoContext.stroke();
            }
        }
        videoContext.restore();
    }

    function drawDebugEnemyMarkers(level, enemies) {
        videoContext.save();
        enemies.forEach(enemy => {
            const screenX = Math.round(enemy.x - level.camera.pos.x);
            const screenY = Math.round(enemy.y - level.camera.pos.y);
            videoContext.strokeStyle = enemy.dead ? 'rgba(255, 80, 80, 0.85)' : 'rgba(255, 214, 77, 0.9)';
            videoContext.lineWidth = 1;
            videoContext.strokeRect(screenX - 1.5, screenY - 1.5, 18, 24);
            drawDebugNumberBadge(
                videoContext,
                `E${enemy.id}`,
                screenX + 7,
                screenY - 8,
                enemy.dead ? '#ff5050' : '#ffd64d',
            );
        });
        videoContext.restore();
    }

    function drawDebugFlagMarkers(level, flags) {
        videoContext.save();
        flags.forEach(flag => {
            const screenX = Math.round(flag.x - level.camera.pos.x);
            const screenY = Math.round(flag.y - level.camera.pos.y);
            drawDebugNumberBadge(
                videoContext,
                `F${flag.id}`,
                screenX + 7,
                screenY - 35,
                flag.reached ? '#42f06f' : '#ff5050',
            );
        });
        videoContext.restore();
    }

    function drawDebugNumberBadge(context, text, x, y, color) {
        context.save();
        context.font = 'bold 8px monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        const width = Math.max(14, context.measureText(text).width + 5);
        const height = 10;
        const left = Math.round(x - width / 2);
        const top = Math.round(y - height / 2);
        context.fillStyle = 'rgba(0, 0, 0, 0.82)';
        context.fillRect(left, top, width, height);
        context.strokeStyle = color;
        context.lineWidth = 1;
        context.strokeRect(left + 0.5, top + 0.5, width - 1, height - 1);
        context.fillStyle = color;
        context.fillText(text, Math.round(x), Math.round(y) + 1);
        context.restore();
    }

    timer.start();

    startWorld(startLevelName).catch(error => {
        console.error(error);
        window.parent.postMessage({
            source: 'super-brazio-vendor',
            type: 'load-error',
            message: error.message,
        }, '*');
    });
}

const canvas = document.getElementById('screen');

const start = () => {
    window.removeEventListener('click', start);
    main(canvas);
};

window.addEventListener('message', event => {
    if (event.data?.source !== 'super-brazio-parent') {
        return;
    }
    if (event.data.type === 'stop-audio') {
        const currentScene = window.sceneRunner?.scenes[window.sceneRunner.sceneIndex];
        currentScene?.pause?.();
        return;
    }
    if (event.data.type === 'release-input') {
        window.superBrazioReleaseInput?.({locked: event.data.locked});
        return;
    }
    if (event.data.type === 'set-debug-overlay') {
        debugOverlayEnabled = Boolean(event.data.enabled);
        return;
    }
    if (event.data.type === 'activate-psychedelic') {
        window.superBrazioPsychedelic?.activate();
        return;
    }
    if (event.data.type !== 'key') {
        return;
    }
    if (window.superBrazioInputLocked && event.data.eventType === 'keydown') {
        return;
    }
    const forwardedEvent = new KeyboardEvent(event.data.eventType, {
        code: event.data.code,
        bubbles: true,
        cancelable: true,
    });
    Object.defineProperty(forwardedEvent, 'superBrazioForwarded', {value: true});
    window.dispatchEvent(forwardedEvent);
});

if (params.get('autostart') === '1') {
    start();
} else {
    window.addEventListener('click', start);
}
