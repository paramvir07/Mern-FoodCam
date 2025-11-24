import { useEffect } from "react"
import { Trash2, Plus, Minus, ShoppingBag, AlertCircle } from "lucide-react"
import myCart from "../../zustand/user/myCart"
import { toast } from "react-toastify";
import { Link } from "react-router";
import axios from "axios";


const Cart = () => {
  const {loading, cart, getCart, updateQty} = myCart();
  useEffect(() => {
    try {
    getCart();
    } catch (error) {
      toast.error("Error while fetching Cart!!")
    }
  }, [getCart])

  

  const handleDelete = async (foodId) => {
    try {
     const response = await axios.delete(`http://localhost:3000/api/user/cart/deletefood/${foodId}`, {withCredentials: true});
     const data = response.data;
    if (data.success) {
      toast.success(data.message);
      getCart();
      return;
    }
    
    } catch (error) {
      toast.error("Error while deleting food from cart");
      console.error("Error while deleting food from cart: ", error)
      
    }
  }

  const calculateSubtotal = () => {
    if (!cart?.food) return 0;
    return cart.food.reduce((total, item) => total + (item.foodId.price || 0) * item.qty, 0);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    )
  }

  if (!cart?.food || cart.food.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500">Add some delicious items to get started!</p>
          <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add First Item</span>
                </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <ShoppingBag className="w-10 h-10 text-orange-500" />
            My Cart
          </h1>
          <p className="text-gray-600 mt-2">{cart.food.length} item(s) in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.food.map((item, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex gap-4">
                    {/* Food Image Placeholder */}
                    {item.foodId.image ? (
                          <img 
                            src={item.foodId.image} 
                            alt={item.foodId.name}
                            className="w-24 h-24 rounded-2xl object-cover shadow-md"
                           
                          />
                        ) : (<div 
                          className={`w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-4xl shadow-md `}
                        >
                          🍽️
                        </div>)}

                    {/* Item Details */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {item.foodId.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                        <span className="inline-block w-2 h-2 bg-orange-400 rounded-full"></span>
                        {item.foodId.foodPartner.name}
                      </p>
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full">
                        {item.foodId.category}
                      </span>
                      <p className="text-lg font-bold text-gray-800 mt-3">
                        ${(item.foodId.price || 0).toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls & Delete */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600">Quantity:</span>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQty(item.foodId._id, 'decrease')}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.qty <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-bold text-gray-800">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.foodId._id, 'increase')}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    <div className="flex items-center gap-4">
                      <p className="text-xl font-bold text-gray-800">
                        ${((item.foodId.price || 0) * item.qty).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleDelete(item.foodId._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 group"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold">$5.00</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${(calculateSubtotal() * 0.1).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-orange-500">
                      ${(calculateSubtotal() + 5 + calculateSubtotal() * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Proceed to Checkout
              </button>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Free delivery on orders over $50!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart