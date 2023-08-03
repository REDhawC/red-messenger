'use client'

import { useState } from "react"
import useConversation from "../../../app/hooks/useConversation"
import useRoutes from "../../../app/hooks/useRoutes"
import MobileItem from "./MobileItem"
import { User } from "@prisma/client"
import SettingsModal from "./SettingsModal"

interface mobileFooterProps {
    currentUser: User,

}

const MobileFooter: React.FC<mobileFooterProps> = ({ currentUser }) => {
    const routes = useRoutes()
    const { isOpen } = useConversation()
    const [isSettingOpen, setisSettingOpen] = useState(false)

    if (isOpen) {
        return null
    }

    return (

        <div
            className="
        fixed
        justify-between
        w-full
        bottom-0
        z-40
        flex
        items-center
        bg-white
        border-t-[1px]
        lg:hidden">
            <SettingsModal
                currentUser={currentUser}
                isOpen={isSettingOpen}
                onClose={() => { setisSettingOpen(false) }}
                isMobile={true}
            ></SettingsModal>
            {routes.map((route, index) => (
                <MobileItem
                    key={route.href}
                    href={route.href}
                    active={route.active}
                    icon={route.icon}
                    onClick={index === 2 ? () => { setisSettingOpen(true) } : route.onClick}
                    isSettingOpen={index === 2 && isSettingOpen}
                />
            ))}
        </div>
    )
}

export default MobileFooter
