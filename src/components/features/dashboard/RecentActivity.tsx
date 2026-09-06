'use client';

import { CSF_CATEGORIES, Assessment } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils/formatDate';

interface RecentActivityProps {
  assessments: Assessment[];
  limit?: number;
}

export function RecentActivity({ assessments, limit = 5 }: RecentActivityProps) {
  const recent = [...assessments]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit);

  if (recent.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Belum ada aktivitas.
      </p>
    );
  }

  return (
    <ul className="divide-y">
      {recent.map((a) => {
        const functionLabel =
          CSF_CATEGORIES[a.functionKey]?.label ?? a.functionKey;
        return (
          <li key={a.id} className="flex items-center justify-between gap-2 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {a.subCategory} · {functionLabel}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {a.assetName}
              </p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">
              {formatDate(a.updatedAt)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}