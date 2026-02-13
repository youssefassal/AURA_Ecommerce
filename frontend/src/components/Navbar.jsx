import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import useUserStore from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();

  return (
    <header className="fixed top-0 left-0 w-full bg-bg-dark backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-primary-darkest">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center">
            <img
              src="/logo-purple-removebg.png"
              alt="AURA Logo"
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className="hidden md:block text-gray-300 hover:text-primary transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/cart"
                className="relative group text-gray-300 hover:text-primary transition duration-300 ease-in-out flex items-center"
              >
                <ShoppingCart
                  className="group-hover:text-primary shrink-0"
                  size={20}
                />
                <span className="ml-1">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-primary-dark text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px] group-hover:bg-primary transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/secret-dashboard"
                className="bg-primary-darker hover:bg-primary-dark text-white px-2 sm:px-3 py-1.5 rounded-md font-medium flex items-center transition duration-300 ease-in-out text-sm sm:text-base"
              >
                <Lock className="mr-2" size={18} />
                <span className="ml-1">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                onClick={logout}
                className="bg-surface hover:bg-surface-hover text-white px-2 sm:px-4 py-2 rounded-md flex items-center transition duration-300 ease-in-out text-sm sm:text-base"
              >
                <LogOut size={18} className="shrink-0" />
                <span className="ml-2">Log Out</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/signup"
                  className="bg-primary-darker hover:bg-primary-dark text-white px-2 sm:px-4 py-2 rounded-md flex items-center transition duration-300 ease-in-out text-sm sm:text-base"
                >
                  <UserPlus className="mr-2" size={18} />
                  <span>Sign Up</span>
                </Link>
                <Link
                  to="/login"
                  className="bg-surface hover:bg-surface-hover text-white px-2 sm:px-4 py-2 rounded-md flex items-center transition duration-300 ease-in-out text-sm sm:text-base"
                >
                  <LogIn className="mr-2" size={18} />
                  <span>Login</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
