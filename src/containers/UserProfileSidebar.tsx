'use client';

import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import useAuth from '@/hooks/useAuth';
import { displayNameFallback } from '@/utils/displayNameFallback';
import { Bio } from '@/components/EditProfile/Bio';
import { Name } from '@/components/EditProfile/Name';
// import { Skills } from '@/components/EditProfile/Skills';
import { Location } from '@/components/EditProfile/Location';
import { ExternalLinks } from '@/components/EditProfile/ExternalLinks';
import { OneLiner } from '@/components/EditProfile/OneLiner';

export default function UserProfileSidebar() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col flex-nowrap items-center relative py-14 px-8 w-full border bg-white/[0.4] lg:min-w-[416px] lg:max-w-lg xl:rounded-3xl">
      <div className="flex flex-col flex-nowrap items-center w-full max-w-sm gap-y-1.5 lg:sticky lg:top-36">
        {/* <div className="max-w-[144px] lg:max-w-[208px]"> */}
        {/* <Image
          src="https://drive.google.com/file/d/1cviuxuh1TMfeqcEx9XgsAci--Q76PUfl/view?usp=sharing"
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
          <AvatarImage src={user?.picture || ''} />
          <AvatarFallback className="text-7xl">
            {displayNameFallback(user?.displayName || '')}
          </AvatarFallback>
        </Avatar>
        {/* </div> */}
        <div className="w-full">
          <div className="flex w-full my-2 justify-center items-center text-center">
            <Name />
          </div>
        </div>
        <div className="flex w-full my-2 justify-center items-center lg:hidden">
          <OneLiner />
        </div>

        {/* <Skills /> */}
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
                <Dialog.Title>Get In Touch</Dialog.Title>
                <Dialog.Description>
                  Messages are currently not available.
                </Dialog.Description>
              </Dialog.Header>

              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button variant="outline">Close</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Root>
        </div>
        <Bio />
        <Location />
        <ExternalLinks />
      </div>
    </div>
  );
}
