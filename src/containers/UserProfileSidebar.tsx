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

export default function UserProfileSidebar() {
  return (
    <div className="flex flex-col flex-nowrap items-center relative py-14 px-8 w-full border bg-white/[0.4] lg:min-w-[416px] lg:max-w-lg xl:my-8 xl:rounded-3xl">
      <div className="flex flex-col flex-nowrap items-center w-full max-w-sm gap-y-1.5 lg:sticky lg:top-36">
        <div className="max-w-[144px] lg:max-w-[208px]">
          <Image
            src="https://avatars.githubusercontent.com/u/124599?v=4"
            className="rounded-full"
            quality={100}
            alt="Profile image for Douglas"
            width={208}
            height={208}
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL={`${'https://avatars.githubusercontent.com/u/124599?v=4'}?auto=format,compress&q=1&blur=500&w=2`}
            priority
          />
        </div>
        <div className="flex w-full my-2 justify-center items-center text-center">
          <h1 className="text-3xl font-bold sm:text-4xl bg-name-gradient bg-clip-text text-transparent">
            Douglas Santos
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
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    Name
                  </label>
                  <input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="username" className="text-right">
                    Username
                  </label>
                  <input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <Dialog.Footer>
                <Button type="submit">Save changes</Button>
                <Dialog.Close asChild>
                  <Button variant="cancel">Cancel</Button>
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
