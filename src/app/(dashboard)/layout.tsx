'use client';

import { Sidebar } from '@/components/layout/Sidebar';
import { withAuthGuard } from '@/lib/auth-guard';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-muted/10">
        <div className="mx-auto p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}

export default withAuthGuard(DashboardLayout);