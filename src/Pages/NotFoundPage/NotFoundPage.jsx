import { Link } from "react-router-dom";

export default function NotFoundPage() {
     document.title = "PageNotFound";
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-center px-4">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 dark:text-gray-200 mb-6">
        Page Not Found
      </p>
      <Link
        to="/home"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition duration-300"
      >
        Go back Home
      </Link>
    </div>
  );
}
