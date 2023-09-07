export async function getJackets() {
  try {
    const response = await fetch("https://api.noroff.dev/api/v1/rainy-days");
    if (!response.ok) {
      throw new Error(`API fetch call failed.`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
getJackets();
