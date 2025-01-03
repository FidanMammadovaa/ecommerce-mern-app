import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  ShoppingBagIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie'
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
  { name: "Women", href: "/products?gender=women" },
  { name: "Men", href: "/products?gender=men" },
  { name: "Kids", href: "/products?gender=kids" },
];

const categories = [
  "Gifting",
  "New In",
  "Clothing",
  "Sport",
  "Streetwear",
  "Accessories",
  "Beauty",
];



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [sessionToken, setSessionToken] = useState(
    Cookies.get("sessionToken") || ""
  );
  
  useEffect(() => {
    let token = Cookies.get("sessionToken")
    if (token){
      setSessionToken(token)
    }
  }, [])

  const handleNavigation = (path) => {
    navigate(path); 
  };

  const [parentCategories, setParentCategories] = useState([]);

  const getGenderFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("gender");
  };

  const gender = getGenderFromUrl() || "";

  useEffect(() => {
    if (gender) {
      const fetchParentCategories = async () => {
        try {
          let url = `http://localhost:5000/parentCategories`

          if (gender !== "") {
            url += `?gender=${gender}`
          }
          const res = await fetch(
            url
          );

          const data = await res.json();

          setParentCategories(data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      fetchParentCategories();
    }
  }, [gender]);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="container max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  className="size-8"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  onClick={() => handleNavigation("/cart")}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:text-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View cart</span>
                  <ShoppingBagIcon aria-hidden="true" className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigation("/favorites")}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:text-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View favorites</span>
                  <HeartIcon aria-hidden="true" className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigation("/notifications")}
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:text-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={user.imageUrl}
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {sessionToken === "" ? (
                      <>
                        <MenuItem>
                          <Link
                            to={`/login`}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          >
                            Login
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to={`/register`}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          >
                            Register
                          </Link>
                        </MenuItem>
                      </>
                    ) : <MenuItem>
                      <Link
                        to={`/logout`}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Logout
                      </Link>
                    </MenuItem>}
                  </MenuItems>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              );
            })}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="shrink-0">
                <img
                  alt=""
                  src={user.imageUrl}
                  className="size-10 rounded-full"
                />
              </div>
              <div className="ml-3">
                <div className="text-base/5 font-medium text-white">
                  {user.name}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {user.email}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleNavigation("/cart")}
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:text-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View cart</span>
                <ShoppingBagIcon aria-hidden="true" className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => handleNavigation("/favorites")}
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:text-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View favorites</span>
                <HeartIcon aria-hidden="true" className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => handleNavigation("/notifications")}
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:text-white"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <DisclosureButton
                as="a"
                href={'/login'}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                Login
              </DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-8 lg:px-8">
          {/* Scrollable Navigation for Mobile */}
          <div className="flex flex-wrap items-baseline gap-5 py-1 sm:overflow-visible overflow-x-auto sm:whitespace-normal whitespace-nowrap">
            {parentCategories.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={`products?parentCategory=${item}&gender=${gender}`}
                  aria-current={item.current ? "page" : undefined}
                  className={`relative group text-nowrap ${item.name === "Sale %" ? "text-red-500" : ""
                    } ${isActive ? "font-semibold" : ""}`}
                >
                  {item}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 ${item.name === "Sale %" ? "bg-red-500" : "bg-gray-500"
                      }`}
                  ></span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>
    </div>
  );
}
