'use client'
// make next.js know this component is designed for cilent end
import { useCallback, useState } from "react"

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


    return (
        <div>AuthForm</div>
    )
}
