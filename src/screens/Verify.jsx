import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API } from '../../API';

const Verify = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/verify-otp`, { email, otp });
      setMessage(res.data.message);
      setError('');
      setTimeout(() => {
        setMessage('');
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error verifying OTP');
      setMessage('');
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError("Please enter your email to resend OTP.");
      return;
    }

    try {
      setResendLoading(true);
      const res = await axios.post(`${API}/resend-otp`, { email });
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 px-4 text-white animate-slide-down">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
        <h3 className="text-3xl font-bold text-center mb-5">Verify Your Email</h3>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400"
            required
          />

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Verify</button>
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-sm text-blue-400 underline"
            disabled={resendLoading}
          >
            {resendLoading ? 'Resending...' : 'Resend OTP'}
          </button>

          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Verify;
