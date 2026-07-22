import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export type ScorePoint = { date: string; score: number; site: string }

/**
 * Évolution du taux de conformité dans le temps.
 * Chargé en lazy (recharts ≈ 100 ko gzip) uniquement sur le dashboard.
 */
export default function ScoreChart({ data }: { data: ScorePoint[] }) {
  return (
    <div aria-hidden="true">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="var(--color-text-dim)" tick={{ fill: 'var(--color-text-dim)', fontSize: 12 }} />
          <YAxis domain={[0, 100]} stroke="var(--color-text-dim)" tick={{ fill: 'var(--color-text-dim)', fontSize: 12 }} unit="%" />
          <Tooltip
            contentStyle={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 10,
              color: 'var(--color-text)',
            }}
            labelStyle={{ color: 'var(--color-text-muted)' }}
            formatter={(value) => [`${value}%`, 'Score']}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--color-primary-2)"
            strokeWidth={2.5}
            dot={{ fill: 'var(--color-primary-2)', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
