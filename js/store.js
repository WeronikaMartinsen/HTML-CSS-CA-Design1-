const removeCardButtons = document.getElementsByClassName("btnRemove");
console.log(removeCardButtons);

for (i = 0; i < removeCardButtons.length; i++) {
  allRemoveButtons = removeCardButtons[i];
  allRemoveButtons.addEventListener("click", function (event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();
    updateCartTotal();
  });
}

function updateCartTotal() {
  const cartItemContainer = document.getElementsByClassName("checkoutDiv")[0];
  const cartRows = cartItemContainer.getElementsByClassName("cart-row");
  for (i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const cartPrice = cartRow.getElementsByClassName("cartPrice")[0];
    const quantityElement = cartRow.getElementsByClassName("quantityInput")[0];
    const price = parseFloat(cartPrice.innerText.replace("$", ""));
    const quantity = quantityElement.value;
    console.log(price * quantity);
  }
}
