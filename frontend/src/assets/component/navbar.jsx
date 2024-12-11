import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";
import { useSelector } from "react-redux";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.data);
  console.log(user, "ini user");
  console.log(token, "ini token");

  return (
    <nav className="bg-blue-950/85 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-500">
          <Logo />
        </Link>
        {token == null ? (
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/signin"
              className="px-4 py-2 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-100"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link
              to={"/profile"}
              className="px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              {user?.username || "User"}
            </Link>
          </div>
        )}

        <div className="md:hidden flex items-center">
          <button
            id="menu-button"
            className="focus:outline-none hover:text-blue-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden flex flex-col items-center gap-2 mt-4 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        {token == null ? (
          <>
            <Link
              to="/signin"
              className="w-full text-center px-4 py-2 rounded-full bg-white text-blue-600 font-semibold hover:bg-gray-100"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="w-full text-center px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <Link
            to={"/profile"}
            className="w-full text-center px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            {user?.username || "User"}
          </Link>
        )}
      </div>
    </nav>
  );
}
