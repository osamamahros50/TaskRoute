/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { cartcontext } from "./../../Context/CartContextProvider";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Cartitem from "./../../Component/Cartitem/Cartitem";
import { motion } from "framer-motion";

export default function Cart() {
  const { cart, getLogedCart, clearCart } = useContext(cartcontext);
  const navigate = useNavigate();
  document.title = "Cart";
  useEffect(() => {
    getLogedCart();
  }, []);

  const isEmpty = !cart || cart.length === 0;

  return (
    <div className="bg-slate-200 dark:bg-slate-700 dark:text-slate-200 min-h-screen mt-18 py-5">
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-2xl hover:bg-indigo-500 cursor-pointer hover:scale-105 duration-300"
        >
          <ChevronLeft className="hover:scale-120 duration-300" />
        </button>

        <div className="mb-10">
          <h1 className="text-center text-indigo-600 text-2xl font-bold mb-1">
            Cart Items
          </h1>
          <div className="h-1 bg-indigo-600 w-24 mx-auto rounded-full"></div>
        </div>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-16"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="mx-auto w-28 h-28 mb-4 opacity-80"
            />
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-slate-200 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Looks like you haven’t added anything to your cart yet.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Go to Products
            </button>
          </motion.div>
        ) : (
          <div className="mx-auto max-w-5xl justify-center px-6 flex flex-col">
            <button
                  onClick={() => {
      setTimeout(() => {
        clearCart();
      }, 1000); 
    }}
              className="px-4 py-2 w-fit mx-auto shadow text-white cursor-pointer mb-2 bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#fb7185]  rounded-lg transition disabled:opacity-50"
            >
              Clear All
            </button>
            <div className="rounded-lg md:w-full">
              {cart.map((item) => (
                <Cartitem key={item.productId} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
