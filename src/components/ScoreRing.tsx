import { scoreColor } from '@/lib/format'

export function ScoreRing({
  score,
  size = 96,
  label = 'Taux de conformité',
}: {
  score: number | null
  size?: number
  label?: string
}) {
  const stroke = size / 12
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = score ?? 0
  const color = scoreColor(score)
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={score === null ? `${label} : non disponible` : `${label} : ${pct} %`}
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize={size / 4}
        fontWeight="800"
      >
        {score === null ? '—' : `${Math.round(pct)}%`}
      </text>
    </svg>
  )
}
