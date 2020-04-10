import React, { useState, useEffect } from "react";
import Layout from "../Layout.component";
import { getProducts } from "../apiCore";
import Card from "../card/Card.component";
import Search from "../search/Search.component";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Thunderbolt"
      description="MiniMart"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, index) => (
          <div key={index} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, index) => (
          <div key={index} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
      <ScrollUpButton />
    </Layout>
  );
};
export default Home;
