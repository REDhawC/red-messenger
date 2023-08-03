'use client'

import Modal from "../../../../app/components/Modal"
import Image from "next/image"

interface ImageModalProps {
    isOpen?: boolean,
    onClose: () => void,
    src?: string | null,

}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    src
}) => {

    if (!src) { return null }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="w-96 h-96">
                <Image
                    alt="Image"
                    className="object-contain"
                    fill
                    src={src}
                ></Image>
            </div>
        </Modal>
    )
}

export default ImageModal