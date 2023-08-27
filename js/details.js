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
    <div class="productContainer2"><h2>${json.title}</h2><span class="spanProduct">${json.description}</span>
    <label class="labelSize" for="sizes">Select size:</label>
    <select class="option" name="size" id="size">
      <optgroup class="option"label="Small:">
        <option class="option">${json.sizes[0]}</option>
        <option class="option">${json.sizes[1]}</option>
      </optgroup>
      <optgroup label="Medium/Large:">
        <option class="option">${json.sizes[2]}</option>
        <option class="option">${json.sizes[3]}</option>
        <option class="option">${json.sizes[4]}</option>
      </optgroup>
    </select>
    <span class="spanProduct">Base color: ${json.baseColor}</span> 
  
    <a href="checkout.html"class="btnConfirm">Add to bag <ion-icon name="bag-handle-outline"></ion-icon></a>
    </div></div>`;
}
