import { appearCartListContent, changeTotalAmountItems, changeTotalPriceItems } from "../cart/cartContainerFunctions";
import { addItemToCartList, changeAmountInCartItem, disapperarButtonDisplay } from "../cart/cartItemFunctions";
import { dataDesserts } from "../data/getData";

const containerDesserts = document.getElementById("desserts__container");
const cartList = document.getElementById("cart-list");

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
  })
}

const getListItemFromIndex = (index) => {
  const ListItems = [...cartList.querySelectorAll(".list__item")];

  const listItem = ListItems.find(listItem => {
    return listItem.dataset.index === index;
  })

  return listItem;
}





