function padSeconds(seconds: number) {
  const paddedSeconds: string = String(seconds).padStart(2, "0");
  return paddedSeconds;
}

function minutesFromSeconds(timeInSeconds: number) {
  const minutes: number = Math.floor(timeInSeconds / 60);
  const seconds: number = timeInSeconds - minutes * 60;
  return { minutes: minutes, seconds: seconds };
}

export function displayTime(timeInSeconds: number) {
  const { minutes, seconds } = minutesFromSeconds(timeInSeconds);

  if (minutes) {
    return `${minutes}:${padSeconds(seconds)}`;
  } else {
    return `${seconds} seconds...`;
  }
}
