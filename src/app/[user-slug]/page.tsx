'use client';

import UserProfileSidebar from '@/containers/UserProfileSidebar';
import { UserProjectsList } from '@/containers/UserProjectsList';
import { useCollapseSidebar } from '@/contexts/CollapseSidebar.context';

export default function UserProfile() {
  const { collapseClick } = useCollapseSidebar();

  return (
    <div className="flex flex-1 min-h-screen transition-all">
      <div className="flex-1 w-full relative">
        <div
          className={`relative my-0 mx-auto xl:max-w-[1440px] 2xl:max-w-[1600px] lg:flex lg:flex-row lg:flex-nowrap transition-all ${
            collapseClick ? 'lg:pl-64 xl:pl-72' : 'lg:pl-16 xl:pl-24'
          }`}
        >
          <UserProfileSidebar />
          <UserProjectsList />
        </div>
      </div>
    </div>
  );
}
