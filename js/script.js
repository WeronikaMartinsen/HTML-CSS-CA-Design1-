const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";

const jacketsContainer = document.querySelector(".resultsContainer");

const loader = document.querySelector(".loader");

jacketsContainer.style.display = "none";

setTimeout(changeLoading, 1500);

function changeLoading() {
  jacketsContainer.style.display = "flex";
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

    if (jacket.onSale) {
      const jacketDiv = document.createElement("div");
      jacketDiv.classList.add("card");
      jacketsContainer.appendChild(jacketDiv);

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
      jacketPrice.innerHTML = ` <span class="jacketSale">${jacket.price}</span>
     <span>${jacket.discountedPrice}</span>`;

      const button = document.createElement("a");
      button.href = "product-details.html";
      button.classList.add("btnAdd");
      button.textContent = "Add to bag";

      jacketDiv.appendChild(jacketTitle);
      jacketDiv.appendChild(image);
      jacketDiv.appendChild(jacketText);
      jacketDiv.appendChild(jacketPrice);
      jacketDiv.appendChild(button);
    }
  }
}

displayJackets();
