export const CSF_TIERS = [
  {
    value: 0,
    label: 'Tier 0',
    name: 'Tidak Dinilai',
    description: 'Belum ada penilaian yang dilakukan untuk sub-kategori ini.',
    color: 'bg-gray-400',
  },
  {
    value: 1,
    label: 'Tier 1',
    name: 'Parsial',
    description: 'Praktik keamanan siber dilakukan secara ad-hoc dan tidak terkoordinasi.',
    color: 'bg-red-500',
  },
  {
    value: 2,
    label: 'Tier 2',
    name: 'Sadar Risiko',
    description: 'Praktik keamanan siber mulai terinformasi oleh risiko, tetapi belum terstandarisasi.',
    color: 'bg-orange-500',
  },
  {
    value: 3,
    label: 'Tier 3',
    name: 'Berulang',
    description: 'Praktik keamanan siber secara formal ditetapkan, didokumentasikan, dan diulang secara konsisten.',
    color: 'bg-yellow-500',
  },
  {
    value: 4,
    label: 'Tier 4',
    name: 'Adaptif',
    description: 'Praktik keamanan siber secara aktif beradaptasi terhadap ancaman dan pelajaran yang didapat.',
    color: 'bg-green-500',
  },
] as const;

export type TierValue = (typeof CSF_TIERS)[number]['value'];

export const getTierDetails = (value: number) => {
  return CSF_TIERS.find((tier) => tier.value === value) || CSF_TIERS[0];
};

export const getTierLabel = (value: number): string => {
  return getTierDetails(value).label;
};

export const getTierName = (value: number): string => {
  return getTierDetails(value).name;
};

export const getTierColor = (value: number): string => {
  return getTierDetails(value).color;
};