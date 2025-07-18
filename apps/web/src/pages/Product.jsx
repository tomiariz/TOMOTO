import { useParams, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

// Usa el mismo array que en Home/Store
const customProducts = [
  {
    id: 1,
    name: "Tomoto Grey",
    description: "Edición especial gris, diseño minimalista.",
    price: 25000,
    image: "/tomoto1-grey-die-cut.png",
    inStock: true,
  },
  {
    id: 2,
    name: "Tomoto Earth",
    description: "Inspirado en la naturaleza, edición Earth.",
    price: 27000,
    image: "/tomoto1-earth-die-cut.png",
    inStock: true,
  },
  {
    id: 3,
    name: "Tomoto Black",
    description: "Clásico y elegante, edición Black.",
    price: 26000,
    image: "/tomoto1-balck-die-cut.png",
    inStock: true,
  },
];

function Product() {
  const { id } = useParams();
  const addItem = useCartStore(state => state.addItem);

  // Busca el producto en customProducts
  const product = customProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Producto no encontrado
          </h1>
          <Link
            to="/"
            className="text-tomoto-600 hover:text-tomoto-700 font-medium"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    alert('Producto agregado al carrito');
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Imagen del producto */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Información del producto */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {product.description}
          </p>
          
          <div className="text-3xl font-bold text-tomoto-600 mb-8">
            ${product.price.toLocaleString()}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-tomoto-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-tomoto-700 transition-colors flex-1"
            >
              Agregar al carrito
            </button>
            
            <Link
              to="/"
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-center"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;