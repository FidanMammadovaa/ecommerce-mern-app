import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Review() {
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[0, 1, 2, 3, 4].map((rating) => (
          <StarIcon
            key={rating}
            className={classNames(
              reviews.average > rating ? "text-yellow-500" : "text-gray-300",
              "w-5 h-5"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <a
        href={reviews.href}
        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        {reviews.totalCount} reviews
      </a>
    </div>
  );
}
