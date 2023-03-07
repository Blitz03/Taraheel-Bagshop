import { useContext, useEffect } from "react";
import { AppContext } from "../context";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function Landing() {
  const { currentSlide, renderSlides, renderDots, nextSlide, prevSlide } =
    useContext(AppContext);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3700);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="landing">
      <button className="left slider-button" onClick={prevSlide}>
        <AiOutlineArrowLeft />
      </button>
      <div className="landing-slides">{renderSlides()}</div>
      <div className="landing-dots">{renderDots()}</div>
      <button className="right slider-button" onClick={nextSlide}>
        <AiOutlineArrowRight />
      </button>
    </section>
  );
}
