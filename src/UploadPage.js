import React, { useState } from "react";

function UploadPage() {
    const [uploadedSongs, setUploadedSongs] = useState([]);

    const handleFileUpload = async (event) => {
        const files = event.target.files;
        const formData = new FormData();
        formData.append("file", files[0]); // Supports one file at a time

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                const newSong = { title: files[0].name, src: data.path };
                setUploadedSongs((prevSongs) => [...prevSongs, newSong]);
                alert("File uploaded successfully!");
            } else {
                console.error("Upload failed");
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error uploading file");
        }
    };

    return (
        <div>
            <h1>Upload Songs</h1>
            <input type="file" accept="audio/*" onChange={handleFileUpload} />
            {uploadedSongs.length > 0 && (
                <div>
                    <h2>Uploaded Songs</h2>
                    <ul>
                        {uploadedSongs.map((song, index) => (
                            <li key={index}>
                                {song.title} -{" "}
                                <audio controls>
                                    <source src={song.src} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UploadPage;
