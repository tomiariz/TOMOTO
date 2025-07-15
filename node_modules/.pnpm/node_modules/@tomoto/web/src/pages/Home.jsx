import { ProductGrid } from '@tomoto/ui';
import { useCartStore } from '../store/cartStore';
import { mockProducts } from '../data/mockProducts';

function Home() {
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = (product) => {
    addItem(product);
    // Aquí podrías agregar una notificación
    alert('Producto agregado al carrito');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradiente de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600"></div>
        
        {/* Efectos visuales */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              Bienvenido a
              <span className="block bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
                TOMOTO
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/80 max-w-2xl mx-auto">
              Descubrí los mejores productos con diseño moderno y tecnología de vanguardia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-2xl shadow-strong hover:shadow-glow hover:-translate-y-1 transition-all duration-300 active:scale-95">
                Explorar productos
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 active:scale-95">
                Ver ofertas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Productos
              <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent"> destacados</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Selección cuidadosa de productos premium con el mejor diseño y funcionalidad
            </p>
          </div>
          
          <div className="animate-scale-in">
            <ProductGrid
              products={mockProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-surface-100 to-surface-200">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-medium">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Envío rápido</h3>
              <p className="text-gray-600">Recibí tus productos en 24-48 horas</p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-medium">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Garantía total</h3>
              <p className="text-gray-600">Productos garantizados y soporte 24/7</p>
            </div>
            
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-medium">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mejor precio</h3>
              <p className="text-gray-600">Precios competitivos y ofertas exclusivas</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;