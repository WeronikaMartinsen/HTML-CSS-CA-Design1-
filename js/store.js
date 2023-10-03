let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  const savedCartData = JSON.parse(localStorage.getItem("cart"));
  const checkoutContainer = document.querySelector(".checkoutContainer");

  if (
    !savedCartData ||
    !Array.isArray(savedCartData) ||
    savedCartData.length === 0
  ) {
    handleEmptyCart();
  } else {
    const emptyCartMessage = document.querySelector(".empty-cart-message");
    emptyCartMessage.style.display = "none";
    cart = savedCartData;
    displayCartProducts(cart);
    updateCartTotal(cart);
    updateBadgeCount(cart);
    ready(cart);
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
    quantityInput.type = "text";
    quantityInput.name = "input";
    quantityInput.readOnly = true;
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
      productDetail.quantity = updatedQuantity;
      updateCartPrice(
        cartData,
        productDetail.id,
        updatedQuantity,
        productDetail.price
      );
      updateCartTotal(cartData);
      updateBadgeCount();
    });

    const buttonPlus = document.createElement("button");
    buttonPlus.classList.add("btnMinusPlus");
    buttonPlus.innerText = "+";
    buttonPlus.addEventListener("click", () => {
      const updatedQuantity = updateQuantity(quantityInput, 1);
      productDetail.quantity = updatedQuantity;
      updateCartPrice(
        cartData,
        productDetail.id,
        updatedQuantity,
        productDetail.price
      );
      updateCartTotal(cartData);
      updateBadgeCount();
    });

    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btn-confirm", "btnRemove");
    btnRemove.innerHTML = "REMOVE";
    btnRemove.addEventListener("click", (event) => {
      const productId = productDetail.id; // Get the product ID from the product detail
      console.log("Remove button clicked");
      console.log("Product ID:", productId);
      removeItemFromCart(productId);
      updateBadgeCount();
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

  ready(cartData);
}

function ready(cartData) {
  const checkoutContainer = document.querySelector(".checkoutDiv");

  checkoutContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnRemove")) {
      const productId = event.target.getAttribute("data-id");
      removeItemFromCart(productId);
      updateBadgeCount();
    }
  });
}

function handleEmptyCart() {
  const emptyCartMessage = document.querySelector(".empty-cart-message");
  const paymentProgress = document.querySelector(".payment-progress");
  const checkoutContainer = document.querySelector(".checkoutContainer");

  if (emptyCartMessage && paymentProgress) {
    emptyCartMessage.style.display = "block";
    paymentProgress.style.display = "none";
    checkoutContainer.style.display = "none";
  }
}
function updateBadgeCount() {
  const badgeCountElement = document.querySelector(".badge");

  if (badgeCountElement) {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    if (totalCount < 1) {
      badgeCountElement.style.display = "none";
      handleEmptyCart();
    } else {
      badgeCountElement.style.display = "block";
      badgeCountElement.textContent = totalCount.toString();
    }
  }
}

const quantityInputs = document.getElementsByClassName("quantityInput");
for (let i = 0; i < quantityInputs.length; i++) {
  const input = quantityInputs[i];
  input.addEventListener("change", () => {
    const productId = input.getAttribute("data-id");
    const updatedQuantity = updateQuantity(input, 0, productId);
    updateCartPrice(cart, productId, updatedQuantity, cartItem.price);
    updateCartTotal(cart);
    updateBadgeCount();
  });
}

function removeItemFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);

  if (index !== -1) {
    cart.splice(index, 1);

    saveCartToLocalStorage(cart);
    updateCartTotal(cart);
    updateBadgeCount();
    displayCartProducts(cart);
  }
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
    const productId = input.getAttribute("data-id");
    const cartItem = cart.find((item) => item.id === parseInt(productId));
    if (cartItem) {
      cartItem.quantity = newValue;
      updateCartPrice(cart, productId, newValue, cartItem.price);
      updateCartTotal(cart);
      updateBadgeCount();
    }
    return newValue;
  }
}

function updateCartTotal(cartData) {
  console.log("Updating cart total...");
  const totalElement = document.querySelector(".totalPrice");
  const total = calculateTotal(cartData);
  console.log("Total:", total);

  if (totalElement) {
    totalElement.textContent = `Total Price: $${total.toFixed(2)}`;
  }
}

function calculateTotal(cartData) {
  if (!cartData || !Array.isArray(cartData)) {
    return 0;
  }

  return cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function addItemToCart(cartItem) {
  const existingItem = cart.find((item) => item.id === cartItem.id);

  if (existingItem) {
    existingItem.quantity++;
    existingItem.cartPrice += cartItem.price;
  } else {
    cart.push(cartItem);
  }

  saveCartToLocalStorage(cart);
  updateCartTotal(cart);
  updateBadgeCount();
}

function clearCart() {
  if (!Array.isArray(cart)) {
    cart = [];
  } else {
    cart.length = 0;
  }

  saveCartToLocalStorage(cart);
  updateCartTotal(cart);
  updateBadgeCount();
  handleEmptyCart();
}

function saveCartToLocalStorage(cartData) {
  localStorage.setItem("cart", JSON.stringify(cartData));
}
