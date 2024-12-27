import React, { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router";

export default function ListItem({ item, itemIndex, pageType }) {
  const sessionToken = Cookies.get("sessionToken");
  const userId = jwtDecode(sessionToken)?.userId;

  const [cartItem, setCartItem] = useState({})

  const [quantity, setQuantity] = useState(item.quantity);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const increaseQuantity = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:5000/cart/increment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: item.productId._id,
          size: item.size,
          color: item.color,
        }),
      });

      if (response.ok) {
        let data = await response.json()
          let findItem = data.items.find((findItem) => findItem._id === item._id);
          
          setQuantity(findItem.quantity)
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQuantity = async (e) => {
    e.preventDefault()
    if (quantity > 1) {
      try {
        const response = await fetch(`http://localhost:5000/cart/decrement`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            productId: item.productId._id,
            size: item.size,
            color: item.color,
          }),
        });

        if (response.ok) {
          let data = await response.json()
          let findItem = data.items.find((findItem) => findItem._id === item._id);
          
          setQuantity(findItem.quantity)
        }
        
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    }
  };

  const handleAddToBag = (event) => {
    event.preventDefault(); 
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false); 
    }, 2000);
  };

  return (
    <li className="flex py-4 sm:py-6">
      <div className="flex-shrink-0">
        <img
          src={item.productId?.images?.[0] || '/default-image.jpg'}
          alt={item.productId?.name || 'Product Image'}
          className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-base">
                <Link
                  to={`/products`}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {item.productId?.name}
                </Link>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              <p className="text-gray-500">{item.color}</p>
              {item.size && (
                <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                  {item.size}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className="absolute top-0 right-0">
              <button
                type="button"
                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                {/* SVG icon for removing */}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-row text-sm justify-between">
          <p className="flex text-gray-700 space-x-2">
            {item.productId.stock > 1 ? (
              <svg
                className="flex-shrink-0 h-5 w-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            <span>{item.productId.stock >= 1 ? "In stock" : `Ships in 24 hrs`}</span>
          </p>
          {pageType === "cart" && (
            <>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => { decreaseQuantity(e) }}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  disabled={quantity <= 1}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span>{quantity}</span>
                <button
                  onClick={(e) => { increaseQuantity(e) }}

                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  disabled={quantity >= item.productId.stock}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
          {pageType === "favorites" && (
            <>
              <button
                type="button" // Изменили тип с "submit" на "button"
                onClick={handleAddToBag} // Привязали обработчик
                className={`w-1/3 rounded-md px-4 py-2 text-white focus:outline-none ${isSubmitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add to Bag"}
              </button>
            </>
          )}
          <p className="font-medium text-base text-gray-900">${item.quantity * item.productId.price}</p>
        </div>
      </div>
    </li>
  );
}
