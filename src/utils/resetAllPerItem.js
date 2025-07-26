export const resetAllperItem = async (index) => {

    const { changeTotalAmountItems,
        disapperarButtonDisplay,
        getCardInfoFromIndex,
        getCardItemFromIndex,
        resetAmountItem, disapperCartListContent } = await import('../cart/index');

    console.log("reset...")
    disapperCartListContent();

    const { itemAmount } = getCardInfoFromIndex(index);
    const btnContainer = getCardItemFromIndex(index).querySelector(".card__btn-container");
    changeTotalAmountItems(-itemAmount);
    resetAmountItem(index, 0);
    disapperarButtonDisplay(btnContainer)
}