import { getExistingFavs } from "./favFunctions.js";

const favorites = getExistingFavs();

const jacketsContainer = document.querySelector(".resultsContainer");

favorites.forEach((favorite) => {
  jacketsContainer.innerHTML += `<div class="card">
  <i class="fa fa-heart" aria-hidden="true"></i>
<h4>${favorite.name}</h4>
<span>${favorite.price}</span>
<img ${favorite.image}/>


  </div>`;
});

/* 
async function displayJackets() {
  try {
    const jackets = await getJackets();

    for (let i = 0; i < jackets.length; i++) {
      const jacket = jackets[i];
      console.log(jacket);
    }
  } catch (error) {
    showError(error.message);
  }
}

displayJackets();
 */
