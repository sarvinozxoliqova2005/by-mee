import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import HomaPages from '../pages/HomaPages';
import CategoryPage from '../pages/CategoryPage';
import ProductPage from '../pages/ProductPage'; 
import CartPage from '../pages/CartPage';
import RegistrationPage from '../pages/RegistrationPage';
import PaymentInputPage from '../pages/PaymentInputPage';
import SuccessfulPage from '../pages/SuccessfulPage';
import PersonalAreaPage from '../pages/PersonalAreaPage';
import HistoryPage from '../pages/HistoryPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              cartItems={cartItems}
              setCartItems={setCartItems}
              onAddToCart={handleAddToCart}
            />
          }
        >
          <Route 
            index 
            element={
              <HomaPages 
                cartItems={cartItems} 
                setCartItems={setCartItems} 
                onAddToCart={handleAddToCart} 
              />
            } 
          />
          <Route
            path="/:categorySlug"
            element={<CategoryPage onAddToCart={handleAddToCart} />}
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductPage 
                cartItems={cartItems} 
                setCartItems={setCartItems} 
                onAddToCart={handleAddToCart} 
              />
            }
          />
          <Route path='/cart' element={<CartPage/>}/>
          <Route path ='/registration' element = {<RegistrationPage/>}/>
          <Route path ='/input' element = {<PaymentInputPage/>}/>
          <Route path='/success' element= {<SuccessfulPage/>}/>
          <Route path='/personal' element= {<PersonalAreaPage/>}/>
          <Route path ='/history' element ={<HistoryPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;