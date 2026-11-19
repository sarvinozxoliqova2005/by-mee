import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "./Footer";

export default function Layout({ cartItems, setCartItems, onAddToCart }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header cartItems={cartItems} setCartItems={setCartItems} />

      <main className="flex-1">
        <Outlet context={{ cartItems, setCartItems, onAddToCart }} />
      </main>

      <Footer/>
    </div>
  );
}