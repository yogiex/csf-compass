'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Boxes, ClipboardList, Gauge, ShieldAlert } from 'lucide-react';

interface KpiCardsProps {
  totalAssets: number;
  totalAssessments: number;
  averageGap: number;
  criticalCount: number;
}

export function KpiCards({
  totalAssets,
  totalAssessments,
  averageGap,
  criticalCount,
}: KpiCardsProps) {
  const items = [
    {
      label: 'Total Aset',
      value: totalAssets,
      icon: Boxes,
    },
    {
      label: 'Total Assessment',
      value: totalAssessments,
      icon: ClipboardList,
    },
    {
      label: 'Rata-rata Gap',
      value: `${averageGap}%`,
      icon: Gauge,
    },
    {
      label: 'Risiko Kritis',
      value: criticalCount,
      icon: ShieldAlert,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.label}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}