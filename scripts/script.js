"use strict";

const breakDecrementButton = $("#break-decrement");
try {
  breakDecrementButton.on("click", () => {
    const breakLength = $("#break-length");
    let lengthValue = Number(breakLength.text());
    if (lengthValue > 1) {
      lengthValue--;
    } else if (lengthValue < 1) {
      throw "lengthValue must not be less than 1";
    }
    breakLength.text(lengthValue);
  });
} catch (err) {
  console.log(`Error: ${err}`);
}

const breakIncrementButton = $("#break-increment");
try {
  breakIncrementButton.on("click", () => {
    const breakLength = $("#break-length");
    let lengthValue = Number(breakLength.text());
    if (lengthValue < 60) {
      lengthValue++;
    } else if (lengthValue === 60) {
      throw "lengthValue must be greater than 60";
    }
    breakLength.text(lengthValue);
  });
} catch (err) {
  console.log(`Error: ${err}`);
}

const sessionDecrementButton = $("#session-decrement");
try {
  sessionDecrementButton.on("click", () => {
    const sessionLength = $("#session-length");
    let lengthValue = Number(sessionLength.text());
    if (lengthValue > 1) {
      lengthValue--;
    } else if (lengthValue < 1) {
      throw "lengthValue must not be less than 1";
    }
    sessionLength.text(lengthValue);
  });
} catch (err) {
  console.log(`Error: ${err}`);
}

const sessionIncrementButton = $("#session-increment");
try {
  sessionIncrementButton.on("click", () => {
    const sessionLength = $("#session-length");
    let lengthValue = Number(sessionLength.text());
    lengthValue++;
    sessionLength.text(lengthValue);
  });
} catch (err) {
  console.log(`Error: ${err}`);
}

const defaultSessionLength = 25;
const defaultBreakLength = 5;

// default session and break length in seconds
const sessionSeconds = defaultSessionLength * 60;
const breakSeconds = defaultBreakLength * 60;

let isSessionRunning = true;
let isTimerRunning = false;

const timerElem = $("#time-left");
let timeRemaining = Number($("#time-left").text());

const timerCallback = () => {
  let timer = (isSessionRunning) ? sessionSeconds : breakSeconds;

  // timer value should be 0 at first, so add 1 and then multiply
  if ($("#timer-label").text() === "Session") {
    timer += 1;
    timer *= defaultSessionLength;
    isSessionRunning = true;
  } else if ($("#timer-label").text === "Break") {
    timer += 1;
    timer *= defaultBreakLength;
    isSessionRunning = false;
  }

  const minutes = parseInt(timer) / 60;
  const seconds = parseInt(timer) % 60;
  if (minutes < 10) {
    minutes.padStart(2, "0");
  }

  if (seconds < 10) {
    seconds.padStart(2, "0");
  }

  timeRemaining = `${minutes}:${seconds}`;
  timerElem.text(timeRemaining);
  isTimerRunning = true;

  if (minutes === 0 && seconds === 0) {
    if ($("#timer-label").text() === "Session") {
      isSessionRunning = false;
    } else if ($("#timer-label").text() === "Break") {
      isSessionRunning = true;
    }
    
    const audioElem = $("#beep");
    audioElem.play();
  }
};

const timerId = setInterval(timerCallback, 1000);

const startStopButton = $("#start_stop");
startStopButton.on("click", () => {
  if (isTimerRunning) {
    clearInterval(timerId);
  } else {
    setInterval(timerCallback, 1000);
  }
});