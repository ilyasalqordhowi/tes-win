import React from "react";
import logoWeb from "../img/logoWeb.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="flex gap-[] items-center font-bold">
      <div>
        <Link to="/">
          <img className="w-[100px]" src={logoWeb} alt="" />
        </Link>
      </div>
      <span className="font-bold text-[20px] text-[#E4F1FF]">Product</span>
      <span className="font-bold text-[20px] text-fuchsia-300">Shop</span>
    </div>
  );
}

export default Logo;
