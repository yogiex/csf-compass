'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { RotateCcw } from 'lucide-react';
import { withAuthGuard } from '@/lib/auth-guard';
import { assessmentDB } from '@/lib/db-client';
import { AssessmentTable } from '@/components/features/assessment/AssessmentTable';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

function AssessmentsPage() {
  const [reloadKey, setReloadKey] = useState(0);
  const assessments = useMemo(() => assessmentDB.getAll(), [reloadKey]);

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

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Penilaian Assessment
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola hasil penilaian kepatuhan NIST CSF v2.0 untuk setiap aset.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw />
            Reset Data
          </Button>
          <Link
            href="/assessments/new"
            className={buttonVariants({ size: 'default' })}
          >
            Tambah Assessment Baru
          </Link>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <AssessmentTable assessments={assessments} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuthGuard(AssessmentsPage);