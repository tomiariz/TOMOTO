import { ProductGrid } from '@tomoto/ui';
import { useCartStore } from '../store/cartStore';
import { mockProducts } from '../data/mockProducts';
import { useState, useEffect } from "react";

function Home() {
  const addItem = useCartStore(state => state.addItem);
  
  const handleAddToCart = (product) => {
    addItem(product);
    // Aquí podrías agregar una notificación
    alert('Producto agregado al carrito');
  };

  const images = [
    "/tomoto1-grey-die-cut.png",
    "/tomoto1-earth-die-cut.png",
    "/tomoto1-balck-die-cut.png",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [images.length]);

  return (
    <div className="min-h-screen  relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden h-screen">
        {/* Fondo con imágenes cambiantes */}
        <div className="absolute inset-0 h-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Fondo ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Contenido */}
        <div className="relative flex flex-col justify-center items-center h-full z-10">
          <div className="text-center animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/80 backdrop-blur-xs text-black font-bold px-8 py-4 rounded-full shadow-strong hover:shadow-glow hover:-translate-y-1 transition-all duration-300 active:scale-95 font-sans">
                Explorar productos
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