export const CSF_TIERS = [
  {
    value: 0,
    label: 'Tier 0',
    name: 'Tidak Dinilai',
    description: 'Belum ada penilaian yang dilakukan untuk sub-kategori ini.',
    color: 'bg-gray-400',
    textColor: 'text-gray-700 dark:text-gray-300',
    bgLight: 'bg-gray-100 dark:bg-gray-800',
  },
  {
    value: 1,
    label: 'Tier 1',
    name: 'Parsial',
    description: 'Praktik keamanan siber dilakukan secara ad-hoc dan tidak terkoordinasi.',
    color: 'bg-red-500',
    textColor: 'text-red-700 dark:text-red-300',
    bgLight: 'bg-red-100 dark:bg-red-900/30',
  },
  {
    value: 2,
    label: 'Tier 2',
    name: 'Sadar Risiko',
    description: 'Praktik keamanan siber mulai terinformasi oleh risiko, tetapi belum terstandarisasi.',
    color: 'bg-orange-500',
    textColor: 'text-orange-700 dark:text-orange-300',
    bgLight: 'bg-orange-100 dark:bg-orange-900/30',
  },
  {
    value: 3,
    label: 'Tier 3',
    name: 'Berulang',
    description: 'Praktik keamanan siber secara formal ditetapkan, didokumentasikan, dan diulang secara konsisten.',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700 dark:text-yellow-300',
    bgLight: 'bg-yellow-100 dark:bg-yellow-900/30',
  },
  {
    value: 4,
    label: 'Tier 4',
    name: 'Adaptif',
    description: 'Praktik keamanan siber secara aktif beradaptasi terhadap ancaman dan pelajaran yang didapat.',
    color: 'bg-green-500',
    textColor: 'text-green-700 dark:text-green-300',
    bgLight: 'bg-green-100 dark:bg-green-900/30',
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
export const getTierBgLight = (value: number): string => {
  return getTierDetails(value).bgLight;
};

export const getTierTextColor = (value: number): string => {
  return getTierDetails(value).textColor;
};
