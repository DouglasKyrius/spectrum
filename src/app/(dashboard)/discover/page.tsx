'use client';

import UserProfileSidebar from '@/containers/UserProfileSidebar';

export default function DiscoverPage() {
  return (
    <div className="flex flex-1 min-h-screen transition-all">
      <div className="flex-1 w-full relative">
        <div className="relative my-0 mx-auto xl:max-w-[1440px] lg:flex lg:flex-row lg:flex-nowrap transition-all xl:pl-8">
          <UserProfileSidebar />
        </div>
      </div>
    </div>
  );
}
