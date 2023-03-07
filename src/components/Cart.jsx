import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { HiTrash } from "react-icons/hi";
import { urlFor } from "../lib/client";
import { AppContext } from "../context";

export default function Cart() {
  const { cart, removeFromCart, cartActive, setCartActive, handleStripeClick } =
    useContext(AppContext);

  const cartTotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className={cartActive ? "cart active" : "cart"}>
      <button className="close-cart" onClick={() => setCartActive(false)}>
        <IoMdClose />
      </button>
      {cart.length === 0 && <h3>Your cart is empty!</h3>}
      {cart.length === 1 && <h3>Your cart has {cart.length} item</h3>}
      {cart.length > 1 && <h3>Your cart has {cart.length} items</h3>}
      {cart.length > 0 && (
        <>
          <div className="products-container">
            {cart.map((product) => {
              const { name, image, id, price, quantity } = product;
              return (
                <div className="cart-product" key={id}>
                  <img src={urlFor(image[0])} alt={name} />
                  <div className="details">
                    <Link to={`/shop/${id}`}>{name}</Link>
                    <p>${price}</p>
                    <span className="quantity">{quantity}x</span>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(id)}>
                    <HiTrash />
                  </button>
                </div>
              );
            })}
          </div>
          <p className="subtotal">Subtotal: ${cartTotal}</p>
          <button className="checkout" onClick={handleStripeClick}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
