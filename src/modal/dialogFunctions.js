import { currency, resetAllperItem } from "../utils/index";

const modalElement = document.getElementById('modal');
const btnNewOrder = document.getElementById('btn_new-order');
const listModal = document.getElementById('list-modal');


export const renderModalElements = ({ items, totalAmountPurchase }) => {
  const totalPriceModal = document.getElementById('total-price-modal');

  for (let item of items) {
    listModal.insertAdjacentHTML('afterbegin', generateListItemTemplate(item))
  }
  totalPriceModal.innerText = `${totalAmountPurchase}`;
}

btnNewOrder.addEventListener('click', () => {
  modalElement.close();
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
}