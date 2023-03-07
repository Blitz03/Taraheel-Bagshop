import { useState, useContext } from "react";
import { AppContext } from "../context";
import { Link } from "react-router-dom";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";

export default function Menu() {
  const [active, setActive] = useState(false);
  const { setCartActive, setSearchActive, setWishActive } =
    useContext(AppContext);
  const className = active ? "menu active" : "menu";

  return (
    <>
      <button
        className="menu-button"
        onClick={() => {
          setActive(!active);
          setCartActive(false);
          setSearchActive(false);
          setWishActive(false);
        }}>
        {!active && <AiOutlineMenuUnfold />}
        {active && <AiOutlineClose />}
      </button>
      <ul className={className}>
        <li>
          <Link to="/" onClick={() => setActive(!active)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" onClick={() => setActive(!active)}>
            Shop
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              setActive(!active);
              setWishActive(true);
            }}>
            Wishlist
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setActive(!active);
              setSearchActive(true);
            }}>
            Search
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setActive(!active);
              setCartActive(true);
            }}>
            Cart
          </button>
        </li>
      </ul>
    </>
  );
}
