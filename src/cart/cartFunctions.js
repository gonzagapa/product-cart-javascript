import { dataDesserts } from "../data/loadContent";
import { currency } from "../utils/currency";

const containerDesserts = document.getElementById("desserts__container");
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
                  <button class="btn-reset list__item-btn">
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