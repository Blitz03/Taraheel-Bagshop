import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

export default function SocialMedia() {
  return (
    <ul className="social-media">
      <li>
        <a
          href="https://www.facebook.com/profile.php?id=100003786093370"
          target="_blank"
          className="facebook">
          <AiFillFacebook />
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/fcnovapro"
          target="_blank"
          className="twitter">
          <AiOutlineTwitter />
        </a>
      </li>
      <li>
        <a
          href="https://www.tiktok.com/@fcnova"
          target="_blank"
          className="tiktok">
          <FaTiktok />
        </a>
      </li>
      <li>
        <a
          href="https://www.instagram.com/fcnova.pro/"
          target="_blank"
          className="instagram">
          <AiOutlineInstagram />
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/@fc-nova"
          target="_blank"
          className="youtube">
          <AiFillYoutube />
        </a>
      </li>
    </ul>
  );
}
