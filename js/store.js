function showError(message) {
  const errorContainer = document.querySelector(".checkoutContainer");
  errorContainer.innerHTML = `<h2>Error: ${message}</h2>`;
}

const addedProduct = document.querySelector(".cart-row");

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

async function fetchDetail() {
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
    const jacketDetail = await response.json();
    if (!response.ok) {
      throw new Error("Fetch jacket with ID failed.");
    }
    const titleContainer = document.getElementById("title");
    titleContainer.textContent = title;
    createHtml(jacketDetail);
    console.log(jacketDetail);

    function createHtml(jacketDetail) {
      const divPrice = document.createElement("div");
      divPrice.classList.add("divPrice");
      const priceJ = jacketDetail.price;
      const saleJ = jacketDetail.discountedPrice;
      const onSaleJ = jacketDetail.onSale;

      if (!onSaleJ) {
        divPrice.innerHTML = `<span class="normalPrice">${priceJ} ,-</span>`;
      } else {
        divPrice.innerHTML = `<span class="oldPrice">${priceJ} ,-</span>
    <span class="jacketSale">${saleJ} ,-</span>`;
      }

      detailContainer.innerHTML = ``;

      console.log(jacketDetail);
    }
  } catch (error) {
    showError(error.message);
  }
}

fetchDetail();

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
