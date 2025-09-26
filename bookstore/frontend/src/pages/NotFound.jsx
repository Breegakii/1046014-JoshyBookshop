import { Link } from 'react-router-dom';
import { FiArrowLeft, FiFrown } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-6xl text-gray-400 mb-4 flex justify-center">
          <FiFrown />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
            <FiArrowLeft className="mr-2" />
            Return to Home
          </Link>
          <p className="text-sm text-gray-500">
            Or try searching for what you need
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;