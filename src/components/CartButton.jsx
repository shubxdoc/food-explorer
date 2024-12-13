import { useContext } from "react";
import { SideBarContext } from "../context/SideBarContext";
import { CartContext } from "../context/CartContext";

const CartButton = () => {
  const { setIsOpen } = useContext(SideBarContext);
  const { quantity } = useContext(CartContext);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed p-3 transition duration-200 bg-white rounded-full shadow-md hover:outline outline-red-50 bottom-20 right-6 2xl:right-80 active:scale-75"
      >
        <div className="relative mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(70, 92, 105, 1)" }}
            className="size-8"
          >
            <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path>
            <circle cx="10.5" cy="19.5" r="1.5"></circle>
            <circle cx="17.5" cy="19.5" r="1.5"></circle>
          </svg>
          <div className="absolute bg-red-500 -right-2 top-0 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {quantity}
          </div>
        </div>
      </button>
    </>
  );
};

export default CartButton;
