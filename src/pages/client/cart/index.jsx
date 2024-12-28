import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import OrderSummary from "../../../components/orderSummary";
import List from "../../../components/unknown/list";

export default function Cart() {
  const sessionToken = Cookies.get("sessionToken");
  const [userId, setUserId] = useState("");
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (sessionToken) {
      const decodedToken = jwtDecode(sessionToken);
      const userId = decodedToken?.userId || "";
      setUserId(userId);
    }
  }, [sessionToken]);

  const fetchData = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`http://localhost:5000/cart/getAll`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to get items from the cart");
      }

      const fetchedData = await response.json();
      setItems(fetchedData.items);
      setData(fetchedData);
    } catch (error) {
      console.error("Error fetching items from the cart:", error);
    }
  };
  useEffect(() => {


    fetchData();
  }, [userId, sessionToken]);

  const updateItemQuantity = async (updatedItem) => {
    try {
      await fetchData();  
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await fetchData();  
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <List
              items={items}
              pageType={"cart"}
              updateItemQuantity={updateItemQuantity}
              removeItem={removeItem}
            />
          </section>

          <OrderSummary data={data} />
        </form>
      </div>
    </div>
  );
}
