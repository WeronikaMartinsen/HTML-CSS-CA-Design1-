document.addEventListener("DOMContentLoaded", () => {
  // Retrieve cart data from local storage
  const savedCartData = JSON.parse(localStorage.getItem("cart"));

  if (
    !savedCartData ||
    !Array.isArray(savedCartData) ||
    savedCartData.length === 0
  ) {
    const emptyCartMessage = document.getElementById("emptyCartMessage");
    if (emptyCartMessage) {
      emptyCartMessage.style.display = "block";
    }
  } else {
    displayCartProducts(savedCartData);
    updateCartTotal(savedCartData);
  }
});

function showError(message) {
  const errorContainer = document.querySelector(".checkoutDiv");
  errorContainer.innerHTML = `<h2>Error: ${message}</h2>`;
}

function displayCartProducts(cartData) {
  const checkoutContainer = document.querySelector(".checkoutDiv");

  checkoutContainer.innerHTML = "";

  cartData.forEach((productDetail) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("cart-row");

    const imageTitleDiv = document.createElement("div");
    imageTitleDiv.classList.add("imageTitleDiv");

    const image = document.createElement("img");
    image.classList.add("small-asset");
    image.src = productDetail.image;
    image.alt = `Picture of ${productDetail.title}`;

    const productName = document.createElement("h4");
    productName.innerText = productDetail.title;

    const cartPrice = document.createElement("span");
    cartPrice.classList.add("cartPrice");
    cartPrice.setAttribute("data-id", productDetail.id);
    cartPrice.innerText = productDetail.price + ",-";

    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("quantityDiv");

    const quantityInput = document.createElement("input");
    quantityInput.classList.add("quantityInput");
    quantityInput.value = productDetail.quantity;
    quantityInput.type = "number";
    quantityInput.name = "input";
    quantityInput.addEventListener("change", () => {
      const updatedQuantity = parseInt(quantityInput.value);
      updateCartPrice(
        cartData,
        productDetail.id,
        updatedQuantity,
        productDetail.price
      );
      updateCartTotal(cartData);
    });

    const buttonMinus = document.createElement("button");
    buttonMinus.classList.add("btnMinusPlus");
    buttonMinus.innerText = "-";
    buttonMinus.addEventListener("click", () => {
      const updatedQuantity = updateQuantity(quantityInput, -1);
      productDetail.quantity = updatedQuantity; // Update the quantity in cartData
      updateCartPrice(
        cartData,
        productDetail.id,
        updatedQuantity,
        productDetail.price
      );
      updateCartTotal(cartData);
    });

    const buttonPlus = document.createElement("button");
    buttonPlus.classList.add("btnMinusPlus");
    buttonPlus.innerText = "+";
    buttonPlus.addEventListener("click", () => {
      const updatedQuantity = updateQuantity(quantityInput, 1);
      productDetail.quantity = updatedQuantity; // Update the quantity in cartData
      updateCartPrice(
        cartData,
        productDetail.id,
        updatedQuantity,
        productDetail.price
      );
      updateCartTotal(cartData);
    });

    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btn-confirm", "btnRemove");
    btnRemove.innerHTML = "REMOVE";
    btnRemove.addEventListener("click", () => {
      removeCartItem(productDetail.id, cartData);
    });

    quantityDiv.appendChild(buttonMinus);
    quantityDiv.appendChild(quantityInput);
    quantityDiv.appendChild(buttonPlus);
    productDiv.appendChild(imageTitleDiv);
    imageTitleDiv.appendChild(image);
    imageTitleDiv.appendChild(productName);
    productDiv.appendChild(cartPrice);
    productDiv.appendChild(quantityDiv);
    productDiv.appendChild(btnRemove);

    checkoutContainer.appendChild(productDiv);
  });

  ready();
}

function ready() {
  const removeCardButtons = document.getElementsByClassName("btnRemove");
  for (let i = 0; i < removeCardButtons.length; i++) {
    const button = removeCardButtons[i];
    button.addEventListener("click", () => {
      const productId = button.getAttribute("data-id");
      removeCartItem(productId);
    });
  }

  const quantityInputs = document.getElementsByClassName("quantityInput");
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener("change", () => {
      updateQuantity(input, 0);
      updateCartTotal(cartData);
    });
  }
}

function removeCartItem(productId, cartData) {
  const updatedCartData = cartData.filter((item) => item.id !== productId);
  displayCartProducts(updatedCartData);
  updateCartTotal(updatedCartData);
  saveCartToLocalStorage(updatedCartData);
}

function updateCartPrice(cartData, productId, quantity, unitPrice) {
  const itemToUpdate = cartData.find((item) => item.id === productId);

  if (itemToUpdate) {
    const updatedPrice = quantity * unitPrice;
    itemToUpdate.cartPrice = updatedPrice;

    const cartPriceElement = document.querySelector(
      `.cartPrice[data-id="${productId}"]`
    );
    if (cartPriceElement) {
      cartPriceElement.innerText = updatedPrice.toFixed(2) + " ,-";
    }
  }
}

function updateQuantity(input, change) {
  const currentValue = parseInt(input.value);
  const newValue = currentValue + change;

  if (isNaN(newValue) || newValue < 1) {
    input.value = 1;
    return 1;
  } else {
    input.value = newValue;
    return newValue;
  }
}

function updateCartTotal(cartData) {
  const totalElement = document.querySelector(".totalPrice");
  const total = calculateTotal(cartData);

  const formattedTotal = total.toFixed(2);
  totalElement.innerHTML = formattedTotal + " ,-";
}

function calculateTotal(cartData) {
  return cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function saveCartToLocalStorage(cartData) {
  localStorage.setItem("cart", JSON.stringify(cartData));
}
