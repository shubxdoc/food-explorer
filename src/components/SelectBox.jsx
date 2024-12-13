import { useProduct } from "../context/ProductsContext";

const SelectBox = ({ value, onChange, placeholderVal }) => {
  const { categories } = useProduct();

  return (
    <>
      <select
        value={value}
        onChange={onChange}
        className="border-2 bg-transparent opacity-50 border-textClr text-sm rounded-xl block w-2/5 p-2.5"
      >
        <option value="">{placeholderVal}</option>
        {placeholderVal == "Select a category" ? (
          categories?.tags &&
          categories?.tags.map((category, i) => (
            <option key={i} value={category.id}>
              {category?.name}
            </option>
          ))
        ) : (
          <>
            <option value="name-asc">Name A - Z</option>
            <option value="name-desc">Name Z - A</option>
            <option value="nutrition-asc">Nutrition Grade A - E</option>
            <option value="nutrition-desc">Nutrition Grade E - A</option>
          </>
        )}
      </select>
    </>
  );
};

export default SelectBox;
