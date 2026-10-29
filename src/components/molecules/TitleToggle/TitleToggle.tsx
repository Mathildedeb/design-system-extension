import { useId, useState } from 'react'
import './TitleToggle.css'

export interface TitleToggleProps {
  /** Titre affiché à gauche du toggle */
  title?: string
  /** Variante Figma « Active » du toggle (mode contrôlé) */
  active?: boolean
  /** État initial en mode non contrôlé */
  defaultActive?: boolean
  onChange?: (active: boolean) => void
  className?: string
}

function TitleToggle({
  title = 'Mode nuit',
  active,
  defaultActive = false,
  onChange,
  className,
}: TitleToggleProps) {
  const titleId = useId()
  const [innerActive, setInnerActive] = useState(defaultActive)
  const isActive = active ?? innerActive
  const classes = ['title-toggle', className].filter(Boolean).join(' ')

  const toggle = () => {
    const next = !isActive
    if (active === undefined) setInnerActive(next)
    onChange?.(next)
  }

  return (
    <div className={classes}>
      <h2 id={titleId} className="title-toggle__title">
        {title}
      </h2>
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        aria-labelledby={titleId}
        className="title-toggle__button"
        onClick={toggle}
      >
        <span className="title-toggle__track" aria-hidden="true">
          <span className="title-toggle__knob" />
        </span>
      </button>
    </div>
  )
}

export default TitleToggle
