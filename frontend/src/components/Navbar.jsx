import { Link } from "react-router"
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react"
import checkAuth from "../zustand/checkAuth"
import { useEffect, useState } from "react"
import myCart from "../zustand/user/myCart"

const Navbar = () => {   
  const { loading, user, error, getUser } = checkAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {cart, getCart} = myCart();
  
  useEffect(() => {
    getUser();
  }, [getUser])


  useEffect(() => {
    if (!loading && !error && user?.role === "user") {
      getCart();

    }
  }, [loading, error, user, getCart])

  

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo / Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-xl transition-shadow">
                🍽️
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                FoodCart
              </span>
              <p className="text-xs text-gray-500">Order with ease</p>
            </div>
          </Link>

          {/* Right: Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart */}
            {loading ? (
              <div className="h-10 w-24 bg-gray-100 rounded-lg animate-pulse"></div>
            ) : error ? (
              <div className="text-xs text-red-500 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            ) : user?.role === "user" ? (
              <Link
                to="/user/cart"
                className="relative group/cart"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-md hover:shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="hidden lg:inline">Cart</span>
                  <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1.5 bg-white text-orange-600 rounded-full text-xs font-bold flex items-center justify-center shadow-md border-2 border-orange-500">
                    {cart?.food?.length || 0}
                  </span>
                </div>
              </Link>
            ) : null}

            {/* User section */}
            {loading ? (
              <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
            ) : error ? (
              <div className="text-xs text-red-500 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            ) : user ? (
              <div className="flex items-center gap-3">
                {/* Name + role */}
                <div className="hidden lg:block text-right">
                  <div className="font-semibold text-gray-800 text-sm">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-500 capitalize flex items-center gap-1 justify-end">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    {user.role}
                  </div>
                </div>

                {/* Profile dropdown */}
                <div className="relative group">
                  <button className="h-11 w-11 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white text-lg font-bold flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 ring-2 ring-white hover:scale-105">
                    {user.name?.[0]?.toUpperCase()}
                  </button>

                  {/* Dropdown menu */}
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white border border-gray-200 shadow-xl opacity-0 scale-95 origin-top-right transition-all duration-200 ease-out invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize mt-1">
                        {user.role} account
                      </p>
                    </div>

                    {/* Menu items */}
                    <div className="py-2">
                      <Link
                        to="/logout"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/user/login"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 space-y-3">
            {user && user.role === "user" && (
              <Link
                to="/user/cart"
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5" />
                  <span>My Cart</span>
                </div>
                <span className="bg-white text-orange-600 rounded-full px-2 py-0.5 text-xs font-bold">
                  {cart?.food?.length || 0}
                </span>
              </Link>
            )}

            {user ? (
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>My Profile</span>
                </Link>
                <Link
                  to="/logout"
                  className="flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </Link>
              </div>
            ) : (
              <Link
                to="/user/login"
                className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar