import React from 'react'
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
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

const leaderboard = async () => {

    const res = await fetch("http://localhost:5000/api/leaderboard",{
        cache: "no-store"
    })

    if (!res.ok){
        throw new Error("Failed to fetch leaderboard")
    }

    const leaderboard = await res.json()

  return (
    <div className='text-white w-6xl mx-auto'>
            {leaderboard.length>0 &&
            
          <Table className="dark">
              <TableCaption>Current Leaderboard</TableCaption>
              <TableHeader>
                  <TableRow>
                      <TableHead className="w-25">Rank</TableHead>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Team Rating</TableHead>
                      <TableHead className="text-right">Purse left</TableHead>
                      <TableHead className="text-right">Player Count / Space Left</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {leaderboard.map((team) => (
                      <TableRow key={team.rank}>
                          <TableCell className="font-medium">#{team.rank}</TableCell>
                          <TableCell>{team.teamName}</TableCell>
                          <TableCell>{team.teamRating}</TableCell>
                          <TableCell>₹{team.purseRemaining}</TableCell>
                          <TableCell className="text-right">{team.playersCount} / 11</TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
        }  
        {
            leaderboard.length == 0 && <Card className="dark text-center"><CardTitle>Add players to get the leaderboard</CardTitle></Card>
        }     
    </div>

  )
}

export default leaderboard