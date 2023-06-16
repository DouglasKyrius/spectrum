'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';

export default function LogInPage() {
  const [isLoading, setLoading] = useState(false);

  const handleGoogleRedirect = () => {
    setLoading(true);
    window.location.assign(
      process.env.NEXT_PUBLIC_BACKEND_GOOGLE_LOGIN as string
    );
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
            <div className="my-4 lg:my-8">
              <div className="flex flex-col gap-y-4">
                <Input
                  id="emailAddress"
                  type="email"
                  label="Email address"
                  placeholder="name@email.com"
                />
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="* * * *"
                />
                <Button variant="black">Log in</Button>
              </div>

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
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <p className="text-zinc-500 text-sm">
            Don&apos;t have an account? Create a free account here
          </p>
          <Link href="/auth/sign-up">
            <Button variant="outline" size="sm">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
