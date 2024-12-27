import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import List from "../../../components/unknown/list";

export default function Favorites() {
  const sessionToken = Cookies.get("sessionToken");
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (sessionToken) {
      const decodedToken = jwtDecode(sessionToken);
      const userId = decodedToken?.userId || "";
      setUserId(userId);
    }
  }, [sessionToken]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return

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

        const fetchedData = await response.json();
        console.log("Items from the favorites:", fetchedData);
        setItems(fetchedData.items);
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching items from the favorites:", error);
      }
    };

    fetchData();
  }, [userId, sessionToken]); 

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="self-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Favorites
        </h1>
        <section aria-labelledby="favorites-heading" className="lg:col-span-7">
          <h2 id="favorites-heading" className="sr-only">
            Items in your favorites
          </h2>

          <List items={items} pageType="favorites" />
        </section>
      </div>
    </div>
  );
}
