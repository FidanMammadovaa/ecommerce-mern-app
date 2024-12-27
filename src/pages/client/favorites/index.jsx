import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import List from "../../../components/unknown/list";

export default function Favorites() {
  const sessionToken = Cookies.get("sessionToken");
  let [items, setItems] = useState([]);
  let [data, setData] = useState([]);
  let [userId, setUserId] = useState("")

  useEffect(() => {
    if (sessionToken) {
      let userId = jwtDecode(sessionToken).userId || "";
      setUserId(userId)
    }
  }, [sessionToken])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/favorites/getAll`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to get items from the favorites");
        }

        const data = await response.json();
        console.log("Items from the favorites:", data);
        setItems(data.items);
        setData(data);
      } catch (error) {
        console.error("Error fetching items from the favorites:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className=" self-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Favorites
        </h1>
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Items in your favorites
          </h2>

          <List items={items} pageType="favorites" />
        </section>
      </div>
    </div>
  );
}
