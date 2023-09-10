function showError(message) {
  const errorContainer = document.querySelector(".product-cart");
  errorContainer.innerHTML = `<h2>Error: ${message}</h2>`;
}

function getJacketIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}

function getJacketTitleFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("title");
}

async function fetchDetail() {
  showLoadingIndicator();
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
      const btnConfirm = document.createElement("button");
      btnConfirm.classList.add("btnConfirm");
      btnConfirm.innerHTML = `Add to bag <ion-icon class="iconBag" name="bag-handle-outline"></ion-icon>`;
      btnConfirm.addEventListener("click", () => {
        window.location.href = `checkout.html?id=${jacketDetail.id}&title=${jacketDetail.title}`;
      });

      const color = document.createElement("span");
      color.classList.add("spanProduct");
      color.innerHTML = `Color:<ion-icon class="colorIcon" style="color:${jacketDetail.baseColor}"name="ellipse"></ion-ico`;

      const sizeDiv = document.createElement("div");
      sizeDiv.classList.add("sizeDiv");
      const size = document.createElement("select");
      size.innerHTML = `<label class="labelSize" for="sizes">Select size:</label>
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
      </select>`;
      const detailContainer = document.querySelector(".product-cart");
      detailContainer.innerHTML = "";

      sizeDiv.appendChild(size);
      imageDivDetail.appendChild(image);
      div2.appendChild(title);
      div2.appendChild(description);
      div2.appendChild(color);
      div2.appendChild(sizeDiv);
      div2.appendChild(divPrice);
      div2.appendChild(btnConfirm);
      detailContainer.appendChild(imageDivDetail);
      detailContainer.appendChild(div2);
    }
  } catch (error) {
    showError(error.message);
  }
  function showLoadingIndicator() {
    const loading = document.querySelector(".product-cart");
    loading.innerHTML = `<span>Loading...</span>`;
  }
}

fetchDetail();
