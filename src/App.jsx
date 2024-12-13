import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import { Header, CartButton, Sidebar } from "./components";
import { CartProvider, ProductProvider, SideBarProvider } from "./context";

export default function App() {
  return (
    <>
      <div className="container px-5 mx-auto max-w-7xl">
        <Header />
        <SideBarProvider>
          <CartProvider>
            <ProductProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:productId" element={<Product />} />
              </Routes>
              <CartButton />
              <Sidebar />
            </ProductProvider>
          </CartProvider>
        </SideBarProvider>
      </div>
    </>
  );
}
