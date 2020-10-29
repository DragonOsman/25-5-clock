"use strict";

let isClockRunning = false;
let isSessionRunning = true;

const addLeadingZeroes = time => {
  return time < 10 ? `0${time}` : time;
};

const timerElem = $("#time-left");
let timerTextContent = timerElem.text();
const defaultSessionLength = "25";
const defaultBreakLength = "5";
let secondsRemaining = defaultSessionLength * 60;

let minutes = parseInt(secondsRemaining / 60);
let seconds = parseInt(secondsRemaining % 60);
timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
timerElem.text(timerTextContent);

let timerId;
const initializeClock = () => {
  if (!isClockRunning) {
    timerId = setInterval(() => {
      if (timerElem.text() === "00:00") {
        const audioElem = document.getElementById("beep");
        const playPromise = audioElem.play();
        if ($("#beep").data("clicked")) {
          playPromise.catch(err => console.log(err));
        }

        if (!isSessionRunning) {
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
      minutes = parseInt(secondsRemaining / 60);
      seconds = parseInt(secondsRemaining % 60);
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
  $(this).data("clicked", true);

  if (isClockRunning) {
    clearInterval(timerId);
    isClockRunning = false;
  }

  $("#beep").trigger("pause");
  $("#beep").prop("currentTime", 0);

  secondsRemaining = Number(defaultSessionLength) * 60;
  minutes = parseInt(secondsRemaining / 60);
  seconds = parseInt(secondsRemaining % 60);
  timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
  timerElem.text(timerTextContent);
  $("#session-length").text(defaultSessionLength);
  $("#break-length").text(defaultBreakLength);
  $("#timer-label").text("Session");
});

const breakIncrementButton = $("#break-increment");
breakIncrementButton.on("click", () => {
  const lengthValueElem = $("#break-length");
  let lengthValue = Number(lengthValueElem.text());
  if (lengthValue < 60) {
    lengthValue++;
    lengthValueElem.text(lengthValue.toString());
    let minutes;
    if ($("#timer-label").text() === "Session") {
      minutes = Number($("#session-length").text());
    } else {
      minutes = Number($("#break-length").text());
    }
    secondsRemaining = minutes * 60;
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
    let minutes;
    if ($("#timer-label").text() === "Session") {
      minutes = Number($("#session-length").text());
    } else {
      minutes = Number($("#break-length").text());
    }
    secondsRemaining = minutes * 60;
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
    let minutes;
    if ($("#timer-label").text() === "Session") {
      minutes = Number($("#session-length").text());
    } else {
      minutes = Number($("#break-length").text());
    }
    secondsRemaining = minutes * 60;
    timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(secondsRemaining % 60)}`;
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
    let minutes;
    if ($("#timer-label").text() === "Session") {
      minutes = Number($("#session-length").text());
    } else {
      minutes = Number($("#break-length").text());
    }
    secondsRemaining = minutes * 60;
    timerTextContent = `${addLeadingZeroes(minutes)}:${addLeadingZeroes(secondsRemaining % 60)}`;
    timerElem.text(timerTextContent);
  }
});
