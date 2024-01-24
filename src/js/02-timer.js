// Aplication "Timer that counts time to chosen date".

// Library import
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

//Timer elements
const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

//Display elements
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

let timer = null;
startBtn.disabled = true;

//Notiflix window options
Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  distance: '40px',
  opacity: 1,
});

//Timer options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  //Setting alert and button options
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      startBtn.disabled = true;
      clearInterval(timer);
      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(datePicker, options);

//Activate counting by click
startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
  clearInterval(timer);
  startBtn.disabled = true;
  timer = setInterval(showingTime, 1000);
}

// Time counting
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Time formating
function addLeadingZero(value) {
  const strValue = String(value);
  return strValue.padStart(2, '0');
}
//Difference between current date and choosen date
function getDateDifference() {
  const timePicker = new Date(datePicker.value);
  const currentDate = new Date(Date.now());
  const dateDifference = timePicker - currentDate;
  return dateDifference;
}

function showingTime() {
  const dateDifference = getDateDifference();
  const objectTime = convertMs(dateDifference);

  setTime(...Object.values(objectTime));

  if (
    objectTime.days === 0 &&
    objectTime.hours === 0 &&
    objectTime.minutes === 0 &&
    objectTime.seconds === 0
  ) {
    clearInterval(timer);
    return;
  }
}

function setDays(value) {
  daysDisplay.textContent = addLeadingZero(value);
}

function setHours(value) {
  hoursDisplay.textContent = addLeadingZero(value);
}

function setMinutes(value) {
  minutesDisplay.textContent = addLeadingZero(value);
}

function setSeconds(value) {
  secondsDisplay.textContent = addLeadingZero(value);
}

function setTime(days, hours, minutes, seconds) {
  setDays(days);
  setHours(hours);
  setMinutes(minutes);
  setSeconds(seconds);
}
