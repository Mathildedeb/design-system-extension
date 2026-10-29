import { useId } from 'react'
import './CardDonut.css'

export interface CardDonutProps {
  /** Titre de la carte */
  title?: string
  /** Part remplie du donut, de 0 à 100 (variante Figma « state ») */
  value?: number
  /** Évolution affichée au centre, en points (négative = baisse) */
  trend?: number
  /** Texte de la légende */
  legend?: string
  className?: string
}

const RADIUS = 41
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function CardDonut({
  title = 'Mes nuits',
  value = 30,
  trend = -12,
  legend = 'Rêves lucides',
  className,
}: CardDonutProps) {
  const titleId = useId()
  const percent = Math.min(100, Math.max(0, value))
  const filled = (percent / 100) * CIRCUMFERENCE
  const classes = ['card-donut', className].filter(Boolean).join(' ')
  const sign = trend < 0 ? '−' : trend > 0 ? '+' : ''
  const trendText =
    trend === 0
      ? 'stable'
      : `${trend < 0 ? 'en baisse de' : 'en hausse de'} ${Math.abs(trend)} %`

  return (
    <section className={classes} aria-labelledby={titleId}>
      <h2 id={titleId} className="card-donut__title">
        {title}
      </h2>
      <div className="card-donut__body">
        <figure className="card-donut__chart">
          <svg className="card-donut__svg" viewBox="0 0 100 100" aria-hidden="true">
            <circle className="card-donut__track" cx="50" cy="50" r={RADIUS} />
            {percent > 0 && (
              <circle
                className="card-donut__value"
                cx="50"
                cy="50"
                r={RADIUS}
                strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
                transform="rotate(-90 50 50)"
              />
            )}
          </svg>
          <figcaption className="card-donut__indicator">
            <span className="card-donut__sr">{`${legend} : ${percent} %, ${trendText}`}</span>
            <span aria-hidden="true">
              {sign}
              {String(Math.abs(trend)).padStart(2, '0')}%
            </span>
          </figcaption>
        </figure>
        <p className="card-donut__legend">
          <span className="card-donut__dot" aria-hidden="true" />
          {legend}
        </p>
      </div>
    </section>
  )
}

export default CardDonut
