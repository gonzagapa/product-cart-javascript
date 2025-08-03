'use strict';

const currency = new Intl.NumberFormat(undefined, { style: "currency", currency: "MXN" });

let dataDesserts = [];

const getData = async () => {
    const res = await fetch("/data.json");
    const data = await res.json();
    dataDesserts = data;
};

const getThumbailImageById = (id = 0) => {
    return dataDesserts[id].image.thumbnail;
};

window.addEventListener("DOMContentLoaded", async () => {
  const dessertGrid = document.getElementById("desserts-grid");
  await getData();
  dataDesserts.forEach(item => {
    dessertGrid.innerHTML += `<article class="card" data-amount="0" data-index="${dataDesserts.indexOf(item)}">
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

const resetAllperItem = async (index$1) => {

    const { changeTotalAmountItems,
        disapperarButtonDisplay,
        getCardInfoFromIndex,
        getCardItemFromIndex,
        resetAmountItem, disapperCartListContent } = await Promise.resolve().then(function () { return index; });

    console.log("reset...");
    disapperCartListContent();

    const { itemAmount } = getCardInfoFromIndex(index$1);
    const btnContainer = getCardItemFromIndex(index$1).querySelector(".card__btn-container");
    changeTotalAmountItems(-itemAmount);
    resetAmountItem(index$1, 0);
    disapperarButtonDisplay(btnContainer);
};

const modalElement$1 = document.getElementById('modal');
const btnNewOrder = document.getElementById('btn_new-order');
const listModal = document.getElementById('list-modal');


const renderModalElements = ({ items, totalAmountPurchase }) => {
  const totalPriceModal = document.getElementById('total-price-modal');

  for (let item of items) {
    listModal.insertAdjacentHTML('afterbegin', generateListItemTemplate(item));
  }
  totalPriceModal.innerText = `${totalAmountPurchase}`;
};

btnNewOrder.addEventListener('click', () => {
  modalElement$1.close();
  const listModalItems = [...listModal.querySelectorAll('.list__item')];
  console.log(listModalItems);
  listModalItems.forEach(async (item) => await resetAllperItem(item.dataset.index));
  listModal.innerHTML = "";
  document.getElementById("cart-list").innerHTML = '';
});

const generateListItemTemplate = ({ image, itemAmount, name, pricePerUnit, totalPrice, index }) => {
  return `<li class="list__item" data-index='${index}'>
          <div class="thumbnail">
            <img class="thumbnail__img" 
            src="${image}" 
            alt="${name} image"
              width="60px" height="60px">
          </div>
            <div>
              <p class="list__product">${name}</p>
              <p class="list__price 
              list__price--small 
              clr-gray-light">
                <span class="amount-per-unit clr-oragnge">${itemAmount}x</span>@${currency.format(pricePerUnit)}
              </p>
            </div>
            <div class="list__total-content">
              <p class="list__item-total list__item-total--bolder">${currency.format(totalPrice)}</p>
            </div>
        </li>`;
};

const cartContainer = document.getElementById("cart-container");
const cartListContainer = document.getElementById("car-list-container");
const noItemCart = document.getElementById("no-item-cart");
const modalElement = document.getElementById('modal');
const btnConfirmOrder = document.getElementById('btn-confirm');

const changeTotalAmountItems = (newValue) => {
    const itemTotalAmount = cartContainer.querySelector(".cart__total-products");

    const previousAmount = Number(itemTotalAmount.innerHTML);
    itemTotalAmount.innerHTML = `${newValue + previousAmount}`;

    //If total items amounts == 0, toggleCartListContet
    if (Number(itemTotalAmount.innerHTML) === 0) {
        disapperCartListContent();
    }
};

const changeTotalPriceItems = () => {
    const priceElement = document.querySelector(".list__total-price");
    //console.log({ previousTotalPrice, newValue });
    const listTotalPricesItems = [...document.querySelectorAll('span.list__item-total')];
    const listTotalPrices = listTotalPricesItems.map(item => Number(item.innerText.slice(1)));

    priceElement.innerHTML = `${currency.format(listTotalPrices.reduce((acc, value) => acc + value, 0))}`;

};

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
});

const appearCartListContent = () => {
    noItemCart.classList.add("js-hidden");
    cartListContainer.classList.remove("js-hidden");
};

const disapperCartListContent = () => {
    noItemCart.classList.remove("js-hidden");
    cartListContainer.classList.add("js-hidden");
};

const getCardInfoFromIndex = (index) => {
    const cardList = [...document.querySelectorAll(".card")];
    const cardItem = cardList.find(cardItem => {
        return cardItem.dataset.index === index;
    });

    if (cardItem === null) return;

    return {
        index: index,
        itemAmount: cardItem.dataset.amount,
        pricePerUnit: dataDesserts[index].price,
        totalPrice: dataDesserts[index].price * cardItem.dataset.amount,
        name: dataDesserts[index].name,
        image: getThumbailImageById(index)
    }
};

const cartList$1 = document.getElementById("cart-list");


const addItemToCartList = ({ name, price, index }) => {
  cartList$1.innerHTML += `<li class="list__item" data-index=${index}>
                <section class="list__item-content">
                  <div class="list__item-product">
                    <p class="list__product">${name}</p>
                    <p class="list__price list__price--small clr-gray-light">
                      <span class="amount-per-unit clr-oragnge">1x</span>
                      <span class="cost-per-unit">@ ${currency.format(price)}</span>
                      <span class="list__item-total">${currency.format(price)}</span>
                    </p>
                  </div>
                  <button class="btn-reset list__item-btn" id="delete-item-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"
                      class="icon-remove">
                      <path fill="#CAAFA7"
                        d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                        class="icon-remove" />
                    </svg>
                  </button>
                </section>
              </li>`;
};

const changeAmountInCartItem = (index, newAmount) => {
  const cartItem = cartList$1.querySelector(`[data-index="${index}"]`);
  const priceItem = dataDesserts[index].price;
  cartItem.querySelector(".amount-per-unit").innerHTML = `${newAmount}x`;
  cartItem.querySelector(".list__item-total").innerHTML = `${currency.format(priceItem * newAmount)}`;
};

cartList$1.addEventListener("click", (event) => {
  event.stopPropagation();

  //To delete a item from cart list
  if (event.target.closest("#delete-item-btn")) {
    const listItemDeleted = event.target.closest(".list__item");
    const itemDeletedIndex = listItemDeleted.dataset.index;

    const itemDeletedCard = getCardItemFromIndex(itemDeletedIndex);

    //remove its amount from totalAmountItems
    const itemAmount = itemDeletedCard.dataset.amount;
    changeTotalAmountItems(-itemAmount);

    //establish data-amount to 0
    resetAmountItem(itemDeletedIndex, 0);

    //hide btn__changeAmount button
    const btnContainer = itemDeletedCard.querySelector(".card__btn-container");
    disapperarButtonDisplay(btnContainer);

    //remove item from cart list
    listItemDeleted.remove();
    changeTotalPriceItems();
  }
});

const resetAmountItem = (index, newAmount) => {
  const cardItem = getCardItemFromIndex(index);
  cardItem.dataset.amount = newAmount;
};

const getCardItemFromIndex = (index) => {
  const cardList = [...document.querySelectorAll(".card")];

  const cardItem = cardList.find(cardItem => {
    return cardItem.dataset.index === index;
  });

  return cardItem;
};

function disapperarButtonDisplay(btnContainer) {
  const btnAddCart = btnContainer.querySelector('#btn__addCart');
  const btnAddCartActive = btnContainer.querySelector('#btn__changeAmount');


  btnAddCartActive.querySelector(".card__amount").innerHTML = '1';
  //console.log(btnAddCartActive.querySelector(".card__amount").innerHTML);
  btnAddCart.classList.remove('js-hidden');
  btnAddCartActive.classList.add('js-hidden');
}

const containerDesserts = document.getElementById("desserts__container");
const cartList = document.getElementById("cart-list");

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
    changeAmountItem(containerChangeAmount, btnContainer);
  }
});

function appearButtonDisplay(btnContainer) {

  const btnAddCart = btnContainer.querySelector('#btn__addCart');
  const btnAddCartActive = btnContainer.querySelector('#btn__changeAmount');

  btnAddCartActive.querySelector(".card__amount").innerHTML = '1';
  btnAddCart.classList.add('js-hidden');
  btnAddCartActive.classList.remove('js-hidden');
}

function addItemToCart(btnContainer) {
  appearButtonDisplay(btnContainer);
  const cardElement = btnContainer.closest("article");

  cardElement.dataset.amount = cardElement.dataset.amount == 0 ? 1 : cardElement.dataset.amount;
  changeTotalAmountItems(1);

  appearCartListContent();

  const dataIndex = btnContainer.closest("article").dataset.index;
  const itemDessert = dataDesserts[dataIndex];
  //console.log(itemDessert);
  addItemToCartList({ ...itemDessert, index: dataIndex });
  changeTotalPriceItems();
}

function changeAmountItem(containerChangeAmount, btnContainer) {
  const cardAmountElemet = containerChangeAmount.querySelector(".card__amount");
  const cardElement = containerChangeAmount.closest("article");
  const indexArticle = cardElement.dataset.index;

  containerChangeAmount.addEventListener('click', (event) => {
    event.stopPropagation(); //This prevents event to bubble and execute more times than usual

    let action = event.target.closest("[data-action]")?.dataset.action;

    if (!action) return;

    let numberValue = Number(cardAmountElemet.innerHTML);
    if (action === "increase") {
      numberValue += 1;
      changeTotalAmountItems(1);
    }
    else if (action === "decrease") {
      if (numberValue !== 0) {
        numberValue = numberValue - 1;
        changeTotalAmountItems(-1);
      }
    }

    cardAmountElemet.innerHTML = `${numberValue}`;
    cardElement.dataset.amount = numberValue;

    // if numberValue of the card item == 0,
    // remove from cart list and display button addToCart
    if (numberValue === 0) {
      disapperarButtonDisplay(btnContainer);
      getListItemFromIndex(indexArticle).remove();
      return;
    }

    //Modified the total amount of the cart
    changeAmountInCartItem(cardElement.dataset.index, numberValue);

    //Modified the total price of the purchase
    // const totalPricePerItem = numberValue * dataDesserts[indexArticle].price;
    changeTotalPriceItems();
  });
}

const getListItemFromIndex = (index) => {
  const ListItems = [...cartList.querySelectorAll(".list__item")];

  const listItem = ListItems.find(listItem => {
    return listItem.dataset.index === index;
  });

  return listItem;
};

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addItemToCartList: addItemToCartList,
    appearCartListContent: appearCartListContent,
    changeAmountInCartItem: changeAmountInCartItem,
    changeTotalAmountItems: changeTotalAmountItems,
    changeTotalPriceItems: changeTotalPriceItems,
    disapperCartListContent: disapperCartListContent,
    disapperarButtonDisplay: disapperarButtonDisplay,
    getCardInfoFromIndex: getCardInfoFromIndex,
    getCardItemFromIndex: getCardItemFromIndex,
    resetAmountItem: resetAmountItem
});
