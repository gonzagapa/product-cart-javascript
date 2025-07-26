import { dataDesserts, getThumbailImageById } from "../data/getData";
import { renderModalElements } from "../modal/dialogFunctions";
import { currency } from "../utils/currency";


const cartContainer = document.getElementById("cart-container");
const cartListContainer = document.getElementById("car-list-container");
const noItemCart = document.getElementById("no-item-cart");
const modalElement = document.getElementById('modal');
const btnConfirmOrder = document.getElementById('btn-confirm');

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

btnConfirmOrder.addEventListener('click', (event) => {
    const orderDesserts = [];
    //obtener
    // nombre, precio por unidad, total por item, imagen,
    const cartList = document.getElementById('cart-list');
    const ListItems = [...cartList.querySelectorAll(".list__item")];

    for (let listItem of ListItems) {
        let indexItem = listItem.dataset.index;
        orderDesserts.push(getCardInfoFromIndex(indexItem));
    }

    // total de la ordern
    const totalPricePurchase = document.querySelector(".list__total-price").innerHTML;

    //renderizar los elementos en el modal
    renderModalElements({ items: orderDesserts, totalAmountPurchase: totalPricePurchase });
    modalElement.showModal();
})

export const appearCartListContent = () => {
    noItemCart.classList.add("js-hidden");
    cartListContainer.classList.remove("js-hidden");
}

export const disapperCartListContent = () => {
    noItemCart.classList.remove("js-hidden");
    cartListContainer.classList.add("js-hidden");
}

export const getCardInfoFromIndex = (index) => {
    const cardList = [...document.querySelectorAll(".card")];
    const cardItem = cardList.find(cardItem => {
        return cardItem.dataset.index === index;
    })

    if (cardItem === null) return;

    return {
        index: index,
        itemAmount: cardItem.dataset.amount,
        pricePerUnit: dataDesserts[index].price,
        totalPrice: dataDesserts[index].price * cardItem.dataset.amount,
        name: dataDesserts[index].name,
        image: getThumbailImageById(index)
    }
}
