# Song Starter

Simple local page with song buttons. Each button starts one local song file.

This is not a party game. It is a tiny local utility/skeleton for songs that will be provided later.

## Run

From the repository root:

```sh
cd tools/song-starter
python3 -m http.server 3005
```

Open:

```text
http://localhost:3005
```

## Add Songs

Put the future songs here:

```text
tools/song-starter/assets/songs/
```

Current songs:

```text
#1 Wicked Start -> assets/songs/wicked-start.mp3
#1 Wicked (FULL!) -> assets/songs/wicked-full.mp3
#2 FREAK ME -> assets/songs/freak-me.mp3
#3 BOMBASTIC -> assets/songs/bombastic.mp3
```

To use different filenames or formats, edit the `SONGS` object in:

```text
tools/song-starter/app.js
```

Keep files local so the page works without internet at runtime.

## Manual Test

1. Start the server on port `3005`.
2. Open `http://localhost:3005`.
3. Confirm four song buttons are visible, including two `#1` Wicked buttons.
4. Click each button.
5. Press `Space` while a song is playing; it should stop and rewind.
6. Press `Space` again; the same song should start immediately from the beginning.
7. Clicking another song should stop the previous song and play the selected song.
