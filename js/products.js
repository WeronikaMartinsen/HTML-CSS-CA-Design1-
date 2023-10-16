const url = "http://weronika-martinsen.local/wp-json/wc/store/products/";
const productContainer = document.querySelector(".products-cms");

async function getProducts() {
  try {
    const response = await fetch(url);
    const getResults = await response.json();
    createHTML(getResults);
    console.log(getResults);
  } catch (error) {
    console.log(error);
  }
}

getProducts();

function createHTML(products) {
  products.forEach(function (product) {
    console.log(product);
    productContainer.innerHTML += `<div class="product"> 
    <h2>${product.name}</h2>
    <img src="${product.images[0].src}" alt="${product.name}">

    </div>`;
  });
}
