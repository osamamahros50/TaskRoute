/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cartcontext } from "../../Context/CartContextProvider";
import { MoonStarIcon, ShoppingCart, SunDim, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar({ changeTheme, theme }) {
  const { cart } = useContext(cartcontext);
  const [animateCart, setAnimateCart] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCounter(cart.length);
  }, [cart]);

  useEffect(() => {
    if (counter > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 300);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  return (
    <nav className="bg-white shadow-2xl dark:bg-gray-900 p-4 py-6 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          Route Store
        </Link>

        <button
          className="lg:hidden t text-indigo-600 dark:text-slate-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu />
        </button>

        <ul className="hidden lg:flex items-center gap-6">
          <li>
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-slate-600 dark:text-slate-200 hover:text-indigo-600"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-slate-600 dark:text-slate-200 hover:text-indigo-600"
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-slate-600 dark:text-slate-200 hover:text-indigo-600"
              }
            >
              Categories
            </NavLink>
          </li>
        </ul>

        <ul className="hidden lg:flex items-center gap-5">
          <li
            className={`relative transition-all duration-300 ${
              animateCart ? "animate-bounce" : ""
            }`}
          >
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-600 font-semibold flex items-center gap-1"
                  : "text-slate-600 dark:text-slate-200 hover:text-indigo-600 flex items-center gap-1"
              }
            >
              <div className="relative">
                <ShoppingCart className="text-xl" />
                {counter > 0 && (
                  <div className="absolute -top-4 -left-2 bg-indigo-700 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {counter}
                  </div>
                )}
              </div>
            </NavLink>
          </li>
          <li
            className="cursor-pointer bg-indigo-600 px-2 py-2 text-white hover:bg-indigo-500 dark:hover:bg-indigo-500 flex justify-center items-center rounded-xl"
            onClick={changeTheme}
          >
            {theme === "light" ? <MoonStarIcon /> : <SunDim />}
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className=" overflow-hidden lg:hidden px-6 pt-4 pb-6 space-y-4 bg-white dark:bg-slate-900 shadow-md rounded-b-xl text-sm"
          >
            <li>
              <NavLink
                to="home"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-slate-600 dark:text-slate-200 hover:text-indigo-600"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                end
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-slate-600 dark:text-slate-200 hover:text-indigo-600"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                end
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-semibold"
                    : "text-slate-600 dark:text-slate-200 hover:text-indigo-600"
                }
              >
                Categories
              </NavLink>
            </li>
            <li className="relative">
              <NavLink
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex  w-fit items-center gap-2 text-slate-600 dark:text-slate-200 hover:text-indigo-600"
              >
                <ShoppingCart />

                {counter > 0 && (
                  <span className="ml-auto absolute -top-3 -left-3 bg-indigo-700 text-white text-xs px-2 py-0.5 rounded-full">
                    {counter}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => {
                  changeTheme();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-fit items-center gap-2  bg-indigo-600 text-white px-3 py-2 rounded-xl hover:bg-indigo-500"
              >
                {theme === "light" ? <MoonStarIcon /> : <SunDim />}
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
