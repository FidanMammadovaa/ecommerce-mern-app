import React from "react";

export default function Main({ children }) {
  return (
    <main className="container max-w-7xl px-4 sm:px-6 lg:px-8">
      <div>{children}</div>
    </main>
  );
}
