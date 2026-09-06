'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CSF_CATEGORIES, Assessment } from '@/lib/mock-data';

interface CSFRadarChartProps {
  assessments: Assessment[];
}

export function CSFRadarChart({ assessments }: CSFRadarChartProps) {
  const data = (Object.keys(CSF_CATEGORIES) as Array<keyof typeof CSF_CATEGORIES>)
    .map((key) => {
      const items = assessments.filter((a) => a.functionKey === key);
      const current =
        items.length === 0
          ? 0
          : items.reduce((sum, a) => sum + a.currentScore, 0) / items.length;
      const target =
        items.length === 0
          ? 0
          : items.reduce((sum, a) => sum + a.targetScore, 0) / items.length;
      return {
        subject: CSF_CATEGORIES[key].label,
        current: Number(current.toFixed(2)),
        target: Number(target.toFixed(2)),
      };
    });

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          name="Target"
          dataKey="target"
          stroke="#F59E0B"
          fill="#F59E0B"
          fillOpacity={0.2}
        />
        <Radar
          name="Current"
          dataKey="current"
          stroke="#3B82F6"
          fill="#3B82F6"
          fillOpacity={0.5}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}