import getConversationsById from "@/app/actions/getConversationsById"
import getMessages from "@/app/actions/getMessages"
import EmptyState from "@/app/components/EmptyState"
import Header from "./components/Header"

interface IParams {
    conversationId: string
}

const conversationId = async ({ params }: { params: IParams }) => {
    const conversation = await getConversationsById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState></EmptyState>
                </div>
            </div>
        )
    }

    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} ></Header>
                <Body></Body>
            </div>

        </div>
    )
}

export default conversationId