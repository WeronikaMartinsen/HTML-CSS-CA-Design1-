import { getJackets } from "./apicall.js";

const componentCard = document.querySelector(".component-cart");

async function fetchJackets() {
  console.log("Before calling getJackets");
  try {
    const jacketDataArray = await getJackets();

    if (Array.isArray(jacketDataArray) && jacketDataArray.length > 0) {
      const componentCards = document.querySelectorAll(".component-cart");

      componentCards.forEach((componentCard, index) => {
        // Make sure to check if there's a corresponding jacket data for the div
        if (jacketDataArray[index]) {
          const jacketData = jacketDataArray[index];
          console.log(jacketData);
          const imageDiv = document.createElement("div");
          const image = document.createElement("img");
          image.src = jacketData.image;
          image.alt = jacketData.description;
          image.classList.add("assets-jacket");
          imageDiv.classList.add("imageDiv");
          imageDiv.appendChild(image);

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
            <span class="oldPrice">Before: ${price} ,-</span>
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
    console.error("Error fetching data:", error);
  }
}
fetchJackets();
