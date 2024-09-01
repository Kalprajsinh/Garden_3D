import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Pages/AuthContext';

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  console.log(user)
  return (
    <nav className="bg-transparent w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
  
            <div className="mt-5">
              <img className="h-20" src="/logo.png" alt="Logo" />
            </div>
            <div className="flex-1 flex items-center justify-center sm:justify-center gap-10">
              <div className="flex space-x-4">
                <a href="/" className="hidden sm:block text-white hover:bg-opacity-10 px-3 py-2 rounded-md text-lg font-medium">HOME</a>
                <a href="/about" className="hidden sm:block text-white hover:bg-opacity-10 px-3 py-2 rounded-md text-lg font-medium">ABOUT US</a>
                <a href="/blog" className="hidden sm:block text-white hover:bg-opacity-10 px-3 py-2 rounded-md text-lg font-medium">BLOG</a>
                <a href="/shop" className="hidden sm:block text-white hover:bg-opacity-10 px-3 py-2 rounded-md text-lg font-medium">SHOP</a>
                <a href="/contact" className="hidden sm:block text-white hover:bg-opacity-10 px-3 py-2 rounded-md text-lg font-medium">CONTACT</a>

              </div>
            </div>
            <div className="auth-container">
            <div className="flex gap-5">
            {!isLoggedIn ? (
                <>
                    <Link to="/login">
                        <button className="text-lg font-bold">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="text-lg font-bold">Signup</button>
                    </Link>
                </>
            ) : (
                <div className="relative flex gap-5">
                    <button className="text-lg font-bold flex items-center">
                        {user.name}
                    </button>
                    <button className="text-lg font-bold"  onClick={logout}>Logout</button>
                </div>
            )}
        </div>
        </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
