import React, { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import Result from "./components/Result";
import { useReaperVoice } from "./hooks/useReaperVoice";
import { useBackgroundMusic } from "./hooks/useBackgroundMusic";
import { calculateDeath } from "./utils/deathCalculator";
import { MESSAGES, SETTINGS } from "./config";
import SoundButton from "./components/SoundButton";
import Countdown from "./components/Countdown";
/*import Header from "./components/Header";*/

function App() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [result, setResult] = useState(null);
  const [deathDate, setDeathDate] = useState(null);

  const { speak } = useReaperVoice();
  const { playMusic, pauseMusic } = useBackgroundMusic();

  const handleSubmit = () => {
    if (!name || !birthdate) {
      alert(MESSAGES.missingData);
      return;
    }

    if (name.trim().split(" ").length < SETTINGS.minNameWords) {
      alert(MESSAGES.invalidName);
      return;
    }

    const deathInfo = calculateDeath(name, birthdate);

    if (deathInfo.error) {
      alert(deathInfo.error);
      return;
    }

    setResult(deathInfo);
    speak(MESSAGES.resultFull(name, deathInfo.date, deathInfo.cause));

    const calculatedDeathDate = new Date(deathInfo.date);
    setDeathDate(calculatedDeathDate); 
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
        
        {deathDate && <Countdown deathDate={deathDate} />}  
      </div>
    </>
  );
}

export default App;
