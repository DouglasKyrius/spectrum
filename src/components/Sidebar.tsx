'use client';

import {
  MousePointerClick,
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

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface SidebarItemNameProps extends React.HTMLAttributes<HTMLSpanElement> {
  isCollapse: boolean;
}

export const Sidebar: React.FC<SidebarProps> = () => {
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
        <div className="flex gap-x-1 items-center">
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

      <SidebarItem>
        <span>
          <MousePointerClick size={20} />
        </span>
        <SidebarItemName isCollapse={collapseClickOrHover}>
          Explore
        </SidebarItemName>
      </SidebarItem>
      <SidebarItem>
        <span>
          <MessageCircle size={20} />
        </span>
        <SidebarItemName isCollapse={collapseClickOrHover}>
          Messages
        </SidebarItemName>
      </SidebarItem>
      <SidebarItem>
        <span>
          <Heart size={20} />
        </span>
        <SidebarItemName isCollapse={collapseClickOrHover}>
          Saved
        </SidebarItemName>
      </SidebarItem>
      <hr className="my-3 border-[#2c323e]" />
      <SidebarItem>
        <span>
          <Wallet size={20} />
        </span>
        <SidebarItemName isCollapse={collapseClickOrHover}>
          Wallet
        </SidebarItemName>
      </SidebarItem>
      <SidebarItem>
        <span>
          <Briefcase size={20} />
        </span>
        <SidebarItemName isCollapse={collapseClickOrHover}>
          Opportunities
        </SidebarItemName>
      </SidebarItem>
      <hr className="my-3 border-[#2c323e]" />
      <SidebarItem>
        <span>
          <Settings size={20} />
        </span>
        <SidebarItemName isCollapse={collapseClickOrHover}>
          Settings
        </SidebarItemName>
      </SidebarItem>
    </>
  );

  return (
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
  );
};

const SidebarItem: React.FC<SidebarProps> = ({ children }) => (
  <div className="relative flex gap-x-4 cursor-pointer select-none items-center rounded-lg px-2.5 py-2.5 text-sm text-white outline-none transition-colors hover:bg-gray-700 hover:text-accent">
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
        `transition-all duration-500 ${
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
