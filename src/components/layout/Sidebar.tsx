'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  ShieldCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { cn } from 'cn';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useAuth } from '@/hooks/useAuth';
import { SidebarItem } from './SidebarItem';
import { CSF_CATEGORIES } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const NIST_FUNCTIONS = Object.entries(CSF_CATEGORIES).map(([key, value]) => ({
  key,
  label: value.label,
  icon: value.icon,
  href: '/assessments',
}));

const mainItems = [
  {
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: 'Dashboard',
  },
  {
    href: '/assets',
    icon: <Package className="h-5 w-5" />,
    label: 'Aset',
  },
  {
    href: '/assessments',
    icon: <ClipboardList className="h-5 w-5" />,
    label: 'Penilaian',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, toggle } = useSidebarStore();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center justify-between border-b px-3">
        <Link
          href="/dashboard"
          className={cn(
            'flex items-center gap-2 font-bold transition-all',
            isCollapsed && 'justify-center'
          )}
        >
          <ShieldCheck className="h-6 w-6 text-primary" />
          {!isCollapsed && <span className="text-lg">CSF Compass</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggle}
          aria-label={isCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <div className="space-y-0.5">
          {mainItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              exact={item.href === '/dashboard'}
            />
          ))}
        </div>

        <div className="my-4 border-t" />

        <div className="space-y-0.5">
          {!isCollapsed && (
            <p className="px-3 text-xs font-medium uppercase text-muted-foreground">
              Fungsi NIST CSF
            </p>
          )}
          {NIST_FUNCTIONS.map((fn) => (
            <TooltipProvider key={fn.key} delay={300}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <SidebarItem href={fn.href} icon={<span className="text-base">{fn.icon}</span>} label={fn.label} />
                  }
                />
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>{fn.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </nav>

      <div className="border-t p-3">
        <div
          className={cn(
            'flex items-center',
            isCollapsed ? 'justify-center' : 'gap-3'
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-sm font-semibold">A</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 truncate">
              <p className="text-sm font-medium">Admin</p>
              <p className="truncate text-xs text-muted-foreground">admin@nist.csf</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8 text-muted-foreground hover:text-destructive',
              isCollapsed && 'mt-1'
            )}
            onClick={handleLogout}
            aria-label="Keluar"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        className="fixed left-4 top-4 z-50 rounded-md bg-background p-2 shadow-md lg:hidden"
        onClick={() => setIsMobileMenuOpen((open) => !open)}
        aria-label="Buka menu"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          'hidden h-screen border-r bg-background lg:block',
          isCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex h-full flex-col">
          <SidebarContent />
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 transform bg-background transition-transform duration-300 ease-in-out lg:hidden',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}