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
    const saleIcon = onSale ? "Sale" : "";

    productContainer.innerHTML += `<div class="product">${saleIcon} 
    <div class="imgDiv"><img src="${product.images[0].src}" alt="${product.name}"></div>
    <h4>${product.name}</h4>
    <div class="priceDiv"><span style="${regularPriceStyle}">${regularPrice} $</span>
    <span style="${salePriceStyle}"class="salePrice">${salePrice} $</span></div>
    <span class="spanStyle">${product.short_description}</span>
    <button class="btnCms">Add to cart</button>

    </div>`;
  });
}
