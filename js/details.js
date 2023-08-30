const detailContainer = document.querySelector(".product-cart");

function getJacketIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));
  return urlParams.get("id");
}

async function fetchDetail() {
  try {
    const itemId = getJacketIdFromQuery();

    if (!itemId) {
      return;
    }

    const response = await fetch(
      `https://api.noroff.dev/api/v1/rainy-days/${itemId}`
    );
    const jacketDetail = await response.json();

    createHtml(jacketDetail);
    console.log(jacketDetail);
  } catch (error) {
    console.error("An error occurred.", error);
  }

  function createHtml(jacketDetail) {
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
    <a href="checkout.html"class="btnConfirm">Add to bag <ion-icon class="iconBag" name="bag-handle-outline"></ion-icon></a>
    </div></div>`;

    console.log(jacketDetail);
  }
}
fetchDetail();
