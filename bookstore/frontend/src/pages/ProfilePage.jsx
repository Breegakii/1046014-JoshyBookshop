import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit, FiSave, FiLock, FiMail, FiUser, FiCalendar, FiArrowLeft, FiBook, FiShoppingBag, FiHeart, FiTrash2 } from 'react-icons/fi';
import useAuth from '../auth/useAuth';
import OrderItemCard from '../components/orders/OrderItemCard';
import ordersApi from '../api/orders';
import { toast } from 'react-toastify';


const ProfilePage = () => {
  const { user, updateUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    joinDate: ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [wishlist, setWishlist] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const fetchOrders = async() => {
    try {
      const res = await ordersApi.getOrders()
      if (!res.data) return setOrderHistory([]);
      setOrderHistory(res.data);
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.detail || 'Something went wrong while fetching order history')
    }
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setFormData({
      username: user.username || '',
      email: user.email || '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'
    });

    // Sample data - replace with actual API calls
    setWishlist([
      { 
        id: 1, 
        title: 'The Great Gatsby', 
        author: 'F. Scott Fitzgerald', 
        price: 12.99, 
        image: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg' 
      },
      { 
        id: 2, 
        title: 'To Kill a Mockingbird', 
        author: 'Harper Lee', 
        price: 10.50, 
        image: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg' 
      }
    ]);

    fetchOrders()
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(wishlist.filter(book => book.id !== bookId));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
            >
              <FiArrowLeft className="mr-2" /> Back
            </button>
            
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="bg-blue-100 rounded-full p-4 mr-6 mb-4 md:mb-0">
                <FiUser className="h-10 w-10 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="border-b border-gray-300 focus:border-blue-500 outline-none bg-transparent text-2xl font-bold"
                    />
                  ) : (
                    formData.username
                  )}
                </h1>
                <p className="text-gray-600 mt-1">
                  {formData.first_name} {formData.last_name}
                </p>
                <p className="text-gray-500 text-sm mt-1">Member since {formData.joinDate}</p>
              </div>
              <div className="mt-4 md:mt-0">
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <FiSave className="mr-2" /> Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                    <FiEdit className="mr-2" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 sticky top-4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FiUser className="mr-3" /> Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeTab === 'orders' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FiShoppingBag className="mr-3" /> Orders
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${activeTab === 'wishlist' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FiHeart className="mr-3" /> Wishlist
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 flex items-center mt-4"
                >
                  <FiLock className="mr-3" /> Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Panel */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Personal Information</h2>
                  
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{formData.first_name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{formData.last_name}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{formData.email}</p>
                      )}
                    </div>
                  </form>
                </div>

                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Password</h3>
                    <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                  </div>
                  <Link
                    to="/change-password"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Change Password
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Order History</h2>
                  
                  {orderHistory.length > 0 ? (
                    <div className="space-y-4">
                      {orderHistory.map(order => (
                        <OrderItemCard order={order} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FiBook className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                      <p className="mt-1 text-sm text-gray-500 mb-6">Start shopping to see your orders here.</p>
                      <Link
                        to="/products"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Browse Books
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Your Wishlist</h2>
                  
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map(book => (
                        <div key={book.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="h-48 bg-gray-100 flex items-center justify-center">
                            {book.image ? (
                              <img src={book.image} alt={book.title} className="h-full object-cover" />
                            ) : (
                              <FiBook className="h-16 w-16 text-gray-400" />
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-gray-900 truncate">{book.title}</h3>
                            <p className="text-sm text-gray-500">{book.author}</p>
                            <div className="mt-3 flex justify-between items-center">
                              <span className="font-medium">${book.price.toFixed(2)}</span>
                              <button 
                                onClick={() => removeFromWishlist(book.id)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FiHeart className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
                      <p className="mt-1 text-sm text-gray-500 mb-6">Save books you love to your wishlist.</p>
                      <Link
                        to="/products"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Explore Books
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;