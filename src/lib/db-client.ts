import { Assessment, Asset, DEFAULT_ASSESSMENTS, DEFAULT_ASSETS, DEFAULT_PROJECTS, Project } from './mock-data';

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
  PROJECTS: 'nist_projects',
};

export const assessmentDB = {
  getAll: (): Assessment[] => getItem<Assessment[]>(KEYS.ASSESSMENTS, DEFAULT_ASSESSMENTS),

  getById: (id: string): Assessment | undefined => {
    return assessmentDB.getAll().find((a) => a.id === id);
  },

  getByAssetId: (assetId: string): Assessment[] => {
    return assessmentDB.getAll().filter((a) => a.assetId === assetId);
  },

  getByProject: (projectId: string): Assessment[] => {
    const assetIds = assetDB.getByProject(projectId).map((asset) => asset.id);
    return assessmentDB.getAll().filter((a) => assetIds.includes(a.assetId));
  },

  create: (data: Omit<Assessment, 'id' | 'createdAt' | 'updatedAt'>): Assessment => {
    const assessments = assessmentDB.getAll();
    const newAssessment: Assessment = {
      ...data,
      assetName: assetDB.getById(data.assetId)?.name ?? 'Aset tidak ditemukan',
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
    const assetName = data.assetId
      ? assetDB.getById(data.assetId)?.name ?? 'Aset tidak ditemukan'
      : assessments[index].assetName;
    const updated = {
      ...assessments[index],
      ...data,
      assetName,
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

  getByProject: (projectId: string): Asset[] => {
    return assetDB.getAll().filter((a) => a.projectId === projectId);
  },

  create: (data: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>): Asset => {
    const assets = assetDB.getAll();
    const newAsset: Asset = {
      ...data,
      id: `asset-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setItem(KEYS.ASSETS, [...assets, newAsset]);
    return newAsset;
  },

  update: (id: string, data: Partial<Omit<Asset, 'id' | 'createdAt'>>): Asset | null => {
    const assets = assetDB.getAll();
    const index = assets.findIndex((a) => a.id === id);
    if (index === -1) return null;
    const updated = { ...assets[index], ...data, updatedAt: new Date().toISOString() };
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

export const projectDB = {
  getAll: (): Project[] => getItem<Project[]>(KEYS.PROJECTS, DEFAULT_PROJECTS),

  getById: (id: string): Project | undefined => {
    return projectDB.getAll().find((p) => p.id === id);
  },

  create: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
    const projects = projectDB.getAll();
    const newProject: Project = {
      ...data,
      id: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setItem(KEYS.PROJECTS, [...projects, newProject]);
    return newProject;
  },

  update: (id: string, data: Partial<Omit<Project, 'id' | 'createdAt'>>): Project | null => {
    const projects = projectDB.getAll();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;
    const updated = { ...projects[index], ...data, updatedAt: new Date().toISOString() };
    projects[index] = updated;
    setItem(KEYS.PROJECTS, projects);
    return updated;
  },

  delete: (id: string): boolean => {
    const projects = projectDB.getAll();
    const filtered = projects.filter((p) => p.id !== id);
    if (filtered.length === projects.length) return false;
    setItem(KEYS.PROJECTS, filtered);
    return true;
  },

  reset: () => setItem(KEYS.PROJECTS, DEFAULT_PROJECTS),
};
