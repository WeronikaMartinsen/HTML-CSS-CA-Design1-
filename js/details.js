const detailContainer = document.querySelector(".product-detail");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const urlApi = `https://api.noroff.dev/api/v1/rainy-days/${id}`;

console.log(id);

async function fetchJacket() {
  const response = await fetch(urlApi);
  const results = await response.json();

  console.log(results);
}

fetchJacket();

function createHtml(jacket) {
  detailContainer.innerHTML = `<h4>${jacket.title}</h4>
  `;
}
