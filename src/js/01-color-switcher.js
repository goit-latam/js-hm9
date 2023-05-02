const refs = {
  body: document.querySelector('body'),
  dataStart: document.querySelector('button[data-start]'),
  dataStop: document.querySelector('button[data-stop]'),
};

let timerId = null;

refs.dataStart.addEventListener('click', onBtnStart);
refs.dataStop.addEventListener('click', onBtnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnStart() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.dataStop.removeAttribute('disabled');
  refs.dataStart.setAttribute('disabled', true);
}

function onBtnStop() {
  clearInterval(timerId);
  refs.dataStart.removeAttribute('disabled');
  refs.dataStop.setAttribute('disabled', true);
}
