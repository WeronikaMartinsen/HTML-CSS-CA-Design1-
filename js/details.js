const detailContainer = document.querySelector(".product-detail");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const url = "https://api.noroff.dev/api/v1/rainy-days/<id>";

console.log(url);
async function fetchJacket() {
  try {
    const response = await fetch(url);
    const details = await response.json();

    console.log(details);

    createHTML(details);
  } catch (error) {
    console.log(error);
    detailContainer.innerHTML = message("error", error);
  }
}

fetchJacket();

function createHtml(details) {
  detailContainer.innerHTML = `<img
  class="product-cart-asset"
  src="${details.image}"
  alt="Jacket Asset"
/>
</div>
<div class="product-info">
<h2 class="h2-product-details">Mountain Cosmos Jacket</h2>
<p class="product-details-paragraph">Senja Whn Jacket Sigma</p>
<p class="select-paragraph">Select color:</p>
<div class="product-colors">
  <div class="color-1 color"></div>
  <div class="color-2 color"></div>
  <div class="color-3 color"></div>
  <div class="color-4 color"></div>
</div>
<p class="select-paragraph">Select size:</p>
<div class="product-size">
  <div class="size">S</div>
  <div class="size">M</div>
  <div class="size">L</div>
  <div class="size">XL</div>
</div>
<ul>
  <li class="wash-instruction">
    Shell: 100% Polyester, Lining: 100%
  </li>
  <li class="wash-instruction">Wash with similar colors</li>
  <li class="wash-instruction">Line dry</li>
</ul>
<div class="washing-icon"></div>
<p class="jacket-price-old-grid"><s>1 999,-</s></p>
<p class="jacket-price-new-grid">1 499,-</p>
<div class="div-for-buy-now">
  <a href="checkout.html" class="btn-product">Buy now</a>
</div>
  `;
}
