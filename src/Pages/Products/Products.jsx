import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../Component/ProductCard/ProductCard.jsx";
import Loader from "../../Component/Loder/Loader.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  let filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name-asc") {
    filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading products
      </div>
    );
     document.title = "Products";
  return (
    <div className="container mx-auto  py-10 ">
      <div className="mb-10">
        <h1 className="text-center text-2xl font-bold text-indigo-600 mt-20 mb-1 ">
          Browse Products
        </h1>
        <div className="h-1 bg-indigo-600 w-24 mx-auto rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[90%] md:w-1/2 border dark:text-white border-indigo-400 rounded-full py-2 px-4 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-[90%] md:w-1/2 border border-indigo-400 dark:text-white rounded-full py-2 px-4 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <div key={product.id} data-aos="fade-up" data-aos-delay={index * 20}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
