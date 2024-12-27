import React, { useEffect, useRef, useState } from "react";
import Card from "../card/index";

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      let queryUrl = `http://localhost:5000/products?limit=8`;

      try {
        const res = await fetch(queryUrl);
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } 
    };

    fetchData();
  }, [])
  const scrollRef = useRef(null);

  const scrollByAmount = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300; // Adjust scroll distance as needed
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-8">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll scroll-smooth scrollbar-hide snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div key={product.id} className="snap-start">
              <Card product={product} />
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <button
          className="absolute top-1/2 h-1/2 left-0 -translate-y-1/2 bg-gray-800 opacity-50 hover:opacity-90 text-white p-6 max-sm:p-2"
          onClick={() => scrollByAmount("left")}
        >
          &#8592;
        </button>
        <button
          className="absolute top-1/2 h-1/2 right-0 -translate-y-1/2 bg-gray-800 opacity-50 hover:opacity-90 text-white p-6 max-sm:p-2"
          onClick={() => scrollByAmount("right")}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
