import { useParams } from "react-router-dom";
import { getProductsByBarCode } from "../services/api";
import { useContext, useEffect, useState } from "react";
import { Loader } from "../components";
import { CartContext } from "../context/CartContext";

const Product = () => {
  const [product, setProduct] = useState("");

  const { addToCart } = useContext(CartContext);

  const { productId } = useParams();

  const fetchProduct = async () => {
    const result = await getProductsByBarCode(productId);

    setProduct(result?.product);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const ingredientsArray =
    product.ingredients_tags
      ?.filter((label) => label.startsWith("en:"))
      .map((label) => label.replace(/^en:/, ", ").replace(/[-]/g, " ")) || [];

  const labelsArray =
    product.labels_tags
      ?.filter((label) => label.startsWith("en:"))
      .map((label) => label.replace(/^en:/, "").trim()) || [];

  return (
    <div>
      <div className="block gap-10 py-3 space-y-5 lg:flex">
        {product ? (
          <>
            <img
              src={product.image_url}
              alt={product.product_name}
              className="object-contain w-full lg:w-1/2 lg:h-[60vh] h-[40vh] bg-cover mix-blend-darken"
            />
            <div className="flex flex-col gap-4">
              <h1 className="mt-1 text-2xl font-semibold">
                {product.product_name}
              </h1>

              <p>
                <span className="font-medium">Ingredients : </span>
                {ingredientsArray.map((label, i) => (
                  <span key={i}>{label + " "}</span>
                ))}
              </p>

              <ul>
                <li>Energy: {product.nutriments["energy-kcal"]} kcal</li>
                <li>Fat: {product.nutriments["fat"]} g</li>
                <li>Carbohydrates: {product.nutriments["carbohydrates"]} g</li>
                <li>Proteins: {product.nutriments["proteins"]} g</li>
              </ul>
              <p>
                {labelsArray.length > 0 ? (
                  labelsArray.map((label, index) => (
                    <li
                      key={index}
                      className="inline-block px-2 py-1 mb-2 mr-2 rounded-full bg-blue-500/90 text-slate-200"
                    >
                      {label}
                    </li>
                  ))
                ) : (
                  <span>No labels available.</span>
                )}
              </p>
              <button
                onClick={() => addToCart(product, product.id)}
                className=" bg-blue-200 w-[30vw] p-1  lg:w-[10vw]  lg:p-3 md:p-3 rounded-lg transition-all duration-150 ease-in hover:bg-blue-300"
              >
                Add to Cart
              </button>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Product;
