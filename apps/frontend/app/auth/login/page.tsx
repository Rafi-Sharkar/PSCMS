'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { loginUser } from '@/lib/api';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// Form validation schema
const loginSchema = z.object({
  phone: z.string().length(11, 'phone number must be 11 digit'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface JwtPayload {
  id: string;
  name: string;
  phone: string;
  role: string;
  exp: number;
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<JwtPayload | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await loginUser(data);

      console.log("JWT token: ", result.access_token)
      // Save JWT in cookies
      Cookies.set("token", result.access_token, { expires: 3 });

      // Decode JWT into JSON
      const decoded: JwtPayload = jwtDecode(result.access_token);
      setUserData(decoded);
      setError("");
      window.location.reload()
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };


  return (
    <div className="flex h-[89.3vh] items-center justify-center ">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/auth/register"
              className="font-medium text-green-600 hover:text-green-500"
            >
              create a new account
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm flex flex-col gap-3">
            <div>
              <label htmlFor="phone" className="sr-only">
                Email address
              </label>
              <input
                {...register('phone')}
                id="phone"
                name="phone"
                type="phone"
                autoComplete="phone"
                className="relative block w-full rounded-t-md border-0 px-3 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                placeholder="phone number"
                disabled={isLoading}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="relative block w-full rounded-b-md border-0 px-3 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                placeholder="Password"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative flex w-full justify-center rounded-md px-3 py-3 text-sm font-semibold text-white ${
                isLoading
                  ? 'bg-gray-400'
                  : 'bg-green-600 hover:bg-green-500 focus-visible:outline-offset-2 focus-visible:outline-green-600'
              }`}
            >
              {isLoading ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
