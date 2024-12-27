import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-auto">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 border-opacity-70"></div>
    </div>
  );
}