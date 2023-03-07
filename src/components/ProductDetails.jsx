import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AppContext } from "../context";
import { fetchProducts, urlFor } from "../lib/client";
import Recommended from "./Recommended";
import SocialMedia from "./SocialMedia";
import Footer from "./Footer";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function ProductDetails() {
  const [products, setProducts] = useState([]);
  const [detailsActive, setDetailsActive] = useState(false);
  const {
    addToCart,
    setCartActive,
    quantity,
    setQuantity,
    wishlist,
    handleHeartClick,
  } = useContext(AppContext);
  const { id } = useParams();
  const product = products.find((product) => product.id === id);

  useEffect(() => {
    async function fetchData() {
      const products = await fetchProducts();
      setProducts(products);
    }
    fetchData();
  }, []);

  return (
    product && (
      <>
        <div className="details-page">
          <div className="container">
            <Link to="/" className="back-to-home">
              <AiOutlineArrowLeft />
            </Link>
            <div className="details-container">
              <div className="image">
                <button
                  className="add-to-wish"
                  onClick={() => {
                    handleHeartClick(product);
                  }}>
                  {!wishlist.includes(product) && <AiOutlineHeart />}
                  {wishlist.includes(product) && (
                    <AiFillHeart className="active" />
                  )}
                </button>
                <img src={urlFor(product.image[0])} alt={product.name} />
              </div>
              <div className="details">
                <h3 className="title">{product.name}</h3>
                <SocialMedia />
                <span className="price">${product.price}</span>
                <form
                  className="quantity-form"
                  onClick={(e) => e.preventDefault()}>
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    min={1}
                    className="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </form>
                <div className="options">
                  <button
                    type="submit"
                    className="add-to-cart"
                    onClick={() => {
                      addToCart(product);
                      setCartActive(true);
                    }}>
                    Add To Cart
                  </button>
                  <button
                    className="view-details"
                    onClick={() => setDetailsActive(!detailsActive)}>
                    {detailsActive ? "Hide Details" : "View Details"}
                  </button>
                </div>
              </div>
            </div>
            <p
              className={
                detailsActive ? "active nested-details" : "nested-details"
              }>
              {product.details}
            </p>
          </div>
          <Recommended />
        </div>
        <Footer />
      </>
    )
  );
}
