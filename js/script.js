const resultsContainer = document.querySelector(".resultsContainer");

fetch("https://api.noroff.dev/api/v1/rainy-days")
  .then((data) => {
    return data.json();
  })
  .then((complatedata) => {
    console.log(complatedata);
    let data1 = "";
    complatedata.map((values) => {
      data1 += `  <div class="results"><h4 class="title">${values.title}</h4>
      <img class="image" src=${values.image} alt="img" />
      <p class="description">${values.description}</p>
      <p class="category">Avelible sizes: ${values.sizes}</p>
      <p class="price">Price: ${values.price}</p>
    </div>`;
    });
    document.querySelector(".resultsContainer").innerHTML = data1;
  })
  .catch((err) => {
    console.log(err);
  });
