import Header from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { CollapseSidebarProvider } from '@/contexts/CollapseSidebar.context';
import { AuthGuard } from '@/guards/AuthGuard';

export const metadata = {
  title: 'Spectrum - Discover creators',
  description: 'Generated by create next app',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthGuard>
        <CollapseSidebarProvider>
          <Header />
          <div className="flex">
            <Sidebar />
            {children}
          </div>
        </CollapseSidebarProvider>
      </AuthGuard>
    </>
  );
}
