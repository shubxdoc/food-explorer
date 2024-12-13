import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({
  code,
  image_front_small_url,
  categories,
  categories_tags,
  category_tags,
  product_name,
  ingredients_text,
  nutrition_grades,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const getCategory = () => {
    const cleanCategoryName = (category) =>
      category
        .replace(/^en:/, "")
        .replace(/[_-]/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());

    const category =
      categories_tags?.find((cat) => cat.startsWith("en:")) ||
      categories?.split(",")[0]?.trim() ||
      category_tags?.[0];

    return category ? cleanCategoryName(category) : "N/A";
  };

  return (
    <div className="flex flex-col transition-all duration-300 shadow-md rounded-xl size-96 hover:shadow-xl">
      <div className="relative h-1/2">
        <Link to={`/product/${code}`}>
          <img
            className="object-contain w-full h-full bg-cover mix-blend-darken"
            src={image_front_small_url}
            alt={`${product_name} image`}
          />
        </Link>
        <div
          className={`absolute top-0 right-0 px-4 py-2 text-xs text-white font-medium uppercase rounded-t-none rounded-s-lg ${
            nutrition_grades === "a"
              ? "bg-green-600"
              : nutrition_grades === "b"
              ? "bg-green-600"
              : nutrition_grades === "c"
              ? "bg-yellow-500"
              : nutrition_grades === "d"
              ? "bg-yellow-500"
              : nutrition_grades === "e"
              ? "bg-red-500"
              : nutrition_grades === "f"
              ? "bg-red-500"
              : "bg-gray-500"
          }`}
        >
          {nutrition_grades}
        </div>
      </div>
      <div className="h-full px-6 py-4 space-y-1 overflow-auto bg-slate-200">
        <p className="inline-block mb-2 text-lg font-medium">{product_name}</p>
        <p className="text-sm font-medium">{getCategory()}</p>
        <p className="text-sm">
          <span className="font-medium">Ingredients: </span>
          {isExpanded
            ? ingredients_text || "N/A"
            : `${(ingredients_text || "N/A").slice(0, 50)}...`}
        </p>
        <button
          onClick={() => {
            toggleReadMore();
          }}
          className="self-end mt-auto text-sm text-blue-500 underline"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
