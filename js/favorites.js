import { getExistingFavs } from "./favFunctions.js";

const favorites = getExistingFavs();

const jacketsContainer = document.querySelector(".resultsContainer");

favorites.forEach((favorite) => {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const heartIcon = document.createElement("i");
  heartIcon.classList.add("fa", "fa-heart");
  heartIcon.setAttribute("aria-hidden", "true");

  const title = document.createElement("h4");
  title.textContent = favorite.name;

  const price = document.createElement("span");
  price.textContent = favorite.price;

  const image = document.createElement("img");
  image.src = favorite.image;
  image.alt = favorite.name;
  console.log("Image Path:", favorite.image); // You can set an alt attribute for accessibility
  console.log("Favorites:", favorites);
  // Append the elements to the card div
  cardDiv.appendChild(heartIcon);
  cardDiv.appendChild(title);
  cardDiv.appendChild(price);
  cardDiv.appendChild(image);

  jacketsContainer.appendChild(cardDiv);
});
