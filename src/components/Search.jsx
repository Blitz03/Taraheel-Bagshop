import { useContext } from "react";
import { Link } from "react-router-dom";
import { urlFor } from "../lib/client";
import { AppContext } from "../context";
import { IoMdClose } from "react-icons/io";

export default function Search() {
  const {
    searchActive,
    setSearchActive,
    query,
    results,
    handleSearch,
    handleSearchSubmit,
  } = useContext(AppContext);

  return (
    <div className={searchActive ? "active search" : "search"}>
      <button className="close-search" onClick={() => setSearchActive(false)}>
        <IoMdClose />
      </button>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleSearch}
        />
      </form>
      {searchActive && results.length === 1 && (
        <p className="items-length">You've found {results.length} item</p>
      )}
      {searchActive && results.length > 1 && (
        <p className="items-length">You've found {results.length} items</p>
      )}
      {searchActive && results.length > 0 ? (
        <ul className="results">
          {results.map((result, index) => {
            const { image, name, price, id } = result;
            return (
              <li key={index}>
                <Link to={`/shop/${id}`} onClick={() => setSearchActive(false)}>
                  <img src={urlFor(image[0])} alt={name} />
                </Link>
                <Link to={`/shop/${id}`} onClick={() => setSearchActive(false)}>
                  <h4>{name}</h4>
                </Link>
                <span>${price}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        searchActive &&
        query !== "" && <p className="not-found">No results found</p>
      )}
    </div>
  );
}
