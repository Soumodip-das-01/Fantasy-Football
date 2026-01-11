"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const AuctionPage = () => {

    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])


    const [playerId, setPlayerId] = useState("")
    const [teamId, setTeamId] = useState("")
    const [price, setPrice] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const fetchPlayers = async() =>{
        const res = await fetch("http://localhost:3000/admin/players",{
            credentials: "include",
            cache: "no-store"
        })
        const data = await res.json()
        setPlayers(data.filter(p=>!p.isSold))
    }
  return (
    <div>
        <Card className="dark mx-auto w-[80%]">

        </Card>
    </div>
  )
}

export default AuctionPage