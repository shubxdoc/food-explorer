import { createContext, useContext, useEffect, useState } from "react";
import {
  getCategories,
  getProductsList,
  getProductsByName,
  getProductsByCategory,
  getProductsByBarCode,
} from "../services/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [initialProductsList, setInitialProductsList] = useState([]);
  const [products, setProducts] = useState([]);
  const [productNameSearch, setProductNameSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [barcode, setBarcode] = useState("");

  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // loading state
  const [loading, setLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);

  // initial product list
  const initialProductFetch = async () => {
    setLoading(true);
    try {
      const result = await getProductsList(page);
      setInitialProductsList(result?.products);
      setProducts(result?.products);
      setHasMore(result?.products?.length > 0);
    } catch (error) {
      console.error("Failed to fetch initial products:", error);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = async () => {
    if (!hasMore || scrollLoading) return;
    setScrollLoading(true);
    try {
      const result = await getProductsList(page + 1);
      if (result?.products?.length > 0) {
        setProducts((prev) => [...prev, ...result?.products]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setScrollLoading(false);
    }
  };

  // fetchCategories
  const fetchCategories = async () => {
    const categoriesResult = await getCategories();
    setCategories(categoriesResult || []);
  };

  // search using product name
  const searchProductsByName = async (productName) => {
    setLoading(true);
    try {
      const searchName = await getProductsByName(productName);
      if (searchName) {
        setProducts(searchName?.products || []);
      }
    } catch (error) {
      console.error("Failed to search products by name:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // search product by barcode
  const searchProductsByBarCode = async (barCode) => {
    setLoading(true);
    try {
      const barcodeNum = await getProductsByBarCode(barCode);

      if (barcodeNum) {
        const barcodeArray = [barcodeNum?.product];
        setProducts(barcodeArray || []);
      }
    } catch (error) {
      console.error("Failed to search products by barcode:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      const categoryProducts = await getProductsByCategory(category);
      setProducts(categoryProducts?.products || []);
    } catch (error) {
      console.error("Failed to fetch products by category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productNameSearch) {
      searchProductsByName(productNameSearch);
    } else if (barcode) {
      searchProductsByBarCode(barcode);
    } else if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    } else {
      setProducts(initialProductsList);
    }
  }, [productNameSearch, selectedCategory, initialProductsList, barcode]);

  useEffect(() => {
    fetchCategories();
    initialProductFetch();
  }, []);

  // sorting products
  const getSortedProducts = () => {
    const sorted = [...products];
    if (sortBy === "name-asc") {
      sorted.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (sortBy === "name-desc") {
      sorted.sort((a, b) => b.product_name.localeCompare(a.product_name));
    } else if (sortBy === "nutrition-asc") {
      sorted.sort((a, b) =>
        (a.nutrition_grades || "E").localeCompare(b.nutrition_grades || "E")
      );
    } else if (sortBy === "nutrition-desc") {
      sorted.sort((a, b) =>
        (b.nutrition_grades || "E").localeCompare(a.nutrition_grades || "E")
      );
    }
    return sorted;
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        categories,
        productNameSearch,
        setProductNameSearch,
        products: getSortedProducts(),
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        barcode,
        setBarcode,
        loadMoreProducts,
        hasMore,
        scrollLoading,
        error,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export function useProduct() {
  return useContext(ProductContext);
}
