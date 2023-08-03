'use client'

import clsx from "clsx"
interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    logout?: boolean;
    disabled?: boolean;
    outlined?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    logout,
    disabled,
    outlined
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={clsx(`
            flex
            justify-center
            rounded-md
            px-3
            py-2
            mx-1
            text-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            `,
                disabled && 'opacity-50 cursor-default',
                fullWidth && 'w-full',
                secondary ? 'text-gray-900' : 'text-white',
                danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
                logout && 'w-28 block',
                outlined && 'border-2 border-orange-500 text-orange-500 hover:text-orange-600 hover:border-orange-600',
                !secondary && !danger && 'bg-orange-500 hover:bg-orange-600 focus-visible:outline-orange-700'
            )}
        >
            {children}
        </button>
    )
}

export default Button