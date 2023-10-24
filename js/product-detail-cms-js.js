/* const detailsContainer = document.querySelector(".productDetails");

const titleContainer = document.getElementById("title-cms");

function getJacketIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}
function getJacketTitleFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("title-cms");
}
function showError(message) {
  console.error(message);
}

async function fetchDetail() {
  const itemId = getJacketIdFromQuery();
  if (!itemId) {
      showError("API loading failed. ID not found in the query parameter.");
      return;
  }

  try {
      const response = await fetch(`https://www.rainy-days.no/wp-json/wc/store/products/${itemId}`);
      if (!response.ok) {
          showError("Fetch jacket with ID failed.");
          return;
      }
      const jacketDetail = await response.json();

      titleContainer.textContent = jacketDetail.name;
      createHtml(jacketDetail);
  } catch (error) {
      showError(error.message);
  }
}
function createHtml(jacketDetail) {
  const imageDivDetail = document.createElement("div");
  const div2 = document.createElement("div");
  div2.classList.add("div2");

  imageDivDetail.classList.add("imageDivDetail");
  const image = document.createElement("img");
  image.classList.add("imageDetail");
  image.src = jacketDetail.image;
  image.alt = jacketDetail.description;

  const title = document.createElement("h3");
  title.innerHTML = jacketDetail.title;

  const description = document.createElement("span");
  description.innerHTML = jacketDetail.description;

  const divPrice = document.createElement("div");
  divPrice.classList.add("divPrice");
  const priceJ = jacketDetail.price;
  const saleJ = jacketDetail.discountedPrice;
  const onSaleJ = jacketDetail.onSale;
  if (!onSaleJ) {
    divPrice.innerHTML = `<span class="normalPrice">${priceJ} ,-</span>`;
  } else {
    divPrice.innerHTML = `<span class="oldPrice">${priceJ} ,-</span>
    <span class="jacketSale">${saleJ} ,-</span>`;
  }

  imageDivDetail.appendChild(image);
  imageDivDetail.appendChild(title);
  imageDivDetail.appendChild(description);
  imageDivDetail.appendChild(divPrice);

  return imageDivDetail;
}

fetchDetail();
 */
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

function createHtml(productDetail) {
  productDetail.forEach(function (product) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("cart");
  });
}
fetchProductDetails();
