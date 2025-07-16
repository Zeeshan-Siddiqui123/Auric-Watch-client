import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../../API';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPass = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 px-4 text-white animate-slide-down">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700"
            >
                <h2 className="text-3xl font-bold text-center mb-6">Reset Password</h2>
                <div className='flex flex-col gap-4'>
                    <input
                        type="email"
                        placeholder="Email"
                        className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="OTP"
                        className="px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <span
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>


                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md cursor-pointer transition"
                    >
                        Reset Password
                    </button>

                </div>
            </form>
        </div>
    );
};

export default ResetPass;
