'use client'

import Link from "next/link"
import clsx from "clsx"

interface MobileItemProps {
    href: string,
    icon: any,
    active?: boolean,
    isSettingOpen?: boolean,
    onClick?: () => void
}

const MobileItem: React.FC<MobileItemProps> = (
    {
        href,
        icon: Icon,
        active,
        isSettingOpen,
        onClick
    }
) => {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <Link
            onClick={onClick}
            href={href}
            className={clsx(`
            group
            flex
            gap-x-3
            text-sm
            leading-6
            font-semibold
            w-full
            justify-center
            p-4
            text-gray-500
            hover:text-orange-600
            hover:bg-gray-100
        `, active && 'bg-gray-100 text-orange-600')}
        >
            <Icon className={clsx(
                "h-6 w-6",
                (isSettingOpen) && 'animate-spin',
            )} />
        </Link>
    )
}

export default MobileItem