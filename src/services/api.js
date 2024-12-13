const BASE_URL = "https://world.openfoodfacts.org";

export const getProductsList = async (page) => {
  const response = await fetch(
    `${BASE_URL}/api/v2/search?sort_by=popularity_key&page=${page}`
  );

  const data = await response.json();

  return data;
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching products:", error);
  }
};

export const getProductsByName = async (name) => {
  try {
    const response = await fetch(
      `${BASE_URL}/cgi/search.pl?search_terms=${name}&json=true 
`
    );
    if (!response.ok) {
      throw new Error("Failed to search products by name");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching products:", error);
  }
};

export const getProductsByBarCode = async (barcode) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v0/product/${barcode}.json 
`);
    if (!response.ok) {
      throw new Error("Failed to Get Product by Barcode");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching products:", error);
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/category/${category}.json
`);
    if (!response.ok) {
      throw new Error("Failed to Get Category Products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching products:", error);
  }
};
