"use client"

import React from 'react'
import CardNav from '@/components/CardNav';



const items = [
    {
        label: "About",
        bgColor: "#0D0716",
        textColor: "#fff",
        links: [
            { label: "Company", ariaLabel: "About Company", href: "/about/company" },
            { label: "Careers", ariaLabel: "About Careers", href: "/about/career" }
        ],
    },
    {
        label: "Contact",
        bgColor: "#271E37",
        textColor: "#fff",
        links: [
            { label: "Email", ariaLabel: "Email us", href: "/contact/email" },
            { label: "Twitter", ariaLabel: "Twitter", href: "/contact/twitter" },
        ]
    },
    {
        label: "Players",
        bgColor: "#271E37",
        textColor: "#fff",
        links: [
            { label: "Forwards", ariaLabel: "To forwards list", href: "/players/forwards" },
            { label: "Midfielders", ariaLabel: "To midfielders list", href: "/players/midfielders" },
            { label: "Defenders", ariaLabel: "To defenders list", href: "/players/defenders" },
            { label: "Goalkeepers", ariaLabel: "to goalkeepers list", href: "/players/goalkeepers" },
        ]
    },
    {
        label: "Teams",
        bgColor: "#271E37",
        textColor: "#fff",
        links: [
            { label: "All teams", ariaLabel: "To All teams", href: "/teams/all" },
            { label: "Current Tournament", ariaLabel: "To Current tournament", href: "/teams/current" },
            { label: "Creat New team", ariaLabel: "To New Team Page", href: "/admin/team" },
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