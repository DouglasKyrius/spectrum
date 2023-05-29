'use client';

import { FC } from 'react';
import { LifeBuoy, LogOut, Settings, User, Menu, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Dropdown } from './ui/dropdown-menu';
import { useCollapseSidebar } from '@/contexts/CollapseSidebar.context';

const Header: FC = () => {
  const { onToggleCollapse } = useCollapseSidebar();

  return (
    <div className="shadow-2xl shadow-cyan-100/20 w-full fixed z-50 bg-white/[0.8] border-b backdrop-blur-md">
      <nav className="flex justify-between lg:justify-end items-center py-4 px-8 mx-auto lg:py-5">
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
                <User className="mr-2" size={18} />
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
