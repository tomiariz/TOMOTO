import { ProductCard } from '../molecules/ProductCard';

export function ProductGrid({ products, onAddToCart, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-soft overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-surface-200 to-surface-300 rounded-t-3xl"></div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-surface-300 rounded-xl"></div>
                  <div className="h-3 bg-surface-300 rounded-xl w-3/4"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-surface-300 rounded-xl w-1/3"></div>
                  <div className="h-9 bg-surface-300 rounded-2xl w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-soft p-12 max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-to-br from-surface-200 to-surface-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No hay productos disponibles
          </h3>
          <p className="text-gray-600">
            Probá con otros términos de búsqueda o explorá nuestras categorías
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
          />
        </div>
      ))}
    </div>
  );
}