import { Link, useNavigate } from "react-router-dom";
import { Eye, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { cartcontext } from "./../../Context/CartContextProvider";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { getaddToCart } = useContext(cartcontext);

  return (
    <div
      className="relative group transform transition duration-300 
                 hover:scale-105 hover:shadow-2xl 
                 border border-indigo-600 rounded-2xl 
                 overflow-hidden bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
                 flex flex-col justify-between"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 sm:h-52 md:h-56 lg:h-64 object-contain p-4 transition-transform duration-300 group-hover:scale-110"
      />

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-sm font-semibold line-clamp-2 text-indigo-600 dark:text-white">
          {product.title.split(" ", 3).join(" ")}
        </h2>

        <p className="font-bold text-indigo-600 text-xs sm:text-sm">
          Category: <span className="text-indigo-400">{product.category}</span>
        </p>

        <p className="text-base sm:text-lg font-bold text-indigo-600">
          Price:{" "}
          <span className="text-indigo-400 font-medium">${product.price}</span>
        </p>

        <div className="flex items-center gap-1 text-yellow-500 text-xs sm:text-sm">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>
              {i < Math.round(product.rating?.rate) ? "★" : "☆"}
            </span>
          ))}
          <span className="text-indigo-600 ml-1">
            ({product.rating?.count})
          </span>
        </div>
      </div>

      <button
        onClick={() => getaddToCart(product.id)}
        className="
    absolute bottom-4 left-3/4 -translate-x-1/2
    opacity-100 md:opacity-0 md:translate-y-3 
    md:group-hover:opacity-100 md:group-hover:translate-y-0
    transition-all duration-300 ease-in-out
    bg-indigo-600 hover:bg-indigo-700
    text-white text-sm md:text-base font-medium
    px-4 py-2 rounded-full shadow-lg
    whitespace-nowrap
    cursor-pointer
  "
      >
        <ShoppingCart className="inline-block w-4 h-4 mr-2 -mt-0.5" />
        Add to Cart
      </button>

      <button
        onClick={() => navigate(`/products/${product.id}`)}
        className="
    absolute 
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    md:top-2 md:right-2 md:left-auto md:translate-x-0 md:translate-y-0
    md:opacity-0 md:group-hover:opacity-100 
    md:group-hover:top-1/2 md:group-hover:right-1/2 md:group-hover:-translate-y-1/2 md:group-hover:translate-x-1/2
    transition-all duration-500 
    cursor-pointer bg-indigo-600 text-white hover:bg-indigo-500 
    p-2 rounded-full border border-indigo-600 shadow-md z-10"
      >
        <Eye className="w-4 h-4" />
      </button>
    </div>
  );
}
