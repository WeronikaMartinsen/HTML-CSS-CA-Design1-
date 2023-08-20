const resultsContainer = document.querySelector(".resultsContainer");
const loader = document.querySelector(".loader");

resultsContainer.style.display = "none";

setTimeout(changeLoading, 2000);

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
        <p class="category">Avalible sizes: ${values.sizes}</p>
        <p class="price">Price: ${values.price}</p>
        <button class="button-shop-now">Add to card</div>
      </div>`;
    });

    resultsContainer.innerHTML = data1;
  })

  .catch((err) => {
    console.log(err);
  });
