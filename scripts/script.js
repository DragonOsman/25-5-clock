"use strict";

let isClockRunning = false;
let isSessionRunning = true;

// This isn't my own code; I don't remember
// where I got it, though.  I just Googled
// Tomodoro Timers in JS and found this
// function on a site with a good tutorial
const addLeadingZeroes = time => {
  return time < 10 ? `0${time}` : time;
};

const timerElem = $("#time-left");
let timerTextContent = timerElem.text();
const defaultSessionLength = 25;
const defaultBreakLength = 5;
const secondsOffset = 60;
let secondsRemaining = defaultSessionLength * secondsOffset;

let minutes = parseInt(secondsRemaining / secondsOffset);
let seconds = parseInt(secondsRemaining % secondsOffset);
timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
timerElem.text(timerTextContent);

let timerId;
const initializeClock = () => {
  if (!isClockRunning) {
    timerId = setInterval(() => {
      if (timerElem.text() === "00:00") {
        $("#beep").trigger("play");

        if ($("#timer-label").text() !== "Session") {
          isSessionRunning = true;
          $("#timer-label").text("Session");
        } else {
          isSessionRunning = false;
          $("#timer-label").text("Break");
        }

        secondsRemaining = (isSessionRunning ?
          Number($("#session-length").text()) :
          Number($("#break-length").text())
        ) * 60;
      }

      isClockRunning = true;
      $("#session-increment").prop("disabled", true);
      $("#session-decrement").prop("disabled", true);
      $("#break-increment").prop("disabled", true);
      $("#break-decrement").prop("disabled", true);

      secondsRemaining--;
      minutes = parseInt(secondsRemaining / secondsOffset);
      seconds = parseInt(secondsRemaining % secondsOffset);
      timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
      timerElem.text(timerTextContent);
      console.log(secondsRemaining);
    }, 1000);
  } else {
    clearInterval(timerId);
    isClockRunning = false;
    $("#session-increment").prop("disabled", false);
    $("#session-decrement").prop("disabled", false);
    $("#break-increment").prop("disabled", false);
    $("#break-decrement").prop("disabled", false);
  }
};

const startStopButton = $("#start_stop");
startStopButton.on("click", initializeClock);

const resetButton = $("#reset");
resetButton.on("click", () => {
  clearInterval(timerId);
  isClockRunning = false;
  $("#session-increment").prop("disabled", false);
  $("#session-decrement").prop("disabled", false);
  $("#break-increment").prop("disabled", false);
  $("#break-decrement").prop("disabled", false);

  $("#beep").trigger("pause");
  $("#beep").prop("currentTime", 0);

  secondsRemaining = defaultSessionLength * secondsOffset;
  minutes = parseInt(secondsRemaining / secondsOffset);
  seconds = parseInt(secondsRemaining % secondsOffset);
  timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
  timerElem.text(timerTextContent);
  $("#session-length").text(defaultSessionLength.toString());
  $("#break-length").text(defaultBreakLength.toString());
  $("#timer-label").text("Session");
});

const breakIncrementButton = $("#break-increment");
breakIncrementButton.on("click", () => {
  const lengthValueElem = $("#break-length");
  let lengthValue = Number(lengthValueElem.text());
  if (lengthValue < 60) {
    lengthValue++;
    lengthValueElem.text(lengthValue.toString());
    minutes = (isSessionRunning ?
      Number($("#session-length").text()) :
      Number($("#break-length").text())
    );
    secondsRemaining = minutes * secondsOffset;
    timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(secondsRemaining % 60)}`;
    timerElem.text(timerTextContent);
  } else {
    secondsRemaining = minutes * secondsOffset;
    timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(secondsRemaining % 60)}`;
    timerElem.text(timerTextContent);
  }
});

const breakDecrementButton = $("#break-decrement");
breakDecrementButton.on("click", () => {
  const lengthValueElem = $("#break-length");
  let lengthValue = Number(lengthValueElem.text());
  if (lengthValue > 1) {
    lengthValue--;
    lengthValueElem.text(lengthValue.toString());
    minutes = (isSessionRunning ?
      Number($("#session-length").text()) :
      Number($("#break-length").text())
    );
    secondsRemaining = Number(minutes * secondsOffset);
    timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(secondsRemaining % 60)}`;
    timerElem.text(timerTextContent);
  } else {
    secondsRemaining = Number(minutes * secondsOffset);
    timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(secondsRemaining % 60)}`;
    timerElem.text(timerTextContent);
  }
});

const sessionIncrementButton = $("#session-increment");
sessionIncrementButton.on("click", () => {
  const lengthValueElem = $("#session-length");
  let lengthValue = lengthValueElem.text();
  if (lengthValue < 60) {
    lengthValue++;
    lengthValueElem.text(lengthValue.toString());
    minutes = (isSessionRunning ?
      Number($("#session-length").text()) :
      Number($("#break-length").text())
    );
    secondsRemaining = Number(minutes * secondsOffset);
    timerTextContent =
      `${addLeadingZeroes(minutes)}:${addLeadingZeroes(secondsRemaining % secondsOffset)}`;
    timerElem.text(timerTextContent);
  } else {
    secondsRemaining = Number(minutes * secondsOffset);
    timerTextContent =
      `${addLeadingZeroes(minutes)}:${addLeadingZeroes(secondsRemaining % secondsOffset)}`;
    timerElem.text(timerTextContent);
  }
});

const sessionDecrementButton = $("#session-decrement");
sessionDecrementButton.on("click", () => {
  const lengthValueElem = $("#session-length");
  let lengthValue = lengthValueElem.text();
  if (lengthValue > 1) {
    lengthValue--;
    lengthValueElem.text(lengthValue.toString());
    minutes = (isSessionRunning ?
      Number($("#session-length").text()) :
      Number($("#break-length").text())
    );
    secondsRemaining = Number(minutes * secondsOffset);
    timerTextContent =
      `${addLeadingZeroes(minutes)}:${addLeadingZeroes(secondsRemaining % secondsOffset)}`;
    timerElem.text(timerTextContent);
  } else {
    secondsRemaining = Number(minutes * secondsOffset);
    timerTextContent =
      `${addLeadingZeroes(minutes)}:${addLeadingZeroes(secondsRemaining % secondsOffset)}`;
    timerElem.text(timerTextContent);
  }
});
