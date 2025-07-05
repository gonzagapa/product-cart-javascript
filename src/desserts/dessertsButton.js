const containerDesserts = document.getElementById("desserts__container");

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

    //todo: logic to add the item into cart-container
}

function changeAmountItem(containerChangeAmount) {
    const cardAmountElemet = containerChangeAmount.querySelector(".card__amount");


    containerChangeAmount.addEventListener('click', (event) => {
        event.stopPropagation(); //This prevents event to bubble and execute more times than usual

        let action = event.target.closest("[data-action]")?.dataset.action;

        if (!action) return;

        let numberValue = Number(cardAmountElemet.innerHTML);
        if (action === "increase") {
            numberValue += 1;
        }
        else if (action === "decrease") {
            numberValue = numberValue !== 0 ? numberValue - 1 : 0;
        }
        cardAmountElemet.innerHTML = `${numberValue}`;

    })
}   