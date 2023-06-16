import { GuestGuard } from '@/guards/GuestGuard';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Spectrum - Authenticate',
  description: 'Authentication page',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestGuard>
      <main className="relative h-screen lg:bg-[#ddd8ff]">
        <header className="py-5 px-6 lg:px-8">
          <div className="flex">
            <Link href="/" className="flex items-center gap-x-2">
              <span>
                <Sparkles className="w-7 h-7 lg:w-8 lg:h-8" />
              </span>
              <span className="font-black text-xl lg:text-2xl">Spectrum</span>
            </Link>
          </div>
        </header>
        {children}
      </main>
    </GuestGuard>
  );
}
