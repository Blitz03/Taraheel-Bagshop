import { useContext, useEffect } from "react";
import { AppContext } from "../context";
import { IoMdClose } from "react-icons/io";
import { HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { urlFor } from "../lib/client";

export default function Wishlist() {
  const {
    wishlist,
    wishActive,
    setWishActive,
    message,
    setMessage,
    removeFromWish,
    setWishlist,
  } = useContext(AppContext);

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <>
      <div className={wishActive ? "wishlist active" : "wishlist"}>
        <button className="close-wish" onClick={() => setWishActive(false)}>
          <IoMdClose />
        </button>
        {wishlist.length === 0 && <h4>Your wishlist is empty!</h4>}
        {wishlist.length === 1 && (
          <h4>Your wishlist has {wishlist.length} item</h4>
        )}
        {wishlist.length > 1 && (
          <h4>Your wishlist has {wishlist.length} items</h4>
        )}
        {wishlist.length > 0 && (
          <>
            <div className="products-container">
              {wishlist.map((product) => {
                const { image, name, id, price } = product;
                return (
                  <div className="wishlist-product" key={id}>
                    <Link to={`/shop/${id}`}>
                      <img src={urlFor(image[0])} alt={name} />
                    </Link>
                    <div className="details">
                      <Link to={`/shop/${id}`}>{name}</Link>
                      <p className="price">${price}</p>
                      <Link
                        to={`/shop/${id}`}
                        className="wish-view-details"
                        onClick={() => setWishActive(false)}>
                        View Details
                      </Link>
                    </div>
                    <button
                      className="remove-button"
                      onClick={() => removeFromWish(id)}>
                      <HiTrash />
                    </button>
                  </div>
                );
              })}
            </div>
            <button className="clear-wish" onClick={() => setWishlist([])}>
              Clear Wishlist
            </button>
          </>
        )}
      </div>
      <p className={message ? "message active" : "message"}>{message}</p>
    </>
  );
}
