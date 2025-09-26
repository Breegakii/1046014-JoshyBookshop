const CartSummary = ({ subtotal, itemCount }) => {
    // const shipping = subtotal > 2000 ? 0 : 200;
    const tax = subtotal * 0.1 / 2;
    const total = subtotal + tax;
  
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">{itemCount || 0} {itemCount === 1 ? 'item' : 'items'}</span>
            <span>KSH{subtotal ? subtotal?.toFixed(2): 0}</span>
          </div>
          
          {/* <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>{subtotal ? (shipping === 0 ? 'Free' : `KSH${shipping?.toFixed(2)}`): 0}</span>
          </div> */}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>KSH{subtotal ? tax?.toFixed(2) : 0}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-bold text-gray-800">
            <span>Total</span>
            <span>KSH{subtotal ? total?.toFixed(2) : 0}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default CartSummary;