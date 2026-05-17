import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../store/auth';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    // Mock login
    const user = { id: '1', name: 'Test User', email: data.email };
    const token = 'mock-token';
    login(user, token);
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-128px)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Login to your account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                  Remember me
                </label>
              </div>
            </div>
            <a href="#" className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-500">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900"
          >
            Login
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{' '}
            <Link to="/signup" className="font-medium text-purple-600 hover:underline dark:text-purple-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
