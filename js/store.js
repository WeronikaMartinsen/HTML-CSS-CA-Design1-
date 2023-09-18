/* const bag = document.querySelector("bag");
const cartOverview = document.querySelector(".cartOverview");
cartOverview.inWindow = 0;

bag.addEventListener("mouseover", () => {
  if (cartOverview.classList.container("hide"))
    cartOverview.classList.remove("hide");
});
bag.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (cartOverview.inWindow === 0) {
      cartOverview.classList.add("hide");
    }
  }, 500);
});

cartOverview.addEventListener("mouseover", () => {
  cartOverview.inWindow = 1;
});
cartOverview.addEventListener("mouseleave", () => {
  cartOverview.inWindow = 0;
  cartOverview.classList.add("hide");
});
 */
document.addEventListener("DOMContentLoaded", () => {
  const savedCartData = JSON.parse(localStorage.getItem("cartData"));

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
    displayProduct();
  }
  const quantityInputs = document.getElementsByClassName("quantityInput");

  for (let i = 0; i < quantityInputs.length; i++) {
    const input = quantityInputs[i];
    input.value = savedCartData[i].quantity;
  }
});

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

    checkoutContainer.innerHTML = "";

    const productDiv = document.createElement("div");
    productDiv.classList.add("cart-row");

    const imageTitleDiv = document.createElement("div");
    imageTitleDiv.classList.add("imageTitleDiv");

    const image = document.createElement("img");
    image.classList.add("small-asset");
    image.src = productDetail.image;
    image.alt = `Picture of ${productDetail.description}`;

    const productName = document.createElement("h4");
    productName.innerText = productDetail.title;

    const cartPrice = document.createElement("span");
    cartPrice.classList.add("cartPrice");
    cartPrice.innerText = productDetail.price + ",-";

    const totalPriceElement = document.querySelector(".totalPrice");
    totalPriceElement.innerHTML = productDetail.price + ",-";

    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("quantityDiv");

    const quantityInput = document.createElement("input");
    quantityInput.classList.add("quantityInput");
    quantityInput.value = "1";
    quantityInput.type = "number";
    quantityInput.name = "input";

    const buttonMinus = document.createElement("button");
    buttonMinus.classList.add("btnMinusPlus");
    buttonMinus.innerText = "-";
    buttonMinus.addEventListener("click", () => {
      updateQuantity(quantityInput, -1);
      updateCartTotal();
    });

    const buttonPlus = document.createElement("button");
    buttonPlus.classList.add("btnMinusPlus");
    buttonPlus.innerText = "+";
    buttonPlus.addEventListener("click", () => {
      updateQuantity(quantityInput, 1);
      updateCartTotal();
    });

    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btn-confirm", "btnRemove");
    btnRemove.innerHTML = "REMOVE";

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

      const addToCardButtons =
        document.getElementsByClassName("shopItemButton");
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

    function updateQuantity(input, change) {
      const currentValue = parseInt(input.value);
      const newValue = currentValue + change;

      if (isNaN(newValue) || newValue < 1) {
        input.value = 1;
      } else {
        input.value = newValue;
      }
    }

    function quantityChanged(event) {
      const input = event.target;
      if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
      }
      updateCartTotal();
    }

    function updateCartTotal() {
      const cartRows = document.querySelectorAll(".cart-row");
      const cartData = [];

      let total = 0;

      cartRows.forEach((cartRow) => {
        const cartPrice = cartRow.querySelector(".cartPrice");
        const quantityInput = cartRow.querySelector(".quantityInput");
        const price = parseFloat(cartPrice.innerText);
        const quantity = parseInt(quantityInput.value);
        total += price * quantity;
        cartData.push({
          price: price,
          quantity: quantity,
        });
      });

      localStorage.setItem("cartData", JSON.stringify(cartData));

      total = Math.round(total * 100) / 100;
      totalPriceElement.innerHTML = total;
      console.log(total);
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
