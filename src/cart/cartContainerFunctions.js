

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

export const appearCartListContent = () => {
    noItemCart.classList.add("js-hidden");
    cartListContainer.classList.remove("js-hidden");
}

const disapperCartListContent = () => {
    noItemCart.classList.remove("js-hidden");
    cartListContainer.classList.add("js-hidden");
}