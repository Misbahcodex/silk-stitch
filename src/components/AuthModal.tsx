'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Inria_Serif } from 'next/font/google';

const inriaSerif = Inria_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
});

type ModalType = 'login' | 'signup' | 'forgot';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: ModalType;
}

const AuthModal = ({ isOpen, onClose, initialType = 'login' }: AuthModalProps) => {
  const [modalType, setModalType] = useState<ModalType>(initialType);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (modalType === 'login') {
        await handleLogin();
      } else if (modalType === 'signup') {
        await handleSignup();
      } else if (modalType === 'forgot') {
        await handleForgotPassword();
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      setSuccessMessage('Login successful!');
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    }
  };

  const handleSignup = async () => {
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'Registration failed');
      return;
    }

    setSuccessMessage('Account created successfully! You can now login.');
    // Reset form and switch to login
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
    setTimeout(() => {
      setModalType('login');
    }, 2000);
  };

  const handleForgotPassword = async () => {
    // For now, just show a message. In a real app, you'd implement password reset
    setSuccessMessage('Password reset instructions have been sent to your email.');
    setTimeout(() => {
      setModalType('login');
    }, 3000);
  };

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error/Success Messages */}
      {error && (
        <div className="mx-5 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      {successMessage && (
        <div className="mx-5 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">{successMessage}</p>
        </div>
      )}
      <div className="px-5">
        <label className={`block text-sm font-medium text-[#6A2C70] mb-2 ${inriaSerif.className}`}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-[#C8A2C8] rounded-lg focus:outline-none focus:border-[#6A2C70] transition-colors text-black placeholder-gray-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="px-5">
        <label className={`block text-sm font-medium text-[#6A2C70] mb-2 ${inriaSerif.className}`}>
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-[#C8A2C8] rounded-lg focus:outline-none focus:border-[#6A2C70] transition-colors text-black placeholder-gray-500"
          placeholder="Enter your password"
          required
        />
      </div>
                                                       <div className="pr-20 pl-20">
           <button
             type="submit"
             disabled={isLoading}
             className={`w-full bg-[#6A2C70] hover:bg-[#8B5A8B] disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg ${inriaSerif.className}`}
           >
             {isLoading ? (
               <div className="flex items-center justify-center">
                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                 Logging in...
               </div>
             ) : (
               'Login'
             )}
           </button>
         </div>
      <div className="text-center space-y-2">
        <button
          type="button"
          onClick={() => setModalType('forgot')}
          className={`text-[#6A2C70] hover:text-[#8B5A8B] text-sm ${inriaSerif.className}`}
        >
          Forgot Password?
        </button>
        <div className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => setModalType('signup')}
            className={`text-[#6A2C70] hover:text-[#8B5A8B] font-medium ${inriaSerif.className}`}
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error/Success Messages */}
      {error && (
        <div className="mx-5 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      {successMessage && (
        <div className="mx-5 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">{successMessage}</p>
        </div>
      )}
      <div className="px-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium text-[#6A2C70] mb-2 ${inriaSerif.className}`}>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-[#C8A2C8] rounded-lg focus:outline-none focus:border-[#6A2C70] transition-colors text-black placeholder-gray-500"
              placeholder="First name"
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium text-[#6A2C70] mb-2 ${inriaSerif.className}`}>
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-[#C8A2C8] rounded-lg focus:outline-none focus:border-[#6A2C70] transition-colors text-black placeholder-gray-500"
              placeholder="Last name"
              required
            />
          </div>
        </div>
      </div>
      <div className="px-5">
        <label className={`block text-sm font-medium text-[#6A2C70] mb-2 ${inriaSerif.className}`}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-[#C8A2C8] rounded-lg focus:outline-none focus:border-[#6A2C70] transition-colors text-black placeholder-gray-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="px-5">
        <label className={`block text-sm font-medium text-[#6A2C70] mb-2 ${inriaSerif.className}`}>
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-[#C8A2C8] rounded-lg focus:outline-none focus:border-[#6A2C70] transition-colors text-black placeholder-gray-500"
          placeholder="Create a password"
          required
        />
      </div>
      <div className="px-5">
        <label className={`block text-sm font-medium text-[#6A2C70] mb-2 ${inriaSerif.className}`}>
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-[#C8A2C8] rounded-lg focus:outline-none focus:border-[#6A2C70] transition-colors text-black placeholder-gray-500"
          placeholder="Confirm your password"
          required
        />
      </div>
                                                       <div className="pr-20 pl-20">
           <button
             type="submit"
             disabled={isLoading}
             className={`w-full bg-[#6A2C70] hover:bg-[#8B5A8B] disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg ${inriaSerif.className}`}
           >
             {isLoading ? (
               <div className="flex items-center justify-center">
                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                 Creating account...
               </div>
             ) : (
               'Sign Up'
             )}
           </button>
         </div>
      <div className="text-center">
        <div className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setModalType('login')}
            className={`text-[#6A2C70] hover:text-[#8B5A8B] font-medium ${inriaSerif.className}`}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error/Success Messages */}
      {error && (
        <div className="mx-5 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      {successMessage && (
        <div className="mx-5 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">{successMessage}</p>
        </div>
      )}
      <div className="px-5">
        <label className={`block text-sm font-medium text-[#6A2C70] mb-2 ${inriaSerif.className}`}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-[#C8A2C8] rounded-lg focus:outline-none focus:border-[#6A2C70] transition-colors text-black placeholder-gray-500"
          placeholder="Enter your email"
          required
        />
      </div>
                                                       <div className="pr-20 pl-20">
           <button
             type="submit"
             className={`w-full bg-[#6A2C70] hover:bg-[#8B5A8B] text-white py-3 px-6 rounded-lg font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg ${inriaSerif.className}`}
           >
             Reset Password
           </button>
         </div>
      <div className="text-center">
        <button
          type="button"
          onClick={() => setModalType('login')}
          className={`text-[#6A2C70] hover:text-[#8B5A8B] text-sm ${inriaSerif.className}`}
        >
          Back to Login
        </button>
      </div>
    </form>
  );

  const getModalTitle = () => {
    switch (modalType) {
      case 'login':
        return 'Welcome Back';
      case 'signup':
        return 'Create Account';
      case 'forgot':
        return 'Reset Password';
      default:
        return 'Welcome';
    }
  };

  const renderForm = () => {
    switch (modalType) {
      case 'login':
        return renderLoginForm();
      case 'signup':
        return renderSignupForm();
      case 'forgot':
        return renderForgotPasswordForm();
      default:
        return renderLoginForm();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4">
        {/* Egg-shaped modal container */}
        <div className="relative bg-white rounded-full p-8 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-gray-400 hover:text-[#6A2C70] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal content */}
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-bold text-[#6A2C70] ${inriaSerif.className}`}>
              {getModalTitle()}
            </h2>
            <p className={`text-gray-600 mt-2 ${inriaSerif.className}`}>
              {modalType === 'login' && 'Sign in to your account'}
              {modalType === 'signup' && 'Join our community'}
              {modalType === 'forgot' && 'We\'ll send you a reset link'}
            </p>
          </div>

          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
