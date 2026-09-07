'use client';

import { ChevronRight } from 'lucide-react';
import { cn } from 'cn';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import type { FunctionKey } from '@/lib/mock-data';
import type { ManualFunction } from '@/lib/nist-csf-data';

interface ManualFunctionNavProps {
  functions: ManualFunction[];
  activeId: FunctionKey;
  onSelect: (id: FunctionKey) => void;
}

export function ManualFunctionNav({
  functions,
  activeId,
  onSelect,
}: ManualFunctionNavProps) {
  return (
    <Card data-testid="manual-function-nav">
      <CardHeader>
        <CardTitle className="text-sm">Fungsi NIST CSF</CardTitle>
        <CardDescription className="text-xs">
          Klik untuk melihat detail
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <ScrollArea className="h-[400px]">
          <nav className="flex flex-col gap-1" aria-label="Fungsi NIST CSF">
            {functions.map((fn) => {
              const isActive = fn.id === activeId;
              return (
                <button
                  key={fn.id}
                  type="button"
                  onClick={() => onSelect(fn.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <span className="shrink-0" aria-hidden="true">
                    {fn.icon}
                  </span>
                  <span className="flex-1 truncate">{fn.name}</span>
                  <span className="text-xs opacity-70">
                    ({fn.subCategories.length})
                  </span>
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 shrink-0 transition-transform',
                      isActive && 'rotate-90',
                    )}
                  />
                </button>
              );
            })}
          </nav>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
