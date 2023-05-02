import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
let selectedDate = new Date();
let currentDate = new Date();
let countTimer = {};

const refs = {
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.button.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate > currentDate) {
      refs.button.removeAttribute('disabled');
    } else {
      Notiflix.Notify.warning('"Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

refs.button.addEventListener('click', onBtnClick);

function onBtnClick() {
  const timerId = setInterval(() => {
    currentDate = new Date();

    if (currentDate < selectedDate) {
      countTimer = convertMs(selectedDate - currentDate);
      upDateTime(countTimer);
      refs.button.setAttribute('disabled', true);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function upDateTime(countTimer) {
  refs.days.textContent = addLeadingZero(countTimer.days);
  refs.hours.textContent = addLeadingZero(countTimer.hours);
  refs.minutes.textContent = addLeadingZero(countTimer.minutes);
  refs.seconds.textContent = addLeadingZero(countTimer.seconds);
}
