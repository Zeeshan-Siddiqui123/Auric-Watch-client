import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../../API';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      message.warning("Please enter your email.");
      return;
    }

    try {
      const res = await axios.post(`${API}/forgot-password`, { email });
      message.success(res.data.message);
      setTimeout(() => navigate("/reset-password"), 2000);
      setSubmitted(true);
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 px-4 text-white animate-slide-down">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>

        {!submitted ? (
          <div className='flex flex-col gap-4'>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md cursor-pointer transition"
            >
              Send Reset Link
            </button>
          </div>
        ) : (
          <p className="text-green-400 text-center">If an account exists, a reset email has been sent.</p>
        )}
      </form>
    </div>
  );
};

export default ForgotPass;
