'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

interface MessageInputProps {
    placeholder?: string,
    id: string,
    autoCompleteType?: string ,
    type?: string,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    autoCompleteType,
    type,
    required,
    register,
    errors
}) => {
    return (
        <div className="relative w-full">
            <input type={type}
                id={id}
                autoComplete={autoCompleteType || undefined}
                {...register(id, { required })}
                placeholder={placeholder}
                className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
            />
        </div>
    )
}

export default MessageInput