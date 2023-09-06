export async function getJackets() {
  try {
    const response = await fetch(
      "https://api.noroff.dev/api/v1/rainy-days/b8b528fc-6c60-41f6-a5a9-9a8b27a9482a"
    );
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
