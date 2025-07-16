import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../../API';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ResetPass = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp || !newPassword) {
      message.error("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(`${API}/reset-password`, {
        email,
        otp,
        newPassword,
      });

      message.success(res.data.message || "Password reset successful");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      message.error(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 bg-gray-900 border border-gray-600 rounded text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="OTP"
          className="w-full mb-4 px-4 py-2 bg-gray-900 border border-gray-600 rounded text-white"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-4 px-4 py-2 bg-gray-900 border border-gray-600 rounded text-white"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPass;
