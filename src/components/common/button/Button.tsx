import React from 'react';
import styles from './Button.module.scss'

type ButtonProps = {
  children: React.ReactNode,
  variant?: "primary" | "secondary" | "link",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", ...props }, ref) => {

    return (
      <button {...props} ref={ref} className={styles[variant]}>
        {children}
      </button>
    );
  }
);
