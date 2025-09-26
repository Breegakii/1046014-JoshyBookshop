import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-12 text-center max-w-2xl mx-auto">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h2 className="mt-4 text-2xl font-bold text-gray-800">Your cart is empty</h2>
      <p className="mt-2 text-gray-600">
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link
        to="/products"
        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;