'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LifeBuoy, LogOut, Settings, Menu, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Dropdown } from './ui/dropdown-menu';
import { Button } from './ui/Button';
import { useCollapseSidebar } from '@/contexts/CollapseSidebar.context';
import useAuth from '@/hooks/useAuth';
import { displayNameFallback } from '@/utils/displayNameFallback';
import { Dialog } from './ui/Dialog';

type URLTitles = {
  [key: string]: string;
};

const urlTitles: URLTitles = {
  '/settings': 'Settings',
  '/explore': 'Explore',
  '/wallet': 'Wallet',
};

const Header: FC = () => {
  const [logoutModal, setLogoutModal] = useState(false);
  const { user, logout } = useAuth();
  const { collapseClick, onToggleCollapse } = useCollapseSidebar();
  const pathname = usePathname();

  if (user)
    return (
      <>
        <div className="shadow-2xl shadow-cyan-100/20 w-full fixed z-50 bg-white/[0.8] border-b backdrop-blur-md">
          <nav className="flex justify-between items-center py-4 px-8 mx-auto lg:py-5">
            <div className="hidden lg:flex">
              <div
                className={`will-change-[width] transition-all duration-300 ${
                  collapseClick ? 'w-64' : 'w-16'
                }`}
              />
              <div>
                <h1 className="text-2xl font-medium">{urlTitles[pathname]}</h1>
              </div>
            </div>

            <div className="lg:hidden" onClick={onToggleCollapse}>
              <Menu />
            </div>

            <Dropdown.Menu modal={false}>
              <Dropdown.MenuTrigger asChild className="cursor-pointer">
                <Avatar>
                  <AvatarImage src={user.picture} />
                  <AvatarFallback>
                    {displayNameFallback(user.displayName)}
                  </AvatarFallback>
                </Avatar>
              </Dropdown.MenuTrigger>
              <Dropdown.MenuContent className="w-72">
                <Dropdown.MenuLabel>My Account</Dropdown.MenuLabel>
                <Dropdown.MenuSeparator />
                <Dropdown.MenuGroup>
                  <Dropdown.MenuItem>
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src={user.picture} />
                      <AvatarFallback>
                        {displayNameFallback(user.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <span>Profile</span>
                  </Dropdown.MenuItem>
                  <Dropdown.MenuItem>
                    <Settings className="mr-2" size={18} />
                    <span>Settings</span>
                  </Dropdown.MenuItem>
                </Dropdown.MenuGroup>
                <Dropdown.MenuSeparator />
                <Dropdown.MenuItem>
                  <LifeBuoy className="mr-2" size={18} />
                  <span>Support</span>
                </Dropdown.MenuItem>
                <Dropdown.MenuSeparator />
                <Dropdown.MenuItem onClick={() => setLogoutModal(true)}>
                  <LogOut className="mr-2" size={18} />
                  <span>Log out</span>
                </Dropdown.MenuItem>
              </Dropdown.MenuContent>
            </Dropdown.Menu>
          </nav>
        </div>
        <Dialog.Root open={logoutModal} onOpenChange={setLogoutModal}>
          <Dialog.Content className="sm:max-w-[425px]">
            <Dialog.Header>
              <Dialog.Title>Are you sure you want to log out?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Footer>
              <Button variant={'black'} onClick={logout}>
                Log out
              </Button>
              <Dialog.Close asChild>
                <Button variant={'outline'}>Cancel</Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </>
    );

  return (
    <div className="shadow-2xl shadow-cyan-100/20 w-full fixed z-50 bg-white/[0.8] border-b backdrop-blur-md">
      <nav className="flex justify-between items-center py-4 px-8 mx-auto lg:py-5">
        <Link href="/" className="flex items-center gap-x-2">
          <span>
            <Sparkles className="w-7 h-7 lg:w-8 lg:h-8" />
          </span>
          <span className="hidden lg:block font-black text-2xl">Spectrum</span>
        </Link>
        <div className="flex items-center gap-x-4">
          <Link href="/auth/log-in">
            <Button variant={'outline'} size={'sm'}>
              Log in
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button variant={'black'} size={'sm'}>
              Sign up
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
