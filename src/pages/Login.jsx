import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, UserIcon } from '@heroicons/react/outline';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Login = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/admin');
    }

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        navigate('/admin');
      } else {
        setError('Login successful, but no token received.');
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials or try again later.');
      }
      console.error('Login error:', err.response || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary/95 to-secondary flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute right-1/3 bottom-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Login Container */}
      <div 
        className={`max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl transform transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-serif text-white mb-2">Welcome Back</h2>
          <p className="text-primary/80">Sign in to access your dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-primary/60" />
              </div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 placeholder-white/60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-primary/60" />
              </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 placeholder-white/60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/10 text-primary focus:ring-primary transition-colors duration-300"
              />
              <label className="ml-2 block text-sm text-white/80">Remember me</label>
            </div>
            <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors duration-300">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-white/60">
          Don't have an account?{' '}
          <button className="text-primary hover:text-primary/80 transition-colors duration-300">
            Contact administrator
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login; 