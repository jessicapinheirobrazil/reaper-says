import { useRef, useEffect } from "react";
import { SETTINGS } from "../config";

export function useBackgroundMusic() {
    const bgMusic = useRef(null);

    useEffect(() => {
        bgMusic.current = new Audio("/bg-music.mp3");
        bgMusic.current.loop = true;
        bgMusic.current.volume = SETTINGS.bgMusicVolume;
    }, []);

    const playMusic = () => {
        if (!bgMusic.current) return;
        const playPromise = bgMusic.current.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => console.warn("Autoplay blocked:", error));
        }
    };

    const pauseMusic = () => {
        if (!bgMusic.current) return;
        bgMusic.current.pause();
    };

    return { playMusic, pauseMusic };
}
