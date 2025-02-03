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

  const deleteProduct = async (productId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

    try {
      await axios.get("/sanctum/csrf-cookie");

      await axios.delete(`/api/products/${productId}`, { withCredentials: true });

      alert("Producto eliminado correctamente");
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      alert(`${error} - Error al eliminar producto`);
      console.error("Error eliminando el producto:", error);
    }
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ProductList products={products} deleteProduct={deleteProduct} />
    </div>
  );
};

export default Main;
