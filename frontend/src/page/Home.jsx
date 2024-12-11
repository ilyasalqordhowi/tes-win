import React, { useEffect, useState } from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../assets/component/navbar";

export function Home() {
  const url = `http://localhost:5000/products`;
  const [product, setDataProduct] = useState([]);

  useEffect(() => {
    async function DataProduct() {
      const response = await fetch(`${url}`, {
        method: "GET",
      });
      const productData = await response.json();
      console.log(productData);
      if (productData) {
        setDataProduct(productData);
      } else {
        console.error("Error fetching product");
      }
    }
    DataProduct();
  }, []);

  async function RemoveProduct(id) {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    console.log(json);
    if (json) {
      setDataProduct((prevProduct) =>
        prevProduct.filter((item) => item.id !== id)
      );
    } else {
      console.error("Error deleting product");
    }
  }

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div className="bg-blue-950 min-h-screen flex items-center justify-center">
        <div className="flex flex-col p-4 md:p-16 gap-10 max-w-4xl w-full">
          <h1 className="text-blue-500 font-bold text-3xl md:text-5xl text-center">
            Product-Product
          </h1>
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div className="flex text-2xl md:text-3xl text-blue-700 items-center gap-3">
                <h2 className="bg-white rounded-full h-10 flex items-center justify-center p-5">
                  {product.length}
                </h2>
                <h3>product</h3>
              </div>
              <div className="flex justify-center">
                <Link to={"/create"}>
                  <button className="bg-blue-600 w-12 md:w-20 rounded-full text-2xl md:text-4xl font-bold p-2">
                    +
                  </button>
                </Link>
              </div>
            </div>
            <hr />
            <div className=" overflow-y-scroll max-h-96 rounded-xl space-y-4 pr-2">
              {product.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row bg-yellow-300 items-start md:items-center justify-between  p-5 rounded-xl"
                >
                  <div className="flex gap-3 flex-col">
                    <h1 className="text-xl md:text-2xl">{item.name}</h1>
                    <p className="text-sm md:text-base">{item.description}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <div>
                      <h1>Price</h1>
                      <h2 className="text-sm md:text-base">{item.price}</h2>
                    </div>
                    <div className="flex flex-col items-center">
                      <h1>Stock</h1>
                      <h2 className="bg-blue-500 p-2 rounded-xl text-sm md:text-base">
                        {item.stock}
                      </h2>
                    </div>
                    <div className="flex justify-between w-full mt-2">
                      <Link to={`/update/${item.id}`}>
                        <FaPenToSquare className="cursor-pointer" />
                      </Link>
                      <button onClick={() => RemoveProduct(item.id)}>
                        <FaTrash className="text-red-600 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
