import { getExistingFavs } from "./favFunctions.js";

function showError(message) {
  const errorContainer = document.querySelector(".resultsContainer");
  errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
}

const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";

const jacketsContainer = document.querySelector(".resultsContainer");

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
      console.log(jacket);

      const jacketDiv = document.createElement("div");
      jacketDiv.classList.add("card");
      jacketsContainer.appendChild(jacketDiv);

      const heartFav = document.createElement("i");
      heartFav.innerHTML += `<i class="far fa-heart" aria-hidden="true" data-id="${jacket.id}" data-name="${jacket.title}"></i>`;

      const imageBox = document.createElement("div");
      imageBox.classList.add("imageBox");
      const image = document.createElement("img");
      image.src = jacket.image;
      image.alt = jacket.description;
      image.classList.add("image");

      const jacketTitle = document.createElement("jacketTitle");
      jacketTitle.classList.add("jacketTitle");
      jacketTitle.innerHTML = `<h4>${jacket.title}</h4>`;

      const jacketText = document.createElement("jacketText");
      jacketText.classList.add("jacketText");
      jacketText.innerHTML = `<p>${jacket.description}</p>
       `;

      const color = document.createElement("div");
      color.classList.add("colorVariable");

      const jacketColor = jacket.baseColor;
      color.innerHTML = `<p class="pCenter">Color:<ion-icon class="colorIcon" style="color:${jacketColor}"name="ellipse"></ion-icon></p>`;

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

      const buttonDiv = document.createElement("div");
      buttonDiv.classList.add("buttonDiv");
      buttonDiv.innerHTML = `<a class="btnAdd">Add to bag</a>`;
      buttonDiv.addEventListener("click", () => {
        window.location.href = `product-details.html?id=${jacket.id}&title=${jacket.title}`;
      });
      console.log(buttonDiv);

      imageBox.appendChild(image);

      jacketDiv.appendChild(heartFav);
      jacketDiv.appendChild(jacketTitle);
      jacketDiv.appendChild(imageBox);
      jacketDiv.appendChild(color);
      jacketDiv.appendChild(jacketText);
      jacketDiv.appendChild(jacketPrice);
      jacketDiv.appendChild(buttonDiv);

      heartFav.addEventListener("click", (event) => {
        handleClick(event, heartFav);
      });
    }
  } catch (error) {
    showError(error.message);
  }
}

function showLoadingIndicator() {
  const loading = document.querySelector(".resultsContainer");
  loading.innerHTML = `<span>Loading...</span>`;
}

function handleClick(event) {
  const heartIcon = event.target;
  heartIcon.classList.toggle("fa");
  heartIcon.classList.toggle("far");

  const id = heartIcon.dataset.id;
  const name = heartIcon.dataset.name;
  const price = heartIcon.dataset.price;
  const image = heartIcon.dataset.image;

  const currentFavs = getExistingFavs();

  const productExists = currentFavs.find(function (fav) {
    return fav.id === id;
  });

  if (productExists === undefined) {
    const product = { id: id, name: name, price: price, image: image };

    currentFavs.push(product);
    saveFavs(currentFavs);
  } else {
    const newFavs = currentFavs.filter((fav) => fav.id !== id);
    saveFavs(newFavs);
  }

  console.log("Saved favorites:", currentFavs);
}

function saveFavs(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}
displayJackets();
