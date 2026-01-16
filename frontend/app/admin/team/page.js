"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



const CreateTeamPage = () => {
  const [teamName, setTeamName] = useState("")
  const [purse, setPurse] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [teams, setTeams] = useState([])
  const [loadingTeams, setLoadingTeams] = useState(false)

  const fetchTeams = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/teams", {
        credentials: "include",
        cache: "no-store",
      })
      const data = await res.json()
      setTeams(data)
    } catch (error) {
      console.error("failed to fetch items")
    } finally {
      setLoadingTeams(false)
    }
  }

  useEffect(() => {
    fetchTeams()
  }, [])


  const handleCreateTeam = async () => {
    if (!teamName || !purse) {
      setMessage("Team name and purse required")
      return
    }
    try {
      setLoading(true)
      setMessage(null)
      setIsError(false)

      const res = await fetch("http://localhost:5000/admin/teams/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          teamName,
          purse: Number(purse)
        })
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "failed to create team")
      }
      setMessage("team created successfully")
      setTeamName("")
      setPurse("")
      fetchTeams()
    } catch (err) {
      setMessage(`${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTeam = async( teamId) =>{
    try{
      const res = await fetch(`http://localhost:5000/admin/teams/${teamId}`,{
        method:"DELETE",
        credentials:"include"
      })

      const data = await res.json()

      if (!res.ok){
        throw new Error(data.error||"Can't Delete Team")
      }
      fetchTeams()
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className=' mx-10 '>
      <Tabs defaultValue="create">
        <TabsList className="dark">
          <TabsTrigger value="create">Create Team</TabsTrigger>
          <TabsTrigger value="list">Teams Standings</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <Card variant="outline" className="dark  mx-auto">
            <CardHeader>
              <CardTitle>
                Create Teams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-2'>
                <Label htmlFor="teamName" className="p-2" >Team Name</Label>
                <Input id="teamName" placeholder="Enter the name here" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
              </div>
              <div className='flex flex-col gap-2'>
                <Label htmlFor="purse" className="p-2" >Initial Purse</Label>
                <Input id="purse" placeholder="Enter the purse" value={purse} type="number" onChange={(e) => setPurse(e.target.value)} />
              </div>
              <div className='flex flex-col gap-2'>
                {message && <p className='text-red-500'>{message}</p>}
              </div>

              <Button className="w-full mt-10" onClick={handleCreateTeam} disabled={loading}>
                {loading ? "Creating Team.." : "Create"}
              </Button>

            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list">

          <Card className="dark">
            <CardHeader>
              <CardTitle>
                Teams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Team Rating</TableHead>
                    <TableHead>Purse Left</TableHead>
                    <TableHead className="text-right">Players</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team._id}>
                      <TableCell>{team.teamName}</TableCell>
                      <TableCell>{team.teamRating}</TableCell>
                      <TableCell >₹{team.purse}</TableCell>
                      <TableCell className="text-right">{team.players.length}/11</TableCell>
                      <TableCell className="text-right" variant="destructive"><Button onClick={()=>{handleDeleteTeam(team._id)}}>Delete</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CreateTeamPage