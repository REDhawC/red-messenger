'use client'

import Avatar from "@/app/components/Avatar"
import useOtherUser from "@/app/hooks/useOtherUsers"
import { Conversation, User } from "@prisma/client"
import Link from "next/link"
import { useMemo } from "react"
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2"

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({
    conversation
}) => {

    const otherUser = useOtherUser(conversation)

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return 'Active'

    }, [conversation])

    return (
        <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
            <div className="flex gap-3 items-center">
                <Link href='/conversations'
                    className="lg:hidden block text-orange-500 hover:text-orange-600 transition cursor-pointer"
                >
                    <HiChevronLeft size={32}></HiChevronLeft>
                </Link>
                <Avatar user={otherUser}></Avatar>
                <div className="flex flex-col">
                    <div className="font-semibold">
                        {conversation.name || otherUser.name}
                    </div>
                    <div className="text-sm font-light text-neutral-500">
                        {statusText}
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal
                size={32}
                onClick={() => { }}
                className="text-orange-500 cursor-pointer hover:text-orange-600 transition"
            />
        </div>

    )
}

export default Header