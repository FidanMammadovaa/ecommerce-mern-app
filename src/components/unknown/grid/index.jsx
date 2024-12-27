import React from "react";
import Card from "../card/index";

export default function Grid({ products }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-5">
      <div className="grid justify-items-center gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </div>
    </div>
  );
}
