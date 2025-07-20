import { changeTotalAmountItems } from "../cart/cartContainerFunctions";
import { addItemToCartList, changeAmountInCartItem } from "../cart/cartItemFunctionsjs";
import { dataDesserts } from "../data/getData";

const containerDesserts = document.getElementById("desserts__container");
const cartListContainer = document.getElementById("car-list-container");
const noItemCart = document.getElementById("no-item-cart");

//to manage multiple buttons events using the pattern "event delegation"
containerDesserts.addEventListener("click", (event) => {
  const btnContainer = event.target.closest(".card__btn-container");

  if (!btnContainer) return;

  const containerChangeAmount = btnContainer.querySelector('#btn__changeAmount')
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
  const cardElement = btnContainer.closest("article");

  cardElement.dataset.amount = cardElement.dataset.amount == 0 ? 1 : cardElement.dataset.amount;
  changeTotalAmountItems(1);

  noItemCart.classList.add("js-hidden");
  cartListContainer.classList.remove("js-hidden");
  const dataIndex = btnContainer.closest("article").dataset.index;
  const itemDessert = dataDesserts[dataIndex];
  console.log(itemDessert);
  addItemToCartList({ ...itemDessert, index: dataIndex });
}

function changeAmountItem(containerChangeAmount) {
  const cardAmountElemet = containerChangeAmount.querySelector(".card__amount");
  const cardElement = containerChangeAmount.closest("article");


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
      else {
        numberValue = 0;
      }
    }
    cardAmountElemet.innerHTML = `${numberValue}`;
    cardElement.dataset.amount = numberValue;
    changeAmountInCartItem(cardElement.dataset.index, numberValue);
  })
}   