const addToBag = document.createElement("i");

function showError(message) {
  const errorContainer = document.querySelector(".resultsContainer");

  if (errorContainer) {
    errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
  } else {
    console.error("Error container not found in the DOM.");
  }
}

const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";
const jacketsContainer = document.querySelector(".resultsContainer");

let cartFav = [];
let heartCount = 0;
let cart = [];
let badgeCount = 0;

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
    console.log(jackets);

    for (let i = 0; i < jackets.length; i++) {
      const jacket = jackets[i];

      const jacketDiv = document.createElement("div");
      jacketDiv.classList.add("card");

      const heartDiv = document.createElement("div");
      heartDiv.classList.add("heartDiv");

      const addToBag = document.createElement("i");
      addToBag.innerHTML = `<ion-icon name="heart-outline"></ion-icon>`;
      addToBag.classList.add("addToBag");
      addToBag.setAttribute("data-id", jacket.id);
      addToBag.setAttribute("data-title", jacket.title);
      addToBag.setAttribute("data-image", jacket.image);
      addToBag.setAttribute("data-price", jacket.price);

      addToBag.addEventListener("click", function (event) {
        event.preventDefault();
        const productId = addToBag.getAttribute("data-id");
        const productTitle = addToBag.getAttribute("data-title");
        const productImage = addToBag.getAttribute("data-image");
        const productPrice = addToBag.getAttribute("data-price");
        if (cartFav.find((item) => item.id === parseInt(productId))) {
          removeFavItemFromCart(parseInt(productId));
        } else {
          addItemToFavorite(
            productId,
            productTitle,
            productImage,
            productPrice,
            addToBag
          );
        }
        toggleHeartIcon(addToBag);
      });

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
      button.innerHTML = `Add to bag <ion-icon class="iconBag" name="bag-handle-outline"></ion-icon>`;
      button.setAttribute("data-id", jacket.id);
      button.setAttribute("data-title", jacket.title);
      button.setAttribute("data-image", jacket.image);
      button.setAttribute("data-price", jacket.price);
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
  const cartItem = cart.find((item) => item.id === parseInt(id));

  if (cartItem) {
    cartItem.quantity++;
    cartItem.cartPrice += cartItem.price;
  } else {
    const newItem = {
      id: parseInt(id),
      title: title,
      image: image,
      price: parseFloat(price),
      quantity: 1,
      cartPrice: parseFloat(price),
    };

    cart.push(newItem);
  }

  saveCartToLocalStorage();
  updateCartTotal();
  updateBadgeCount();

  window.alert("Item added to the cart!");
}

function addItemToFavorite(id, title, image, price, addToBagElement) {
  if (id !== null && id !== undefined) {
    const existingItem = cartFav.find((item) => item.id === parseInt(id));

    if (existingItem) {
      const updatedItem = { ...existingItem };
      updatedItem.quantity++;
      cartFav.push(updatedItem);
    } else {
      const newFavItem = {
        id: parseInt(id),
        title: title,
        image: image,
        price: price,
        quantity: 1,
      };
      cartFav.push(newFavItem);
    }

    saveCartFavToLocalStorage();
    updateHeartCount();
    window.alert("Item added to favorite!");

    const addToBagIcon = addToBagElement.querySelector("ion-icon");
    toggleHeartIcon(true, addToBagIcon);
  } else {
    showError("Invalid item ID.");
  }
}

function saveCartFavToLocalStorage() {
  localStorage.setItem("cartFav", JSON.stringify(cartFav));
}

function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeItemFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);

  if (index !== -1) {
    cart.splice(index, 1);

    updateBadgeCount();
    saveCartToLocalStorage();
    updateCartTotal();
  }
}

function removeFavItemFromCart(productId) {
  const indexFav = cartFav.findIndex((item) => item.id === productId);

  if (indexFav !== -1) {
    cartFav.splice(indexFav, 1);
    saveCartFavToLocalStorage();
    updateHeartCount();
    toggleHeartVisibility();
    const addToBagIcon = addToBag.querySelector("ion-icon");
    toggleHeartIcon(false, addToBagIcon);
  }
}

function toggleHeartIcon(isBlackHeart, icon) {
  if (icon) {
    if (isBlackHeart) {
      icon.setAttribute("name", "heart");
    } else {
      icon.setAttribute("name", "heart-outline");
    }
  }
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function calculateFavTotal() {
  return cartFav.reduce((total, item) => total + item.price * item.quantity, 0);
}

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

function updateCartTotal() {
  const totalElement = document.querySelector(".totalPrice");
  const total = calculateTotal();
}

function updateBadgeCount() {
  const badge = document.querySelector(".badge");
  badgeCount = cart.reduce((total, item) => total + item.quantity, 0);
  badge.textContent = badgeCount;
  if (badgeCount > 0) {
    badge.style.display = "block";
  } else {
    badge.style.display = "none";
  }
}

function updateHeartCount() {
  const heart = document.querySelector(".heart");
  const savedCartFav = localStorage.getItem("cartFav");

  console.log("savedCartFav:", savedCartFav); // Check if cartFav is retrieved from localStorage
  console.log("cartFav:", cartFav);

  if (savedCartFav) {
    cartFav = JSON.parse(savedCartFav);
    const heartCount = cartFav.reduce(
      (total, item) => total + item.quantity,
      0
    );
    heart.textContent = heartCount;
  }
}

function showLoadingIndicator() {
  const loading = document.querySelector(".resultsContainer");
  loading.innerHTML = `<span>Loading...</span>`;
}

document.addEventListener("DOMContentLoaded", function () {
  displayJackets();
  loadCartFromLocalStorage();

  updateCartTotal();
  updateBadgeCount();
  updateHeartCount();
});
