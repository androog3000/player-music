import React, { useState, useEffect } from "react";
import { Howl } from "howler";

function MusicPlayer() {
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [howlInstance, setHowlInstance] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Fetch the songs from your static or backend source
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch("/music"); // Adjust the path as needed
                const data = await response.json();
                setSongs(data);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    }, []);

    // Update Howler instance when the current song changes
    useEffect(() => {
        if (howlInstance) {
            howlInstance.stop();
        }

        if (songs.length > 0) {
            const sound = new Howl({
                src: [songs[currentSongIndex].src],
                html5: true,
                onend: handleNext,
            });

            setHowlInstance(sound);
        }
    }, [currentSongIndex, songs]);

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
            <h1>Music Player</h1>
            {songs.length > 0 ? (
                <>
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
                </>
            ) : (
                <p>Loading songs...</p>
            )}
        </div>
    );
}

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "grey",
        color: "00FFF"
    },
    controls: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "10px",
    },
};

export default MusicPlayer;
