'use client'

import clsx from "clsx"
import Link from "next/link"


interface DesktopItemProps {
    label: string,
    icon: any,
    href: string,
    onClick?: () => void,
    isSettingOpen?: boolean,
    active?: boolean
}

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    isSettingOpen,
    active,

}) => {
    const handleClick = () => {

        if (onClick) {
            return onClick()
        }
    }
    return (
        <li onClick={handleClick}>
            <Link href={href}
                className={clsx(`
            group
            flex
            gap-x-3
            rounded-md
            p-3
            text-sm
            leading-6
            font-semibold
            text-gray-500
            hover:text-white
            hover:bg-orange-500
            hover:text-md
            `,
                    (active) && 'bg-orange-500 text-white',
                    (isSettingOpen) && 'bg-orange-600 text-white',
                )}>
                <Icon className={clsx(
                    "h-6 w-6 shrink-0",
                    (isSettingOpen) && 'animate-spin',
                )} ></Icon>
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    )
}

export default DesktopItem