import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { UserContext } from '../screens/UserContext';
import { routes } from '../../Routes';
import axios from 'axios';
import MobileMenu from './MobileMenu';
import { API } from '../../API';

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const cart = useSelector((state) => state.cart.items);

  const totalQuantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed:', err);
    }

    localStorage.removeItem('userId');
    setUser(null);
    navigate('/login');
  };

  const handleProtectedClick = () => {
    if (!user) {
      message.warning("Please login to view cart");
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#1c1d22] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 ">
        
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <MobileMenu />
        </div>

        {/* Navigation Links - Hidden on small screens */}
        <nav className="hidden md:flex gap-6 items-center">
          {routes.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? 'text-[#f49521] font-semibold'
                  : 'text-white hover:text-[#f49521] transition'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logo */}
        <Link to="/" className="md:mx-8">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-[90px]"
            style={{ animation: 'badgeBounce 2s ease-in-out' }}
          />
        </Link>

        {/* Cart + Auth Controls */}
        <div className="flex items-center gap-4 md:gap-5">
          {/* Cart Icon */}
          <button
            className="relative cursor-pointer z-20"
            onClick={handleProtectedClick}
          >
            <IoCartOutline
              size={28}
              className="text-orange-500"
              style={{ animation: 'cartWiggle 2s ease-in-out infinite' }}
            />
            {user && totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white font-semibold px-1.5 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2 md:gap-3 text-white">
              <img
                src={user.image || '/images/default.png'}
                alt="User"
                className="w-9 h-9 rounded-full object-cover border"
              />
              <div className="text-sm hidden lg:block">
                Hello, <span className="font-semibold">{user.name}</span>
              </div>
              <button onClick={handleLogout}>
                <IoIosLogOut
                  size={26}
                  className="cursor-pointer text-red-500 hover:text-red-600"
                />
              </button>
            </div>
          ) : (
            <Link to="/signup">
              <button className="bg-white px-4 py-1.5 rounded hover:bg-[#f49521] hover:text-white text-black font-medium border border-white transition">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
