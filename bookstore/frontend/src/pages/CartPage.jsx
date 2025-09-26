import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyCart from '../components/cart/EmptyCart';
import CartItems from '../components/cart/CartItems';
import CartSummary from '../components/cart/CartSummary';
import ordersApi from '../api/orders';
import cartStorage from '../cart/storage';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cart,cartCount, loading, updateCartItem, removeCartItem, fetchCart } = useCart();

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const cartId = cartStorage.getCartId();
      if (!cartId) return toast.error("You don't have any items in your cart!");
      const res = await ordersApi.placeOrder(cartId)
      console.log(res)
      if (res.status === 200) {
        toast.success('Order placed!')
        cartStorage.removeCartId()
        await fetchCart()
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.detail || 'Something went wrong while placing the order')
    }
  }

  if (loading) return <LoadingSpinner />;
  if (!cart || cart.items?.length === 0) return <EmptyCart />;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            <CartItems 
              items={cart.items} 
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
            
            <div className="mt-6 flex justify-between items-center">
              <Link 
                to="/products" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={async() => await fetchCart()}
                className="px-4 py-2 border border-gray-300 cursor-pointer rounded-md text-gray-700 hover:bg-gray-100"
              >
                Update Cart
              </button>
            </div>
          </div>
          
          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <CartSummary 
              subtotal={cart.total_price} 
              itemCount={cartCount} 
            />
            
            <button
              onClick={handlePlaceOrder}
              className="mt-4 w-full block cursor-pointer text-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              Place Order
            </button>
            
            <p className="mt-4 text-sm text-gray-500">
              Free delivery on orders over KSH2000. Taxes calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;