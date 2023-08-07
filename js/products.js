const products = [
  {
    name: "Jacket 1",
    price: 1499,
    soldOut: false,
    colors: ["white", "orange", "blue"],
  },
  {
    name: "Jacket 1",
    price: 1499,
    soldOut: false,
    colors: ["white", "orange", "blue"],
  },
  {
    name: "Jacket 2",
    price: 1899,
    soldOut: false,
    colors: ["white", "orange", "blue"],
  },
  {
    name: "Jacket 3",
    price: 1500,
    soldOut: true,
    colors: ["white", "orange", "blue"],
  },
  {
    name: "Jacket 4",
    price: 1500,
    soldOut: true,
    colors: ["white", "orange", "blue"],
  },
  {
    name: "Jacket 5",
    price: 1500,
    soldOut: true,
    colors: ["white", "orange", "blue"],
  },
  {
    name: "Jacket 6",
    price: 1500,
    soldOut: true,
    colors: ["white", "orange", "blue"],
  },
  {
    name: "Jacket 3",
    price: 1500,
    soldOut: true,
    colors: ["white", "orange", "blue"],
  },
  {
    name: "Jacket 7",
    price: 1500,
    soldOut: true,
    colors: ["white", "orange", "blue"],
  },
];

const container = document.querySelector(".product-container");

console.log(container);

let html = "";

for (let i = 0; i < products.length; i++) {
  let inStock = "Yes";

  if (!products[i].soldOut) {
    inStock = "No";
  }

  html += `<div class="product">
  <h4>${products[i].name}</h4>
  <p>Price: ${products[i].price},-</p>
  <p>In stock: ${inStock}</p>
  <div class="color-box">Colors: ${products[i].colors}</div>
  
  </div>`;

  console.log(html);
}

container.innerHTML = html;
