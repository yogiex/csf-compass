'use client';

import { Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { AssessmentForm } from '@/components/features/assessment/AssessmentForm';
import { withAuthGuard } from '@/lib/auth-guard';
import { assessmentDB, assetDB } from '@/lib/db-client';
import { CSF_CATEGORIES, type FunctionKey } from '@/lib/mock-data';

const isFunctionKey = (k: string): k is FunctionKey => k in CSF_CATEGORIES;

function AssessmentFormLoader() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const functionParam = searchParams.get('function');
  const subCategoryParam = searchParams.get('subCategory');

  const assessment = useMemo(
    () => (editId ? assessmentDB.getById(editId) : undefined),
    [editId]
  );

  const prefill = useMemo(() => {
    if (editId || !functionParam || !isFunctionKey(functionParam)) return undefined;
    const subs: readonly string[] = CSF_CATEGORIES[functionParam].subCategories;
    if (subCategoryParam && subs.includes(subCategoryParam)) {
      return { functionKey: functionParam, subCategory: subCategoryParam };
    }
    return { functionKey: functionParam };
  }, [editId, functionParam, subCategoryParam]);

  if (editId && !assessment) {
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground">Assessment tidak ditemukan.</p>
        <Link href="/assessments" className={buttonVariants({ variant: 'outline' })}>
          Kembali ke Daftar Penilaian
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link
        href="/assessments"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Kembali
      </Link>
      {assessment && <h1 className="text-2xl font-semibold">Edit Penilaian</h1>}
      <AssessmentForm
        isEdit={Boolean(editId)}
        initialData={
          assessment
            ? {
                projectId: assetDB.getById(assessment.assetId)?.projectId ?? '',
                assetId: assessment.assetId,
                functionKey: assessment.functionKey,
                subCategory: assessment.subCategory,
                currentScore: assessment.currentScore,
                targetScore: assessment.targetScore,
                id: assessment.id,
              }
            : prefill
        }
      />
    </div>
  );
}

function AssessmentPage() {
  return (
    <div className="container mx-auto max-w-4xl py-6">
      <Suspense fallback={<p className="text-muted-foreground">Memuat...</p>}>
        <AssessmentFormLoader />
      </Suspense>
    </div>
  );
}

export default withAuthGuard(AssessmentPage);
