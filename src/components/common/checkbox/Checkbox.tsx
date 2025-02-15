import { Checkbox as CheckboxUI } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import styles from './Checkbox.module.scss';
import { useEffect, useState } from "react";

type CheckboxProps = {
  handleCheckboxChange: (e: boolean) => void,
  checkboxText: string,
  defaultChecked?: boolean,
  variant?: 'default' | 'icon',
  className?: string,
}

export const Checkbox = ({
  handleCheckboxChange: handleCheckboxChangeProp,
  checkboxText,
  defaultChecked = false,
  variant = 'default',
  className,
}: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const getVariantClassName = (className: string) =>
    styles[`${className}_${variant}`];

  const handleCheckboxChange = (isChecked: CheckboxUI.CheckedState) => {
    setChecked(!!isChecked);
    handleCheckboxChangeProp(!!isChecked);
  }

  useEffect(() => setChecked(defaultChecked), [defaultChecked])

  return (
    <div className={`${className || ""} ${styles.Checkbox}`}>
      <CheckboxUI.Root
        defaultChecked={defaultChecked}
        checked={checked}
        className={getVariantClassName('CheckboxRoot')}
        id={checkboxText}
        onCheckedChange={(isChecked) => handleCheckboxChange(isChecked)}
      >
        <CheckboxUI.Indicator className={getVariantClassName('CheckboxIndicator')}>
          {
            variant === 'icon' && (
              <CheckIcon className={styles.CheckboxRoot__svg} />
            )
          }
        </CheckboxUI.Indicator>
      </CheckboxUI.Root>
      <label className="Label" htmlFor={checkboxText}>
        {checkboxText}
      </label>
    </div>
  )
}