import { useEffect, useRef } from "react";
import { InputBox, Loader, ProductList, SelectBox } from "../components";
import { useProduct } from "../context/ProductsContext";

const Home = () => {
  const {
    loading,
    productNameSearch,
    setProductNameSearch,
    products,
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
  } = useProduct();

  const observerRef = useRef();

  useEffect(() => {
    if (!hasMore || scrollLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProducts();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, scrollLoading, products]); //added products as a dependency to trigger the useEffect initially

  if (error) {
    return (
      <div className="w-full flex items-center justify-center h-[50vh] text-2xl font-semibold ">
        Please try again later.😔
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        <div className="flex justify-between w-full gap-5">
          <InputBox
            placeholder={"search by name"}
            value={productNameSearch}
            onChange={(e) => setProductNameSearch(e.target.value)}
          />
          <InputBox
            placeholder={"search by barcode"}
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-full gap-4">
          <SelectBox
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            placeholderVal="Select a category"
          />
          <SelectBox
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            placeholderVal="Sort By"
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="py-10">
            {products && <ProductList productsList={products} />}
            {scrollLoading && (
              <div className="w-full pt-10 text-center">
                <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"></div>
              </div>
            )}
            {!scrollLoading && hasMore && (
              <div
                ref={observerRef}
                style={{ height: "50px", border: "1px solid black" }}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
