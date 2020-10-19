"use strict";

let isSessionRunning = true;
const timerElem = $("#time-left");
let breakIncremented = false;
let breakDecremented = false;
let sessionIncremented = false;
let sessionDecremented = false;

const breakDecrementButton = $("#break-decrement");
breakDecrementButton.on("click", () => {
  breakDecremented = true;
  const breakLength = $("#break-length");
  let lengthValue = Number(breakLength.text());
  if (lengthValue > 1) {
    lengthValue--;
  }
  breakLength.text(lengthValue);
  if (!isSessionRunning) {
    timerElem.text(`${breakLength.text()}:00`);
  }
});

const breakIncrementButton = $("#break-increment");
breakIncrementButton.on("click", () => {
  breakIncremented = true;
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
    timerElem.text(`${breakLength.text()}:00`);
  }
});

const sessionDecrementButton = $("#session-decrement");
sessionDecrementButton.on("click", () => {
  sessionDecremented = true;
  const sessionLength = $("#session-length");
  let lengthValue = Number(sessionLength.text());
  if (lengthValue > 1) {
    lengthValue--;
  }
  sessionLength.text(lengthValue);
  if (isSessionRunning) {
    timerElem.text(`${sessionLength.text()}:00`);
  }
});

const sessionIncrementButton = $("#session-increment");
sessionIncrementButton.on("click", () => {
  sessionIncremented = true;
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
    timerElem.text(`${sessionLength.text()}:00`);
  }
});

const addLeadingZeroes = time => {
  return time < 10 ? `0${time}` : time;
};

let today = new Date();
let deadline = new Date();
let deadlineMins = ((isSessionRunning) ? 
  Number($("#session-length").text()) : 
  Number($("#break-length").text())
);
deadline.setMinutes(today.getMinutes() + deadlineMins);
let total = Date.parse(deadline.toString()) - Date.parse(today.toString());
let secondsRemaining = total / 1000;

let isClockRunning = false;
let timerTextContent = timerElem.text();
let timerId;
const initializeClock = () => {  
  if (!isClockRunning) {
    isClockRunning = true;
    timerId = setInterval(() => {
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
  
      if (sessionIncremented || sessionDecremented || breakIncremented || breakDecremented) {
        // reset secondsRemaining
        today = new Date();
        deadline = new Date();
        deadlineMins = ((isSessionRunning) ? 
          Number($("#session-length").text()) : 
          Number($("#break-length").text())
        );
        deadline.setMinutes(today.getMinutes() + deadlineMins);
        total = Date.parse(deadline.toString()) - Date.parse(today.toString());
        secondsRemaining = total / 1000;
      }

      const minutes = parseInt(secondsRemaining.toString() / 60);
      const seconds = parseInt(secondsRemaining.toString() % 60);

      secondsRemaining--;
      timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
      timerElem.text(timerTextContent);
      console.log(secondsRemaining);
      isClockRunning = true;
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

  today = new Date();
  deadline = new Date();
  deadline.setMinutes(today.getMinutes() + 25);
  total = Date.parse(deadline.toString()) - Date.parse(today.toString());
  secondsRemaining = total / 1000;
  
  const minutes = parseInt(secondsRemaining.toString() / 60);
  const seconds = parseInt(secondsRemaining.toString() % 60);

  timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
  timerElem.text(timerTextContent);
});
