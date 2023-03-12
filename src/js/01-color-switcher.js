function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timer = null;
const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

// After clicking «Start», once a secound changes background color on random color.
startBtn.addEventListener('click', onStart);

// After clicking «Stop», background color stop changing.
stopBtn.addEventListener('click', onStop);

// Button «Start» is disabled, when color changing is activated.
function onStart() {
  startBtn.disabled = true;
  timer = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop() {
  startBtn.disabled = false;
  clearInterval(timer);
}
