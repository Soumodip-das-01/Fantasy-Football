"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



const signup = () => {
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const handleSignup = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Signup error")
                setLoading(false)
                return
            }

            router.push("/login")

        } catch (err) {
            setError("something went wrong")
        } finally {
            setLoading(false)
        }
    }
  return (
    <div className='text-white max-w-1/2 mx-auto'>
        <Card className="dark">
            <CardHeader>
                <CardTitle>
                    Create an Account
                </CardTitle>
                <CardDescription>
                    Sign up now to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSignup} className='space-y-4'>
                    <div className='flex flex-col gap-3'>
                        <Label>Name</Label>
                        <Input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Label>Email</Label>
                        <Input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Label>Password</Label>
                        <Input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </div>
                    {error &&(
                        <p className='text-sm text-red-500'>{error}</p>
                    )}
                    <Button type="submit" className="w-full" disabled={loading}>
                          {loading ? "Creating account..." : "Sign Up"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default signup