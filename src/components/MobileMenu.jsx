import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoCartOutline } from 'react-icons/io5';
import { IoIosLogOut } from 'react-icons/io';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { UserContext } from '../screens/UserContext';
import { routes } from '../../Routes';
import { API } from '../../API';
import axios from 'axios';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const totalQuantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed:', err);
    }
    localStorage.removeItem('userId');
    setUser(null);
    closeMenu();
    navigate('/login');
  };

  const handleCart = () => {
    if (!user) {
      message.warning("Please login to view cart");
      navigate('/login');
    } else {
      navigate('/cart');
    }
    closeMenu();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white">
          <FaBars size={22} />
        </button>
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-xs bg-[#1f1f1f] z-50 transition-transform duration-300 ease-in-out transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } shadow-lg border-r border-gray-700`}
      >
        <div className="flex flex-col h-full">
          {/* Top */}
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-600">
            <img src="/images/logo.png" alt="Logo" className="w-[80px]" />
            <button onClick={closeMenu} className="text-white">
              <FaTimes size={20} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 px-5 py-6 space-y-4 overflow-y-auto">
            {routes.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block text-lg font-medium rounded-md px-3 py-2 ${
                    isActive
                      ? 'bg-[#f49521] text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } transition`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Cart and Auth (bottom section) */}
          <div className="border-t border-gray-700 px-5 py-4 flex justify-between items-center">
            {/* Cart */}
            <div className="relative cursor-pointer" onClick={handleCart}>
              <IoCartOutline size={28} className="text-orange-500" />
              {user && totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white font-semibold px-1.5 py-0.5 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </div>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2 text-white">
                <img
                  src={user.image || '/images/default.png'}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <span className="text-sm font-medium">{user.name}</span>
                <button onClick={handleLogout}>
                  <IoIosLogOut size={22} className="text-red-500" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate('/signup');
                  closeMenu();
                }}
                className="text-white bg-[#f49521] px-3 py-1.5 rounded font-medium"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}
    </>
  );
};

export default MobileMenu;
