import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { CSF_CATEGORIES, type Assessment, type Asset } from '@/lib/mock-data';
import { calculateGap } from '@/lib/utils/calculateGap';
import {
  complianceStatusInfo,
  getComplianceStatus,
} from '@/lib/utils/getComplianceStatus';
import { getSeverity, SEVERITY_LABEL } from '@/lib/utils/getSeverity';

export interface ExportRow {
  assetName: string;
  functionLabel: string;
  subCategory: string;
  currentScore: number;
  targetScore: number;
  gap: number;
  gapLabel: string;
  status: string;
  updatedAt: string;
}

function formatUpdatedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatAssessmentForExport(
  assessments: Assessment[],
  assets: Asset[]
): ExportRow[] {
  const assetMap = new Map<string, string>();
  for (const asset of assets) {
    assetMap.set(asset.id, asset.name);
  }

  return assessments.map((assessment) => {
    const gap = calculateGap(
      assessment.currentScore,
      assessment.targetScore
    );
    const severity = getSeverity(gap);
    const compliance = complianceStatusInfo(getComplianceStatus(gap));
    const category = CSF_CATEGORIES[assessment.functionKey];

    return {
      assetName: assetMap.get(assessment.assetId) ?? 'Aset tidak ditemukan',
      functionLabel: category ? category.label : assessment.functionKey,
      subCategory: assessment.subCategory,
      currentScore: assessment.currentScore,
      targetScore: assessment.targetScore,
      gap,
      gapLabel: SEVERITY_LABEL[severity],
      status: compliance.label,
      updatedAt: formatUpdatedAt(assessment.updatedAt),
    };
  });
}

function escapeCsvField(field: string): string {
  if (/[",\n\r]/.test(field)) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

const CSV_HEADERS = [
  'Aset',
  'Fungsi',
  'Sub-Kategori',
  'Current (Tier)',
  'Target (Tier)',
  'Gap (%)',
  'Tingkat Gap',
  'Status',
  'Terakhir Diupdate',
];

export function exportToCSV(data: ExportRow[], filename = 'penilaian'): boolean {
  if (data.length === 0) return false;

  const rows = data.map((row) => {
    const fields = [
      row.assetName,
      row.functionLabel,
      row.subCategory,
      String(row.currentScore),
      String(row.targetScore),
      String(row.gap),
      row.gapLabel,
      row.status,
      row.updatedAt,
    ];
    return fields.map(escapeCsvField).join(',');
  });

  const csvContent = `\uFEFF${CSV_HEADERS.join(',')}\n${rows.join('\n')}`;
  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return true;
}

export function exportToPDF(data: ExportRow[], filename = 'penilaian'): boolean {
  if (data.length === 0) return false;

  const doc = new jsPDF('landscape', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();

  const now = new Date();
  const dateLabel = now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  doc.setFontSize(16);
  doc.setTextColor(41, 98, 150);
  doc.text('Laporan Penilaian NIST CSF v2.0', 14, 16);

  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(
    `Tanggal: ${dateLabel}  |  Total Penilaian: ${data.length}`,
    14,
    23
  );

  const columns = [
    { header: 'Aset', dataKey: 'assetName' },
    { header: 'Fungsi', dataKey: 'functionLabel' },
    { header: 'Sub-Kategori', dataKey: 'subCategory' },
    { header: 'Current', dataKey: 'currentScore' },
    { header: 'Target', dataKey: 'targetScore' },
    { header: 'Gap %', dataKey: 'gap' },
    { header: 'Tingkat', dataKey: 'gapLabel' },
    { header: 'Status', dataKey: 'status' },
    { header: 'Terakhir Update', dataKey: 'updatedAt' },
  ];

  const widths: number[] = [34, 20, 28, 16, 16, 14, 20, 30, 32];

  autoTable(doc, {
    head: [CSV_HEADERS.map((header) => header.replace(' (Tier)', ''))],
    body: data.map((row) => [
      row.assetName,
      row.functionLabel,
      row.subCategory,
      row.currentScore,
      row.targetScore,
      `${row.gap}%`,
      row.gapLabel,
      row.status,
      row.updatedAt,
    ]),
    startY: 28,
    theme: 'striped',
    headStyles: {
      fillColor: [41, 98, 150],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 8,
    },
    styles: {
      fontSize: 7.5,
      cellPadding: 1.6,
      overflow: 'linebreak',
    },
    columnStyles: columns.reduce<Record<number, object>>(
      (acc, column, index) => {
        acc[index] = { cellWidth: widths[index] };
        return acc;
      },
      {}
    ),
    didDrawPage: (data) => {
      const pageWidthForFooter = doc.internal.pageSize.getWidth();
      doc.setFontSize(7.5);
      doc.setTextColor(130, 130, 130);
      const totalPages = doc.getNumberOfPages();
      doc.text(
        `Halaman ${data.pageNumber} dari ${totalPages}`,
        14,
        292
      );
      const timestamp = new Date().toLocaleString('id-ID');
      doc.text(
        `Dicetak dari CSF Compass pada ${timestamp}`,
        pageWidthForFooter - 14,
        292,
        { align: 'right' }
      );
    },
  });

  doc.save(`${filename}.pdf`);
  return true;
}
