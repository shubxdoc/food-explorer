import ProductCard from "./ProductCard";

const ProductList = ({ productsList }) => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-10 xl:justify-start">
        {productsList &&
          productsList.map((product, i) => (
            <ProductCard key={i} {...product} />
          ))}
      </div>
    </>
  );
};

export default ProductList;
