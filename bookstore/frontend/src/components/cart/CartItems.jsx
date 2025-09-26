import { Link } from 'react-router-dom';

const CartItems = ({ items, onQuantityChange, onRemoveItem }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-100">
        {items?.map((item) => (
          <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors">
            {/* Product Image with Link */}
            <Link 
              to={`/products/${item.product.id}`}
              className="flex-shrink-0 w-28 h-28 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
            >
              {item.product.images?.length > 0 ? (
                <img 
                  src={item.product.images[0].image} 
                  alt={item.product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </Link>
            
            {/* Product Details */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <Link 
                    to={`/products/${item.product.id}`}
                    className="font-medium text-gray-800 hover:text-blue-600 text-lg"
                  >
                    {item.product.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">SKU: {item.product.pcode}</p>
                </div>
                <p className="font-bold text-lg">KSH {item.product.price.toLocaleString()}</p>
              </div>
              
              {/* Quantity Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer disabled:opacity-30 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-200 font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800 cursor-pointer font-medium flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItems;