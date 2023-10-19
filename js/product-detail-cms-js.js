const detailsContainer = document.querySelector(".productDetails");

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
  const title = getJacketTitleFromQuery();
  if (!itemId) {
    throw new Error(
      `API loading failed. ID not founded in the query parameter.`
    );
  }

  try {
    const response = await fetch(
      `http://weronika-martinsen.local/wp-json/wc/store/products/${itemId}`
    );
    const jacketDetail = await response.json();
    if (!response.ok) {
      throw new Error("Fetch jacket with ID failed.");
    }
    const titleContainer = document.getElementById("title-cms");
    titleContainer.textContent = title;
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
