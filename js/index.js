import { getJackets } from "./apicall.js";

const componentCard = document.querySelector(".component-cart");
async function fetchJackets() {
  try {
    const singleData = await getJackets();

    const image = document.createElement("img");
    image.src = singleData.image;
    image.alt = singleData.description;
    image.classList.add("assets-jacket");
    componentCard.appendChild(image);
  } catch (error) {
    console.error(error);
  }
}
fetchJackets();
