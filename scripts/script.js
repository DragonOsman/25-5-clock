"use strict";

let isSessionRunning = true;

const getSecondsRemaining = () => {
  const today = new Date();
  const deadline = new Date();
  const deadlineMins = ((isSessionRunning) ?
    Number($("#session-length").text()) :
    Number($("#break-length").text())
  );
  deadline.setMinutes(today.getMinutes() + deadlineMins);
  const total = Date.parse(deadline.toString()) - Date.parse(today.toString());
  const secondsRemaining = total / 1000;
  return secondsRemaining;
};

const addLeadingZeroes = time => {
  return time < 10 ? `0${time}` : time;
};

const timerElem = $("#time-left");
let timerTextContent = timerElem.text();
const breakDecrementButton = $("#break-decrement");
breakDecrementButton.on("click", () => {
  const breakLength = $("#break-length");
  let lengthValue = Number(breakLength.text());
  if (lengthValue > 1) {
    lengthValue--;
  }
  breakLength.text(lengthValue);

  if (!isSessionRunning) {
    const secondsRemaining = getSecondsRemaining();
    const minutes = parseInt(secondsRemaining.toString() / 60);
    const seconds = parseInt(secondsRemaining.toString() % 60);

    timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    timerElem.text(timerTextContent);
  }
});

const breakIncrementButton = $("#break-increment");
breakIncrementButton.on("click", () => {
  const breakLength = $("#break-length");
  let lengthValue = Number(breakLength.text());
  if (lengthValue < 60) {
    lengthValue++;
  } else if (lengthValue === 60) {
    // do nothing to the value
    lengthValue;
  }
  breakLength.text(lengthValue);

  if (!isSessionRunning) {
    const secondsRemaining = getSecondsRemaining();
    const minutes = parseInt(secondsRemaining.toString() / 60);
    const seconds = parseInt(secondsRemaining.toString() % 60);

    timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    timerElem.text(timerTextContent);
  }
});

const sessionDecrementButton = $("#session-decrement");
sessionDecrementButton.on("click", () => {
  const sessionLength = $("#session-length");
  let lengthValue = Number(sessionLength.text());
  if (lengthValue > 1) {
    lengthValue--;
  }
  sessionLength.text(lengthValue);

  if (isSessionRunning) {
    const secondsRemaining = getSecondsRemaining();
    const minutes = parseInt(secondsRemaining.toString() / 60);
    const seconds = parseInt(secondsRemaining.toString() % 60);

    timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    timerElem.text(timerTextContent);
  }
});

const sessionIncrementButton = $("#session-increment");
sessionIncrementButton.on("click", () => {
  const sessionLength = $("#session-length");
  let lengthValue = Number(sessionLength.text());
  if (lengthValue < 60) {
    lengthValue++;
  } else if (lengthValue === 60) {
    // do nothing to the value
    lengthValue;
  }
  sessionLength.text(lengthValue);

  if (isSessionRunning) {
    const secondsRemaining = getSecondsRemaining();
    const minutes = parseInt(secondsRemaining.toString() / 60);
    const seconds = parseInt(secondsRemaining.toString() % 60);

    timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
    timerElem.text(timerTextContent);
  }
});

let isClockRunning = false;
let timerId;
const initializeClock = () => {
  if (!isClockRunning) {
    isClockRunning = true;
    timerId = setInterval(() => {
      let secondsRemaining = getSecondsRemaining();
      if (secondsRemaining <= 0) {
        clearInterval(timerId);
        const audioElem = $("#beep");
        audioElem.play();
        if ($("#timer-label").text() === "Session") {
          isSessionRunning = false;
          $("#timer-label").text("Break");
        } else if ($("#timer-label").text() === "Break") {
          isSessionRunning = true;
          $("#timer-label").text("Session");
        }
      }

      if ($("#timer-label").text() === "Session") {
        isSessionRunning = true;
      } else if ($("#timer-label").text === "Break") {
        isSessionRunning = false;
      }

      timerElem.text(`${((isSessionRunning) ?
        Number($("#session-length").text()) :
        Number($("#break-length").text())
      )}:00`);

      const minutes = parseInt(secondsRemaining.toString() / 60);
      const seconds = parseInt(secondsRemaining.toString() % 60);

      secondsRemaining--;
      timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
      timerElem.text(timerTextContent);
      console.log(secondsRemaining);
    }, 1000);
  } else {
    clearInterval(timerId);
    isClockRunning = false;
  }
};

const startStopButton = $("#start_stop");
startStopButton.on("click", initializeClock);

const resetButton = $("#reset");
resetButton.on("click", () => {
  // reset app state to default
  clearInterval(timerId);
  const sessionLengthElem = $("#session-length");
  sessionLengthElem.text("25");

  const breakLengthElem = $("#break-length");
  breakLengthElem.text("5");

  $("#timer-label").text("Session");

  const secondsRemaining = getSecondsRemaining();

  const minutes = parseInt(secondsRemaining.toString() / 60);
  const seconds = parseInt(secondsRemaining.toString() % 60);

  timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
  timerElem.text(timerTextContent);
});
