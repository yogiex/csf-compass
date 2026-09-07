'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  assessmentSchema,
  AssessmentFormData,
} from '@/lib/validations/assessment.schema';
import { CSF_CATEGORIES, FunctionKey } from '@/lib/mock-data';
import { assetDB, assessmentDB } from '@/lib/db-client';
import { calculateGap } from '@/lib/utils/calculateGap';
import { getSeverity, SEVERITY_LABEL } from '@/lib/utils/getSeverity';
import {
  getComplianceStatus,
  complianceStatusInfo,
} from '@/lib/utils/getComplianceStatus';
import { TierSelect } from '@/components/features/assessment/TierSelect';
import { ComplianceBadge } from '@/components/features/assessment/ComplianceBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from 'cn';

interface AssessmentFormProps {
  initialData?: Partial<AssessmentFormData> & { id?: string };
  isEdit?: boolean;
}

export function AssessmentForm({
  initialData,
  isEdit = false,
}: AssessmentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assets, setAssets] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    setAssets(assetDB.getAll());
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: initialData || {
      assetId: '',
      functionKey: '',
      subCategory: '',
      currentScore: 0,
      targetScore: 4,
    },
    mode: 'onChange',
  });

  const functionKey = watch('functionKey');
  const subCategory = watch('subCategory');
  const currentScore = watch('currentScore');
  const targetScore = watch('targetScore');

  const availableSubCategories = useMemo(() => {
    if (!functionKey) return [];
    return CSF_CATEGORIES[functionKey as keyof typeof CSF_CATEGORIES]?.subCategories || [];
  }, [functionKey]);

  useEffect(() => {
    if (!functionKey) {
      setValue('subCategory', '');
      return;
    }
    const subs =
      CSF_CATEGORIES[functionKey as keyof typeof CSF_CATEGORIES]?.subCategories || [];
    if (subs.length > 0 && !subs.includes(subCategory)) {
      setValue('subCategory', subs[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [functionKey]);

  const gap = calculateGap(currentScore ?? 0, targetScore ?? 0);
  const status = getComplianceStatus(gap);
  const statusInfo = complianceStatusInfo(status);
  const severity = getSeverity(gap);

  const onSubmit = async (data: AssessmentFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const asset = assets.find((a) => a.id === data.assetId);
      const payload = {
        ...data,
        assetName: asset?.name ?? '',
        functionKey: data.functionKey as FunctionKey,
      };
      if (isEdit && initialData?.id) {
        assessmentDB.update(initialData.id, payload);
      } else {
        assessmentDB.create(payload);
      }
      router.push('/assessments');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Penilaian' : 'Buat Penilaian Baru'}</CardTitle>
          <CardDescription>
            Isi skor saat ini dan target untuk setiap sub-kategori NIST CSF.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Aset */}
          <div className="space-y-2">
            <Label htmlFor="assetId">Aset / Sistem</Label>
            <Controller
              name="assetId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={isEdit}>
                  <SelectTrigger id="assetId" className={cn(errors.assetId && 'border-destructive')}>
                    <SelectValue placeholder="Pilih aset yang akan dinilai" />
                  </SelectTrigger>
                  <SelectContent>
                    {assets.map((asset) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name}
                      </SelectItem>
                    ))}
                    {assets.length === 0 && (
                      <SelectItem value="no-asset" disabled>
                        Belum ada aset. Buat aset terlebih dahulu.
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.assetId && (
              <p className="text-sm text-destructive">{errors.assetId.message}</p>
            )}
          </div>

          {/* Fungsi */}
          <div className="space-y-2">
            <Label htmlFor="functionKey">Fungsi NIST CSF</Label>
            <Controller
              name="functionKey"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="functionKey" className={cn(errors.functionKey && 'border-destructive')}>
                    <SelectValue placeholder="Pilih fungsi" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CSF_CATEGORIES).map(([key, cat]) => (
                      <SelectItem key={key} value={key}>
                        {cat.icon} {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.functionKey && (
              <p className="text-sm text-destructive">{errors.functionKey.message}</p>
            )}
          </div>

          {/* Sub-kategori */}
          <div className="space-y-2">
            <Label htmlFor="subCategory">Sub-Kategori</Label>
            <Controller
              name="subCategory"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={!functionKey}>
                  <SelectTrigger id="subCategory" className={cn(errors.subCategory && 'border-destructive')}>
                    <SelectValue placeholder={functionKey ? 'Pilih sub-kategori' : 'Pilih fungsi terlebih dahulu'} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubCategories.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.subCategory && (
              <p className="text-sm text-destructive">{errors.subCategory.message}</p>
            )}
          </div>

          {/* Tier Select Current & Target */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Controller
              name="currentScore"
              control={control}
              render={({ field }) => (
                <TierSelect
                  id="currentScore"
                  label="Skor Saat Ini (Current)"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="targetScore"
              control={control}
              render={({ field }) => (
                <TierSelect
                  id="targetScore"
                  label="Skor Target (Target)"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          {(errors.currentScore || errors.targetScore) && (
            <p className="text-sm text-destructive">
              {errors.currentScore?.message ?? errors.targetScore?.message}
            </p>
          )}

          {/* Preview Hasil */}
          <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
            <h4 className="text-sm font-medium">Hasil Analisis</h4>
            <div className="grid gap-3 sm:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Current</p>
                <p className="font-mono font-semibold">Tier {currentScore ?? 0}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Target</p>
                <p className="font-mono font-semibold">Tier {targetScore ?? 0}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Gap</p>
                <p className="font-mono font-semibold">
                  {gap}% <span className="text-xs font-normal text-muted-foreground">({SEVERITY_LABEL[severity]})</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <ComplianceBadge gap={gap} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{statusInfo.description}</p>
            {gap === 0 && (
              <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                Tidak ada kesenjangan — target tercapai.
              </div>
            )}
            {gap > 0 && gap <= 50 && (
              <div className="flex items-center gap-1.5 text-xs text-yellow-600 dark:text-yellow-400">
                <Info className="h-3 w-3" />
                Perlu peningkatan bertahap menuju target.
              </div>
            )}
            {gap > 50 && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
                <AlertCircle className="h-3 w-3" />
                Prioritas tinggi untuk perbaikan.
              </div>
            )}
          </div>

          {assets.length === 0 && (
            <Alert>
              <AlertDescription>
                Belum ada aset. Tambahkan aset terlebih dahulu sebelum membuat
                penilaian.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-end gap-3 border-t pt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Batal
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting || assets.length === 0}>
            {isSubmitting
              ? 'Menyimpan...'
              : isEdit
                ? 'Perbarui'
                : 'Simpan Penilaian'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}