import { useState } from 'react';
import RatingStars from '../common/RatingStars';
import { useCart } from '../../hooks/useCart';

const ProductDetail = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images?.[0]?.image || null);
  const maxQuantity = Math.min(product?.quantity || 10, 10);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, maxQuantity));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setQuantity(Math.max(1, Math.min(value, maxQuantity)));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="rounded-lg h-64 flex items-center justify-center bg-gray-100 overflow-hidden mb-4">
            {mainImage ? (
              <img 
                src={mainImage} 
                alt={product.title} 
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400">No Image Available</span>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          {product?.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto py-2">
              {product.images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setMainImage(image.image)}
                  className={`w-16 h-16 flex-shrink-0 border-2 rounded-md overflow-hidden ${mainImage === image.image ? 'border-blue-500' : 'border-transparent'}`}
                >
                  <img 
                    src={image.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="md:w-2/3">
          {/* Rest of the product details remain the same */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product?.title}</h1>
          <div className="flex items-center mb-4">
            <RatingStars rating={product?.average_rating} />
            <span className="text-gray-600 ml-2">({product?.reviews_count} {product?.reviews_count === 1 ? "review": "reviews"})</span>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-4">KSH{product?.price}</p>
          <p className="text-gray-700 mb-6">{product?.description}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Quantity:</span>
              <div className="flex items-center border rounded-md overflow-hidden">
                <button 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={maxQuantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-12 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button 
                  onClick={incrementQuantity}
                  disabled={quantity >= maxQuantity}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
            <span className={`text-sm font-medium ${product?.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product?.quantity > 0 
                ? `${product.quantity} available` 
                : 'Out of Stock'}
            </span>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleAddToCart}
              disabled={product?.quantity <= 0}
              className={`px-6 py-2 rounded-md font-medium cursor-pointer ${product?.quantity > 0 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
            >
              Add to Cart
            </button>
            <button 
              disabled={product?.quantity <= 0}
              className={`px-6 py-2 rounded-md font-medium cursor-pointer ${product?.quantity > 0 
                ? 'border border-blue-600 text-blue-600 hover:bg-blue-50' 
                : 'border border-gray-300 text-gray-400 cursor-not-allowed'}`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;