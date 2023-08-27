const cardContainer = document.querySelector(".component-cart");

cardContainer.innerHTML = `<div class="component-cart">
<img
  class="assets-jacket"
  src="${jacket.image}"
  alt="Jacket asset"
/>
<p class="jacket-name">${jacket.title}</p>
<div class="color-choice">
  <div class="color-red"></div>
  <div class="color-blue"></div>
  <div class="color-gray"></div>
  <div class="color-black"></div>
</div>
<p class="jacket-price-old">
  <del> 1 999,-</del>
</p>
<p class="jacket-price-new">1 499,-</p>
</div>`;
