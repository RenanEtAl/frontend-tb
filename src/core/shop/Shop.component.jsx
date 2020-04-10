import React, { useState, useEffect } from "react";
import Layout from "../Layout.component";
import Card from "../card/Card.component";
import { getCategories, getFilteredProducts } from "../apiCore";
import Checkbox from "../Checkbox.component";
import RadioBox from "../RadioBox.component";
import { prices } from "../fixedPrices";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import "./Shop.styles.css";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }, // filter by price
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [size, setSize] = useState(0);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    //console.log(newFilters)
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0); // use this to load more products
      }
    });
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    //console.log('shop',filters, filterBy)
    const newFilters = { ...myFilters };
    // access filters and grab the price
    newFilters.filters[filterBy] = filters;
    //  if filtered by price
    if (filterBy === "price") {
      // extract values out of the key
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const loadMore = () => {
    //
    let toSkip = skip + limit;
    // console.log(newFilters);
    // filters are taking from the state
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        // take whatever is already in filtereResults, then add the new data
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    // get the key out of data
    for (let key in data) {
      // if the id matches, get the array
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };
  return (
    <Layout
      title="Shop"
      description="Browse our products"
      className="container-fluid"
    >
      <div className="row">
        <div className="filter-col col-4">
          <h2 className="filter-header">Filter by:</h2>
          <hr />
          <h4>Categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
          <hr />
          <h4>Price Range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.map((product, i) => (
              <div key={i} className="col-4 mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
          {loadMoreButton()}
        </div>
      </div>
      <ScrollUpButton />
    </Layout>
  );
};
export default Shop;
