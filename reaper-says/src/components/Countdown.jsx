import React, { useState, useEffect } from "react";

function Countdown({ deathDate }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const death = new Date(deathDate);

      if (now >= death) {
        clearInterval(countdownInterval);
        setIsExpired(true);
        setTimeLeft("Time's up!");
        return;
      }

      // Criando uma data só de diferença
      let years = death.getFullYear() - now.getFullYear();
      let months = death.getMonth() - now.getMonth();
      let days = death.getDate() - now.getDate();
      let hours = death.getHours() - now.getHours();
      let minutes = death.getMinutes() - now.getMinutes();
      let seconds = death.getSeconds() - now.getSeconds();

      // Ajustes para evitar negativos
      if (seconds < 0) { seconds += 60; minutes--; }
      if (minutes < 0) { minutes += 60; hours--; }
      if (hours < 0) { hours += 24; days--; }
      if (days < 0) { 
        const prevMonth = new Date(death.getFullYear(), death.getMonth(), 0).getDate();
        days += prevMonth; 
        months--; 
      }
      if (months < 0) { months += 12; years--; }

      setTimeLeft(`${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [deathDate]);

  return (
    <div>
      <h2>{isExpired ? "Time's up!" : `Time until death: ${timeLeft}`}</h2>
    </div>
  );
}

export default Countdown;