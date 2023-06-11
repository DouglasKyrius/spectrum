import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export default function SignUpPage() {
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
            <div className="my-4 lg:my-8">
              <div className="flex flex-col gap-y-4">
                <div className="flex gap-x-4">
                  <Input
                    id="firstName"
                    type="text"
                    label="First name"
                    placeholder="John"
                    className="flex-1"
                  />
                  <Input
                    id="lastName"
                    type="text"
                    label="Last name"
                    placeholder="John"
                    className="flex-1"
                  />
                </div>
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
                <Button variant="black">Sign up</Button>
              </div>
              <div className="flex flex-col gap-y-4 my-4">
                <p className="text-[#9ba2b0] text-xs m-auto">OR</p>
                <Button variant={'cancel'} className="gap-x-2">
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
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <p className="text-zinc-500 text-sm">Already have an account?</p>
          <Link href="/log-in">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
