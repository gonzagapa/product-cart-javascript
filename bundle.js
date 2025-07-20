'use strict';

const getData = async () => {
    const res = await fetch("/data.json");
    const data = await res.json();
    return data;
};

const containerDesserts = document.getElementById("desserts__container");
document.getElementById("cart-container");
const currency = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

//load the data.json in the index.html
window.addEventListener("DOMContentLoaded", async () => {
    const data = await getData();
    console.log(data);
    const dessertGrid = document.getElementById("desserts-grid");
    data.forEach(item => {
        dessertGrid.innerHTML += `<article class="card" data-amount="0" data-index="${data.indexOf(item)}">
            <picture class="card__img-container card__img-container--active">
              <source media="(min-width:1200px )" srcset="${item.image.desktop}">
              <source media="(min-width:760px )" srcset="${item.image.tablet}">
              <img class="card__img" width="200" src='${item.image.mobile}'
                alt="Waffle with Berries">
            </picture>

            <div class="card__btn-container">
              <button class="card__btn" id="btn__addCart">
                <div class="card__btn-icon">
                  <img class="card__btn-img" src="./assets/images/icon-add-to-cart.svg" alt="" width="24" height="24">
                </div>
                <span class="card__btn-text">Add to cart</span>
              </button>
              <div class="card__btn card__btn--active js-hidden" id="btn__changeAmount">
                <button class="card__btn-decrease btn-reset" data-action="decrease">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2"
                    class="icon-btn-decrease">
                    <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
                  </svg>
                </button>
                <span class="card__amount">1</span>
                <button class="card__btn-increase btn-reset" data-action="increase">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"
                    class="icon-btn-increase">
                    <path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                  </svg>
                </button>
              </div>
            </div>

            <section class="card__overlay">
              <p class="card__t-dessert clr-gray-light">${item.category}</p>
              <h2 class="card__dessert">${item.name}</h2>
              <p class="card__price clr-oragnge">${currency.format(item.price)}</p>
            </section>
          </article>`;
    });

});
//to manage multiple buttons events using the pattern "event delegation"
containerDesserts.addEventListener("click", (event) => {
    const btnContainer = event.target.closest(".card__btn-container");

    if (!btnContainer) return;

    const containerChangeAmount = btnContainer.querySelector('#btn__changeAmount');
    //we want to add the item into the cart
    if (containerChangeAmount.classList.contains("js-hidden")) {
        addItemToCart(btnContainer);
    }

    //we want to increase the amount of the item
    else {
        changeAmountItem(containerChangeAmount);
    }
});

function toggleButtonDisplay(btnContainer) {

    const btnAddCart = btnContainer.querySelector('#btn__addCart');
    const btnAddCartActive = btnContainer.querySelector('#btn__changeAmount');

    btnAddCart.classList.add('js-hidden');
    btnAddCartActive.classList.remove('js-hidden');
}

function addItemToCart(btnContainer) {
    toggleButtonDisplay(btnContainer);

    //todo: logic to add the item into cart-container
}

function changeAmountItem(containerChangeAmount) {
    const cardAmountElemet = containerChangeAmount.querySelector(".card__amount");


    containerChangeAmount.addEventListener('click', (event) => {
        event.stopPropagation(); //This prevents event to bubble and execute more times than usual

        let action = event.target.closest("[data-action]")?.dataset.action;

        if (!action) return;

        let numberValue = Number(cardAmountElemet.innerHTML);
        if (action === "increase") {
            numberValue += 1;
        }
        else if (action === "decrease") {
            numberValue = numberValue !== 0 ? numberValue - 1 : 0;
        }
        cardAmountElemet.innerHTML = `${numberValue}`;

    });
}
