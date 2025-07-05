const containerDesserts = document.getElementById("desserts__container");

//to manage multiple buttons events using the pattern "event delegation"
containerDesserts.addEventListener("click", (event) => {
    const btnContainer = event.target.closest(".card__btn-container");

    if (!btnContainer) return;

    toggleButtonDisplay(btnContainer);
});

function toggleButtonDisplay(btnContainer) {

    const btnAddCart = btnContainer.querySelector('#btn__addCart');
    const btnAddCartActive = btnContainer.querySelector('#btn__changeAmount');

    btnAddCart.classList.toggle('js-hidden');
    btnAddCartActive.classList.toggle('js-hidden');
}