'use client';

import {
  Dribbble,
  Github,
  Linkedin,
  MapPin,
  Send,
  Twitter,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Badge } from '@/components/icons/Badge';
import { BadgeUnchecked } from '@/components/icons/BadgeUnchecked';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import useAuth from '@/hooks/useAuth';
import { displayNameFallback } from '@/utils/displayNameFallback';

export default function UserProfileSidebar() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col flex-nowrap items-center relative py-14 px-8 w-full border bg-white/[0.4] lg:min-w-[416px] lg:max-w-lg xl:rounded-3xl">
      <div className="flex flex-col flex-nowrap items-center w-full max-w-sm gap-y-1.5 lg:sticky lg:top-36">
        {/* <div className="max-w-[144px] lg:max-w-[208px]"> */}
        {/* <Image
            src={user?.picture || ''}
            className="rounded-full"
            quality={100}
            alt="Profile image for Douglas"
            width={208}
            height={208}
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={`${'https://avatars.githubusercontent.com/u/124599?v=4'}?auto=format,compress&q=1&blur=500&w=2`}
            priority
          /> */}
        <Avatar className="w-44 h-44 lg:w-52 lg:h-52">
          <AvatarImage src={''} />
          <AvatarFallback className="text-7xl">
            {displayNameFallback(user?.displayName || '')}
          </AvatarFallback>
        </Avatar>
        {/* </div> */}
        <div className="flex w-full my-2 justify-center items-center text-center">
          <h1 className="text-3xl font-bold sm:text-4xl bg-name-gradient bg-clip-text text-transparent">
            {user.displayName}
          </h1>
          <div className="mx-2">{true ? <Badge /> : <BadgeUnchecked />}</div>
        </div>
        <div className="flex w-full my-2 justify-center items-center text-center lg:hidden">
          <p className="text-xl">Software Developer</p>
        </div>
        <div className="flex w-full my-2 justify-center items-center text-center">
          <div className="inline-flex flex-wrap justify-center gap-y-2">
            {['Next.js', 'Nest.js', 'GraphQL'].map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center h-8 w-auto whitespace-nowrap mx-1.5 py-2.5 px-3 bg-white rounded-2xl border lg:h-10 lg:rounded-3xl shadow-xl shadow-cyan-100/30"
              >
                <span className="flex flex-grow text-xs font-sans lg:text-sm">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid w-full my-2">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="black" className="gap-x-3">
                <Send />
                Get In Touch
              </Button>
            </Dialog.Trigger>
            <Dialog.Content className="sm:max-w-[425px]">
              <Dialog.Header>
                <Dialog.Title>Edit profile</Dialog.Title>
                <Dialog.Description>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </Dialog.Description>
              </Dialog.Header>

              <Dialog.Footer>
                <Button type="submit">Save changes</Button>
                <Dialog.Close asChild>
                  <Button variant="gray">Cancel</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </div>
        <div className="flex w-full my-2 justify-center items-center text-center">
          <p className="text-sm">My bio</p>
        </div>
        <div className="flex w-full my-2 justify-center items-center text-center">
          <div className="inline-flex justify-center items-center gap-x-2">
            <MapPin size={18} />
            <p className="text-sm">Brazil</p>
          </div>
        </div>
        <div className="flex w-full my-2 justify-center items-center text-center">
          <div className="flex gap-x-4">
            <Github size={22} />
            <Linkedin size={22} />
            <Dribbble size={22} />
            <Twitter size={22} />
          </div>
        </div>
      </div>
    </div>
  );
}
