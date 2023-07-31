'use client'
import Input from "@/app/components/inputs/Input"
// make next.js know this component is designed for cilent end
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'

import Button from "./Button"
import AuthSocialButton from "./AuthSocialButton"
import { useRouter } from "next/navigation"


type variant = 'LOGIN' | 'REGISTER'

export const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState<variant>('LOGIN')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')

        }
    }, [session?.status, router])

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
            axios.post('/api/register', data)
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('something went wrong!'))
                .finally(() => { setLoading(false) })
        }
        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    console.log(callback);
                    if (callback?.error) {
                        toast.error('Invalid Credentials')
                    }
                    if (callback?.ok && !callback?.error) {
                        toast.success('Logged in!')
                    }
                })
                .finally(() => { setLoading(false) })
        }
    }

    const socialAction = (action: string) => {
        setLoading(true)
        signIn(action, { redirect: false })
            .then((callback) => {
                console.log(callback);

                if (callback?.error) {
                    toast.error('Invalid Credentials')
                }
                if (callback?.ok && !callback?.error) {
                    console.log('social Log in');
                    toast.success('Logged in!')
                }
            })
            .finally(() => { setLoading(false) })
    }

    return (
        <div
            className="mt-4 sm:mt-4 sm:w-full sm:max-w-md"
        >
            <div
                className="bg-white px-4 py-4 shadow rounded-lg mx-4"
            >
                <form className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input id="name" label="Name" register={register} errors={errors} disabled={loading} />
                    )}
                    <Input id="email" label="Email address" register={register} errors={errors} disabled={loading} />
                    <Input id="password" label="Password" register={register} errors={errors} disabled={loading} />
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
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')} />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')} />
                    </div>
                </div>
                <div
                    className="flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="
                    underline cursor-pointer
                    ">
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}
