import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export default function Card({ product }) {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/products/${id}`);
  };


  const [userId, setUserId] = useState(null);
  const sessionToken = Cookies.get("sessionToken");

  useEffect(() => {
    try {
      const decodedToken = jwtDecode(sessionToken);
      setUserId(decodedToken.userId || "");
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }, [sessionToken]);


  if (!product || !product.images || product.images.length === 0) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="w-[220px] max-sm:w-[120px] flex flex-col justify-between bg-white rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105">
      <div className="w-full h-[300px] max-sm:h-[150px] relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="object-cover w-full h-full rounded-t-lg"
          onClick={() => handleNavigate(product._id)}
        />
      </div>
      <div className="flex flex-col p-4 pt-2 space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 truncate">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-gray-900">{product.price}</p>
      </div>
    </div>
  );
}
