'use strict';

const btnAddCart = document.querySelector('.card__btn');
const btnAddCartActive = document.querySelector('.card__btn--active');

btnAddCart.addEventListener('click', () => {
    console.log('Agregar al carro');
    btnAddCart.classList.add('js-hidden');
    btnAddCartActive.classList.remove('js-hidden');
});
