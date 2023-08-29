import rainyDaysAPI from "./script.js";
import { getJackets } from "./script.js";

const cardContainer = document.querySelector(".component-cart");

async function displayJacket() {
  try {
    const jackets = await getJackets();

    for (let i = 0; i < jackets.length; i++) {
      const jacket = jackets[i];
      const jacketCard = document.createElement("div");
      jacketCard.innerHTML = `<h3>${jacket.title}</h3>`;
      cardContainer.appendChild(jacketCard);
    }
  } catch (error) {
    console.error("Error fetching jackets:", error);
  }
}

displayJacket();
