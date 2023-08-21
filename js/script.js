const resultsContainer = document.querySelector(".resultsContainer");
const loader = document.querySelector(".loader");

resultsContainer.style.display = "none";

setTimeout(changeLoading, 1500);

function changeLoading() {
  resultsContainer.style.display = "flex";
  loader.classList.remove("loader");
}
fetch("https://api.noroff.dev/api/v1/rainy-days")
  .then((data) => {
    return data.json();
  })
  .then((complatedata) => {
    console.log(complatedata);
    let data1 = "";

    complatedata.map((values) => {
      data1 += `  <div class="results">
        <ion-icon class="heartFav" name="heart-outline"></ion-icon>
        <h4 class="title">${values.title}</h4>
        <img class="image" src=${values.image} alt="img" />
        <p class="description">${values.description}</p>
        <p class="baseColor">Color: ${values.baseColor}</p>
        <p class="sizes">Avalible sizes: ${values.sizes}</p>
        <p class="price">Price: ${values.price}</p>
        <p class="discountedPrice">Price: ${values.discountedPrice}</p>
        <a href="product-details.html" class="btnAdd">Add to card</a>
      </div>`;
    });

    complatedata.forEach((item) => {
      const onSale = item.onSale;
      const discountedPrice = item.discountedPrice;
      const price = item.price;
      console.log(onSale, discountedPrice);
      {
        if (onSale === true) {
        }
      }
    });

    resultsContainer.innerHTML = data1;
  })

  .catch((err) => {
    console.log(err);
  });
