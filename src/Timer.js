import React, { useState, useRef, useEffect } from 'react'
import './Cronograma.css';

function Timer(props) {
  // The state for our timer
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");
  const {handleSearch}= props

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(((total / 1000) * 60 * 60) % 24);

    if(total=== 0){
      // handleSearch(); // Metodo que resetea los equipos cuando se acaba el timer
      console.log("holi")
      
    }

    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      ); 
    }
  };
  const clearTimer = (e) => { 
    setTimer("00:00:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 30); //valor para bajar timer
    // deadline.setMinutes(deadline.getMinutes() + 1)
    return deadline;
  };


  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  return (
    <div>
      <p className="timer">{timer}</p>
      <button onClick={onClickReset}>Reset</button>
      <button onClick={handleSearch}>Reset Equipos</button>
    </div>
  );
}

export { Timer };
