import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const gender = queryParams.get("gender") || "women";
  const parentCategory = queryParams.get("parentCategory");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (url) => {
      let queryUrl = `${url}?`;

      if (gender) {
        queryUrl += `&gender=${gender}`;
      }

      if (parentCategory) {
        queryUrl += `&parentCategory=${parentCategory}`;
      }

      try {
        const res = await fetch(queryUrl);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
      }
    };

    fetchData("http://localhost:5000/categories");
  }, [gender, parentCategory]);

  const handleNavigate = (subId) => {
    let url = `/products?subCategory=${subId}`;

    if (gender) {
      url += `&gender=${gender}`;
    }

    if (parentCategory) {
      url += `&parentCategory=${parentCategory}`;
    }

    navigate(url);
  };

  return (
    <>
      <button
        className="lg:hidden p-2 bg-gray-700 text-white rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Open Sidebar
      </button>

      <aside
        className={`fixed inset-y-0 left-0 w-64 p-4 border-x-2 transform transition-transform duration-300 lg:static lg:translate-x-0 z-50 max-lg:bg-gray-700 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="lg:hidden p-2 bg-gray-700 text-white rounded-md mb-4"
          onClick={() => setIsOpen(false)}
        >
          Close Sidebar
        </button>

        <h2 className="text-lg font-semibold mb-4 text-black">Categories</h2>
        <ul>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <li key={category._id} className="mb-2">
                <button
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category._id ? null : category._id
                    )
                  }
                  className={`w-full flex justify-between items-center text-left px-4 py-2 rounded-lg transition ${
                    activeCategory === category._id
                      ? "bg-gray-300 text-black"
                      : "hover:bg-gray-500 hover:text-white text-black"
                  }`}
                >
                  {category.name}
                  {category.subCategories &&
                    category.subCategories.length > 0 && (
                      <svg
                        viewBox="0 0 24 24"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className={`transform transition-transform duration-300 ${
                          activeCategory === category._id
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                        aria-hidden="true"
                      >
                        <path d="M2.859 7.475a.75.75 0 0 1 1.06 0l7.55 7.55a.75.75 0 0 0 1.06 0l7.551-7.55a.75.75 0 1 1 1.061 1.06l-7.5 7.55a2.25 2.25 0 0 1-3.182 0l-7.55-7.55a.75.75 0 0 1 0-1.06"></path>
                      </svg>
                    )}
                </button>

                {activeCategory === category._id &&
                  category.subCategories &&
                  category.subCategories.length > 0 && (
                    <ul className="pl-6 mt-2">
                      {category.subCategories.map((sub) => (
                        <li key={sub._id}>
                          <button
                            onClick={() => {
                              handleNavigate(sub._id);
                            }}
                            className={`w-full text-left px-4 py-2 rounded-lg transition ${
                              activeCategory === sub._id
                                ? "bg-gray-300 text-black"
                                : "hover:bg-gray-500 hover:text-white text-black"
                            }`}
                          >
                            {sub.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
        </ul>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
