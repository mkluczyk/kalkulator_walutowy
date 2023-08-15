"use strict";

const inputAmount = document.querySelector(".input-amount");
const countingButton = document.querySelector(".btn-count");
const select = document.querySelector(".select-currency");
const outputValue = document.querySelector(".output-value");
const loader = document.querySelector(".loader");
loader.style.display = "none";

const createURL = () => {
  const selectedCurrency = select.value;
  const URL =
    "https://api.nbp.pl/api/exchangerates/rates/a/" + selectedCurrency + "/";
  return URL;
};

const getCurrencyCounter = () => {
  const inputValue = inputAmount.value;
  if (isNaN(inputValue) || inputValue <= 0) {
    window.alert("Wpisz poprawną wartość");
    return;
  }
  loader.style.display = "block";
  const URL = createURL();
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      if (data.rates?.length > 0) {
        const currencyValue = data.rates[0].mid;
        const calculatedValue = currencyValue * inputValue;
        outputValue.textContent = `${calculatedValue.toFixed(2)} PLN`;
      } else {
        outputValue.textContent = "Wystąpił błąd";
      }
      loader.style.display = "none";
    })
    .catch(() => {
      outputValue.textContent = "Wystąpił błąd";
      loader.style.display = "none";
    });
};

countingButton.addEventListener("click", getCurrencyCounter);
