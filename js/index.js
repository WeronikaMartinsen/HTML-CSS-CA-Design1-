function showError(message) {
  const errorContainer = document.querySelector(".component-cart");
  errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
}

import { getJackets } from "./apicall.js";

const componentCard = document.querySelector(".component-cart");

async function fetchJackets() {
  showLoadingIndicator();
  try {
    const jacketDataArray = await getJackets();

    if (Array.isArray(jacketDataArray) && jacketDataArray.length > 0) {
      const componentCards = document.querySelectorAll(".component-cart");

      componentCards.forEach((componentCard, index) => {
        if (jacketDataArray[index]) {
          const jacketData = jacketDataArray[index];

          const imageDiv = document.createElement("div");
          const image = document.createElement("img");
          image.src = jacketData.image;
          image.alt = jacketData.description;
          image.classList.add("assets-jacket");
          imageDiv.classList.add("imageDiv");
          imageDiv.appendChild(image);

          componentCard.addEventListener("click", () => {
            window.location.href = `product-details.html?id=${jacketData.id}&title=${jacketData.title}`;
          });

          const title = document.createElement("span");
          title.innerHTML = `<h4>${jacketData.title}</h4>`;

          const jacketPrice = document.createElement("div");
          const price = jacketData.price;
          const sale = jacketData.discountedPrice;
          const onSale = jacketData.onSale;

          if (!onSale) {
            jacketPrice.innerHTML = `<span class="normalPrice">${price} ,-</span>`;
          } else {
            jacketPrice.innerHTML = `
            <span class="oldPrice">${price} ,-</span>
            <span class="jacketSale"> ${sale} ,-</span>
            `;
          }

          componentCard.innerHTML = "";
          componentCard.appendChild(title);
          componentCard.appendChild(imageDiv);
          componentCard.appendChild(jacketPrice);
        }
      });
    }
  } catch (error) {
    showError(error.message);
  }
}

function showLoadingIndicator() {
  const loading = document.querySelector(".component-cart");
  loading.innerHTML = `<span>Loading...</span>`;
}

fetchJackets();
