// This file implements the timer that counts down until you can skip a page.

import { FC, useEffect, useRef, useState } from "react";

import { displayTime } from "@utils";

export const Timer: FC<{
  maxTime: number;
  timerDone: Function;
  skipMessage?: string;
}> = ({maxTime, timerDone, skipMessage="You may now end the conversation."}) => {
  const [time, setTime] = useState(maxTime);
  const startTime = Date.now();
  const [display, setDisplay] = useState(`You may end the conversation in ${displayTime(time)}`);
  let timerRef = useRef<number | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      const timeSince = Math.floor((Date.now() - startTime) / 1000);
      const newTime = maxTime - timeSince;
      setTime(newTime);

      // console.log(newTime)

      if (time) {
        setDisplay(`You may end the conversation in ${displayTime(newTime)}`)
        timerRef.current = requestAnimationFrame(updateTimer);
        timerDone(false);
      } else {
        setDisplay(skipMessage);
        timerDone(true);
      };
    }

    timerRef.current = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(timerRef.current as number);
  }, []);

  return <div>{display}</div>
}