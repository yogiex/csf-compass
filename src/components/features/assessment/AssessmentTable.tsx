'use client';

import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ComplianceBadge } from '@/components/features/assessment/ComplianceBadge';
import { CSF_CATEGORIES, type Assessment } from '@/lib/mock-data';
import { calculateGap } from '@/lib/utils/calculateGap';

interface AssessmentTableProps {
  assessments: Assessment[];
  onDelete?: (id: string) => void;
}

export function AssessmentTable({ assessments, onDelete }: AssessmentTableProps) {
  if (assessments.length === 0) {
    return (
      <Alert>
        <AlertTitle>Belum ada assessment</AlertTitle>
        <AlertDescription>
          Tambahkan assessment baru untuk mulai memantau kesenjangan kepatuhan NIST CSF Anda.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="px-4 py-3 text-xs font-medium uppercase text-muted-foreground">
              Aset
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase text-muted-foreground">
              Sub-Kategori
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase text-muted-foreground">
              Current
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase text-muted-foreground">
              Target
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase text-muted-foreground">
              Gap
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase text-muted-foreground">
              Status
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase text-muted-foreground text-right">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((assessment) => {
            const gap = calculateGap(
              assessment.currentScore,
              assessment.targetScore
            );
            const category = CSF_CATEGORIES[assessment.functionKey];
            return (
              <tr
                key={assessment.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                <td className="px-4 py-3 font-medium">{assessment.assetName}</td>
                <td className="px-4 py-3">
                  {assessment.subCategory}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {category.label}
                  </span>
                </td>
                <td className="px-4 py-3">{assessment.currentScore}</td>
                <td className="px-4 py-3">{assessment.targetScore}</td>
                <td className="px-4 py-3">{gap}%</td>
                <td className="px-4 py-3">
                  <ComplianceBadge gap={gap} />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/assessments/new?edit=${assessment.id}`}
                      className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                      aria-label={`Edit ${assessment.subCategory}`}
                    >
                      <Pencil className="size-4" />
                    </Link>
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(assessment.id)}
                        aria-label={`Hapus ${assessment.subCategory}`}
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
