
const modalElement = document.getElementById('modal');
const btnConfirmOrder = document.getElementById('btn-confirm');
const btnNewOrder = document.getElementById('btn_new-order');

btnConfirmOrder.addEventListener('click', (event) => {
    modalElement.showModal();
})

btnNewOrder.addEventListener('click', () => {
    modalElement.close();
})