import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar } from "../assets/component/navbar";
import imgUser from "../assets/img/user.png";

export function Profile() {
  const user = useSelector((state) => state.user.data);
  const token = useSelector((state) => state.auth.token);

  function getGenderLabel(gender) {
    switch (gender) {
      case 1:
        return "Laki-Laki";
      case 2:
        return "Perempuan";
      default:
        return "Tidak tersedia";
    }
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Anda belum login.
          </h1>
          <p className="text-gray-600 mt-2">
            Silakan login untuk mengakses profil Anda.
          </p>
          <Link
            to="/signin"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div className="min-h-screen bg-blue-500">
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-6">Profil Anda</h1>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={imgUser}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user?.username || "Nama Pengguna"}
                </h2>
                <p className="text-gray-600">
                  {user?.email || "email@example.com"}
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <p className="mt-1 text-gray-800">
                  {user?.username || "Tidak tersedia"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Jenis Kelamin
                </label>
                <p className="mt-1 text-gray-800">
                  {getGenderLabel(user?.gender)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
