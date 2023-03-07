import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { NavLink } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Menu from "./Menu";

export default function Header() {
  const {
    cartActive,
    setCartActive,
    wishActive,
    setWishActive,
    setSearchActive,
    searchActive,
    cart,
    wishlist,
  } = useContext(AppContext);

  return (
    <header className="sticky">
      <div className="container">
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              onClick={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              onClick={({ isActive }) => (isActive ? "active" : "")}>
              Shop
            </NavLink>
          </li>
        </ul>
        <Menu />
        <div className="logo">
          <NavLink to="/">
            T<span>a</span>raheel
          </NavLink>
        </div>
        <ul className="options">
          <li>
            <button
              className="wishlist-button"
              onClick={() => {
                setCartActive(false);
                setWishActive(!wishActive);
              }}>
              <span className="count">{wishlist.length}</span>
              <FiHeart />
            </button>
          </li>
          <li>
            <button
              className="search-button"
              onClick={() => setSearchActive(!searchActive)}>
              <BiSearch />
            </button>
          </li>
          <li>
            <button
              className="cart-button"
              onClick={() => {
                setCartActive(!cartActive);
                setWishActive(false);
              }}>
              <span className="count">{cart.length}</span>
              <HiOutlineShoppingBag />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
