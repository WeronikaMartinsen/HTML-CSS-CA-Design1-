const detailContainer = document.querySelector(".product-cart");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const urlApiId = "https://api.noroff.dev/api/v1/rainy-days/" + id;

async function getId() {
  try {
    const response = await fetch(urlApiId);
    const json = await response.json();

    console.log(json);

    createHtml(json);
  } catch (error) {
    console.log(error);
  }
}

getId();

function createHtml(json) {
  const divPrice = document.createElement("div");
  divPrice.classList.add("divPrice");
  const priceJ = json.price;
  const saleJ = json.discountedPrice;
  const onSaleJ = json.onSale;

  if (!onSaleJ) {
    divPrice.innerHTML = `<span class="normalPrice">${priceJ} ,-</span>`;
  } else {
    divPrice.innerHTML = `<span class="oldPrice">${priceJ} ,-</span>
    <span class="jacketSale">${saleJ} ,-</span>`;
  }

  detailContainer.innerHTML = `<div class="productContainer">
   <div class="imageDiv"><img class="imageDetail" src="${json.image}"/></div>
    <div class="productContainer2"><h3>${json.title}</h3><span class="spanProduct">${json.description}</span>
    <label class="labelSize" for="sizes">Select size:</label>
    <select class="option" name="size" id="size">
      <optgroup class="option"label="Small:">
        <option class="option">${json.sizes[0]}</option>
        <option class="option">${json.sizes[1]}</option>
      </optgroup>
      <optgroup label="Medium/Large:">
        <option class="option">${json.sizes[2]}</option>
        <option class="option">${json.sizes[3]}</option>
        <option class="option">${json.sizes[4]}</option>
      </optgroup>
    </select>
    <span class="spanProduct">Color:<ion-icon class="colorIcon" style="color:${json.baseColor}"name="ellipse"></ion-icon></span> 
    <div class="jacketPrice">${divPrice.outerHTML}</div>
 


    <a href="checkout.html"class="btnConfirm">Add to bag <ion-icon class="iconBag" name="bag-handle-outline"></ion-icon></a>
    </div></div>`;

  console.log(json);
}
