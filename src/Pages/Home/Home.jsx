import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../Component/ProductCard/ProductCard.jsx";
import Loader from "../../Component/Loder/Loader.jsx";

export default function Home() {
  document.title = "Home";
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-18 py-8 overflow-hidden">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">
          {" "}
          All Products
        </h1>
        <div className="h-1 bg-indigo-600 w-24 mx-auto rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={product.id} data-aos="fade-up" data-aos-delay={index * 20}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
