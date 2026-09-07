'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'cn';
import { useSidebarStore } from '@/store/useSidebarStore';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
  className?: string;
  onClick?: () => void;
}

export function SidebarItem({
  href,
  icon,
  label,
  exact = false,
  className,
  onClick,
}: SidebarItemProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebarStore();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
        isActive
          ? 'bg-primary/10 text-primary hover:bg-primary/20'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        isCollapsed && 'justify-center px-2',
        className
      )}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!isCollapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}