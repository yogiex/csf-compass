'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { withAuthGuard } from '@/lib/auth-guard';
import { assessmentDB, assetDB } from '@/lib/db-client';
import { KpiCards } from '@/components/features/dashboard/KpiCards';
import { ComplianceOverview } from '@/components/features/dashboard/ComplianceOverview';
import { CSFRadarChart } from '@/components/features/dashboard/CSFRadarChart';
import { TopGapsList } from '@/components/features/dashboard/TopGapsList';
import { RecentActivity } from '@/components/features/dashboard/RecentActivity';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buildGaps } from '@/lib/utils/calculateGap';

function DashboardPage() {
  const data = useMemo(() => {
    const assessments = assessmentDB.getAll();
    const assets = assetDB.getAll();
    const gaps = buildGaps(assessments);
    const avgGap =
      gaps.length === 0
        ? 0
        : gaps.reduce((sum, g) => sum + g.gap, 0) / gaps.length;
    const criticalCount = gaps.filter((g) => g.gap > 70).length;
    return {
      assessments,
      assets,
      avgGap: Math.round(avgGap),
      criticalCount,
    };
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Ringkasan postur keamanan siber Anda.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/assessments/new"
            className={buttonVariants({ size: 'default' })}
          >
            Tambah Assessment Baru
          </Link>
          <Link
            href="/assets"
            className={buttonVariants({ variant: 'outline', size: 'default' })}
          >
            Lihat Semua Aset
          </Link>
        </div>
      </div>

      <KpiCards
        totalAssets={data.assets.length}
        totalAssessments={data.assessments.length}
        averageGap={data.avgGap}
        criticalCount={data.criticalCount}
      />

      <ComplianceOverview assessments={data.assessments} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Skor per Fungsi (Current vs Target)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CSFRadarChart assessments={data.assessments} />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Top Kesenjangan Terbesar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TopGapsList assessments={data.assessments} />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Aktivitas Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity assessments={data.assessments} />
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuthGuard(DashboardPage);