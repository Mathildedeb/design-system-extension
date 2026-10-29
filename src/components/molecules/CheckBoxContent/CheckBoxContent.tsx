import { useId, useState } from 'react'
import type { ChangeEvent } from 'react'
import './CheckBoxContent.css'

export interface CheckBoxContentProps {
  /** Texte de la case (« Content » dans Figma) */
  label?: string
  /** Variante Figma « state » : true = yes (mode contrôlé) */
  checked?: boolean
  /** État initial en mode non contrôlé */
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

function CheckBoxContent({
  label = 'Me rappeler de noter mes rêves',
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className,
}: CheckBoxContentProps) {
  const id = useId()
  const [innerChecked, setInnerChecked] = useState(defaultChecked)
  const isChecked = checked ?? innerChecked
  const classes = ['check-box-content', className].filter(Boolean).join(' ')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (checked === undefined) setInnerChecked(event.target.checked)
    onChange?.(event.target.checked)
  }

  return (
    <div className={classes}>
      <input
        id={id}
        className="check-box-content__input"
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      <label htmlFor={id} className="check-box-content__label">
        <span className="check-box-content__box" aria-hidden="true">
          <svg className="check-box-content__check" viewBox="0 0 16 16">
            <path d="M2.8 8.3 6.3 11.6 13.1 4.4" />
          </svg>
        </span>
        {label}
      </label>
    </div>
  )
}

export default CheckBoxContent
