const SONGS = {
  song1Intro: {
    label: "Wicked Start",
    src: "assets/songs/wicked-start.mp3",
  },
  song1Full: {
    label: "Wicked (FULL!)",
    src: "assets/songs/wicked-full.mp3",
  },
  song2: {
    label: "FREAK ME",
    src: "assets/songs/freak-me.mp3",
  },
  song3: {
    label: "BOMBASTIC",
    src: "assets/songs/bombastic.mp3",
  },
};

const buttons = Array.from(document.querySelectorAll(".song-button"));
const statusText = document.querySelector("#statusText");

let activeAudio = null;
let activeSongId = null;
let lastSongId = null;

function setStatus(message, isWarning = false) {
  statusText.textContent = message;
  statusText.classList.toggle("is-warning", isWarning);
}

function setActiveButton(songId) {
  buttons.forEach((button) => {
    const isActive = button.dataset.songId === songId;
    button.classList.toggle("is-playing", isActive);
    button.classList.toggle("is-paused", false);
  });
}

function setPausedButton(songId, isPaused) {
  buttons.forEach((button) => {
    if (button.dataset.songId === songId) {
      button.classList.toggle("is-paused", isPaused);
    }
  });
}

function stopActiveSong() {
  if (!activeAudio) {
    return;
  }

  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
  activeSongId = null;
  setActiveButton(null);
}

async function toggleActiveSong() {
  if (!activeAudio || !activeSongId) {
    if (lastSongId) {
      await playSong(lastSongId);
      return;
    }

    setStatus("Choose a song first.", true);
    return;
  }

  const song = SONGS[activeSongId];

  if (activeAudio.paused) {
    try {
      activeAudio.currentTime = 0;
      await activeAudio.play();
      setPausedButton(activeSongId, false);
      setStatus(`Playing ${song.label}.`);
    } catch (error) {
      setStatus(`Could not start ${song.label}.`, true);
    }
    return;
  }

  activeAudio.pause();
  activeAudio.currentTime = 0;
  setPausedButton(activeSongId, true);
  setStatus(`Stopped ${song.label}. Press Space to start from the beginning.`);
}

async function playSong(songId) {
  const song = SONGS[songId];

  if (!song) {
    return;
  }

  stopActiveSong();

  const audio = new Audio(song.src);
  audio.preload = "auto";
  activeAudio = audio;
  activeSongId = songId;
  lastSongId = songId;
  setActiveButton(songId);
  setStatus(`Starting ${song.label}...`);

  audio.addEventListener("ended", () => {
    if (activeSongId === songId) {
      activeAudio = null;
      activeSongId = null;
      setActiveButton(null);
      setStatus(`${song.label} finished.`);
    }
  });

  audio.addEventListener("error", () => {
    if (activeSongId === songId) {
      stopActiveSong();
      setStatus(`Missing file: ${song.src}`, true);
    }
  });

  try {
    await audio.play();
    setStatus(`Playing ${song.label}.`);
  } catch (error) {
    stopActiveSong();
    setStatus(`Could not play ${song.src}. Add the file and try again.`, true);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    playSong(button.dataset.songId);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.code !== "Space" || event.repeat) {
    return;
  }

  event.preventDefault();
  toggleActiveSong();
});
