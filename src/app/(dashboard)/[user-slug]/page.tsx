import UserProfileSidebar from '@/containers/UserProfileSidebar';
import { UserProjectsList } from '@/containers/UserProjectsList';

export default function UserPage() {
  return (
    <div className="flex flex-1 min-h-screen transition-all">
      <div className="flex-1 w-full relative">
        <div className="relative my-0 mx-auto xl:max-w-[1440px] lg:flex lg:flex-row lg:flex-nowrap transition-all xl:pl-8 xl:my-8">
          <UserProfileSidebar />
          <UserProjectsList />
        </div>
      </div>
    </div>
  );
}
