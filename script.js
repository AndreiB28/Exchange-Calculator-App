const currencyEl_One = document.getElementById("currency-one");
const amountEl_One = document.getElementById("amount-one");
const currencyEl_Two = document.getElementById("currency-two");
const amountEl_Two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//Calculate function - fetch exchange rates and update DOM

function calculate() {
  const currencyOne = currencyEl_One.value;
  const currencyTwo = currencyEl_Two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/6d30938869ed572740d8f122/latest/${currencyOne}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.conversion_rates[currencyTwo];
      rateEl.innerText = `1${currencyOne} = ${rate} ${currencyTwo}`;

      amountEl_Two.value = (amountEl_One.value * rate).toFixed(2);
    });
}

//Event listeners

currencyEl_One.addEventListener("change", calculate);
amountEl_One.addEventListener("input", calculate);
currencyEl_Two.addEventListener("change", calculate);
amountEl_Two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temporary = currencyEl_One.value;
  currencyEl_One.value = currencyEl_Two.value;
  currencyEl_Two.value = temporary;
  calculate();
});

calculate();
