'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from '@/hooks/useAuth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/lib/graphql/login.graphql';
import { Eye, EyeOff } from 'lucide-react';

const loginUserSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email format',
    })
    .toLowerCase(),
  password: z.string().nonempty({
    message: 'Password is required',
  }),
});

type LoginUserData = z.infer<typeof loginUserSchema>;

export default function LogInPage() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    setError,
    register,
  } = useForm<LoginUserData>({
    resolver: zodResolver(loginUserSchema),
  });

  const [loginUser] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: {
          signIn: { access_token },
        },
      }
    ) {
      login({ accessToken: access_token });
    },
    onError({ graphQLErrors, networkError, clientErrors }) {
      console.log(graphQLErrors);
      if (networkError || clientErrors.length) {
        setFetchError('Internal server error, please try again later.');
        return;
      }

      if (graphQLErrors[0].extensions.code === 'INTERNAL_SERVER_ERROR')
        setError('email', {
          type: 'user-not-found',
          message: graphQLErrors[0].message,
        });
      if (graphQLErrors[0].extensions.code === 'BAD_REQUEST')
        setError('password', {
          type: 'user/password-invalid',
          message: graphQLErrors[0].message,
        });
    },
  });

  const handleGoogleRedirect = () => {
    setLoading(true);
    window.location.assign(
      process.env.NEXT_PUBLIC_BACKEND_GOOGLE_LOGIN as string
    );
  };

  const handleLoginUser: SubmitHandler<LoginUserData> = async ({
    email,
    password,
  }) => {
    setFetchError('');
    await loginUser({ variables: { input: { email, password } } });
  };

  return (
    <div className="lg:my-10 lg:px-6">
      <div className="grid lg:bg-white max-w-7xl m-auto gap-y-12 rounded-3xl p-4 lg:min-h-[760px] lg:px-24 lg:py-32">
        <div className="lg:flex justify-between items-center gap-x-28">
          <div className="lg:w-1/2">
            <div className="text-center lg:text-start">
              <h1 className="text-2xl lg:text-4xl font-semibold">
                Welcome back 👋
              </h1>
              <p className="text-sm lg:text-base">Please enter your details</p>
            </div>
            {fetchError ? (
              <p className="text-xs pl-1 pt-1 text-red-600">
                Internal server error, please try again later.
              </p>
            ) : null}
            <div className="my-4 lg:my-8">
              <form onSubmit={handleSubmit(handleLoginUser)}>
                <div className="flex flex-col gap-y-4">
                  <div>
                    <Input
                      id="emailAddress"
                      type="email"
                      label="Email address"
                      placeholder="name@email.com"
                      hasError={!!errors.email}
                      {...register('email')}
                    />
                    <p className="text-xs pl-1 pt-1 text-red-600">
                      {errors.email?.message}
                    </p>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      placeholder="* * * *"
                      hasError={!!errors.password}
                      {...register('password')}
                    />
                    {useMemo(
                      () => (
                        <button
                          type="button"
                          className="absolute right-0 top-4 p-2"
                          onClick={() =>
                            setShowPassword((prevState) => !prevState)
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={22} />
                          ) : (
                            <Eye size={22} />
                          )}
                        </button>
                      ),
                      [showPassword]
                    )}
                    <p className="text-xs pl-1 pt-1 text-red-600">
                      {errors.password?.message}
                    </p>
                  </div>
                  <Button variant="black" isLoading={isSubmitting}>
                    Log in
                  </Button>
                </div>
              </form>

              <div className="flex flex-col gap-y-4 my-4">
                <p className="text-[#9ba2b0] text-xs m-auto">OR</p>
                <Button
                  variant={'gray'}
                  className="gap-x-2"
                  onClick={handleGoogleRedirect}
                  isLoading={isLoading}
                >
                  <FcGoogle size={24} /> Continue with Google
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/assets/Contra-Logo.b97834a1.png"
              alt="login logo"
              width={410}
              height={376}
              priority
              quality={100}
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL={
                '/assets/Contra-Logo.b97834a1.png?auto=format,compress&q=1&blur=500&w=2'
              }
            />
          </div>
        </div>
        <div className="grid gap-y-2">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link href="/auth/sign-up">
              <Button variant="outline" size="sm">
                New to Spectrum? Sign up
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link href="/auth/forgot-password" className="hover:underline">
              <p className="text-zinc-500 text-sm">Forgot password?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
