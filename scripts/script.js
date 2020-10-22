"use strict";

let isSessionRunning = true;
let isClockRunning = false;

const addLeadingZeroes = time => {
  return time < 10 ? `0${time}` : time;
};

const timerElem = $("#time-left");
let timerTextContent = timerElem.text();
const defaultSessionLength = "25";
const defaultBreakLength = "5";
let secondsRemaining = (isSessionRunning ?
  parseInt(defaultSessionLength) :
  parseInt(defaultBreakLength)) * 60;

if (isSessionRunning && $("#session-length").text() !== defaultSessionLength) {
  secondsRemaining = Number($("#session-length").text()) * 60;
} else if (!isSessionRunning && $("#break-length").text() !== defaultBreakLength) {
  secondsRemaining = Number($("#break-length").text()) * 60;
}

if (isSessionRunning && $("#break-length").text() !== defaultBreakLength) {
  secondsRemaining = Number($("#session-length").text()) * 60;
}

let minutes = parseInt(secondsRemaining / 60);
let seconds = parseInt(secondsRemaining % 60);
timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
timerElem.text(timerTextContent);

let timerId;
const initializeClock = () => {
  if (!isClockRunning) {
    timerId = setInterval(() => {
      isClockRunning = true;
      $("#session-increment").prop("disabled", true);
      $("#session-decrement").prop("disabled", true);
      $("#break-increment").prop("disabled", true);
      $("#break-decrement").prop("disabled", true);

      minutes = parseInt(secondsRemaining / 60);
      seconds = parseInt(secondsRemaining % 60);
      timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
      timerElem.text(timerTextContent);
      secondsRemaining--;
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

if (secondsRemaining <= 0 && (secondsRemaining * 1000) <= 0) {
  clearInterval(timerId);
  $("#beep").play();
  timerTextContent = "00:00";
  timerElem.text(timerTextContent);
  if (isSessionRunning) {
    isSessionRunning = false;
    $("#timer-label").text("Break");
    secondsRemaining = Number($("#break-length").text()) * 60;
  } else {
    isSessionRunning = true;
    $("#timer-label").text("Session");
    secondsRemaining = Number($("session-length").text()) * 60;
  }
}

const startStopButton = $("#start_stop");
startStopButton.on("click", initializeClock);

const breakIncrementButton = $("#break-increment");
breakIncrementButton.on("click", () => {
  const lengthValueElem = $("#break-length");
  let lengthValue = Number(lengthValueElem.text());
  if (lengthValue < 60) {
    lengthValue++;
    lengthValueElem.text(lengthValue.toString());
    const minutes = (isSessionRunning) ?
      Number($("#session-length").text()) :
      Number($("#break-length").text());
    timerTextContent = `${addLeadingZeroes(minutes)}:00`;
    timerElem.text(timerTextContent);
  } else if (lengthValue === 60) {
    lengthValue;
  }
});

const breakDecrementButton = $("#break-decrement");
breakDecrementButton.on("click", () => {
  const lengthValueElem = $("#break-length");
  let lengthValue = Number(lengthValueElem.text());
  if (lengthValue > 1) {
    lengthValue--;
    lengthValueElem.text(lengthValue.toString());
    const minutes = (isSessionRunning) ?
      Number($("#session-length").text()) :
      Number($("#break-length").text());
    timerTextContent = `${addLeadingZeroes(minutes)}:00`;
    timerElem.text(timerTextContent);
  } else if (lengthValue === 1) {
    lengthValue;
  }
});

const sessionIncrementButton = $("#session-increment");
sessionIncrementButton.on("click", () => {
  const lengthValueElem = $("#session-length");
  let lengthValue = lengthValueElem.text();
  if (lengthValue < 60) {
    lengthValue++;
    lengthValueElem.text(lengthValue.toString());
    const minutes = (isSessionRunning) ?
      Number($("#session-length").text()) :
      Number($("#break-length").text());
    timerTextContent = `${addLeadingZeroes(minutes)}:00`;
    timerElem.text(timerTextContent);
  } else if (lengthValue === 60) {
    lengthValue;
  }
});

const sessionDecrementButton = $("#session-decrement");
sessionDecrementButton.on("click", () => {
  const lengthValueElem = $("#session-length");
  let lengthValue = lengthValueElem.text();
  if (lengthValue > 1) {
    lengthValue--;
    lengthValueElem.text(lengthValue.toString());
    const minutes = (isSessionRunning) ?
      Number($("#session-length").text()) :
      Number($("#break-length").text());
    timerTextContent = `${addLeadingZeroes(minutes)}:00`;
    timerElem.text(timerTextContent);
  } else if (lengthValue === 1) {
    lengthValue;
  }
});
