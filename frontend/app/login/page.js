"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import React from 'react'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"

const login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    const handleLogin = async (e) =>{
        e.preventDefault()
        setError("")
        setLoading(true)
        
        const res = await signIn("credentials",{
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if(res?.error){
            setError("Invalid email or password")
        }else{
            router.push("/dashboard")
        }

        

    }


    return (
        <>
            <div className='text-white w-1/2 mx-auto font-bold text-3xl'>login</div>
            <Separator className={"my-5 w-1/2 mx-auto bg-white/50"} />

            <Card className="max-w-1/2 m-auto dark">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link" onClick={()=>{router.push("/signup")}}>Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value = {email}
                                    onChange = {(e)=>setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required value={password} onChange = {(e)=>setPassword(e.target.value)} />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-5" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
                {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                )}
                <CardFooter className="flex-col gap-2">
                    
                    <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>


        </>
    )
}

export default login