'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/app/hooks/useAuth';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof schema>;

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login.mutateAsync(data);
      toast.success('Logged in successfully');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={login.isLoading}
          >
            {login.isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}