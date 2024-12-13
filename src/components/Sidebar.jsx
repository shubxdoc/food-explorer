import { useContext } from "react";
import { SideBarContext } from "../context/SideBarContext";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SideBarContext);
  const { cart, quantity, clearCart } = useContext(CartContext);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } fixed w-full bg-slate-50 top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 p-5 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between border-b">
        <div className="text-sm font-semibold uppercase">Cart ({quantity})</div>
        <div
          onClick={handleClose}
          className="flex items-center justify-center w-8 h-8 cursor-pointer"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              color="currentColor"
            >
              <path d="m19 12-7-5v10zM5 7v10l7-5z"></path>
            </svg>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[770px] overflow-y-auto overflow-x-hidden border-b border-gray-600">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex flex-col items-center py-4 gap-y-3">
        <div
          onClick={clearCart}
          className="flex items-center justify-center w-full p-4 font-medium bg-black cursor-pointer text-gray-50 "
        >
          Clear
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
