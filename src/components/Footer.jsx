import { Link } from "react-router-dom";
import SocialMedia from "./SocialMedia";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="logo">
          <Link to="/">
            T<span>a</span>raheel
          </Link>
        </div>
        <h4>
          Copyright © 2023. Made by{" "}
          <a href="https://pingtm.co/" target="_blank" rel="noreferrer">
            PiNG
          </a>
        </h4>
        <SocialMedia />
      </div>
    </footer>
  );
}
