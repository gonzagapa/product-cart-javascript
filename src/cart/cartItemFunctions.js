
import { dataDesserts } from "../data/getData";
import { currency } from "../utils/currency";
import { changeTotalAmountItems, changeTotalPriceItems } from "./cartContainerFunctions";

const cartList = document.getElementById("cart-list");


export const addItemToCartList = ({ name, price, index }) => {
  cartList.innerHTML += `<li class="list__item" data-index=${index}>
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
              </li>`
}

export const changeAmountInCartItem = (index, newAmount) => {
  const cartItem = cartList.querySelector(`[data-index="${index}"]`);
  const priceItem = dataDesserts[index].price;
  cartItem.querySelector(".amount-per-unit").innerHTML = `${newAmount}x`;
  cartItem.querySelector(".list__item-total").innerHTML = `${currency.format(priceItem * newAmount)}`;
}

cartList.addEventListener("click", (event) => {
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

export const resetAmountItem = (index, newAmount) => {
  const cardItem = getCardItemFromIndex(index);
  cardItem.dataset.amount = newAmount;
}

export const getCardItemFromIndex = (index) => {
  const cardList = [...document.querySelectorAll(".card")];

  const cardItem = cardList.find(cardItem => {
    return cardItem.dataset.index === index;
  })

  return cardItem;
}

export function disapperarButtonDisplay(btnContainer) {
  const btnAddCart = btnContainer.querySelector('#btn__addCart');
  const btnAddCartActive = btnContainer.querySelector('#btn__changeAmount');


  btnAddCartActive.querySelector(".card__amount").innerHTML = '1';
  //console.log(btnAddCartActive.querySelector(".card__amount").innerHTML);
  btnAddCart.classList.remove('js-hidden');
  btnAddCartActive.classList.add('js-hidden');
}
