const rainyDaysSingleAPI =
  "https://api.noroff.dev/api/v1/rainy-days/b8b528fc-6c60-41f6-a5a9-9a8b27a9482a";

const productCard = document.querySelector(".product-card");

/* productCard.style.display = "none";

setTimeout(changeLoading, 1500);

function changeLoading() {
  productCard.style.display = "flex";
  loader.classList.remove("loader");
} */

async function getJacket() {
  const response = await fetch(rainyDaysSingleAPI);

  const result = await response.json();

  return result;
}

async function displayJacket() {
  const jacket = await getJacket();
}

displayJacket();
