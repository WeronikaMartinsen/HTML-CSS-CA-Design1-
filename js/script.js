const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";

const jacketsContainer = document.querySelector(".resultsContainer");

async function getJackets() {
  showLoadingIndicator();
  const response = await fetch(rainyDaysAPI);
  const result = await response.json();
  return result;
}

async function displayJackets() {
  const jackets = await getJackets();
  jacketsContainer.innerHTML = "";

  for (let i = 0; i < jackets.length; i++) {
    const jacket = jackets[i];
    console.log(jacket);

    const jacketDiv = document.createElement("div");
    jacketDiv.classList.add("card");
    jacketsContainer.appendChild(jacketDiv);

    const heartFav = document.createElement("i");
    heartFav.innerHTML += `<ion-icon class="heartFav" name="heart-outline"></ion-icon>`;

    const image = document.createElement("img");
    image.src = jacket.image;
    image.alt = jacket.description;
    image.classList.add("image");

    const jacketTitle = document.createElement("jacketTitle");
    jacketTitle.classList.add("jacketTitle");
    jacketTitle.innerHTML = `<h4>${jacket.title}</h4>`;

    const jacketText = document.createElement("jacketText");
    jacketText.classList.add("jacketText");
    jacketText.innerHTML = `<h5>${jacket.description}</h5>
     `;

    const jacketPrice = document.createElement("div");
    const price = jacket.price;
    const sale = jacket.discountedPrice;
    const onSale = jacket.onSale;

    jacketPrice.classList.add("jacketPrice");

    if (!onSale) {
      jacketPrice.innerHTML = `<span class="normalPrice">${price} ,-</span>`;
    } else {
      jacketPrice.innerHTML = `<span class="oldPrice">${price} ,-</span>
      <span class="jacketSale">${sale} ,-</span>`;
    }

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("buttonDiv");
    buttonDiv.innerHTML += `<a class="btnAdd" href="product-details.html?id=${jacket.id}">Add to bag</a>`;

    jacketDiv.appendChild(heartFav);
    jacketDiv.appendChild(jacketTitle);
    jacketDiv.appendChild(image);
    jacketDiv.appendChild(jacketText);
    jacketDiv.appendChild(jacketPrice);
    jacketDiv.appendChild(buttonDiv);
  }
}

function showLoadingIndicator() {
  const loading = document.querySelector(".resultsContainer");
  loading.innerHTML = `<span>Loading...</span>`;
}

displayJackets();
