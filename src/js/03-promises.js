//Aplication: "Promises generator"
//
//Library import
import Notiflix from 'notiflix';
//
//Notifications settings
Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  distance: '40px',
  opacity: 1,
});
//
//Form elements
const form = document.querySelector('.form');
const delayImput = document.querySelector('input[name="delay"]');
const stepImput = document.querySelector('input[name="step"]');
const amountImput = document.querySelector('input[name="amount"]');
//
//Promise function
function createPromise(position, delay) {
  //Generating random state
  const shouldResolve = Math.random() > 0.3;
  //Generating new promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
//Event listener on form submiting
form.addEventListener('submit', onSubmit);
//
//Submiting function
function onSubmit(event) {
  event.preventDefault();
  //
  //Values of elements after submit
  const delayValue = Number(delayImput.value);
  const stepValue = Number(stepImput.value);
  const amountValue = Number(amountImput.value);
  // Calculating total delay
  let totalDelay = 0;
  for (let i = 1; i <= amountValue; i += 1) {
    totalDelay = stepValue + delayValue * (i - 1);
    //Notifications for promises
    createPromise(i, totalDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}
