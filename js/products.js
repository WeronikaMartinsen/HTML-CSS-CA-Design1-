const url = "http://weronika-martinsen.local/wp-json/wc/store/products/";
const productContainer = document.querySelector(".products-cms");

async function getProducts() {
  try {
    const response = await fetch(url);
    const getResults = await response.json();
    createHTML(getResults);
  } catch (error) {
    console.log(error);
  }
}

getProducts();

function createHTML(products) {
  products.forEach(function (product) {
    console.log(products);
    const onSale = product.on_sale;
    const salePrice = product.prices.sale_price;
    const regularPrice = product.prices.regular_price;

    const salePriceStyle = onSale
      ? "display: block; color: red;"
      : "display: none;";
    const regularPriceStyle = onSale ? "text-decoration: line-through;" : "";
    const saleIcon = onSale ? "★ " : "";

    productContainer.innerHTML += `<div class="product">${saleIcon} 
    <img src="${product.images[0].src}" alt="${product.name}">
    <h3>${product.name}</h3>
    <span style="${regularPriceStyle}">${regularPrice} $</span>
    <span style="${salePriceStyle}"class="salePrice">${salePrice} $</span>
    <span>${product.short_description}</span>

    </div>`;
  });
}
