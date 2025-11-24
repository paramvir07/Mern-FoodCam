import { useEffect } from "react"
import { ChefHat, DollarSign, Pencil, Trash2, Plus } from "lucide-react"
import { Link, useNavigate} from "react-router"
import myFood from '../../zustand/Partner/myFood.js'
import axios from "axios"
import {toast} from "react-toastify"


const PartnerHome = () => {
    const navigate = useNavigate();
  const { loading, error, foods, getFoods } = myFood();

  const handleDelete = async(foodId)=>{
    try {
      await axios.get(`http://localhost:3000/api/partner/deletefood/${foodId}`, {withCredentials: true})
      toast.success("Food item deleted successfully!!");
      getFoods();
    } catch (error) {
      console.error("Error while deleting food: ", error);
      toast.error("Error while deleting food");
    }
  }

  const handleEdit = async(foodId)=>{
    navigate(`/partner/editfood/${foodId}`)
  }

  useEffect(() => {
    getFoods();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">My Menu</h1>
            </div>
            <p className="text-gray-600 ml-16">Manage your food items and pricing</p>
          </div>
          <Link
            to="/partner/addfood"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Item</span>
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className="rounded-3xl bg-white p-6 shadow-lg animate-pulse"
              >
                <div className="flex justify-between mb-4">
                  <div className="h-20 w-20 rounded-2xl bg-gray-200" />
                  <div className="h-6 w-20 rounded-full bg-gray-200" />
                </div>
                <div className="space-y-3">
                  <div className="h-6 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-5/6 rounded bg-gray-200" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-10 flex-1 rounded-lg bg-gray-200" />
                    <div className="h-10 flex-1 rounded-lg bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-3xl border-2 border-red-200 bg-red-50 px-6 py-8 shadow-lg text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-red-100">
                <span className="text-2xl font-bold text-red-600">!</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-red-800 mb-1">Error Loading Menu</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : foods.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-12 shadow-lg text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-100">
                <ChefHat className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Menu Items Yet</h3>
                <p className="text-gray-600 mb-6">Start building your menu by adding your first food item</p>
                <Link
                  to="/partner/addfood"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add First Item</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <p className="text-sm text-gray-500 mb-1">Total Items</p>
                <p className="text-3xl font-bold text-gray-800">{foods.length}</p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <p className="text-sm text-gray-500 mb-1">Categories</p>
                <p className="text-3xl font-bold text-gray-800">
                  {new Set(foods.map(f => f.category)).size}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <p className="text-sm text-gray-500 mb-1">Avg Price</p>
                <p className="text-3xl font-bold text-gray-800">
                  ${foods.length > 0 
                    ? (foods.reduce((sum, f) => sum + (f.price || 0), 0) / foods.length).toFixed(2)
                    : '0.00'
                  }
                </p>
              </div>
            </div>

            {/* Food Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {foods.map((item, i) => (
                <div
                  key={i}
                  className="group relative rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  {/* Gradient Accent */}
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500" />

                  <div className="p-6">
                    {/* Header with Image/Icon and Category */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-shrink-0">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-20 h-20 rounded-2xl object-cover shadow-md"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              e.target.nextSibling.style.display = 'flex'
                            }}
                          />
                        ) : null}
                        <div 
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center text-3xl shadow-md ${item.image ? 'hidden' : 'flex'}`}
                        >
                          🍽️
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

                      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>

                      {item.price && (
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                          <span className="text-2xl font-bold text-orange-500">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button onClick={()=>handleEdit(item._id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 font-medium rounded-xl hover:bg-blue-100 transition-colors">
                        <Pencil className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button onClick={()=>handleDelete(item._id)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PartnerHome