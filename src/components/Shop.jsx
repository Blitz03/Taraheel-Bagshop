import { useContext, useState } from "react";
import { AppContext } from "../context";
import Footer from "./Footer";
import Product from "./Product";

export default function Shop() {
  const {
    categories,
    selectedCategory,
    sortType,
    handleCategoryChange,
    handleSortTypeChange,
    filteredProducts,
    setSelectedCategory,
  } = useContext(AppContext);

  return (
    <>
      <div className="shop">
        <h3 className="page-title">Shop</h3>
        <div className="container">
          <div className="filtering">
            <div className="category-filter">
              <p>Filter by category:</p>
              {categories.map((category) => (
                <label key={category}>
                  <input
                    type="checkbox"
                    name="category"
                    value={category}
                    checked={selectedCategory.includes(category)}
                    onChange={handleCategoryChange}
                  />
                  {category}
                </label>
              ))}
            </div>
            <div className="sort-by">
              <p>Sort by:</p>
              <select value={sortType} onChange={handleSortTypeChange}>
                <option value="">Select</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="nameAsc">Name: A to Z</option>
                <option value="nameDesc">Name: Z to A</option>
              </select>
            </div>
            <button
              onClick={() => {
                setSelectedCategory("");
              }}>
              Show All Products
            </button>
          </div>
          <div className="product-list">
            {filteredProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
            {filteredProducts.length === 0 && (
              <p className="no-products">There is no products!</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
