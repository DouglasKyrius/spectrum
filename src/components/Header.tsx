'use client';

import { FC } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { LifeBuoy, LogOut, Settings, User, Menu, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Dropdown } from './ui/dropdown-menu';
import { useCollapseSidebar } from '@/contexts/CollapseSidebar.context';

type URLTitles = {
  [key: string]: string;
};

const urlTitles: URLTitles = {
  '/settings': 'Settings',
  '/explore': 'Explore',
  '/wallet': 'Wallet',
};

const Header: FC = () => {
  const { collapseClick, onToggleCollapse } = useCollapseSidebar();
  const pathname = usePathname();

  return (
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

        <div className="lg:hidden flex items-center gap-x-2">
          <span>
            <Sparkles size={28} />
          </span>
          <span className="font-black text-xl">Spectrum</span>
        </div>

        <Dropdown.Menu modal={false}>
          <Dropdown.MenuTrigger asChild className="cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
          </Dropdown.MenuTrigger>
          <Dropdown.MenuContent className="w-72">
            <Dropdown.MenuLabel>My Account</Dropdown.MenuLabel>
            <Dropdown.MenuSeparator />
            <Dropdown.MenuGroup>
              <Dropdown.MenuItem>
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>DS</AvatarFallback>
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
            <Dropdown.MenuItem>
              <LogOut className="mr-2" size={18} />
              <span>Log out</span>
            </Dropdown.MenuItem>
          </Dropdown.MenuContent>
        </Dropdown.Menu>
      </nav>
    </div>
  );
};

export default Header;
