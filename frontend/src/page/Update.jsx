import React, { useState, useEffect } from "react";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Loading from "../assets/img/loading.gif";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Update() {
  const url = `http://localhost:5000`;
  let { id } = useParams();
  const [dataProductId, setDataProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  useEffect(() => {
    async function DataProduct() {
      const response = await fetch(`${url}/product/${id}`, {
        method: "GET",
      });
      const productData = await response.json();
      console.log(productData);
      if (productData) {
        setDataProduct(productData);
      } else {
        console.error("Error fetching product data");
      }
    }
    DataProduct();
  }, [id]);

  async function updateProduct(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const stock = e.target.stock.value;

    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);

    const dataProduct = await fetch(`${url}/products/${id}`, {
      method: "PUT",
      body: formData,
    });
    const json = await dataProduct.json();
    if (json.success) {
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
            <h1 className="text-3xl md:text-4xl text-center">Update Product</h1>
            <form onSubmit={updateProduct} className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                  className="p-4 border rounded-2xl"
                  defaultValue={dataProductId.name}
                  name="name"
                  type="text"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  defaultValue={dataProductId.description}
                  className="h-[100px] border px-4 py-3 rounded-2xl"
                ></textarea>
              </div>

              <div className="flex flex-col">
                <label htmlFor="price">Price</label>
                <input
                  className="p-4 border rounded-2xl"
                  type="number"
                  name="price"
                  id="price"
                  defaultValue={dataProductId.price}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="stock">Stock</label>
                <input
                  className="p-4 border rounded-2xl"
                  type="number"
                  name="stock"
                  id="stock"
                  defaultValue={dataProductId.stock}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-400 p-3 rounded-xl text-lg"
              >
                Save Product
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
