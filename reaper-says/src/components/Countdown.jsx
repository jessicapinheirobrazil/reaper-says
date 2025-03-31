import React, { useState, useEffect } from "react";

function Countdown({ deathDate }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false); // Para verificar se o contador expirou

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const death = new Date(deathDate);

      // Calcular a diferença entre agora e a data de morte
      const totalMilliseconds = death - now;

      if (totalMilliseconds <= 0) {
        clearInterval(countdownInterval); // Para o contador quando chegar à data de morte
        setIsExpired(true);
        setTimeLeft("Time's up!");
      } else {
        const years = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((totalMilliseconds % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((totalMilliseconds % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((totalMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);

        // Atualizar o tempo restante com anos, meses, dias, horas, minutos e segundos
        setTimeLeft(`${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(countdownInterval); // Limpa o intervalo se o componente for desmontado
  }, [deathDate]);

  return (
    <div>
      <h2>{isExpired ? "Time's up!" : `Time until death: ${timeLeft}`}</h2>
    </div>
  );
}

export default Countdown;
