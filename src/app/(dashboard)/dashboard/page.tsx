'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { withAuthGuard } from '@/lib/auth-guard';
import { assessmentDB, assetDB, projectDB } from '@/lib/db-client';
import { KpiCards } from '@/components/features/dashboard/KpiCards';
import { ComplianceOverview } from '@/components/features/dashboard/ComplianceOverview';
import { CSFRadarChart } from '@/components/features/dashboard/CSFRadarChart';
import { TopGapsList } from '@/components/features/dashboard/TopGapsList';
import { RecentActivity } from '@/components/features/dashboard/RecentActivity';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { buildGaps } from '@/lib/utils/calculateGap';
import { useProjectStore } from '@/store/useProjectStore';

function DashboardPage() {
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const setActiveProject = useProjectStore((s) => s.setActiveProject);
  const projects = useMemo(() => projectDB.getAll(), []);

  const data = useMemo(() => {
    const assessments =
      activeProjectId === ''
        ? assessmentDB.getAll()
        : assessmentDB.getByProject(activeProjectId);
    const assets =
      activeProjectId === ''
        ? assetDB.getAll()
        : assetDB.getByProject(activeProjectId);
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
  }, [activeProjectId]);

  return (
    <div className="space-y-6 p-6" data-testid="dashboard-page">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Ringkasan postur keamanan siber Anda.
          </p>
        </div>
        <Select
          value={activeProjectId}
          onValueChange={(value) => setActiveProject(value ?? '')}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Semua Proyek" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Semua Proyek</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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