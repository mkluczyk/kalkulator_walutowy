"use strict";

const inputAmount = document.querySelector(".input-amount");
const countingButton = document.querySelector(".btn-count");
const select = document.querySelector(".select-currency");
const outputValue = document.querySelector(".output-value");

const createURL = () => {
  const selectedCurrency = select.value;
  const URL =
    "http://api.nbp.pl/api/exchangerates/rates/a/" + selectedCurrency + "/";
  return URL;
};

const getCurrencyCounter = () => {
  const URL = createURL();
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const currencyValue = data.rates[0].mid;
      const inputValue = inputAmount.value;
      if (!isNaN(inputValue) && inputValue > 0) {
        const calculatedValue = currencyValue * inputValue;
        outputValue.textContent = `TO ${calculatedValue.toFixed(2)} PLN`;
      } else {
        inputAmount.setCustomValidity("Wpisz poprawną wartość");
      }
    })
    .catch(() => (outputValue.textContent = "Wystąpił błąd"));
};

select.addEventListener("change", createURL);
countingButton.addEventListener("click", getCurrencyCounter);
