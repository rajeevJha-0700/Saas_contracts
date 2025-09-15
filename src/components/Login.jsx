import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../store/authSlice';
import Input from './Input.jsx';
import Button from './Button.jsx';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userLogin = async (data) => {
    setError('');
    setIsLoading(true);
    try {
      if (data.password === 'test123') {
        // dispatch(login({ username: data.username }));
        // localStorage.setItem('token', 'mock-jwt-token');
        navigate('/dashboard');
      } else {
        setError('Invalid password. Please use "test123".');
      }
    } catch (error) {
      setError('Error during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 animate-gradient p-4 sm:p-6 lg:p-8">
      <div className="relative max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        {/* Logo/App Name */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
            Saas Contracts
          </h1>
          <p className="mt-2 text-sm text-white/80">
            Streamline your contract management
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Welcome Back
          </h2>

          {error && (
            <div className="mb-6 flex items-center bg-red-500/20 text-red-200 p-3 rounded-lg text-sm">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(userLogin)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-white/90 mb-1"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register('username', {
                  required: 'Username is required',
                })}
                className={`bg-white/20 text-white placeholder-white/50 border border-white/30 rounded-md focus:ring-2 focus:ring-indigo-300 transition-all duration-300 ${
                  errors.username ? 'border-red-400 focus:ring-red-400' : ''
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-300">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/90 mb-1"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                })}
                className={`bg-white/20 text-white placeholder-white/50 border border-white/30 rounded-md focus:ring-2 focus:ring-indigo-300 transition-all duration-300 ${
                  errors.password ? 'border-red-400 focus:ring-red-400' : ''
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-300">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 transition-all duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : null}
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-white/80">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-indigo-200 hover:text-indigo-100 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;