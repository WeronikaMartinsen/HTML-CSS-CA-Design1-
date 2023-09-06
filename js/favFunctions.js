export function getExistingFavs() {
  const favs = localStorage.getItem("favorites");

  if (!favs || favs === "null") {
    return [];
  } else {
    return JSON.parse(favs);
  }
}
