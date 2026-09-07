'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, RotateCcw } from 'lucide-react';
import { withAuthGuard } from '@/lib/auth-guard';
import { assessmentDB, assetDB, projectDB } from '@/lib/db-client';
import type { Asset, Assessment } from '@/lib/mock-data';
import { AssessmentTable } from '@/components/features/assessment/AssessmentTable';
import { AssessmentFilters } from '@/components/features/assessment/AssessmentFilters';
import { ExportMenu } from '@/components/features/assessment/ExportMenu';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProjectStore } from '@/store/useProjectStore';

function AssessmentsPage() {
  const [reloadKey, setReloadKey] = useState(0);
  const [functionFilter, setFunctionFilter] = useState('');
  const [assetFilter, setAssetFilter] = useState('');
  const activeProjectId = useProjectStore((s) => s.activeProjectId);
  const setActiveProject = useProjectStore((s) => s.setActiveProject);
  const projects = useMemo(() => projectDB.getAll(), []);

  const assessments: Assessment[] = useMemo(
    () =>
      activeProjectId === ''
        ? assessmentDB.getAll()
        : assessmentDB.getByProject(activeProjectId),
    [reloadKey, activeProjectId]
  );
  const assets: Asset[] = useMemo(() => assetDB.getAll(), [reloadKey]);

  const filteredAssessments = useMemo(() => {
    return assessments.filter(
      (assessment) =>
        (functionFilter === '' || assessment.functionKey === functionFilter) &&
        (assetFilter === '' || assessment.assetId === assetFilter)
    );
  }, [assessments, functionFilter, assetFilter]);

  const reload = () => setReloadKey((key) => key + 1);

  const handleDelete = (id: string) => {
    const target = assessments.find((a) => a.id === id);
    if (
      window.confirm(
        `Hapus assessment "${target?.subCategory ?? id}" untuk ${target?.assetName ?? 'aset ini'}?`
      )
    ) {
      assessmentDB.delete(id);
      reload();
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset semua data assessment ke kondisi awal?')) {
      assessmentDB.reset();
      reload();
    }
  };

  const handleClearFilters = () => {
    setFunctionFilter('');
    setAssetFilter('');
  };

  return (
    <div className="space-y-6 p-6" data-testid="assessments-page">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Daftar Penilaian
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola hasil penilaian kepatuhan NIST CSF v2.0 untuk setiap aset.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ExportMenu assessments={filteredAssessments} assets={assets} />
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw />
            Reset Data
          </Button>
          <Link
            href="/assessments/new"
            className={buttonVariants({ size: 'default' })}
          >
            <Plus />
            Buat Penilaian
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
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
        <AssessmentFilters
        functionFilter={functionFilter}
        assetFilter={assetFilter}
        onFunctionChange={setFunctionFilter}
        onAssetChange={setAssetFilter}
        onClear={handleClearFilters}
        assets={assets}
        resultCount={filteredAssessments.length}
      />
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <AssessmentTable
            assessments={filteredAssessments}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuthGuard(AssessmentsPage);
