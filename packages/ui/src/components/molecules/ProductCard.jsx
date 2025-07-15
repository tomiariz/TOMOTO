import { Link } from 'react-router-dom';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div className="group">
      <Link to={`/producto/${product.id}`}>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden group-hover:-translate-y-2">
          {/* Imagen del producto */}
          <div className="aspect-square bg-gradient-to-br from-surface-100 to-surface-200 overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.inStock && (
              <div className="absolute top-4 right-4">
                <Badge variant="success" size="sm">
                  Disponible
                </Badge>
              </div>
            )}
            
            {/* Overlay con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Contenido de la card */}
          <div className="p-6">
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
            </div>
            
            {/* Precio y botón */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500">Precio final</span>
              </div>
              
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="shadow-medium hover:shadow-strong"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}