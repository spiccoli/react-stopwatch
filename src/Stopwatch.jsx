import { useEffect, useState, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  let intervalRef = useRef(null); 
  let startTimeRef = useRef(0);

  useEffect(() => {  // this will be what updates the counter, I set the interval of the updates to be 11 milliseconds
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 11);
    }
    return () => {
      clearInterval(intervalRef.current);
    }; //cleanup to prevent potential misbehaviour 
  }, [isRunning]);

  function start() {
    startTimeRef.current = Date.now() - elapsedTime;
    setIsRunning(true);
  }
  function pause() {
    setIsRunning(false);
  }
  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }
  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60))
      .toString()
      .padStart(2, 0);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60)
      .toString()
      .padStart(2, 0);
    let seconds = Math.floor((elapsedTime / 1000) % 60)
      .toString()
      .padStart(2, 0);
    let miliseconds = Math.floor((elapsedTime % 1000) / 10)
      .toString()
      .padStart(2, 0);
    return `${hours}:${minutes}:${seconds}:${miliseconds}`;
  }
  return (
    <div className="stopwatch-container">
      <div className="display">
        <div className="display-time">{formatTime()}</div>
        <button onClick={start}>start</button>
        <button onClick={pause}>pause</button>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;
