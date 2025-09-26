import { Link } from 'react-router-dom';
import RatingStars from '../common/RatingStars';
import { useCart } from '../../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id, 1);
  };

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative h-60 w-full overflow-hidden">
        {product.images?.length > 0 ? (
          <img 
            src={product.images[0].image} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image Available</span>
          </div>
        )}
        {/* Stock Status Badge */}
        {product.quantity <= 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-2">
          <RatingStars rating={product?.average_rating} />
          <span className="text-gray-500 text-xs ml-1">({product?.reviews_count} {product?.reviews_count === 1 ? "review": "reviews"})</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900 text-lg">KSH {product.price.toLocaleString()}</span>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.quantity <= 0}
            className={`px-4 py-2 cursor-pointer text-sm rounded-lg font-medium transition-all ${
              product.quantity > 0 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;