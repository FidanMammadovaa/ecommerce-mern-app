import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Grid from "../../../components/unknown/grid";
import Pagination from "../../../components/unknown/pagination";
import Sidebar from "../../../components/unknown/sidebar";

export default function Products() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get gender from query, default to "women" if not specified
  const gender = queryParams.get("gender") || "women";
  const parentCategory = queryParams.get("parentCategory");
  const subCategory = queryParams.get("subCategory");

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      let queryUrl = `http://localhost:5000/products?page=${page}&limit=8`;

      if (gender) {
        queryUrl += `&gender=${gender}`
      }
      
      if (parentCategory) {
        queryUrl += `&parentCategory=${parentCategory}`;
      }

      if (subCategory) {
        queryUrl += `&subCategory=${subCategory}`;
      }

      try {
        const res = await fetch(queryUrl);
        const data = await res.json();
        setProducts(data.products);
        setTotalPages(data.pages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gender, parentCategory, page, subCategory]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <Sidebar />
          <div className="flex flex-col">
            <Grid products={products} />
            <Pagination
              totalPages={totalPages}
              page={page}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
