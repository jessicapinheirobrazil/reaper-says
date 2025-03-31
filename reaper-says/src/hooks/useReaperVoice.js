import { SETTINGS } from "../config";

export function useReaperVoice() {
    const speak = (message) => {
        const synth = window.speechSynthesis;
        const utter = new SpeechSynthesisUtterance(message);
        const voices = synth.getVoices();

        utter.voice = voices.find((v) => v.lang === "en-US") || voices[0];
        utter.pitch = SETTINGS.speech.pitch;
        utter.rate = SETTINGS.speech.rate;
        utter.volume = SETTINGS.speech.volume;

        utter.onend = () => {
            const audio = new Audio("/laugh.mp3");
            audio.volume = SETTINGS.laughVolume;
            audio.play();
        };

        synth.speak(utter);
    };

    return { speak };
}
