// Timer that counts time to chosen date.

// Library import
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

let timer = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  //Setting alert and button options
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      startBtn.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(datePicker, options);

//Activate counting by click
startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
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
