import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../Component/Loder/Loader";
import { MoveLeft, ShoppingCart } from "lucide-react";
import { cartcontext } from "../../Context/CartContextProvider";

export default function ProductDetails() {
  const { getaddToCart } = useContext(cartcontext);
   document.title = "ProductDetails";
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function fetchProduct() {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setProduct(response.data);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (error || !product) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load product details.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 py-10 mt-18 ">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className=" cursor-pointer mb-4 px-4 py-2 bg-indigo-700 hover:bg-indigo-500 text-slate-200 rounded-full shadow transition duration-300"
        >
          <MoveLeft />
        </button>
        <h1 className="text-3xl font-bold text-indigo-700 text-center ">
          📦 Product Details
        </h1>
        <div className="h-1 bg-indigo-600 w-1/8 mx-auto  rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-80 object-contain bg-white p-4 border border-indigo-200 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold text-indigo-700">
            {product.title.split(" ", 3).join(" ")}
          </h1>

          <p className="text-gray-600 dark:text-white leading-relaxed">
            {product.description.split(" ", 20).join(" ")}...
          </p>

          <p className="text-xl font-bold text-indigo-700">
            💰 Price: <span className=" font-medium text-indigo-500">${product.price}</span>
          </p>

          <p className=" font-bold text-indigo-700 ">
            📁 Category:{" "}
            <span className="text-indigo-500 font-medium">{product.category}</span>
          </p>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-yellow-400 text-lg">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>
                  {i < Math.round(product.rating?.rate) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-sm text-indigo-600">
              ({product.rating?.count} reviews)
            </span>
          </div>
          <button
            onClick={() => getaddToCart(product.id)}
            className="mt-4 cursor-pointer px-6 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition-all duration-300"
          >
            <ShoppingCart className="inline-block w-4 h-4 mr-2" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
