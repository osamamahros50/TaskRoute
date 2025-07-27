import React, { useContext, useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { cartcontext } from "../../Context/CartContextProvider";

export default function Cartitem({ item }) {
  const { removeItemcart, updateCartItem } = useContext(cartcontext);
  const [count, setCount] = useState(item?.quantity);
  const [localDisabled, setLocalDisabled] = useState(false);
  const [deleteDisabled, setDeleteDisabled] = useState(false);

  useEffect(() => {
    setCount(item?.quantity);
  }, [item?.quantity]);

  function handleUpdate(newCount) {
    if (newCount === count || newCount < 1) return;

    setLocalDisabled(true);
    updateCartItem(item?.productId, newCount);

    setTimeout(() => {
      setLocalDisabled(false);
    }, 350);
  }

  function handleDelete() {
    setDeleteDisabled(true);
    setTimeout(() => {
      removeItemcart(item?.productId);
      setDeleteDisabled(false);
    }, 2000);
  }

  return (
    <div className="mb-6 group rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-4 shadow-md flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 flex-wrap">
      <img
        src={item?.product?.image}
        alt="product"
        className="w-full sm:w-40 h-40 object-contain rounded-xl group-hover:scale-105 duration-300"
      />

      <div className="flex flex-col sm:flex-1 gap-4 w-full">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-indigo-600">
            {item?.product?.title?.split(" ", 2).join(" ") || "No Title"}
          </h2>
          <p className="font-bold dark:text-white">
            Price:{" "}
            <span className="text-indigo-600">{item?.product?.price} ₭</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 flex-wrap">
          <div className="flex items-center border border-gray-300 rounded-2xl py-2 px-2 bg-gray-50 dark:bg-gray-700">
            <button
              disabled={localDisabled || count <= 1}
              onClick={() => handleUpdate(count - 1)}
              className="disabled:opacity-50 disabled:cursor-not-allowed text-indigo-600 font-bold bg-gray-100 py-1 px-3.5 hover:bg-indigo-700 hover:text-white rounded-l"
            >
              -
            </button>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(+e.target.value)}
              onBlur={() => handleUpdate(count)}
              min={1}
              className="w-16 text-center border-0 outline-none bg-white dark:bg-gray-700 rounded-full text-xs text-indigo-700 dark:text-white"
            />
            <button
              disabled={localDisabled}
              onClick={() => handleUpdate(count + 1)}
              className="disabled:opacity-50 disabled:cursor-not-allowed text-indigo-600 font-bold bg-gray-100 py-1 px-3 hover:bg-indigo-700 hover:text-white rounded-r"
            >
              +
            </button>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
            <p className="font-bold dark:text-white">
              Total:{" "}
              <span className="text-indigo-600">
                {item?.product?.price * count} ₭
              </span>
            </p>
            <button
              onClick={handleDelete}
              disabled={deleteDisabled}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:from-[#be123c] hover:to-[#fb7185] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
