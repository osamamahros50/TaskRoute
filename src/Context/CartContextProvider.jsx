/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const cartcontext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const userId = 1;

  const saveToLocalStorage = (data) => {
    localStorage.setItem("cart", JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : null;
  };

  async function getLogedCart() {
    setLoading(true);
    try {
      const localCart = loadFromLocalStorage();
      if (localCart) {
        setCart(localCart);
        setLoading(false);
        return;
      }

      const { data } = await axios.get("https://fakestoreapi.com/carts");
      const userCart = data.find((cart) => cart.userId === userId);

      if (userCart) {
        const productsWithDetails = await Promise.all(
          userCart.products.map(async (item) => {
            const res = await axios.get(
              `https://fakestoreapi.com/products/${item.productId}`
            );
            return {
              ...item,
              product: res.data,
            };
          })
        );
        setCart(productsWithDetails);
        saveToLocalStorage(productsWithDetails);
      }
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getaddToCart(productId, quantity = 1) {
    const loadingToast = toast.loading("Adding product...");
    setLoading(true);
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );

      const existingItem = cart.find((item) => item.productId === productId);
      let updatedCart;

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        updatedCart = cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
        toast.success(`🔄 Increased quantity to ${newQuantity}`);
      } else {
        const newItem = {
          productId,
          quantity,
          product: res.data,
        };
        updatedCart = [...cart, newItem];
        toast.success(`✅ Added ${quantity} item to cart`);
      }

      setCart(updatedCart);
      saveToLocalStorage(updatedCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("❌ Error adding product");
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  }

  function removeItemcart(productId) {
    const loadingToast = toast.loading("Removing item...");
    setTimeout(() => {
      const updatedCart = cart.filter((item) => item.productId !== productId);
      setCart(updatedCart);
      saveToLocalStorage(updatedCart);

      toast.dismiss(loadingToast);
      toast.success("Product removed from cart");
    }, 2000);
  }

  function clearCart() {
    setCart([]);
    saveToLocalStorage([]);
    toast.success("🧹 Cart cleared");
  }

  function updateCartItem(productId, quantity) {
    setDisabled(true);

    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );

    setCart(updatedCart);
    saveToLocalStorage(updatedCart);
    toast.success(`✅ Quantity updated to ${quantity}`);

    setTimeout(() => {
      setDisabled(false);
    }, 300);
  }

  useEffect(() => {
    getLogedCart();
  }, []);

  return (
    <cartcontext.Provider
      value={{
        cart,
        setCart,
        getaddToCart,
        loading,
        setLoading,
        getLogedCart,
        removeItemcart,
        clearCart,
        updateCartItem,
        disabled,
        setDisabled,
      }}
    >
      {children}
    </cartcontext.Provider>
  );
}
