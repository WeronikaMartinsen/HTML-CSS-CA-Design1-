function showError(message) {
  const errorContainer = document.querySelector(".resultsContainer");
  errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
}

const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";
const jacketsContainer = document.querySelector(".resultsContainer");
let cart = [];

async function getJackets() {
  showLoadingIndicator();
  try {
    const response = await fetch(rainyDaysAPI);
    if (!response.ok) {
      throw new Error(`API fetch call failed.`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

async function displayJackets() {
  try {
    const jackets = await getJackets();
    jacketsContainer.innerHTML = "";

    for (let i = 0; i < jackets.length; i++) {
      const jacket = jackets[i];

      const jacketDiv = document.createElement("div");
      jacketDiv.classList.add("card");

      const heartDiv = document.createElement("div");
      heartDiv.classList.add("heartDiv");

      const addToBag = document.createElement("i");
      addToBag.innerHTML = `<ion-icon name="heart-outline"></ion-icon>`;
      addToBag.classList.add("addToBag");

      const imageBox = document.createElement("div");
      imageBox.classList.add("imageBox");
      imageBox.addEventListener("click", () => {
        window.location.href = `product-details.html?id=${jacket.id}&title=${jacket.title}`;
      });

      const image = document.createElement("img");
      image.src = jacket.image;
      image.alt = jacket.description;
      image.classList.add("image");

      const jacketTitle = document.createElement("div");
      jacketTitle.classList.add("jacketTitle");
      jacketTitle.innerHTML = `<h4>${jacket.title}</h4>`;

      const jacketText = document.createElement("div");
      jacketText.classList.add("jacketText");
      jacketText.innerHTML = `<p>${jacket.description}</p>`;

      const color = document.createElement("div");
      color.classList.add("colorVariable");

      const jacketColor = jacket.baseColor;
      color.innerHTML = `<p class="pCenter">Color:<ion-icon class="colorIcon" style="color:${jacketColor}" name="ellipse"></ion-icon></p>`;

      const jacketPrice = document.createElement("div");
      const price = jacket.price;
      const sale = jacket.discountedPrice;
      const onSale = jacket.onSale;
      jacketPrice.classList.add("jacketPrice");

      if (!onSale) {
        jacketPrice.innerHTML = `<span class="normalPrice">${price} ,-</span>`;
      } else {
        jacketPrice.innerHTML = `
          <span class="oldPrice">${price} ,-</span>
          <span class="jacketSale">${sale} ,-</span>
        `;
      }

      const button = document.createElement("button");
      button.classList.add("btnAdd");
      button.innerHTML = `<a data-id=${jacket.id}&title=${jacket.title}&image=${jacket.image}&price=${jacket.price} class="btnAdd">Add<ion-icon class="iconBag" name="bag-handle-outline"></ion-icon></a>`;
      button.addEventListener("click", function (event) {
        event.preventDefault();

        const productId = button.getAttribute("data-id");
        const productTitle = button.getAttribute("data-title");
        const productImage = button.getAttribute("data-image");
        const productPrice = button.getAttribute("data-price");
        addItemToCart(productId, productTitle, productImage, productPrice);
      });

      jacketDiv.appendChild(heartDiv);
      heartDiv.appendChild(addToBag);
      imageBox.appendChild(image);

      jacketDiv.appendChild(jacketTitle);
      jacketDiv.appendChild(imageBox);
      jacketDiv.appendChild(color);
      jacketDiv.appendChild(jacketText);
      jacketDiv.appendChild(jacketPrice);
      jacketDiv.appendChild(button);

      jacketsContainer.appendChild(jacketDiv);
    }
  } catch (error) {
    showError(error.message);
  }
}

function addItemToCart(id, title, image, price) {
  document.addEventListener("DOMContentLoaded", () => {
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
    }
  });

  function addItemToCart(productId, productTitle, productImage, productPrice) {
    const product = {
      id: productId,
      title: productTitle,
      image: productImage,
      price: parseFloat(productPrice),
      quantity: 1,
    };

    const cartItem = cart.find((item) => item.id === parseInt(productId));

    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push(product); // Push the product object
    }

    saveCartToLocalStorage();

    updateCartTotal();
  }

  const cartItem = cart.find((item) => item.id === parseInt(id));

  if (!product) {
    showError("Product not found");
    return;
  }

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({
      id: parseInt(id),
      title,
      image,
      price: parseFloat(price),
      quantity: 1,
    });
  }

  saveCartToLocalStorage();

  updateCartTotal();
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItemFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);

  if (index !== -1) {
    cart.splice(index, 1);

    saveCartToLocalStorage();

    updateCartTotal();
  }
}

function updateCartTotal() {
  const totalElement = document.querySelector(".totalPrice");
  const total = calculateTotal();
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

function showLoadingIndicator() {
  const loading = document.querySelector(".resultsContainer");
  loading.innerHTML = `<span>Loading...</span>`;
}

loadCartFromLocalStorage();
displayJackets();
updateCartTotal();
document.addEventListener("DOMContentLoaded", initialize);
