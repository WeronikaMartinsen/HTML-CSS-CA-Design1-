const btnConfirm = document.querySelector(".clearBadge");

if (btnConfirm) {
  btnConfirm.addEventListener("click", () => {
    cart = [];
    saveCartToLocalStorage();
    updateBadgeCount();

    const shoppingBag = document.querySelector(".bag-link");
    if (shoppingBag) {
      shoppingBag.querySelector(".badge").style.display = "none";
    }

    alert("Your order has been completed. Thank you for shopping with us!");
  });
}
