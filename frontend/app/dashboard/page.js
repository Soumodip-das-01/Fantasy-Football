import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { BadgeCheckIcon, ChevronRightIcon, BookmarkIcon, StarIcon, TrophyIcon, UserRoundPlusIcon } from "lucide-react"
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemHeader,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"

const dashboard = async () => {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    return (
        <>
            <div className="flex">
                <div className="flex w-full max-w-md flex-col gap-6 m-10">
                    <Item variant="outline" className="dark text-white">
                        <ItemContent>
                            <ItemMedia>
                                <Avatar>
                                    <Link href={"/upload"}><AvatarImage src={session.user.image} />
                                        <AvatarFallback>CN</AvatarFallback></Link>
                                </Avatar>
                            </ItemMedia>
                            <ItemTitle className="">{session.user.name}</ItemTitle>
                            <ItemDescription>
                                {session.user.email}
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="outline" size="sm" >
                                Action
                            </Button>

                        </ItemActions>
                    </Item>
                    <Item className="dark text-white" variant="outline" size="sm" asChild >
                        <a href="#">
                            <ItemMedia>
                                <BadgeCheckIcon className="size-5" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>Your profile has been verified.</ItemTitle>
                            </ItemContent>
                            <ItemActions>
                                <ChevronRightIcon className="size-4" />
                            </ItemActions>
                        </a>
                    </Item>
                    <Item variant="outline" className="dark text-white flex flex-col">
                        <ItemContent>
                            <ItemDescription>
                                Your bookmarks and Favourite players
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="outline" size="sm">
                                <BookmarkIcon className='size-5' /> Bookmarks
                            </Button>
                            <Button variant="outline" size="sm">
                                <StarIcon className='size-5' /> Favourites
                            </Button>
                        </ItemActions>
                    </Item>
                </div>
                <Separator orientation='vertical' className="bg-white/20 h-[70vh]" />
                <div className='p-10 flex flex-col gap-5'>
                    <Item variant='outline' className="flex dark text-white w-4xl justify-around h-48">
                        <Item variant='outline' className="w-1/5 h-[80%]">
                            <ItemTitle>
                                Attackers
                            </ItemTitle>
                        </Item>
                        <Item variant='outline' className="w-1/5 h-[80%]">
                            <ItemTitle>
                                Midfielders
                            </ItemTitle>
                        </Item>
                        <Item variant='outline' className="w-1/5 h-[80%]">
                            <ItemTitle>
                                Defender
                            </ItemTitle>
                        </Item>
                        <Item variant='outline' className="w-1/5 h-[80%]">
                            <ItemTitle>
                                Goalkeepers
                            </ItemTitle>
                        </Item>
                    </Item>
                    <Separator className="bg-white/40 " />
                    <div className='flex w-full justify-around gap-5'>
                        <div className="w-full">

                            <Link href={"/leaderboard"}>
                                <Item variant='outline' className="flex dark text-white justify-around h-20">
                                    <ItemTitle>
                                        Leaderboard <TrophyIcon className='size-4' />
                                    </ItemTitle>
                                    <ItemContent><ChevronRightIcon className='size-4' /></ItemContent>
                                </Item>
                            </Link>
                        </div>
                        <div className="w-full">
                            <Link href={"/admin/team"}>
                                <Item variant='outline' className="flex dark text-white  justify-around h-20">
                                    <ItemTitle>
                                        Create Team <UserRoundPlusIcon className='size-4' />
                                    </ItemTitle>
                                    <ItemContent><ChevronRightIcon className='size-4' /></ItemContent>
                                </Item>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default dashboard