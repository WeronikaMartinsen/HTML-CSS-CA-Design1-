const url = "https://www.rainy-days.no/wp-json/wc/store/products/";
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
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.addEventListener("click", () => {
      console.log("Clicked on a product");
      const productId = product.id;
      const productTitle = product.name;
      window.location.href = `products-details-cms.html?id=${productId}&title-cms=${productTitle}`;
    });
    const onSale = product.on_sale;
    const salePrice = product.prices.sale_price;
    const regularPrice = product.prices.regular_price;

    const salePriceStyle = onSale
      ? "display: block; color: red;"
      : "display: none;";
    const regularPriceStyle = onSale ? "text-decoration: line-through;" : "";
    const saleIcon = onSale ? "Sale" : "";

    const saleIconDiv = document.createElement("div");
    saleIconDiv.className = `sale-icon ${onSale ? "on-sale" : "not-on-sale"}`;
    saleIconDiv.textContent = saleIcon;

    const imgDiv = document.createElement("div");
    const img = document.createElement("img");
    img.src = product.images[0].src;
    img.alt = product.name;
    imgDiv.appendChild(img);

    const productTitle = document.createElement("h4");
    productTitle.innerHTML = `${product.name}`;

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("priceDiv");
    const regularPriceSpan = document.createElement("span");
    regularPriceSpan.style.cssText = regularPriceStyle;
    regularPriceSpan.innerHTML = `${regularPrice} $`;
    priceDiv.appendChild(regularPriceSpan);

    const salePriceSpan = document.createElement("span");
    salePriceSpan.style.cssText = salePriceStyle;
    salePriceSpan.className = "salePrice";
    salePriceSpan.innerHTML = `${salePrice} $`;
    priceDiv.appendChild(salePriceSpan);

    const span = document.createElement("span");
    span.className = "spanStyle";
    span.innerHTML = `${product.description}`;

    const button = document.createElement("button");
    button.className = "btnCms";
    button.textContent = "Add to cart";

    productDiv.appendChild(saleIconDiv);
    productDiv.appendChild(imgDiv);
    productDiv.appendChild(productTitle);
    productDiv.appendChild(priceDiv);
    productDiv.appendChild(span);
    productDiv.appendChild(button);

    productContainer.appendChild(productDiv);
  });
}
