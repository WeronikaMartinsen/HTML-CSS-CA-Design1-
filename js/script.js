function showError(message) {
  const errorContainer = document.querySelector(".resultsContainer");
  errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
}

const rainyDaysAPI = "https://api.noroff.dev/api/v1/rainy-days";
const jacketsContainer = document.querySelector(".resultsContainer");

async function getJackets() {
  showLoadingIndicator();
  try {
    const response = await fetch(rainyDaysAPI);
    if (!response.ok) {
      throw new Error(`API fetch call failed.`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

async function displayJackets() {
  try {
    const jackets = await getJackets();
    jacketsContainer.innerHTML = "";

    for (let i = 0; i < jackets.length; i++) {
      const jacket = jackets[i];

      const jacketDiv = document.createElement("div");
      jacketDiv.classList.add("card");

      const heartDiv = document.createElement("div");
      heartDiv.classList.add("heartDiv");

      const addToBag = document.createElement("i");
      addToBag.innerHTML += `<ion-icon name="heart-outline"></ion-icon>`;
      addToBag.classList.add("addToBag");
      addToBag.addEventListener("click", () => {
        addToCart({
          id: jacket.id,
          title: jacket.title,
        });
        alert("Item added to favorite!");
      });

      const imageBox = document.createElement("div");
      imageBox.classList.add("imageBox");
      imageBox.addEventListener("click", () => {
        window.location.href = `product-details.html?id=${jacket.id}&title=${jacket.title}`;
      });
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
      jacketText.innerHTML = `<p>${jacket.description}</p>
       `;

      const color = document.createElement("div");
      color.classList.add("colorVariable");

      const jacketColor = jacket.baseColor;
      color.innerHTML = `<p class="pCenter">Color:<ion-icon class="colorIcon" style="color:${jacketColor}"name="ellipse"></ion-icon></p>`;

      const jacketPrice = document.createElement("div");
      const price = jacket.price;
      const sale = jacket.discountedPrice;
      const onSale = jacket.onSale;
      jacketPrice.classList.add("jacketPrice");

      if (!onSale) {
        jacketPrice.innerHTML = `<span class="normalPrice">${price} ,-</span>`;
      } else {
        jacketPrice.innerHTML = `
        <span class="oldPrice">${price} ,-</span>
        <span class="jacketSale">${sale} ,-</span>
        `;
      }

      const buttonDiv = document.createElement("div");
      buttonDiv.classList.add("buttonDiv");
      buttonDiv.innerHTML = `<a class="btnAdd">Add<ion-icon class="iconBag" name="bag-handle-outline"></ion-icon></a>`;
      buttonDiv.addEventListener("click", (event) => {
        if (!event.target.classList.contains("btnAdd")) {
          addToCart(jacket);
          alert("Item added to shopping cart!");
        }
      });

      jacketDiv.appendChild(heartDiv);
      heartDiv.appendChild(addToBag);
      imageBox.appendChild(image);

      jacketDiv.appendChild(jacketTitle);
      jacketDiv.appendChild(imageBox);
      jacketDiv.appendChild(color);
      jacketDiv.appendChild(jacketText);
      jacketDiv.appendChild(jacketPrice);
      jacketDiv.appendChild(buttonDiv);
    }
  } catch (error) {
    showError(error.message);
  }
}

function load(key) {}
function remove(key) {}
function addToCart(jacket) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(jacket);
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {}

function showLoadingIndicator() {
  const loading = document.querySelector(".resultsContainer");
  loading.innerHTML = `<span>Loading...</span>`;
}

displayJackets();
