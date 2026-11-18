import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ cartItems, setCartItems, onAddToCart }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItems={cartItems} setCartItems={setCartItems} />
      
      <main className="flex-1">
        <Outlet context={{ onAddToCart, cartItems, setCartItems }} />
      </main>

      <Footer />
    </div>
  );
}