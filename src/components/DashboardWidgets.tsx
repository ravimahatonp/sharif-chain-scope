import React from 'react';
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface MetricWidgetProps {
  title: string;
  subtitle: string;
  value: string;
  tone: 'info' | 'accent' | 'success';
}

export const MetricWidget: React.FC<MetricWidgetProps> = ({ title, subtitle, value, tone }) => {
  const tones = {
    info: { background: 'rgba(56, 189, 248, 0.14)', color: '#38bdf8' },
    accent: { background: 'rgba(129, 140, 248, 0.16)', color: '#818cf8' },
    success: { background: 'rgba(16, 185, 129, 0.16)', color: '#10b981' },
  } as const;

  const style = tones[tone];

  return (
    <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: '#0f172a', border: '1px solid #334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
        <div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>{title}</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>{subtitle}</div>
        </div>
        <div style={{ padding: '0.45rem 0.65rem', borderRadius: '999px', backgroundColor: style.background, color: style.color, fontSize: '0.74rem', fontWeight: 700 }}>
          Live
        </div>
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc' }}>{value}</div>
    </div>
  );
};

interface TrendChartProps {
  title: string;
  data: Array<{ label: string; value: number }>;
  kind: 'area' | 'bar' | 'line';
}

export const TrendChart: React.FC<TrendChartProps> = ({ title, data, kind }) => {
  const chart =
    kind === 'bar' ? (
      <BarChart data={data}>
        <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#38bdf8" radius={[4, 4, 0, 0]} />
      </BarChart>
    ) : kind === 'line' ? (
      <LineChart data={data}>
        <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={3} dot={{ r: 3 }} />
      </LineChart>
    ) : (
      <AreaChart data={data}>
        <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
      </AreaChart>
    );

  return (
    <div style={{ padding: '1rem', borderRadius: '12px', backgroundColor: '#111827', border: '1px solid #334155' }}>
      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.75rem' }}>{title}</div>
      <div style={{ height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {chart}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
