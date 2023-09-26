function displayFavoriteItems() {
  const favContainer = document.querySelector(".favContainer");
  const savedHeart = localStorage.getItem("cartFav");

  if (savedHeart) {
    const cartFav = JSON.parse(savedHeart);

    cartFav.forEach((favItem) => {
      const favItemDiv = document.createElement("div");
      favItemDiv.classList.add("favItem");

      favItemDiv.setAttribute("data-id", favItem.id);
      favItemDiv.setAttribute("data-title", favItem.title);
      favItemDiv.setAttribute("data-image", favItem.image);
      favItemDiv.setAttribute("data-price", favItem.price);

      const favItemTitle = document.createElement("h4");
      favItemTitle.textContent = favItem.title;

      const favItemImage = document.createElement("img");
      favItemImage.classList.add("favImage");
      favItemImage.src = favItem.image;
      favItemImage.alt = favItem.title;

      const favPrice = document.createElement("favPrice");
      favPrice.classList.add("favPrice");
      favPrice.textContent = favItem.price + ",-";

      // Create the "Add to Bag" button
      const addToBagButton = document.createElement("button");
      addToBagButton.innerText = "Add to Bag";
      addToBagButton.classList.add("addToBagButton");

      addToBagButton.addEventListener("click", () => {
        const itemId = favItemDiv.getAttribute("data-id");
        const itemTitle = favItemDiv.getAttribute("data-title");
        const itemImage = favItemDiv.getAttribute("data-image");
        const favPrice = favItem.price;

        addItemToCart(itemId, itemTitle, itemImage, favPrice);

        addToBagButton.innerText = "Added!";
        addToBagButton.disabled = true;
      });

      favItemDiv.setAttribute("data-id", favItem.id);
      favItemDiv.setAttribute("data-title", favItem.title);
      favItemDiv.setAttribute("data-image", favItem.image);
      favPrice.setAttribute("data-price", favItem.price);

      favItemDiv.appendChild(favItemTitle);
      favItemDiv.appendChild(favItemImage);
      favItemDiv.appendChild(favPrice);
      favItemDiv.appendChild(addToBagButton);
      favContainer.appendChild(favItemDiv);
    });
  } else {
    favContainer.innerHTML = "No favorite items yet.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const heart = document.querySelector(".heart");
  const savedCartFav = localStorage.getItem("cartFav");

  if (savedCartFav) {
    cartFav = JSON.parse(savedCartFav);
    updateHeartCount();
  }

  displayFavoriteItems();
});
