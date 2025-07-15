import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

function Header() {
  const cartItems = useCartStore(state => state.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-200">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="bg-gradient-to-br from-primary-400 to-primary-600 w-10 h-10 rounded-2xl flex items-center justify-center mr-3 shadow-medium group-hover:shadow-strong transition-all duration-300">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              TOMOTO
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-2">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            >
              Inicio
            </Link>
            <Link
              to="/productos"
              className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            >
              Productos
            </Link>
            <Link
              to="/nosotros"
              className="text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            >
              Nosotros
            </Link>
          </nav>

          {/* Cart */}
          <Link
            to="/carrito"
            className="relative bg-surface-100 hover:bg-surface-200 p-3 rounded-xl transition-all duration-200 group"
          >
            <svg
              className="w-6 h-6 text-gray-700 group-hover:text-primary-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-br from-primary-400 to-primary-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium shadow-medium">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;