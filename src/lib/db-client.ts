import { Assessment, Asset, DEFAULT_ASSESSMENTS, DEFAULT_ASSETS } from './mock-data';

const getItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const raw = localStorage.getItem(key);
  if (!raw) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};

const KEYS = {
  ASSESSMENTS: 'nist_assessments',
  ASSETS: 'nist_assets',
};

export const assessmentDB = {
  getAll: (): Assessment[] => getItem<Assessment[]>(KEYS.ASSESSMENTS, DEFAULT_ASSESSMENTS),

  getById: (id: string): Assessment | undefined => {
    return assessmentDB.getAll().find((a) => a.id === id);
  },

  create: (data: Omit<Assessment, 'id' | 'createdAt' | 'updatedAt'>): Assessment => {
    const assessments = assessmentDB.getAll();
    const newAssessment: Assessment = {
      ...data,
      id: `ass-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setItem(KEYS.ASSESSMENTS, [...assessments, newAssessment]);
    return newAssessment;
  },

  update: (
    id: string,
    data: Partial<Omit<Assessment, 'id' | 'createdAt'>>
  ): Assessment | null => {
    const assessments = assessmentDB.getAll();
    const index = assessments.findIndex((a) => a.id === id);
    if (index === -1) return null;
    const updated = {
      ...assessments[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    assessments[index] = updated;
    setItem(KEYS.ASSESSMENTS, assessments);
    return updated;
  },

  delete: (id: string): boolean => {
    const assessments = assessmentDB.getAll();
    const filtered = assessments.filter((a) => a.id !== id);
    if (filtered.length === assessments.length) return false;
    setItem(KEYS.ASSESSMENTS, filtered);
    return true;
  },

  reset: () => setItem(KEYS.ASSESSMENTS, DEFAULT_ASSESSMENTS),
};

export const assetDB = {
  getAll: (): Asset[] => getItem<Asset[]>(KEYS.ASSETS, DEFAULT_ASSETS),

  getById: (id: string): Asset | undefined => {
    return assetDB.getAll().find((a) => a.id === id);
  },

  create: (data: Omit<Asset, 'id'>): Asset => {
    const assets = assetDB.getAll();
    const newAsset: Asset = {
      ...data,
      id: `asset-${Date.now()}`,
    };
    setItem(KEYS.ASSETS, [...assets, newAsset]);
    return newAsset;
  },

  update: (id: string, data: Partial<Omit<Asset, 'id'>>): Asset | null => {
    const assets = assetDB.getAll();
    const index = assets.findIndex((a) => a.id === id);
    if (index === -1) return null;
    const updated = { ...assets[index], ...data };
    assets[index] = updated;
    setItem(KEYS.ASSETS, assets);
    return updated;
  },

  delete: (id: string): boolean => {
    const assets = assetDB.getAll();
    const filtered = assets.filter((a) => a.id !== id);
    if (filtered.length === assets.length) return false;
    setItem(KEYS.ASSETS, filtered);
    return true;
  },

  reset: () => setItem(KEYS.ASSETS, DEFAULT_ASSETS),
};
