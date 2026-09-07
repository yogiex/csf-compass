export const CSF_CATEGORIES = {
  govern: {
    label: 'Govern',
    icon: '🏛️',
    subCategories: ['GV.OC-01', 'GV.OC-02', 'GV.RM-01', 'GV.RM-02'],
  },
  identify: {
    label: 'Identify',
    icon: '🔍',
    subCategories: ['ID.AM-01', 'ID.AM-02', 'ID.BE-01', 'ID.GV-01'],
  },
  protect: {
    label: 'Protect',
    icon: '🛡️',
    subCategories: ['PR.AC-01', 'PR.AC-02', 'PR.DS-01', 'PR.AT-01'],
  },
  detect: {
    label: 'Detect',
    icon: '📡',
    subCategories: ['DE.AE-01', 'DE.AE-02', 'DE.CM-01'],
  },
  respond: {
    label: 'Respond',
    icon: '🚨',
    subCategories: ['RS.RP-01', 'RS.CO-01', 'RS.AN-01'],
  },
  recover: {
    label: 'Recover',
    icon: '♻️',
    subCategories: ['RC.RP-01', 'RC.CO-01'],
  },
};

export type FunctionKey = keyof typeof CSF_CATEGORIES;

export interface Assessment {
  id: string;
  assetId: string;
  assetName: string;
  functionKey: FunctionKey;
  subCategory: string;
  currentScore: number;
  targetScore: number;
  updatedAt: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Asset {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_ASSESSMENTS: Assessment[] = [
  {
    id: '1',
    assetId: 'asset-1',
    assetName: 'Sistem Core Banking',
    functionKey: 'govern',
    subCategory: 'GV.OC-01',
    currentScore: 2,
    targetScore: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    assetId: 'asset-1',
    assetName: 'Sistem Core Banking',
    functionKey: 'protect',
    subCategory: 'PR.AC-01',
    currentScore: 1,
    targetScore: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    assetId: 'asset-2',
    assetName: 'Aplikasi Mobile Banking',
    functionKey: 'detect',
    subCategory: 'DE.AE-01',
    currentScore: 3,
    targetScore: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DEFAULT_ASSETS: Asset[] = [
  {
    id: 'asset-1',
    projectId: 'proj-1',
    name: 'Sistem Core Banking',
    description: 'Backend transaksi utama',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'asset-2',
    projectId: 'proj-1',
    name: 'Aplikasi Mobile Banking',
    description: 'Frontend nasabah',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'asset-3',
    projectId: 'proj-2',
    name: 'Database HRIS',
    description: 'Data karyawan internal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'PT Bank Maju Sejahtera',
    description: 'Bank digital terkemuka di Indonesia',
    industry: 'Perbankan',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'proj-2',
    name: 'PT E-commerce Nusantara',
    description: 'Platform e-commerce terbesar',
    industry: 'E-commerce',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
