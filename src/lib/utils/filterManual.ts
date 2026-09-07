import type { ManualFunction } from '@/lib/nist-csf-data';

export function filterManualData(data: ManualFunction[], term: string): ManualFunction[] {
  const query = term.trim().toLowerCase();
  if (!query) return data;

  return data.reduce<ManualFunction[]>((acc, fn) => {
    const functionMatches = fn.name.toLowerCase().includes(query);
    const subCategories = functionMatches
      ? fn.subCategories
      : fn.subCategories.filter((sub) =>
          [sub.id, sub.name, sub.description, sub.purpose].some((field) =>
            field.toLowerCase().includes(query),
          ),
        );

    if (subCategories.length > 0) {
      acc.push({ ...fn, subCategories });
    }
    return acc;
  }, []);
}
