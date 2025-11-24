import { useEffect, useState } from "react"
import axios from "axios"
import { ShoppingCart, Plus, Minus, ChefHat, Clock, Star, Sparkles } from "lucide-react"
import readFoodList from "../zustand/readFoodList"
import checkAuth from "../zustand/checkAuth"
import { toast } from "react-toastify"
import myCart from "../zustand/user/myCart"

const FoodList = () => {
  const [qty, setQty] = useState({})

  const { loading, error, foodList, getFoodList } = readFoodList();
  const { user } = checkAuth();
  const {getCart} = myCart();

  useEffect(() => {
    getFoodList()
  }, [getFoodList])

  const addToCart = async (foodId) => {
    try {
         const response =  await axios.post(
      `http://localhost:3000/api/user/cart/addfood/${foodId}`,
      { qty: qty[foodId] || 1 },
      { withCredentials: true }
    )
    const data=response.data;
    if (data.success) {
      toast.success(data.message);
      getCart();
    }

    
    } catch (error) {
      toast.error("Error while adding food to Cart");
      console.error("Error while adding food to Cart: ", error);
      
    }

  }

  const handleChange = (e, id) => {
    const value = Math.max(1, parseInt(e.target.value) || 1)
    setQty({
      ...qty,
      [id]: value,
    })
  }

  const incrementQty = (id) => {
    setQty({
      ...qty,
      [id]: (qty[id] || 1) + 1,
    })
  }

  const decrementQty = (id) => {
    setQty({
      ...qty,
      [id]: Math.max(1, (qty[id] || 1) - 1),
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
                Today's Menu
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </h1>
            </div>
          </div>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-gray-600">
              Explore our delicious selection and order your favorites
            </p>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-700">
                {foodList?.length ?? 0} items available
              </span>
            </div>
          </div>
        </header>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className="rounded-3xl bg-white p-6 shadow-lg animate-pulse"
              >
                <div className="flex justify-between mb-4">
                  <div className="h-16 w-16 rounded-2xl bg-gray-200" />
                  <div className="h-6 w-20 rounded-full bg-gray-200" />
                </div>
                <div className="space-y-3">
                  <div className="h-6 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-5/6 rounded bg-gray-200" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-8 w-24 rounded bg-gray-200" />
                    <div className="h-8 w-24 rounded bg-gray-200" />
                  </div>
                  <div className="h-10 w-full rounded-lg bg-gray-200 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border-2 border-red-200 bg-red-50 px-6 py-4 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                <span className="text-sm font-bold text-red-600">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Error Loading Menu</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {foodList.map((item, i) => (
              <div
                key={i}
                className="group relative rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Gradient Accent */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500" />

                <div className="p-6">
                  {/* Header with Icon and Category */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-60 h-60 rounded-2xl object-cover shadow-md"
                           
                          />
                        ) : (<div 
                          className={`w-60 h-60 rounded-2xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-8xl shadow-md `}
                        >
                          🍽️
                        </div>)}
                        
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-xs font-semibold rounded-full border border-orange-200">
                      {item.category}
                    </span>
                  </div>

                  {/* Food Details */}
                  <div className="space-y-3 mb-4">
                    <h2 className="font-bold text-xl text-gray-800">
                      {item.name}
                    </h2>

                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Restaurant</p>
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                          <ChefHat className="w-3 h-3" />
                          {item.foodPartner.name}
                        </p>
                      </div>
                      {item.price && (
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-500">
                            ${item.price}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Section */}
                  {user && user.role === "user" ? (
                    <div className="space-y-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="text-sm font-medium text-gray-700">Quantity</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrementQty(item._id)}
                            className="w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={(qty[item._id] || 1) <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-700" />
                          </button>
                          <input
                            type="number"
                            value={qty[item._id] ?? 1}
                            min={1}
                            onChange={(e) => handleChange(e, item._id)}
                            className="w-16 px-3 py-2 border-2 border-gray-200 rounded-lg text-center font-semibold text-gray-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
                          />
                          <button
                            onClick={() => incrementQty(item._id)}
                            className="w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => addToCart(item._id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                        {item.price && (
                          <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-md text-sm">
                            ${((qty[item._id] || 1) * item.price).toFixed(2)}
                          </span>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl text-center">
                      <p className="text-sm text-gray-600 font-medium">
                        🔒 Login as a user to order from this menu
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default FoodList