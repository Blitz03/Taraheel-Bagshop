import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { AppContext } from "../context";
import { urlFor } from "../lib/client";

export default function Product({ product }) {
  const { image, name, price, id } = product;
  const { addToCart, setCartActive, handleHeartClick, wishlist } =
    useContext(AppContext);

  return (
    <div className="product">
      <div className="header">
        <button
          className="add-to-wish"
          onClick={() => {
            handleHeartClick(product);
          }}>
          {!wishlist.includes(product) && <AiOutlineHeart />}
          {wishlist.includes(product) && <AiFillHeart className="active" />}
        </button>
        <Link to={`/shop/${id}`}>
          <img src={urlFor(image[0])} alt={name} />
        </Link>
        <div className="options">
          <Link to={`/shop/${id}`}>Show Details</Link>
          <button
            className="add-to-cart"
            onClick={() => {
              addToCart(product);
              setCartActive(true);
            }}>
            <AiOutlineShoppingCart />
          </button>
        </div>
      </div>
      <div className="details">
        <Link to={`/shop/${id}`}>
          <h4>{name}</h4>
        </Link>
        <span>${price}</span>
      </div>
    </div>
  );
}
