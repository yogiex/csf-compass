'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { withAuthGuard } from '@/lib/auth-guard';
import { assessmentDB } from '@/lib/db-client';
import { AssessmentForm } from '@/components/features/assessment/AssessmentForm';

function AssessmentPage() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  const assessment = useMemo(
    () => (editId ? assessmentDB.getById(editId) : undefined),
    [editId]
  );

  if (editId && !assessment) {
    return (
      <div className="container mx-auto max-w-4xl py-6">
        <p className="text-muted-foreground">Assessment tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <AssessmentForm
        isEdit={Boolean(editId)}
        initialData={
          assessment
            ? {
                assetId: assessment.assetId,
                functionKey: assessment.functionKey,
                subCategory: assessment.subCategory,
                currentScore: assessment.currentScore,
                targetScore: assessment.targetScore,
                id: assessment.id,
              }
            : undefined
        }
      />
    </div>
  );
}

export default withAuthGuard(AssessmentPage);