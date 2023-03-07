import { createContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts } from "./lib/client";
import landing01 from "./images/landing-01.jpg";
import { loadStripe } from "@stripe/stripe-js";

import landing02 from "./images/landing-02.jpg";

const AppContext = createContext();

function AppProvider({ children }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartActive, setCartActive] = useState(false);
  const [wishActive, setWishActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const products = await fetchProducts();
      setProducts(products);
    }
    fetchData();
  }, []);

  // Start Landing
  const slides = [
    {
      image: landing01,
      paragraph: "Top Brand",
      heading: "Best Handbags 2023",
      link: "Shop Now",
    },
    {
      image: landing02,
      paragraph: "Top Brand",
      heading: "Best Handbags 2023",
      link: "Shop Now",
    },
  ];

  const renderSlides = () => {
    return slides.map((slide, index) => {
      const isActive = currentSlide === index;
      const translateX = isActive ? 0 : 100;

      return (
        <div
          className="landing-slide"
          key={index}
          style={{
            backgroundImage: `url(${slide.image})`,
            transform: `translateX(${translateX}%)`,
          }}>
          <div className="slide-content">
            <p>{slide.paragraph}</p>
            <h3>{slide.heading}</h3>
            <Link to="/shop">{slide.link}</Link>
          </div>
        </div>
      );
    });
  };

  const renderDots = () => {
    return slides.map((slide, index) => {
      const isActive = currentSlide === index;
      return (
        <button
          key={index}
          className={`dot ${isActive ? "active" : ""}`}
          onClick={() => handleClick(index)}
        />
      );
    });
  };

  const handleClick = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  // End Landing

  // Start Cart
  function addToCart(newProduct) {
    const existingProduct = cart.find(
      (product) => product.id === newProduct.id
    );
    if (existingProduct) {
      const updatedCart = cart.map((product) => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: quantity,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: quantity,
        },
      ]);
    }
  }

  function removeFromCart(id) {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  }
  // End Cart

  // Start Search
  const handleSearch = (event) => {
    const query = event.target.value;
    setQuery(query);
    if (
      query === "" ||
      products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      ).length === 0
    ) {
      setResults([]);
    } else {
      const filteredResults = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate("/shop");
    setSearchActive(false);
  };
  // End Search

  // Start Wishlist
  const handleHeartClick = (product) => {
    if (wishlist.includes(product)) {
      setWishlist(wishlist.filter((p) => p !== product));
      setMessage("The product has been removed from the Wishlist.");
    } else {
      setWishlist([...wishlist, product]);
      setMessage("The product has been added to the Wishlist.");
    }
  };

  const removeFromWish = (id) => {
    setWishlist(wishlist.filter((product) => product.id !== id));
  };
  // End Wishlist

  // Start Shop
  const categories = ["handbags", "backpach", "duffes"];

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory((prevSelectedCategory) => {
      if (prevSelectedCategory.includes(category)) {
        return prevSelectedCategory.filter((cat) => cat !== category);
      } else {
        return [...prevSelectedCategory, category];
      }
    });
  };

  const handleSortTypeChange = (event) => {
    setSortType(event.target.value);
  };

  let filteredProducts = results.length ? results : products;

  filteredProducts = selectedCategory.length
    ? filteredProducts.filter((product) =>
        product.categories.some((cat) => selectedCategory.includes(cat))
      )
    : filteredProducts;

  if (sortType === "priceAsc") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortType === "priceDesc") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortType === "nameAsc") {
    filteredProducts = filteredProducts.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
  } else if (sortType === "nameDesc") {
    filteredProducts = filteredProducts.sort((a, b) =>
      a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
    );
  }

  // Stripe
  const stripeLoadedPromise = loadStripe(
    "pk_test_51MdbBUGhEXF3L7ZQDRelBWTVcdeBn1xrYqIHvkqPOfaWvYd7m18jWBRTcuAyak1d56x7WYTTlKkrkP0EFEQ4FkVx00LNjT7AHv"
  );

  function handleStripeClick() {
    const lineItems = cart.map((product) => {
      return { price: product.id, quantity: product.quantity };
    });

    stripeLoadedPromise.then((stripe) => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: "http://localhost:3000/",
          cancelUrl: "http://localhost:3000/",
        })
        .then((response) => {
          console.log(response.error);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
  // Stripe

  // End Shop

  return (
    <AppContext.Provider
      value={{
        currentSlide,
        renderSlides,
        renderDots,
        nextSlide,
        prevSlide,
        cartActive,
        setCartActive,
        wishActive,
        setWishActive,
        searchActive,
        setSearchActive,
        cart,
        setCart,
        removeFromCart,
        addToCart,
        quantity,
        setQuantity,
        wishlist,
        setWishlist,
        query,
        results,
        handleSearch,
        products,
        removeFromWish,
        handleHeartClick,
        message,
        setMessage,
        handleSearchSubmit,
        categories,
        selectedCategory,
        sortType,
        handleCategoryChange,
        handleSortTypeChange,
        filteredProducts,
        setSelectedCategory,
        setSortType,
        handleStripeClick,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
