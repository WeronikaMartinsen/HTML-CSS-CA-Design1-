const detailsContainer = document.querySelector(".productDetails");

function getProductIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}

async function fetchProductDetails() {
  const productId = getProductIdFromQuery();
  if (!productId) {
    console.error("Product ID not found in the query parameter.");
    return;
  }

  try {
    const response = await fetch(
      `https://www.rainy-days.no/wp-json/wc/store/products/${productId}`
    );
    if (!response.ok) {
      console.error("Failed to fetch product details.");
      return;
    }

    const productDetail = await response.json();

    createHtml(productDetail);
  } catch (error) {
    console.error(error.message);
  }
}

function createHtml(jacketDetail) {
  console.log(jacketDetail);
  const detailCart = document.createElement("div");
  detailCart.classList.add("detailCart");

  const imageDiv = document.createElement("div");
  imageDiv.classList.add("imageDivLeft");
  const image = document.createElement("img");
  image.classList.add("imgDetail");
  image.src = jacketDetail.images[0].src;
  image.alt = jacketDetail.description;

  const detailInfo = document.createElement("div");
  detailInfo.classList.add("detailInfo");

  const title = document.createElement("h3");
  title.innerHTML = jacketDetail.name;

  const description = document.createElement("span");
  description.innerHTML = jacketDetail.description;

  const divPrice = document.createElement("div");
  divPrice.classList.add("divPrice");
  const priceJ = jacketDetail.prices.regular_price;
  const saleJ = jacketDetail.prices.sale_price;
  const onSaleJ = jacketDetail.on_sale;
  if (!onSaleJ) {
    divPrice.innerHTML = `<span class="normalPrice">${priceJ} ,-</span>`;
  } else {
    divPrice.innerHTML = `<span class="oldPrice">${priceJ} ,-</span>
    <span class="jacketSale">${saleJ} ,-</span>`;
  }

  const btnAddToBag = document.createElement("button");
  btnAddToBag.classList.add("btnAddToBag");
  btnAddToBag.textContent = "Add to bag";
  btnAddToBag.addEventListener("click", function () {
    alert("Product added to the bag!");
  });

  imageDiv.appendChild(image);
  detailInfo.appendChild(title);
  detailInfo.appendChild(description);
  detailInfo.appendChild(divPrice);
  detailInfo.appendChild(btnAddToBag);

  detailsContainer.appendChild(detailCart);
  detailCart.appendChild(imageDiv);
  detailCart.appendChild(detailInfo);
}

fetchProductDetails();
