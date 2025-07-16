import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Store from "./pages/Store";

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
          </Routes>
        </Layout>
      </div>
    </Router>
  )
}

export default App
