'use client';

import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-purple-100 to-blue-100">
      <div className="flex bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl">
        {/* Left Illustration Section */}
        <div className="w-1/2 bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-10 flex flex-col items-center justify-center">
          <img
            src="illustration.png"
            alt="Illustration"
            className="w-64 mb-6 animate__animated animate__fadeIn animate__delay-1s"
          />
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400 animate__animated animate__fadeIn animate__delay-2s">
            HELLO
          </h1>
          <p className="text-lg font-semibold animate__animated animate__fadeIn animate__delay-3s">
            Welcome To our University
          </p>
        </div>

        {/* Right Auth Form */}
        <div className="w-1/2 p-10">
          <div className="flex flex-col justify-center h-full">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-200 rounded-full p-4">
                <User className="text-gray-500 w-6 h-6" />
              </div>
            </div>

            <form className="space-y-5">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Username"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-purple-500" />
                  Remember me
                </label>
                <a href="#" className="hover:underline">
                  Forgot Password
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full transition duration-300"
              >
                {isLogin ? 'LOGIN' : 'SIGN UP'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-700 mt-6">
              {isLogin ? "Don't have an account yet?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 font-semibold hover:underline"
              >
                {isLogin ? 'Create an account' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
