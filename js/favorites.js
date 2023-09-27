let cartFav = [];

function displayFavoriteItems() {
  const favContainer = document.querySelector(".favContainer");
  const emptyCartMessage = document.querySelector(".empty-cart-message");
  const savedHeart = localStorage.getItem("cartFav");

  if (savedHeart) {
    cartFav = JSON.parse(savedHeart);

    if (cartFav.length > 0) {
      emptyCartMessage.style.display = "none";
      /*    heading.style.display = "block"; */

      cartFav.forEach((favItem) => {
        const favItemDiv = createFavoriteItemElement(favItem, favContainer);
        favContainer.appendChild(favItemDiv);
      });
    } else {
      emptyCartMessage.style.display = "block";
      /*    heading.style.display = "none"; */
    }
  } else {
    emptyCartMessage.style.display = "block";
  }
}

function saveCartFavToLocalStorage() {
  localStorage.setItem("cartFav", JSON.stringify(cartFav));
}

function createFavoriteItemElement(favItem, favContainer) {
  const favItemDiv = document.createElement("div");
  favItemDiv.classList.add("favItem");

  favItemDiv.setAttribute("data-id", favItem.id);
  favItemDiv.setAttribute("data-title", favItem.title);
  favItemDiv.setAttribute("data-image", favItem.image);
  favItemDiv.setAttribute("data-price", favItem.price);

  const heading = document.createElement("h3");
  heading.innerHTML = "Your favorite";
  heading.classList.add("heading");

  const favItemTitle = document.createElement("h4");
  favItemTitle.textContent = favItem.title;

  const favItemImage = document.createElement("img");
  favItemImage.classList.add("favImage");
  favItemImage.src = favItem.image;
  favItemImage.alt = favItem.title;

  const favPrice = document.createElement("span");
  favPrice.classList.add("favPrice");
  favPrice.textContent = favItem.price + ",-";

  const addToBagButton = document.createElement("button");
  addToBagButton.innerText = "Add to Bag";
  addToBagButton.classList.add("addToBagButton");

  addToBagButton.addEventListener("click", () => {
    const itemId = favItemDiv.getAttribute("data-id");
    const itemTitle = favItemDiv.getAttribute("data-title");
    const itemImage = favItemDiv.getAttribute("data-image");
    const itemPrice = favItemDiv.getAttribute("data-price");

    const cartItem = {
      id: itemId,
      title: itemTitle,
      image: itemImage,
      price: parseFloat(itemPrice),
      quantity: 1,
      cartPrice: parseFloat(itemPrice),
    };

    // Add the item to the cart
    addItemToCart(cartItem);

    removeItemFromFavorites(itemId);
    favContainer.removeChild(favItemDiv);
  });

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

  const removeFromFavoritesButton = document.createElement("i");
  removeFromFavoritesButton.innerHTML =
    '<ion-icon name="trash-outline"></ion-icon>';
  removeFromFavoritesButton.classList.add("removeFromFavoritesButton");

  removeFromFavoritesButton.addEventListener("click", () => {
    const itemId = favItemDiv.getAttribute("data-id");
    removeItemFromFavorites(itemId);
    favContainer.removeChild(favItemDiv); // Remove the item from the DOM
  });

  favItemDiv.appendChild(favItemTitle);
  favItemDiv.appendChild(favItemImage);
  favItemDiv.appendChild(favPrice);
  favItemDiv.appendChild(addToBagButton);
  favItemDiv.appendChild(removeFromFavoritesButton);

  return favItemDiv;
}

function removeItemFromFavorites(itemId) {
  const index = cartFav.findIndex((item) => item.id === parseInt(itemId));

  if (index !== -1) {
    cartFav.splice(index, 1);

    saveCartFavToLocalStorage();
    updateHeartCount();

    if (cartFav.length === 0) {
      const emptyCartMessage = document.querySelector(".empty-cart-message");
      if (emptyCartMessage) {
        emptyCartMessage.style.display = "block";
      }
    }
  }
}

function updateHeartCount() {
  const heartCountElement = document.querySelector(".heart-count");
  if (heartCountElement) {
    heartCountElement.textContent = cartFav.length.toString();
  }
}

displayFavoriteItems();
updateHeartCount();
