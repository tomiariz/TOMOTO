import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Store from "./pages/Store";
import React from 'react';
import { CheckoutButton } from './components/CheckoutButton';
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import Pending from "./pages/Pending";

const items = [
  { id: 'uuid-producto', name: 'Producto 1', price: 100, quantity: 2 }
  // ...otros productos
];

function App() {
  return (
    <Router>
      <div>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tienda" element={<Store />} />
            <Route path="/producto/:id" element={<Product />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
            <Route path="/pending" element={<Pending />} />
          </Routes>
        </Layout>
        <CheckoutButton items={items} />
      </div>
    </Router>
  )
}

export default App
