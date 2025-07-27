import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-800 text-center border-t border-gray-200 dark:border-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-indigo-700 font-bold text-2xl mb-2 sm:text-left text-center">
          Get the Route Store
        </h2>

        <p className="text-indigo-700 mb-4 sm:text-left text-center">
          We will send you a link, open it on your phone to download the app
        </p>

        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 mb-6">
          <input
            className="w-full sm:flex-1 focus:outline-none border border-indigo-700 focus:border-indigo-700 rounded-md px-4 py-2 bg-slate-50"
            type="email"
            name="email"
            placeholder="Enter your email"
            id="useremail"
          />
          <button className="w-full sm:w-auto px-6 py-2 rounded-2xl text-white font-bold bg-indigo-700 hover:bg-indigo-600 transition duration-300">
            Send
          </button>
        </div>

        <p className="text-sm text-indigo-600  text-center">
          &copy; {new Date().getFullYear()} MyStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
