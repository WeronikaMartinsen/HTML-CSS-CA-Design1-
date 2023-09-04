function showError(message) {
  const errorContainer = document.querySelector(".resultsContainer");
  errorContainer.innerHTML = `<h2>Error: ${message}</h2>`;
}

const detailContainer = document.querySelector(".product-cart");

function getJacketIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}

function getJacketTitleFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("title"));
  return urlParams.get("title");
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
      `https://api.noroff.dev/api/v1/rainy-days/${itemId}`
    );
    const jacketDetail = await response.json();
    if (!response.ok) {
      throw new Error("Fetch jacket with ID failed.");
    }
    const titleContainer = document.getElementById("title");
    titleContainer.textContent = title;
    createHtml(jacketDetail);

    const btnConfirm = document.querySelector(".btnConfirm");
    btnConfirm.addEventListener("click", () => {
      window.location.href = `checkout.html?id=${jacketDetail.id}&title=${jacketDetail.title}`;
    });

    function createHtml(jacketDetail) {
      const divPrice = document.createElement("div");
      divPrice.classList.add("divPrice");
      const priceJ = jacketDetail.price;
      const saleJ = jacketDetail.discountedPrice;
      const onSaleJ = jacketDetail.onSale;
      /* const btnConfirm = document.querySelector(".btnConfirm");
      btnConfirm.addEventListener("click", () => {
        window.location.href = `checkout.html?id=${jacketDetail.id}&title=${jacketDetail.title}`;
      }); */

      if (!onSaleJ) {
        divPrice.innerHTML = `<span class="normalPrice">${priceJ} ,-</span>`;
      } else {
        divPrice.innerHTML = `<span class="oldPrice">${priceJ} ,-</span>
    <span class="jacketSale">${saleJ} ,-</span>`;
      }

      detailContainer.innerHTML = `<div class="productContainer">
   <div class="imageDiv"><img class="imageDetail" src="${jacketDetail.image}"/></div>
    <div class="productContainer2"><h3>${jacketDetail.title}</h3><span class="spanProduct">${jacketDetail.description}</span>
    <label class="labelSize" for="sizes">Select size:</label>
    <select class="option" name="size" id="size">
      <optgroup class="option"label="Small:">
        <option class="option">${jacketDetail.sizes[0]}</option>
        <option class="option">${jacketDetail.sizes[1]}</option>
      </optgroup>
      <optgroup label="Medium/Large:">
        <option class="option">${jacketDetail.sizes[2]}</option>
        <option class="option">${jacketDetail.sizes[3]}</option>
        <option class="option">${jacketDetail.sizes[4]}</option>
      </optgroup>
    </select>
    <span class="spanProduct">Color:<ion-icon class="colorIcon" style="color:${jacketDetail.baseColor}"name="ellipse"></ion-icon></span> 
    <div class="jacketPrice">${divPrice.outerHTML}</div>
    <button class="btnConfirm shopItemButton">Add to bag <ion-icon class="iconBag" name="bag-handle-outline"></ion-icon></button>
    </div></div>`;

      console.log(jacketDetail);
    }
  } catch (error) {
    showError(error.message);
  }
}

fetchDetail();
