import React, { useEffect, useState } from "react";

const useRedirect = (duration:number) => {
  const [timer, setTimer] = useState<any>(-1);
  const [timeStart, setTimeStart] = useState<any>(Date.now());

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (timer < 0) {
        setTimer(Date.now() - timeStart - duration);
      }
    }, 1000);
    const resetTimeout = () => {
      setTimer(-1);
      setTimeStart(Date.now());
    };
    
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
      'wheel',
    ];
    for (let i in events) {
      window.addEventListener(events[i], resetTimeout);
    }
    return () => {
      clearInterval(myInterval);
      for (let i in events) {
        window.removeEventListener(events[i], resetTimeout);
      }
    };
  });

  //console.log("timer",Math.ceil(timer/1000));

  return Math.ceil(timer/1000);
};

export default useRedirect;