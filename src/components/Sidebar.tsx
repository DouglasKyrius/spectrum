'use client';

import {
  Compass,
  Wallet,
  Heart,
  MessageCircle,
  Briefcase,
  Settings,
  Sparkles,
  PanelLeftOpen,
  X,
} from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { useCollapseSidebar } from '@/contexts/CollapseSidebar.context';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { usePathname } from 'next/navigation';
import { bool } from 'sharp';
import useAuth from '@/hooks/useAuth';
import { displayNameFallback } from '@/utils/displayNameFallback';

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  disabled?: boolean;
}

interface SidebarItemNameProps extends React.HTMLAttributes<HTMLSpanElement> {
  isCollapse: boolean;
}

export const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const {
    collapseClickOrHover,
    collapseClick,
    onToggleCollapse,
    onCloseCollapse,
    onHoverEnter,
    onHoverLeave,
  } = useCollapseSidebar();

  const renderContent = (
    <>
      <div className="flex items-center justify-between text-white mb-7">
        <div className="flex gap-x-1 items-center select-none">
          <span className="p-1">
            <Sparkles size={32} />
          </span>
          <SidebarItemName
            isCollapse={collapseClickOrHover}
            className="font-black text-xl"
          >
            Spectrum
          </SidebarItemName>
        </div>

        <SidebarItemName
          isCollapse={collapseClickOrHover}
          onClick={onToggleCollapse}
          className="hidden xl:block"
        >
          <PanelLeftOpen
            size={20}
            className={`transition-all text-[#677084] hover:text-[#7a8397] cursor-pointer ${
              collapseClick ? '-rotate-180' : 'rotate-0'
            }`}
          />
        </SidebarItemName>

        <SidebarItemName
          isCollapse={collapseClickOrHover}
          onClick={onCloseCollapse}
          className="xl:hidden"
        >
          <X size={20} className="text-[#677084]" />
        </SidebarItemName>
      </div>

      <Link href={'/' + user?.username}>
        <SidebarItem
          className="gap-x-2.5"
          active={pathname === '/' + user?.username}
        >
          <Avatar className="w-8 h-8 -ml-1.5">
            <AvatarImage src={user?.picture || ''} />
            <AvatarFallback>
              {displayNameFallback(user?.displayName || '')}
            </AvatarFallback>
          </Avatar>
          <SidebarItemName
            isCollapse={collapseClickOrHover}
            className="font-semibold shrink-0"
          >
            <p>{user?.displayName}</p>
          </SidebarItemName>
        </SidebarItem>
      </Link>

      <hr className="my-3 border-[#2c323e]" />

      <Link href="/discover">
        <SidebarItem active={pathname === '/discover'}>
          <span>
            <Compass size={20} />
          </span>
          <SidebarItemName isCollapse={collapseClickOrHover}>
            Discover
          </SidebarItemName>
        </SidebarItem>
      </Link>
      <SidebarItem disabled active={pathname === '/messages'}>
        <span>
          <MessageCircle size={20} />
        </span>
        <SidebarItemName isCollapse={collapseClickOrHover}>
          Messages
        </SidebarItemName>
      </SidebarItem>
      <SidebarItem disabled active={pathname === '/saved'}>
        <span>
          <Heart size={20} />
        </span>
        <SidebarItemName isCollapse={collapseClickOrHover}>
          Saved
        </SidebarItemName>
      </SidebarItem>
      <hr className="my-3 border-[#2c323e]" />
      <SidebarItem disabled active={pathname === '/wallet'}>
        <span>
          <Wallet size={20} />
        </span>
        <SidebarItemName isCollapse={collapseClickOrHover}>
          Wallet
        </SidebarItemName>
      </SidebarItem>
      <SidebarItem disabled active={pathname === '/opportunities'}>
        <span>
          <Briefcase size={20} />
        </span>
        <SidebarItemName isCollapse={collapseClickOrHover}>
          Opportunities
        </SidebarItemName>
      </SidebarItem>
      <hr className="my-3 border-[#2c323e]" />
      <Link href="/settings">
        <SidebarItem active={pathname === '/settings'}>
          <span>
            <Settings size={20} />
          </span>
          <SidebarItemName isCollapse={collapseClickOrHover}>
            Settings
          </SidebarItemName>
        </SidebarItem>
      </Link>
    </>
  );

  return user ? (
    <>
      <div className="relative lg:hidden">
        <div
          className={`block fixed inset-0 z-[60] will-change-[width] transition-all duration-300 ${
            collapseClick ? 'right-0' : 'right-[1024px]'
          }`}
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
        >
          <nav
            className={`flex flex-col gap-y-1 h-screen relative bg-[#14171f] px-3 py-4 transition-all duration-300 ${
              collapseClick ? 'right-0' : 'right-[1024px]'
            }`}
          >
            {renderContent}
          </nav>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <div
          className={`will-change-[width] transition-all duration-300 ${
            collapseClick ? 'w-64' : 'w-16'
          }`}
        />
        <div
          className={`block inset-0 fixed ${
            collapseClickOrHover ? 'w-64' : 'w-16'
          }  z-[60] will-change-[width] transition-all duration-300`}
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
        >
          <nav className="flex flex-col flex-1 gap-y-1 h-screen relative bg-[#14171f] px-3 py-4">
            {renderContent}
          </nav>
        </div>
      </div>
    </>
  ) : null;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  active,
  disabled,
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'relative flex gap-x-4 cursor-pointer select-none items-center rounded-lg px-2.5 py-2.5 text-sm text-white outline-none transition-colors hover:bg-gray-700 hover:text-accent',
      active ? 'bg-gray-700' : '',
      disabled ? 'pointer-events-none opacity-50' : '',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const SidebarItemName: React.FC<SidebarItemNameProps> = ({
  children,
  className,
  isCollapse,
  ...props
}) => {
  return (
    <span
      className={cn(
        `shrink-0 transition-all duration-500 ${
          !isCollapse ? 'opacity-0' : 'opacity-100'
        }`,
        className
      )}
      {...props}
    >
      {isCollapse && children}
    </span>
  );
};
