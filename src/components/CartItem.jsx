import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { deleteFromCart, decQuantity, incQuantity } = useContext(CartContext);

  return (
    <div className="flex w-full py-2 font-light text-gray-500 border-b border-gray-200 gap-x-4 lg:px-6">
      <div className="w-full min-h-[150px] flex items-center justify-between gap-4">
        <div className="w-1/2">
          <img src={item.image_url} className="max-h-28" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between mb-2">
            <p className="text-xs font-medium max-w-[240px] text-primary uppercase">
              {item.product_name}
            </p>
            <div
              onClick={() => deleteFromCart(item.id)}
              className="text-xl cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center border text-primary font-medium">
              <div
                onClick={() => decQuantity(item.id)}
                className="flex items-center justify-center flex-1 h-full cursor-pointer hover:bg-red-400/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />
                </svg>
              </div>
              <div className={`flex items-center justify-center h-full px-2}`}>
                {item.quantity}
              </div>
              <div
                onClick={() => incQuantity(item.id)}
                className="flex items-center justify-center flex-1 h-full cursor-pointer hover:bg-blue-400/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
