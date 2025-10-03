import { Icons } from '@/components/icons';
import { MainNav } from '@/components/main-nav';
import { UserNav } from '@/components/user-nav';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Chatbot } from '@/components/chatbot';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2 font-headline text-lg font-semibold tracking-tighter text-primary">
               <Icons.logo className="h-8 w-8" />
               <span className="group-data-[collapsible=icon]:hidden">BrightSpace Ace</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
          <SidebarFooter>
            {/* Can add footer items here if needed */}
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="md:hidden"/>
            {/* Header content like breadcrumbs can go here */}
            <div className="ml-auto flex items-center gap-2">
              <UserNav />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            {children}
            <Chatbot />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
