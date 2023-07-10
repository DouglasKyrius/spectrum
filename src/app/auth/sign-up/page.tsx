'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '@/lib/graphql/create-user.graphql';
import useAuth from '@/hooks/useAuth';

const createUserSchema = z.object({
  displayName: z
    .string()
    .nonempty({
      message: 'Your name is required',
    })
    .min(2, 'Name must be at least 2 characters long')
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
        .join(' ');
    }),
  email: z
    .string()
    .nonempty({
      message: 'Email is required',
    })
    .email({
      message: 'Invalid email format',
    })
    .toLowerCase(),
  password: z
    .string()
    .nonempty({
      message: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters long'),
});

type CreateUserData = z.infer<typeof createUserSchema>;

export default function SignUpPage() {
  const { login } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    setError,
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  });

  const [createUser] = useMutation(CREATE_USER, {
    update(
      _,
      {
        data: {
          signUp: { access_token: accessToken },
        },
      }
    ) {
      login({ accessToken });
    },
    onError({ graphQLErrors, networkError, clientErrors }) {
      if (networkError || clientErrors.length) {
        setFetchError('Internal server error, please try again later.');
        return;
      }

      if (graphQLErrors[0].extensions.code === 'BAD_REQUEST')
        setError('email', {
          type: 'user-already-registered',
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

  const handleCreateUser: SubmitHandler<CreateUserData> = async ({
    displayName,
    email,
    password,
  }) => {
    setFetchError('');
    await createUser({
      variables: { input: { displayName, email, password } },
    });
  };

  return (
    <div className="lg:my-8 lg:px-6">
      <div className="grid lg:bg-white max-w-7xl m-auto gap-y-12 rounded-3xl p-4 lg:min-h-[760px] lg:px-24 lg:py-24">
        <div className="lg:flex justify-between items-center gap-x-28">
          <div className="lg:w-1/2">
            <div className="text-center lg:text-start">
              <h1 className="text-2xl lg:text-4xl font-semibold">
                Create an account
              </h1>
              <p className="text-sm lg:text-base">Let&apos;s get started</p>
            </div>
            {fetchError ? (
              <p className="text-xs pl-1 pt-1 text-red-600">
                Internal server error, please try again later.
              </p>
            ) : null}
            <div className="my-4 lg:my-8">
              <form onSubmit={handleSubmit(handleCreateUser)}>
                <div className="flex flex-col gap-y-3">
                  <div>
                    <Input
                      id="displayName"
                      type="text"
                      label="Your name"
                      placeholder="John Doe"
                      hasError={!!errors.displayName}
                      {...register('displayName')}
                    />
                    <p className="text-xs pl-1 pt-1 text-red-600">
                      {errors.displayName?.message}
                    </p>
                  </div>
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
                      placeholder="* * * * * *"
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
                    Sign up
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
                  <FcGoogle size={24} /> Sign up with Google
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
              quality={100}
              priority
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL={
                '/assets/Contra-Logo.b97834a1.png?auto=format,compress&q=1&blur=500&w=2'
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <p className="text-zinc-500 text-sm">Already have an account?</p>
          <Link href="/auth/log-in">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
