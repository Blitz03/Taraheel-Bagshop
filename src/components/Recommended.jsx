import { useContext, useState } from "react";
import { AppContext } from "../context";
import Product from "./Product";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Recommended() {
  const { products } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  const productsClone = [...products, ...products, ...products];

  const nextSlide = () => {
    if (currentSlide === products.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(products.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <section className="recommended products">
      <h3 className="page-title">Recommended</h3>
      <div className="container">
        <button className="left slider-button" onClick={prevSlide}>
          <AiOutlineArrowLeft />
        </button>
        <div
          className="products-container slider"
          style={{ transform: `translateX(${-currentSlide * 430}px)` }}>
          {productsClone.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
        <button className="right slider-button" onClick={nextSlide}>
          <AiOutlineArrowRight />
        </button>
      </div>
    </section>
  );
}
