import React, { useState, useEffect } from 'react';
import ProductList from "./ProductList";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metaDatos, setmetaDatos] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products?page=${page}`, {
          credentials: "include",
        });

        if (response.redirected) {
          window.location.href = response.url;
          return;
        }

        const data = await response.json();
        console.log(data.data)
        setProducts(data.data);
        setmetaDatos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default Main;
