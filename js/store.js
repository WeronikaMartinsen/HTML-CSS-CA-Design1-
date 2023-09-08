function showError(message) {
  const errorContainer = document.querySelector(".checkoutDiv");
  errorContainer.innerHTML = `<h2>Error: ${message}</h2>`;
}

function getProductIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}

function getJacketTitleFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("title"));
  return urlParams.get("title");
}

async function fetchProduct() {
  showLoadingIndicator();
  try {
    const itemId = getProductIdFromQuery();
    if (!itemId) {
      throw new Error(
        "API loading failed. ID not found in the query parameter."
      );
    }

    const response = await fetch(
      `https://api.noroff.dev/api/v1/rainy-days/${itemId}`
    );
    if (!response.ok) {
      throw new Error("Fetch jacket with ID failed.");
    }

    const productDetail = await response.json();
    return productDetail;
  } catch (error) {
    showError(error.message);
    throw error;
  }
}

async function displayProduct() {
  try {
    const productDetail = await fetchProduct();
    const checkoutContainer = document.querySelector(".checkoutDiv");

    checkoutContainer.innerHTML = ""; // Clear previous content

    const productDiv = document.createElement("div");
    productDiv.classList.add("cart-row");

    const image = document.createElement("img");
    image.classList.add("small-asset");
    image.src = productDetail.image;
    image.alt = `Picture of ${productDetail.description}`;

    const productName = document.createElement("h4");
    productName.innerText = productDetail.title; //

    const cartPrice = document.createElement("span");
    cartPrice.classList.add("cartPrice");
    cartPrice.innerText = productDetail.price;

    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("quantityDiv");

    const quantityInput = document.createElement("input");
    quantityInput.classList.add("quantityInput");
    quantityInput.value = "1";
    quantityInput.type = "number";
    quantityInput.name = "input";

    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btn-confirm", "btnRemove");
    btnRemove.innerText = "REMOVE";

    quantityDiv.appendChild(quantityInput);
    quantityDiv.appendChild(btnRemove);

    productDiv.appendChild(image);
    productDiv.appendChild(productName);
    productDiv.appendChild(cartPrice);
    productDiv.appendChild(quantityDiv);

    checkoutContainer.appendChild(productDiv);
  } catch (error) {
    showError(error.message);
  }
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const removeCardButtons = document.getElementsByClassName("btnRemove");
  for (let i = 0; i < removeCardButtons.length; i++) {
    const button = removeCardButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName("quantityInput");
  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  const addToCardButtons = document.getElementsByClassName("shopItemButton");
  for (let i = 0; i < addToCardButtons.length; i++) {
    const button = addToCardButtons[i];
    button.addEventListener("click", addToCardClicked);
  }
}
function removeCartItem(event) {
  const buttonClicked = event.target;
  const cartRow = buttonClicked.parentElement.parentElement;
  cartRow.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCardClicked(event) {
  const button = event.target;
}

function updateCartTotal() {
  const cartRows = document.querySelectorAll(".cart-row");
  let total = 0;

  cartRows.forEach((cartRow) => {
    const cartPrice = cartRow.querySelector(".cartPrice");
    const quantityInput = cartRow.querySelector(".quantityInput");
    const price = parseFloat(cartPrice.innerText);
    const quantity = parseInt(quantityInput.value);
    total += price * quantity;
  });

  total = Math.round(total * 100) / 100;
  const totalPriceElement = document.querySelector(".totalPrice");
  totalPriceElement.innerText = total + "$";
  console.log(total);
}

function showLoadingIndicator() {
  const loading = document.querySelector(".checkoutDiv");
  loading.innerHTML = `<span>Loading...</span>`;
}

displayProduct();
