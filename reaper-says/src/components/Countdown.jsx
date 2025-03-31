import React, { useState, useEffect } from "react";

function Countdown({ deathDate }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const death = new Date(deathDate);

      if (isNaN(death.getTime())) {
        setTimeLeft("Invalid date");
        clearInterval(countdownInterval);
        return;
      }

      if (now >= death) {
        clearInterval(countdownInterval);
        setIsExpired(true);
        setTimeLeft("Time's up!");
        return;
      }

      let years = death.getFullYear() - now.getFullYear();
      let months = death.getMonth() - now.getMonth();
      let days = death.getDate() - now.getDate();
      let hours = death.getHours() - now.getHours();
      let minutes = death.getMinutes() - now.getMinutes();
      let seconds = death.getSeconds() - now.getSeconds();

      if (seconds < 0) { seconds += 60; minutes--; }
      if (minutes < 0) { minutes += 60; hours--; }
      if (hours < 0) { hours += 24; days--; }
      if (days < 0) {
        const lastMonthDays = new Date(death.getFullYear(), death.getMonth(), 0).getDate();
        days += lastMonthDays;
        months--;
      }
      if (months < 0) { months += 12; years--; }

      // versão mais segura
      years = Math.max(0, years);
      months = Math.max(0, months);
      days = Math.max(0, days);
      hours = Math.max(0, hours);
      minutes = Math.max(0, minutes);
      seconds = Math.max(0, seconds);

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
