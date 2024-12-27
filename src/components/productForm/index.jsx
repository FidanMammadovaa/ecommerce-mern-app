import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function ProductForm({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  const [sessionToken, setSessionToken] = useState(
    Cookies.get("sessionToken") || ""
  );

  useEffect(() => {
    try {
      if (sessionToken) {
        const decodedToken = jwtDecode(sessionToken);
        setUserId(decodedToken.userId || "");
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }, [sessionToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!sessionToken) {
      alert("You must be logged in to add items to the cart.");
      setIsSubmitting(false);
      return;
    }

    if (!userId) {
      alert("User ID is missing, please log in again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/cart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: product._id,
          color: selectedColor,
          size: selectedSize,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to the cart");
      }

      const data = await response.json();
      console.log("Item added to the cart:", data);
      alert("Item successfully added to the cart!");
    } catch (error) {
      console.error("Error adding item to the cart:", error);
      alert("Failed to add item to the cart. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div>
        <h3 className="text-sm font-medium text-gray-900">Color</h3>
        <RadioGroup
          value={selectedColor}
          onChange={setSelectedColor}
          className="mt-2 flex items-center gap-x-3"
        >
          {product.colors?.map((color, index) => (
            <Radio
              key={index}
              value={color}
              className={`cursor-pointer rounded-full border p-1 focus:outline-none ${selectedColor === color
                ? "ring-2 ring-indigo-500"
                : "border-gray-200"
                }`}
            >
              <span
                className="block h-8 w-8 rounded-full"
                style={{ backgroundColor: color }}
              />
            </Radio>
          ))}
        </RadioGroup>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <RadioGroup
          value={selectedSize}
          onChange={setSelectedSize}
          className="mt-2 grid grid-cols-4 gap-4"
        >
          {product.sizes?.map((size, index) => (
            <Radio
              key={index}
              value={size}
              disabled={product.stock === 0}
              className={`group flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium uppercase focus:outline-none ${selectedSize === size
                ? "ring-2 ring-indigo-500"
                : "border-gray-300"
                } ${product.stock
                  ? "cursor-pointer bg-white text-gray-900"
                  : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
            >
              {size}
            </Radio>
          ))}
        </RadioGroup>
      </div>

      <button
        type="submit"
        className={`mt-6 w-full rounded-md px-4 py-2 text-white focus:outline-none ${isSubmitting
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add to Bag"}
      </button>
    </form>
  );
}
