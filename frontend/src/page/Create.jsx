import React, { useState, useEffect } from "react";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../assets/img/loading.gif";
import { useSelector } from "react-redux";

export function Create() {
  const url = `http://localhost:5000/products`;
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  const formik = useFormik({
    onSubmit: createProduct,
    initialValues: {
      name: "",
      price: "",
      stock: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required!"),
      price: Yup.number().required("Required!"),
      stock: Yup.number().required("Required!"),
      description: Yup.string().required("Required!"),
    }),
  });

  async function createProduct() {
    const { name, price, stock, description } = formik.values;

    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);

    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      console.log(json);
      if (json) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-blue-950 min-h-screen flex justify-center items-center p-4">
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-full max-w-md gap-4 bg-white p-5 rounded-lg shadow-md">
            <Link to={"/"}>
              <button className="flex hover:text-red-500 items-center text-xl gap-2">
                <FaPersonWalkingArrowLoopLeft />
                <h2>Exit</h2>
              </button>
            </Link>
            <h1 className="text-3xl md:text-4xl text-center">Create Product</h1>
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  className="p-4 border rounded-2xl"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name of the product"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (
                  <p className="font-bold text-red-700">{formik.errors.name}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Description of the product"
                  className="h-[100px] border px-4 py-3 rounded-2xl"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                ></textarea>
                {formik.errors.description && formik.touched.description && (
                  <p className="font-bold text-red-700">
                    {formik.errors.description}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="price">Price</label>
                <input
                  className="p-4 border rounded-2xl"
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price of the product"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                {formik.errors.price && formik.touched.price && (
                  <p className="font-bold text-red-700">
                    {formik.errors.price}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="stock">Stock</label>
                <input
                  className="p-4 border rounded-2xl"
                  type="number"
                  name="stock"
                  id="stock"
                  placeholder="Stock product"
                  onChange={formik.handleChange}
                  value={formik.values.stock}
                />
                {formik.errors.stock && formik.touched.stock && (
                  <p className="font-bold text-red-700">
                    {formik.errors.stock}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-400 p-3 rounded-xl text-lg"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
        {loading && (
          <div className="absolute flex bg-black/50 w-full h-screen top-0 left-0 items-center justify-center">
            <div className="bg-[#AED2FF] flex items-center gap-4 rounded-md p-4">
              <img className="w-24" src={Loading} alt="Loading" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
