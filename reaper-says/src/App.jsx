import React, { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import Result from "./components/Result";
import { useReaperVoice } from "./hooks/useReaperVoice";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import { calculateDeath } from "./utils/deathCalculator";
import { checkIfDead } from "./utils/checkIfDead";
import { MESSAGES, SETTINGS } from "./config";
import SoundButton from "./components/SoundButton";
import Countdown from "./components/Countdown";

function App() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [result, setResult] = useState(null);
  const [deathDate, setDeathDate] = useState(null);

  const { speak } = useReaperVoice();
  const { playMusic, pauseMusic } = useBackgroundMusic();

  const handleSubmit = async () => {
    if (!name || !birthdate) {
      alert(MESSAGES.missingData);
      return;
    }

    if (name.trim().split(" ").length < SETTINGS.minNameWords) {
      alert(MESSAGES.invalidName);
      return;
    }

    const wikiCheck = await checkIfDead(name, birthdate);

    if (wikiCheck.found && wikiCheck.dead) {
        // Já morto
        setResult({
            date: wikiCheck.deathDate, // <-- aqui mantemos a Date nativa sem toLocaleDateString
            cause: "The Reaper already took this soul...",
            isWikiDeath: true,
        });
        setDeathDate(null); // 👈 impede o Countdown de renderizar
        speak(`${name} is already gone...`);
        return;
    }

    // Caso esteja vivo ou não encontrado
    const today = new Date();
    const deathInfo = calculateDeath(name, birthdate, wikiCheck.found ? today : null);

    setResult({
        ...deathInfo,
        isWikiDeath: false,
    });

    setDeathDate(deathInfo.date);
    speak(MESSAGES.resultFull(name, deathInfo.date.toLocaleDateString(), deathInfo.cause));
};



  useEffect(() => {
    const title = "Reaper Says";
    let index = 0;
    const interval = setInterval(() => {
      document.title = title.slice(0, index + 1);
      index++;
      if (index === title.length) {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="background-image"></div>

      <div className="container">
        <h1 className="floating-title">Reaper Says</h1>
        <p>Find out when and how you will die... if you dare.</p>

        <InputForm
          name={name}
          setName={setName}
          birthdate={birthdate}
          setBirthdate={setBirthdate}
          onSubmit={handleSubmit}
        />

        <Result name={name} result={result} />
        <SoundButton playMusic={playMusic} pauseMusic={pauseMusic} />
        
        {deathDate && result && !result.isWikiDeath && <Countdown deathDate={deathDate} />}
      </div>
    </>
  );
}

export default App;