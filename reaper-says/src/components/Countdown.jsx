import React, { useState, useEffect } from "react";
import { intervalToDuration, differenceInSeconds, isBefore } from "date-fns";

function Countdown({ deathDate }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const death = new Date(deathDate);

      if (isBefore(death, now)) {
        clearInterval(countdownInterval);
        setIsExpired(true);
        setTimeLeft("Time's up!");
        return;
      }

      // diferença total em segundos
      const totalSeconds = differenceInSeconds(death, now);

      // converter em anos, meses, dias, horas, minutos, segundos
      const duration = intervalToDuration({ start: now, end: death });

      // se faltar menos de 1 dia, duration.days pode não vir definido
      const days = duration.days || 0;
      const hours = duration.hours || 0;
      const minutes = duration.minutes || 0;
      const seconds = duration.seconds || 0;

      setTimeLeft(`${duration.years}y ${duration.months}m ${days}d ${hours}h ${minutes}m ${seconds}s`);
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