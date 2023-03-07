import { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

export default function Scroll() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

  const handleScroll = () => {
    setVisible(window.pageYOffset > 35);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={visible ? "scroll-button active" : "scroll-button"}
      onClick={handleClick}>
      <AiOutlineArrowUp />
    </button>
  );
}
