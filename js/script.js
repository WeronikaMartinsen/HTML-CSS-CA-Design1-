const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";

const jacketsContainer = document.querySelector(".resultsContainer");
const searchContainer = document.querySelector(".searchContainer");
const loader = document.querySelector(".loader");
const searchButton = document.querySelector(".search-results");

jacketsContainer.style.display = "none";
searchContainer.style.display = "none";

setTimeout(changeLoading, 1500);

function changeLoading() {
  jacketsContainer.style.display = "flex";
  searchContainer.style.display = "flex";
  loader.classList.remove("loader");
}

async function getJackets() {
  const response = await fetch(rainyDaysAPI);
  const result = await response.json();
  return result;
}

async function displayJackets() {
  const jackets = await getJackets();

  for (let i = 0; i < jackets.length; i++) {
    const jacket = jackets[i];
    console.log(jacket);
    const price = jacket.price;

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

    const jacketPrice = document.createElement("jacketPrice");
    jacketPrice.classList.add("jacketPrice");
    jacketPrice.innerHTML = ` <span class="jacketSale">${price}</span>
     <span class="newPrice">${jacket.discountedPrice}</span>`;

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

displayJackets();

searchButton.onclick = function () {
  const searchInput = document.querySelector(".searchJacket").value;
  console.log(searchInput);
};

heartFav.forEach((button) => {
  button.addEventListener("click", handleClick);
});
function handleClick() {
  console.log(event);
}

handleClick();
