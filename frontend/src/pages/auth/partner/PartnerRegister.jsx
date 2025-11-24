import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import { Mail, Lock, ChefHat, UserPlus, AlertCircle, CheckCircle, Store } from 'lucide-react'
import { toast } from 'react-toastify'

const PartnerRegister = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            toast.error("Please fill all the fields!!");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match!!");
            return;
        }

        try {
            await axios.post("http://localhost:3000/api/auth/partner/register", {
                name: form.name,
                email: form.email,
                password: form.password
            },
            {
                withCredentials: true
            })

            toast.success("Partner created successfully!!");
            setTimeout(() => {
                navigate("/partner/home")
            }, 1000)
        } catch (error) {
            toast.error("Registration failed. Please try again.");
            console.error("Error while registring partner: ",error);
            
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg mb-4">
                        <Store className="w-9 h-9 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Join as Partner</h1>
                    <p className="text-gray-600">Start selling your delicious food today</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
                    {/* Restaurant Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <ChefHat className="w-4 h-4 text-orange-500" />
                            Restaurant Name
                        </label>
                        <input 
                            id="name"
                            type="text" 
                            name='name' 
                            placeholder='Amazing Restaurant' 
                            value={form.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 placeholder:text-gray-400"
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Mail className="w-4 h-4 text-orange-500" />
                            Email Address
                        </label>
                        <input 
                            id="email"
                            type="email" 
                            name='email' 
                            placeholder='restaurant@email.com' 
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 placeholder:text-gray-400"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Lock className="w-4 h-4 text-orange-500" />
                            Password
                        </label>
                        <input 
                            id="password"
                            type="password" 
                            name='password' 
                            placeholder='••••••••' 
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 placeholder:text-gray-400"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <Lock className="w-4 h-4 text-orange-500" />
                            Confirm Password
                        </label>
                        <input 
                            id="confirmPassword"
                            type="password" 
                            placeholder='••••••••' 
                            name='confirmPassword'
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all text-gray-800 placeholder:text-gray-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:from-orange-600 hover:to-red-600 active:scale-98 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        <UserPlus className="w-5 h-5" />
                        <span>Register as Partner</span>
                    </button>

                    {/* User Register Link */}
                    <div className="pt-4 border-t border-gray-100">
                        <p className="text-center text-sm text-gray-600">
                            Want to join as a customer?{' '}
                            <Link 
                                to="/user/register"
                                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                            >
                                User Register
                            </Link>
                        </p>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link 
                                to="/partner/login"
                                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PartnerRegister