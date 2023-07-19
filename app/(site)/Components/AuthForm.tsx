'use client'
import Input from "@/app/components/Input"
// make next.js know this component is designed for cilent end
import { useCallback, useState } from "react"
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import Button from "./Button"


type variant = 'LOGIN' | 'REGISTER'

export const AuthForm = () => {
    const [variant, setVariant] = useState<variant>('LOGIN')
    const [loading, setLoading] = useState(false)

    const toggleVariant = useCallback(
        () => {
            if (variant === 'LOGIN') {
                setVariant('REGISTER')
            } else {
                setVariant('LOGIN')
            }
        },
        [variant],
    )

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true)
        if (variant === 'REGISTER') {
            // axios register
        }
        if (variant === 'LOGIN') {
            // NEXT AUTH 
        }
    }

    const socialAction = (action: string) => {
        setLoading(true)
        // next social
    }

    return (
        <div
            className="mt-8 sm:mt-4 sm:w-full sm:max-w-md"
        >
            <div
                className="bg-white px-4 py-4 shadow rounded-lg mx-4"
            >
                <form className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input id="name" label="Name" register={register} errors={errors} />
                    )}
                    <Input id="email" label="Email address" register={register} errors={errors} />
                    <Input id="password" label="Password" register={register} errors={errors} />
                    <div>
                        <Button
                            disabled={loading}
                            fullWidth
                            type="submit"
                        >{variant === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="absolute
                        inset-0
                        flex
                        items-center">
                            <div
                                className="w-full border-t border-gray-300"
                            >
                            </div>
                        </div>
                        <div
                            className="
                        relative
                        flex 
                        justify-center
                        text-sm"
                        >
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
