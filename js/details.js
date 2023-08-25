const detailContainer = document.querySelector(".product-cart");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

detailContainer.style.display = "none";

setTimeout(changeLoading, 1500);

function changeLoading() {
  detailContainer.style.display = "flex";
  loader.classList.remove("loader");
}

const urlApiId = "https://api.noroff.dev/api/v1/rainy-days/" + id;

async function getId() {
  try {
    const response = await fetch(urlApiId);
    const json = await response.json();

    console.log(json);

    createHtml(json);
  } catch (error) {
    console.log(error);
  }
}

getId();

function createHtml(json) {
  detailContainer.innerHTML = `<div class="productContainer">
    <img class="image" src="${json.image}"/>
    <div class="productContainer2"><h4>${json.title}</h4><p>${json.description}</div></div>`;
}
