'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
// assets
// containers
import UserProfileSidebar from '@/containers/UserProfileSidebar';
import Header from '@/components/Header';
import { AnimatedLetters } from '@/components/AnimatedLetters';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { GuestGuard } from '@/guards/GuestGuard';

const title = ['Build', 'Your', 'Portfolio', 'Easily'];

export default function Home() {
  return (
    <GuestGuard>
      <main className="bg-purple-gradient min-h-screen">
        <Header />
        <div className="xl:max-w-[1440px] md:pl-8 md:pt-8 m-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-8 md:p-0">
            <h1 className="!z-10 font-extrabold lg:text-[5rem] md:text-[3.5rem] text-[2.5rem] tracking-normal lg:leading-[100px] sm:leading-[80px] vvs:leading-[60px] leading-[40px]">
              <AnimatedLetters letters={title} />
            </h1>

            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="max-w-xl pt-4 md:p-0">
                <p className="text-black/80 2xl:text-[1.5rem] xl:text-[1.3rem] text-base xl:leading-8 2xl:leading-9 lg:leading-6 leading-5 mb-6 md:mb-0">
                  Complete to apply to job opportunities and be featured on{' '}
                  <Link
                    href="/discover"
                    className="font-semibold name-gradient bg-clip-text text-transparent"
                  >
                    Discover
                  </Link>{' '}
                  to get amazing jobs.
                </p>
              </div>

              <div className="mt-8">
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 75,
                  }}
                >
                  <Link href="/auth/sign-up">
                    <Button variant={'black'}>Get started</Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden md:block w-1/2"
          >
            <Image
              src="/assets/phone_14_01-ai2.webp"
              alt="Profile image for Douglas"
              width={1000}
              height={1000}
              priority
            />
          </motion.div>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:hidden"
          >
            <Image
              src="/assets/phone_14_01-ai3.webp"
              className="mb-10"
              alt="Profile image for Douglas"
              width={260}
              height={1000}
              priority
            />
          </motion.div>
        </div>
      </main>
    </GuestGuard>
  );
}
