import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Products from "./pages/client/products/index";
import Home from "./pages/client/home/index";
import Layout from "./components/layout";
import Product from "./pages/client/product";
import Login from "./pages/client/auth/login";
import Register from "./pages/client/auth/register";
import Cookies from "js-cookie";
import NotFound from "./pages/not-found";
import Cart from "./pages/client/cart";
import Favorites from "./pages/client/favorites";
import Notifications from "./pages/client/notifications";
import Logout from "./pages/client/logout";

function App() {
  const [sessionToken, setSessionToken] = useState(
    Cookies.get("sessionToken") || ""
  );

  useEffect(() => {
    let token = Cookies.get("sessionToken")
    setSessionToken(token)
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/ecommerce-mern-app" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          {sessionToken && (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/logout" element={<Logout />} />
            </>
          )}
          {!sessionToken && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
