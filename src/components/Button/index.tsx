import React, { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${className || ""}`;

  return (
    <button className={buttonClass.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;
