import { useParams } from "react-router"
import myFood from "../../zustand/Partner/myFood";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { Plus, ImageIcon, DollarSign, FileText, Tag ,Pencil} from "lucide-react"

const EditFood = () => {
   const {foodId} = useParams();
   const {foods, error, loading, getFoods}= myFood();
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
    })
   
    useEffect(() => {
       if (foods.length === 0) {
        getFoods();
       }
    }, [foods.length, getFoods])

    useEffect(() => {

        const food = foods.find(item=> item._id === foodId);
        if (!food) {
        return
    } 
      setForm({
        name: food.name || "",
        price: food.price || "",
        image: food.image || "",
        description: food.description || "",
        category: food.category || "",
   })
    }, [foodId, foods])

      if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

    if (error) {
        toast.error("Error while fetching my food");
        console.error("Error while fetching my food: ",error);
        return;
    }
    
    const handleChange = (e) => (
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    )
    
    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            await axios.post(`http://localhost:3000/api/partner/editfood/${foodId}`,
            {
                name: form.name,
                price: Number(form.price),
                image: form.image,
                description: form.description,
                category: form.category
            },
            {withCredentials: true})
            
            toast.success("Food edited successfully");
            navigate("/partner/home", { state: { refresh: true } });
        } catch (error) {
            toast.error("Error while editing food!!")
            console.error("Error while editing food", error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg mb-4">
                        <Pencil className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Food Item</h1>
                    <p className="text-gray-600">Update the details and save your changes</p>
                </div>

                

                {/* Form */}
                <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <FileText className="w-4 h-4 text-orange-500" />
                            Food Name
                        </label>
                        <input 
                            id="name"
                            type="text" 
                            placeholder="e.g., Margherita Pizza"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 placeholder:text-gray-400"
                        />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <label htmlFor="price" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <DollarSign className="w-4 h-4 text-orange-500" />
                            Price
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                            <input 
                                id="price"
                                type="number" 
                                placeholder="0.00"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                step="0.01"
                                min="0"
                                className="w-full pl-9 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                        <label htmlFor="image" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <ImageIcon className="w-4 h-4 text-orange-500" />
                            Image URL
                        </label>
                        <input 
                            id="image"
                            type="text" 
                            placeholder="https://example.com/image.jpg"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 placeholder:text-gray-400"
                        />
                        {form.image && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600 mb-2">Preview:</p>
                                <img 
                                    src={form.image} 
                                    alt="Preview" 
                                    className="w-full h-48 object-cover rounded-lg"
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label htmlFor="category" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Tag className="w-4 h-4 text-orange-500" />
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 bg-white"
                        >
                            <option value="">Select a category</option>
                            <option value="Italian">Italian</option>
                            <option value="American">American</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Indian">Indian</option>
                            <option value="Thai">Thai</option>
                            <option value="Mediterranean">Mediterranean</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <FileText className="w-4 h-4 text-orange-500" />
                            Description 
                        </label>
                        <textarea 
                            id="description"
                            placeholder="Describe your food item..."
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 placeholder:text-gray-400 resize-none"
                        />
                        <p className="text-xs text-gray-500">{form.description.length} characters</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 active:scale-98 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        
                        <span className="text-xl">Save</span>
                    </button>

                    
                </div>
            </div>
        </div>
    )
}

export default EditFood