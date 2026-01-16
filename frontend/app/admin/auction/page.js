"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
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

import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Input } from '@/components/ui/input'


const AuctionPage = () => {

    const searchParams = useSearchParams()
    const [preSelectedPlayerId, setPreSelectedPlayerId] = useState(null)

    const [players, setPlayers] = useState([])
    const [teams, setTeams] = useState([])


    const [playerId, setPlayerId] = useState("")
    const [teamId, setTeamId] = useState("")
    const [price, setPrice] = useState("")
    const [selectedPlayer, setSelectedPlayer] = useState(null)


    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [mounted, setMounted] = useState(false)


    useEffect(() => {
        const id = searchParams.get("playerId")
        if (id) {
            setPreSelectedPlayerId(id)
        }
    }, [searchParams])





    const fetchPlayers = async () => {
        const res = await fetch("http://localhost:5000/admin/players", {
            credentials: "include",
            cache: "no-store"
        })
        const data = await res.json()


        const unsold = data.filter(p => !p.isSold)
        setPlayers(unsold)

        if (preSelectedPlayerId) {
            const found = unsold.find(p => p._id === preSelectedPlayerId)
            if (found) {
                setPlayerId(found._id)
                setSelectedPlayer(found)
            }
        }

    }

    const fetchTeams = async () => {
        const res = await fetch("http://localhost:5000/admin/teams", {
            credentials: "include",
            cache: "no-store"
        })

        const data = await res.json()
        setTeams(data)
    }

    useEffect(() => {
        fetchPlayers()
        fetchTeams()
    }, [])



    useEffect(() => {
        if (!preSelectedPlayerId || players.length === 0) {
            return
        }
        const found = players.find(p => p._id === preSelectedPlayerId)
        if (found) {
            setPlayerId(found._id)
            setSelectedPlayer(found)
        }
    }, [preSelectedPlayerId, players])

    useEffect(() => {
        const found = players.find(p => p._id === playerId)
        setSelectedPlayer(found || null)

    }, [playerId, players])


    const handleSellPlayer = async () => {
        if (!playerId || !teamId || !price) {
            setMessage("all fields are requird")
            return
        }
        try {
            setLoading(true)
            setMessage(null)

            const res = await fetch("http://localhost:5000/admin/sell-player", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    playerId,
                    teamId,
                    soldPrice: Number(price)
                })
            })

            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error)
            }
            setMessage("Player sold successfully")
            setPlayerId("")
            setTeamId("")
            setPrice("")
            fetchPlayers()
            fetchTeams()
            toast(`Player Sold to Successfully`)
        } catch (err) {
            setMessage(err.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Card className="dark mx-auto w-[80%]">
                <CardHeader>
                    <CardTitle>Auction - Sell Player</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-5">
                    <Label className="py-5">Player</Label>

                    <Select value={playerId} onValueChange={setPlayerId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Player" />
                        </SelectTrigger>

                        <SelectContent
                            position="popper"
                            side="bottom"
                            align="start"
                            className="dark z-50"
                        >
                            {players.length === 0 && (
                                <div className="px-2 py-1 text-sm text-muted-foreground">
                                    No players available
                                </div>
                            )}

                            {players.map((player) => (
                                <SelectItem key={player._id} value={player._id}>
                                    {player.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {selectedPlayer && (
                        <Item variant='outline'>
                            <ItemTitle>Details</ItemTitle>
                            <ItemContent>Name: {selectedPlayer.name}</ItemContent>
                            <ItemContent>Position: {selectedPlayer.position}</ItemContent>
                            <ItemContent>Rating: {selectedPlayer.rating}</ItemContent>
                            <ItemContent>Base Price: {selectedPlayer.basePrice}</ItemContent>
                        </Item>
                    )}

                    <Label className="py-5">Team</Label>
                    <Select value={teamId} onValueChange={setTeamId}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Team" className="w-full" />
                        </SelectTrigger>
                        <SelectContent className="dark" position='popper' side="bottom" align='start'>
                            {teams.length === 0 && (
                                <div className="px-2 py-1 text-sm text-muted-foreground">
                                    No teams available
                                </div>
                            )}
                            {teams.map(team => (
                                <SelectItem key={team._id} value={team._id}>
                                    {team.teamName}- {team.purse} Left
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Label className="py-5">Final Bid Price</Label>
                    <Input type="number" value={price} onChange={e => { setPrice(e.target.value) }} placeholder="Enter the final bid price" />
                    {message && <p className="text-sm">{message}</p>}

                    <Button
                        className="w-full" onClick={handleSellPlayer} disabled={loading}
                    >
                        {loading ? "Selling" : "Sell Player"}
                    </Button>

                </CardContent>
            </Card>
        </div>
    )
}

export default AuctionPage