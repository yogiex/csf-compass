'use client';

import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  exportToCSV,
  exportToPDF,
  formatAssessmentForExport,
} from '@/lib/utils/export';

import type { Assessment, Asset } from '@/lib/mock-data';

interface ExportMenuProps {
  assessments: Assessment[];
  assets: Asset[];
}

export function ExportMenu({ assessments, assets }: ExportMenuProps) {
  const handleCSV = () => {
    const data = formatAssessmentForExport(assessments, assets);
    if (data.length === 0) {
      toast.error('Tidak ada data', {
        description: 'Tidak ada penilaian yang dapat diekspor.',
      });
      return;
    }
    exportToCSV(data, 'penilaian-nist-csf');
    toast.success(`Diekspor ${data.length} data ke CSV.`);
  };

  const handlePDF = () => {
    const data = formatAssessmentForExport(assessments, assets);
    if (data.length === 0) {
      toast.error('Tidak ada data', {
        description: 'Tidak ada penilaian yang dapat diekspor.',
      });
      return;
    }
    exportToPDF(data, 'penilaian-nist-csf');
    toast.success(`Diekspor ${data.length} data ke PDF.`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button data-testid="export-menu" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Ekspor
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCSV}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          CSV (Spreadsheet)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handlePDF}>
          <FileText className="mr-2 h-4 w-4" />
          PDF (Laporan)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
