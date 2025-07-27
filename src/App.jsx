import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDetails from "./Pages/Productdetails/Productdetails";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Cart from "./Pages/Cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Component/Layout/Layout";
import Products from "./Pages/Products/Products";
import Categories from "./Pages/Categories/Categories";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import CartContextProvider from "./Context/CartContextProvider";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  const Routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "products/:id",
          element: <ProductDetails />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <CartContextProvider>
        <RouterProvider router={Routes} />

        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </CartContextProvider>
    </>
  );
}

export default App;
