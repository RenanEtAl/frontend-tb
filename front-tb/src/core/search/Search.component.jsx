import React, { useState, useEffect } from "react";
import { getCategories, list } from "../apiCore";
import Card from "../card/Card.component";
import "./Search.styles.css";

const Search = () => {
  const [data, setData] = useState({
    //object
    categories: [], // dropdown
    category: "",
    search: "",
    results: [],
    searched: false
  });
  // don't have to type data.categories, data.search
  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    console.log(search, category);
    // if there's search in the state
    if (search) {
      list({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };
  const searchSubmit = event => {
    event.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    // set state
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchForm = () => (
    // make everything in line so use span
    <form onSubmit={searchSubmit}>
      <span className="input-group-text input-group-text-search">
        <div className="input-group input-group-search input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search Products"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  // default is empty array
  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>

        <div className="row">
          {results.map((product, i) => (
            <div className="col-4 mb-3">
              <Card key={i} product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
