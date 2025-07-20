

const cartContainer = document.getElementById("cart-container");

export const changeTotalAmountItems = (newValue) => {
    const itemTotalAmount = cartContainer.querySelector(".cart__total-products");
    console.log(itemTotalAmount);
    const previousAmount = Number(itemTotalAmount.innerHTML);
    itemTotalAmount.innerHTML = `${newValue + previousAmount}`;
}