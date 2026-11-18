import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout({ cartItems, setCartItems, onAddToCart }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header doimiy joyida turadi */}
      <Header cartItems={cartItems} setCartItems={setCartItems} />

      {/* Sahifalar ochilishi uchun Outlet */}
      <main className="flex-1">
        <Outlet context={{ cartItems, setCartItems, onAddToCart }} />
      </main>
    </div>
  );
}