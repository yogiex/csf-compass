import { z } from 'zod';

export const assessmentSchema = z
  .object({
    assetId: z.string().min(1, 'Aset harus dipilih'),
    functionKey: z.string().min(1, 'Fungsi harus dipilih'),
    subCategory: z.string().min(1, 'Sub-kategori harus dipilih'),
    currentScore: z
      .number()
      .min(0, 'Skor minimal 0')
      .max(4, 'Skor maksimal 4')
      .int('Skor harus bilangan bulat'),
    targetScore: z
      .number()
      .min(0, 'Skor minimal 0')
      .max(4, 'Skor maksimal 4')
      .int('Skor harus bilangan bulat'),
  })
  .refine((data) => data.currentScore <= data.targetScore, {
    message: 'Skor saat ini tidak boleh melebihi skor target',
    path: ['currentScore'],
  });

export type AssessmentFormData = z.infer<typeof assessmentSchema>;