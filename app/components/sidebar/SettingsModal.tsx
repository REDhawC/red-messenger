'use client'

import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import Modal from "../Modal"
import Input from "../inputs/Input"
import Image from "next/image"
import placeholder from '../../../public/placeholder.jpg'
import { CldUploadButton } from "next-cloudinary"
import Button from "../../../app/(site)/components/Button"
import { signOut } from "next-auth/react"
import clsx from "clsx"



interface SettingsModalProps {
    isOpen?: boolean,
    onClose: () => void
    currentUser: User
    isMobile?: boolean
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser,
    isMobile
}) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    })

    const image = watch('image')

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/settings', data)
            .then(() => {
                router.refresh()
                onClose()
            })
            .catch(() => toast.error('something went wrong!'))
            .finally(() => setIsLoading(false))
    }

    const handleLogout = () => {
        signOut()
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={isMobile ? 'pt-2 pb-2' : ''}>
                <h1 className="text-2xl font-bold mb-2">Settings</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className=''>
                            <h2 className="
                        text-base
                        font-semibold
                        leading-7
                        text-gray-900
                        ">
                                Profile
                            </h2>
                            {!isMobile && (
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Edit your public information.
                                </p>)}
                            <div className={isMobile ? 'mt-2 flex flex-col gap-y-4 pl-2' : 'pl-4 mt-4 flex flex-col gap-y-4'}
                            >
                                <Input
                                    disabled={isLoading}
                                    label='Name'
                                    id='name'
                                    errors={errors}
                                    required
                                    register={register}
                                ></Input>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                                </div>
                                <div className="
                            mb-2
                            flex
                            items-center
                            gap-x-3">
                                    <Image
                                        width='48'
                                        height='48'
                                        className="rounded-full"
                                        src={image || currentUser?.image || placeholder}
                                        alt="Avatar"
                                    ></Image>
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="l8qlzfwe"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            type="button"
                                            secondary
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end gap-x-2">
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}

                            onClick={onClose}>
                            Save
                        </Button>

                    </div>
                </form>
                <h2 className={clsx(isMobile ? 'border-gray-900/20 border-t font-semibold pt-2 mt-4 h-10' : `
            mt-2
            pt-2
            border-t
            border-gray-900/20
                        text-base
                        font-semibold
                        leading-7
                        text-gray-900
                        `)}>
                    Looking for a way out?
                </h2>
                <div className="  flex items-center justify-center">
                    <div>
                        <Button
                            disabled={isLoading}
                            danger
                            onClick={handleLogout}>
                            Log out
                        </Button>
                    </div>


                </div>
            </div >

        </Modal >
    )
}

export default SettingsModal