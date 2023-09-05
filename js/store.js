/* function showError(message) {
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
  const itemId = getProductIdFromQuery();
  const title = getJacketTitleFromQuery();
  if (!itemId) {
    throw new Error(
      `API loading failed. ID not founded in the query parameter.`
    );
  }

  try {
    const response = await fetch(
      `https://api.noroff.dev/api/v1/rainy-days/${itemId}`
    );
    const productDetail = await response.json();
    if (!response.ok) {
      throw new Error("Fetch jacket with ID failed.");
    }

    const checkoutContainer = document.querySelector("checkoutDiv");
    function createHtml(productDetail) {
      const productContainer = document.createElement("div");
      productContainer.classList.add("cart-row");

      checkoutContainer.appendChild(productContainer);
      const image = document.createElement("img");
      image.classList.add("small-asset");
      image.innerHTML = `${productDetail.image}`;

      /*      <div class="checkoutDiv">
    <div class="cart-row">
      <div class="cart-item">
        <img class="small-asset" src="images/Asset%203.png" alt="Picture of jacket.">
        <span>product name</span>
        </div>
        <span class="cartPrice">1799</span>
        <div class="quantityDiv">
        <input class="quantityInput" value="1" type="number" name="input"  placeholder="">
        <button class="btn-confirm btnRemove">REMOVE</button></div>
    </div> */
/*     }
  } catch (error) {
    showError(error.message);
  }
}
fetchProduct();

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
  buttonClicked.parentElement.parentElement.remove();
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
  const cartItemContainer = document.getElementsByClassName("checkoutDiv")[0];
  const cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const cartPrice = cartRow.getElementsByClassName("cartPrice")[0];
    const quantityElement = cartRow.getElementsByClassName("quantityInput")[0];
    const price = parseFloat(cartPrice.innerText);
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("totalPrice")[0].innerText = total + "$";
}
  */

function showError(message) {
  const errorContainer = document.querySelector(".checkoutDiv");
  errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
}

const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";

const checkoutContainer = document.querySelector(".checkoutDiv");

async function fetchProduct() {
  showLoadingIndicator();
  try {
    const response = await fetch(rainyDaysAPI);
    if (!response.ok) {
      throw new Error(`API fetch call failed.`);
    }
    console.log(response);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
async function displayProduct() {
  try {
    const jackets = await fetchProduct();
    checkoutContainer.innerHTML = "";

    for (let i = 0; i < jackets.length; i++) {
      const jacket = jackets[i];
      console.log(jackets);

      const productDiv = document.createElement("div");
      productDiv.classList.add("cart-row");
      checkoutContainer.appendChild(productDiv);
    }
  } catch (error) {
    showError(error.message);
  }
}
function showLoadingIndicator() {
  const loading = document.querySelector(".checkoutDiv");
  loading.innerHTML = `<span>Loading...</span>`;
}

displayProduct();
console.log(displayProduct);
