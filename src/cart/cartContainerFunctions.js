import { currency } from "../utils/currency";


const cartContainer = document.getElementById("cart-container");
const cartListContainer = document.getElementById("car-list-container");
const noItemCart = document.getElementById("no-item-cart");

export const changeTotalAmountItems = (newValue) => {
    const itemTotalAmount = cartContainer.querySelector(".cart__total-products");

    const previousAmount = Number(itemTotalAmount.innerHTML);
    itemTotalAmount.innerHTML = `${newValue + previousAmount}`;

    //If total items amounts == 0, toggleCartListContet
    if (Number(itemTotalAmount.innerHTML) === 0) {
        disapperCartListContent();
    }
}

export const changeTotalPriceItems = () => {
    const priceElement = document.querySelector(".list__total-price");
    //console.log({ previousTotalPrice, newValue });
    const listTotalPricesItems = [...document.querySelectorAll('span.list__item-total')];
    const listTotalPrices = listTotalPricesItems.map(item => Number(item.innerText.slice(1)));

    priceElement.innerHTML = `${currency.format(listTotalPrices.reduce((acc, value) => acc + value, 0))}`

}

export const appearCartListContent = () => {
    noItemCart.classList.add("js-hidden");
    cartListContainer.classList.remove("js-hidden");
}

const disapperCartListContent = () => {
    noItemCart.classList.remove("js-hidden");
    cartListContainer.classList.add("js-hidden");
}