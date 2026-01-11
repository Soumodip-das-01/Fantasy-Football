"use client"


import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from 'react'
import Link from "next/link"
import { ArrowUpIcon, Search, ArrowDown } from "lucide-react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
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
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "@/components/ui/button-group"

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

const CreatePlayerPage = () => {
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)

    const [searchQuery, setSearchQuery] = useState("")
    const [positionFilter, setPositionFilter] = useState("ALL")
    const [statusFilter, setStatusFilter] = useState("ALL")
    const [sortBy, setSortBy] = useState("RATING_DESC")


    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [rating, setRating] = useState("")
    const [basePrice, setBasePrice] = useState("")


    const fetchPlayers = async () => {
        try {
            const res = await fetch("http://localhost:5000/admin/players", {
                credentials: "include",
                cache: "no-store"
            })

            if (!res.ok) {
                const text = await res.text()
                throw new Error(text)
            }

            const data = await res.json()
            setPlayers(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchPlayers()
    }, [])

    const handleCreatePlayer = async () => {
        if (!name || !position || !basePrice || !rating) {
            setMessage("all fields are required")
            return
        }
        try {
            setLoading(true)
            setMessage(null)

            const res = await fetch("http://localhost:5000/admin/players", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    position,
                    rating: Number(rating),
                    basePrice: Number(basePrice)
                })
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "failed to create player")
            }

            setMessage("Player Created")
            setName("")
            setPosition("")
            setRating("")
            setBasePrice("")
            fetchPlayers()
        } catch (err) {
            setMessage(err.message)
        } finally {
            setLoading(false)
        }

    }

    const handleDeletePlayer = async (playerId) => {
        try {
            const res = await fetch(`http://localhost:5000/admin/players/${playerId}`, {
                method: "DELETE",
                credentials: "include"
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to delete player")
            }

            fetchPlayers()
        } catch (err) {
            console.log(err.message)
        }
    }

    const filteredPlayers = players.filter((player) => {
        const searchMatch = player.name.toLowerCase().includes(searchQuery.toLowerCase())

        const positionMatch = positionFilter === "ALL" || player.position === positionFilter

        const statusMatch = statusFilter === "ALL" || (statusFilter === "SOLD" && player.isSold) || (statusFilter === "UNSOLD" && !player.isSold)

        return searchMatch && positionMatch && statusMatch
    })

    const sortedPlayers = [...filteredPlayers].sort((a, b) => {
        switch (sortBy) {
            case "NAME_ASC":
                return a.name.localeCompare(b.name)
            case "NAME_DESC":
                return b.name.localeCompare(a.name)
            case "RATING_ASC":
                return a.rating - b.rating
            case "RATING_DESC":
                return b.rating - a.rating
            case "PRICE_ASC":
                return a.basePrice - b.basePrice
            case "PRICE_DESC":
                return b.basePrice - a.basePrice
            default:
                return 0
        }
    })


    return (
        <div>
            <Tabs defaultValue="create" className="w-full dark mx-10">
                <TabsList>
                    <TabsTrigger value="create">Create Players</TabsTrigger>
                    <TabsTrigger value="list">Player Database</TabsTrigger>
                </TabsList>
                <TabsContent value="create" className="text-white">
                    <Card className="max-w-[90%]">
                        <CardHeader>
                            <CardTitle>
                                Create players here
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Label>Enter Player name</Label>
                            <Input className="my-5" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter the player name here" />

                            <Label>Poition</Label>
                            <Select className="w-full dark" value={position} onValueChange={setPosition}>
                                <SelectTrigger className="w-full my-5">
                                    <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                                <SelectContent className="dark">
                                    <SelectGroup>
                                        <SelectLabel>Select Position</SelectLabel>
                                        <SelectItem value="ATTACKER">Attacker</SelectItem>
                                        <SelectItem value="MIDFIELDER">Midfielder</SelectItem>
                                        <SelectItem value="DEFENDER">Defender</SelectItem>
                                        <SelectItem value="GOALKEEPER">Goalkeeper</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Label>Rating</Label>
                            <Input className="my-5" type="number" value={rating} onChange={(e) => { setRating(e.target.value) }} placeholder="Enter the Rating" />

                            <Label>Base Price</Label>
                            <Select value={basePrice} onValueChange={setBasePrice}>
                                <SelectTrigger className="w-full my-5">
                                    <SelectValue placeholder="Select Base Value" />
                                </SelectTrigger>
                                <SelectContent className="dark">
                                    <SelectGroup >
                                        <SelectLabel>Select From Below</SelectLabel>
                                        <SelectItem value="500">500</SelectItem>
                                        <SelectItem value="1000">1000</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {message && (<p>{message}</p>)}
                            <Button className=" my-5 w-full" onClick={handleCreatePlayer} disabled={loading}>
                                {loading ? "Creating Player..." : "Create Player"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="list" className="text-white">
                    <div className="flex gap-5 ">
                        <InputGroup className="w-1/3 ml-20">
                            <InputGroupInput placeholder="Search..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">{sortedPlayers.length} results</InputGroupAddon>
                        </InputGroup>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-1/12">
                                <SelectValue placeholder="Sort Players" />
                            </SelectTrigger>
                            <SelectContent className="dark" >
                                <SelectGroup className="dark">
                                    <SelectLabel>By Rating</SelectLabel>
                                    <SelectItem value="RATING_DESC">Rating <ArrowDown/></SelectItem>
                                    <SelectItem value="RATING_ASC">Rating <ArrowUpIcon/></SelectItem>
                                </SelectGroup>
                                <SelectGroup className="dark">
                                    <SelectLabel>By Rating</SelectLabel>
                                    <SelectItem value="PRICE_DESC">Price <ArrowDown/></SelectItem>
                                    <SelectItem value="PRICE_ASC">Price <ArrowUpIcon/></SelectItem>
                                </SelectGroup>
                                <SelectGroup className="dark">
                                    <SelectLabel>By Name</SelectLabel>
                                    <SelectItem value="NAME_ASC">Name A–Z</SelectItem>
                                    <SelectItem value="NAME_DESC">Name Z–A</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Table className="mx-20 w-[80%]">
                        <TableCaption>List of Players Added to The Game</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Player name</TableHead>
                                <TableHead>Position</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Base Price</TableHead>
                                <TableHead className="text-right">Status & Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedPlayers.map((player) => (
                                <TableRow key={player._id}>
                                    <TableCell>{player.name}</TableCell>
                                    <TableCell>{player.position}</TableCell>
                                    <TableCell>{player.rating}</TableCell>
                                    <TableCell>{player.basePrice}</TableCell>
                                    <TableCell className="text-right flex items-center justify-end">{player.isSold ? "Sold" : <ButtonGroup className="dark">
                                        <Button variant="outline" size="sm"><Link href={"/admin/auction"}>Sell</Link></Button>
                                        <Button variant="destructive" size="sm" onClick={() => { handleDeletePlayer(player._id) }}>Delete</Button>
                                    </ButtonGroup>}</TableCell>
                                </TableRow>

                            ))}
                        </TableBody>
                    </Table>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default CreatePlayerPage