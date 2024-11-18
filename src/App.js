//Using howler.js to handle audio

import React, { useState, useEffect } from "react";
import { Howl } from "howler";

const songs = [
  { title: "Peanut Butter", src: "/music/PeanutButter.wav" },
  { title: "Quarters Draw", src: "/music/QuartersDraw.wav" },
];

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [howlInstance, setHowlInstance] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize Howler instance when the song changes
  useEffect(() => {
    if (howlInstance) {
      howlInstance.stop(); // Stop the previous instance
    }

    const sound = new Howl({
      src: [songs[currentSongIndex].src],
      html5: true, // Ensures playback on mobile devices
      onend: handleNext, // Automatically plays the next song when the current one ends
    });

    setHowlInstance(sound);
  }, [currentSongIndex]);

  const handlePlay = () => {
    if (howlInstance) {
      howlInstance.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (howlInstance) {
      howlInstance.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentSongIndex(
        (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  return (
      <div style={styles.container}>
        <h1>Otter Response</h1>
        <p>Now Playing: {songs[currentSongIndex].title}</p>
        <div style={styles.controls}>
          <button onClick={handlePrev}>Previous</button>
          {isPlaying ? (
              <button onClick={handlePause}>Pause</button>
          ) : (
              <button onClick={handlePlay}>Play</button>
          )}
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "Chocolate"
  },
  controls: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
};

export default App;


/* standard approach with HTML5 <audio>


import React, { useState, useRef } from "react";

const songs = [
  { title: "Quarters Draw", src: "/music/QuartersDraw2.wav" },
  { title: "Peanut Butter", src: "/music/QuartersDraw2.wav" },
];

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  const playSong = () => {
    audioRef.current.play();
  };

  const pauseSong = () => {
    audioRef.current.pause();
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex(
        (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  return (
      <div style={styles.container}>
        <h1>Music Player</h1>
        <p>Now Playing: {songs[currentSongIndex].title}</p>
        <audio
            ref={audioRef}
            src={songs[currentSongIndex].src}
            onEnded={nextSong}
        ></audio>
        <div style={styles.controls}>
          <button onClick={prevSong}>Previous</button>
          <button onClick={playSong}>Play</button>
          <button onClick={pauseSong}>Pause</button>
          <button onClick={nextSong}>Next</button>
        </div>
      </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  controls: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
};

export default App;

*/