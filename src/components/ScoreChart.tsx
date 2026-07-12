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
          <CartesianGrid stroke="#2a3654" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#8b98b8" tick={{ fill: '#8b98b8', fontSize: 12 }} />
          <YAxis domain={[0, 100]} stroke="#8b98b8" tick={{ fill: '#8b98b8', fontSize: 12 }} unit="%" />
          <Tooltip
            contentStyle={{
              background: '#131a2c',
              border: '1px solid #3b4970',
              borderRadius: 10,
              color: '#f1f5fb',
            }}
            labelStyle={{ color: '#a3b0c9' }}
            formatter={(value) => [`${value}%`, 'Score']}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ fill: '#3b82f6', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
