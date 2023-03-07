import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Shop from "./Shop";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import Search from "./Search";
import Scroll from "./Scroll";

export default function App() {
  return (
    <>
      <Scroll />
      <Cart />
      <Wishlist />
      <Search />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/shop/:id" element={<ProductDetails />}></Route>
        <Route path="/shop/:category" element={<ProductDetails />}></Route>
      </Routes>
    </>
  );
}
