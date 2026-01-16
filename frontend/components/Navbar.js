"use client"

import React from 'react'
import CardNav from '@/components/CardNav';



const items = [
    {
        label: "About",
        bgColor: "#271E37",
        textColor: "#fff",
        links: [
            { label: "Company", ariaLabel: "About Company", href: "/about/company" },
            { label: "Careers", ariaLabel: "About Careers", href: "/about/career" }
        ],
    },
    {
        label: "Auction",
        bgColor: "#271E37",
        textColor: "#fff",
        links: [
            { label: "Player Auction", ariaLabel: "To auction", href: "/admin/auction" },
            
        ]
    },
    {
        label: "Players",
        bgColor: "#271E37",
        textColor: "#fff",
        links: [
            { label: "Create Playera And Player Database", ariaLabel: "To Playera", href: "/admin/players" },
            
        ]
    },
    {
        label: "Teams",
        bgColor: "#271E37",
        textColor: "#fff",
        links: [
            { label: "Create Teams and Team database", ariaLabel: "To Create Team", href: "/admin/team" },
        ]
    },


];
const Navbar = () => {
    return (

        <div className='overflow-x-auto'>
            <CardNav
                logo="/football.svg"
                logoAlt="Company Logo"
                items={items}
                baseColor="#fff"
                menuColor="#000"
                buttonBgColor="#111"
                buttonTextColor="#fff"
                ease="power3.out"
            />
        </div>


    )
}

export default Navbar