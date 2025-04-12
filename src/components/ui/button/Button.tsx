import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  ...props
}) => {
  const baseStyle = `
    w-full text-white py-2 px-4 rounded-md focus:outline-none
    bg-gradient-to-r
  `;

  const primaryStyle = `
    from-blue-500 via-blue-500 to-blue-500
    dark:from-black dark:via-blue-900 dark:to-black
    hover:from-blue-900 hover:via-blue-900 hover:to-blue-900
    dark:hover:from-blue-900 dark:hover:via-blue-900 dark:hover:to-blue-900
  `;

  const secondaryStyle = `
    from-green-500 via-green-500 to-green-500
    dark:from-black dark:via-green-900 dark:to-black
    hover:from-green-900 hover:via-green-900 hover:to-green-900
    dark:hover:from-green-900 dark:hover:via-green-900 dark:hover:to-green-900
  `;

  const variantStyle = variant === 'primary' ? primaryStyle : secondaryStyle;
  const combinedClasses = `${baseStyle} ${variantStyle}`;

  const button = (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );

  return href ? <Link href={href}>{button}</Link> : button;
};
