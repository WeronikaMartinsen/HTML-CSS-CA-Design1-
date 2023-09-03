/* function showError(message) {
  const errorContainer = document.querySelector(".component-cart");
  errorContainer.innerHTML = `<h3>Error: ${message}</h3>`;
}

const cardContainer = document.querySelector(".component-cart");

const rainyDaysAPIHomePage = "https://api.noroff.dev/api/v1/rainy-days";

async function getJacketsHomePage() {
  showLoadingIndicator();
  try {
    const response = await fetch(rainyDaysAPIHomePage);
    if (!response.ok) {
      throw new Error(`API fetch call failed.`);
    }
    const result = await response.json();

    return result;

  
  } catch (error) {
    throw error;
  }
}

async function displayJacketsHomePage() {
  try {
    const jacketHome = await getJacketsHomePage();
    cardContainer.innerHTML = "";

    for (let i = 0; i < jacketHome.length; i++) {
      const homeJacket = jacketHome[i];
      console.log(homeJacket);
    }
  } catch (error) {
    showError(error.message);
  }
}

function showLoadingIndicator() {
  const loading = document.querySelector(".cardContainer");
  loading.innerHTML = `<span>Loading...</span>`;
}

displayJacketsHomePage();
console.log(displayJacketsHomePage);
 */
