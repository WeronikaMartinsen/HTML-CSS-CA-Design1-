export async function fetchJackets() {
  showLoadingIndicator();
  try {
    const response = await fetch(rainyDaysAPI);
    const result = await response.json();
    return result;
  } catch {
    error();
  }
}
