import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../Component/ProductCard/ProductCard";
import Loader from "../../Component/Loder/Loader";
import { Navigate, useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(false);
  const navigate = useNavigate();
   document.title = "Categories";
  async function fetchCategories() {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProductsByCategory(category) {
    try {
      setProductLoading(true);
      const res = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products for category:", err);
    } finally {
      setProductLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !selectedCat) {
      setSelectedCat(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCat) {
      fetchProductsByCategory(selectedCat);
    }
  }, [selectedCat]);

  if (loading) return <Loader />;

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8 mt-18">
      <button
        onClick={() => navigate(-1)}
        className=" cursor-pointer mb-4 px-4 py-2 bg-indigo-700 hover:bg-indigo-500 text-slate-200 rounded-full shadow transition duration-300"
      >
        <MoveLeft />
      </button>
      <div className="mb-10 ">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-1 ">
           Browse By Category
        </h1>
        <div className="h-1 bg-indigo-600 w-24 mx-auto  rounded-full"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full border  cursor-pointer 
              ${
                selectedCat === cat
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-indigo-600 border-indigo-300"
              }
              hover:bg-indigo-500 hover:text-white transition duration-200 text-sm font-medium`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {productLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={index * 20}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
