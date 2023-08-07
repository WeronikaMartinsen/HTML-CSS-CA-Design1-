const container = document.querySelector(".product-container");

console.log(container);

let html = "";

for (let i = 0; i < products.length; i++) {
  let inStock = "Yes";

  if (!products[i].soldOut) {
    inStock = "No";
  }

  let name = "Unknown name";

  if (products[i].name) {
    name = products[i].name;
  }

  html += `<div class="product">
  <h4>${name}</h4>
  <p>Price: ${products[i].price},-</p>
  <p>In stock: ${inStock}</p>
  <div class="color-box">Colors: ${products[i].colors}</div>
  
  </div>`;

  console.log(html);
}

container.innerHTML = html;
