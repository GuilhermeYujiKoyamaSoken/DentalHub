'use client'

import { useState } from 'react'
import Link from "next/link";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { LogIn, Menu } from "lucide-react";
import { useSession } from 'next-auth/react'
import { handleRegister } from '../_actions/login'

export function Header() {
    const { data: session, status} = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: "#profissionais", Label: "Profissionais" },
        { href: "#contatos", Label: "Contatos" }
    ]

    async function handleLogin(){
        await handleRegister("github");
    }

    const NavLinks = () => (
        <>
            {navItems.map((item) => (
                <Button
                    onClick={() => setIsOpen(false)}
                    key={item.href}
                    asChild
                    className="bg-transparent hover:bg-tranparent text-black shadow-none">
                    <Link href={item.href} className='text-base '>
                        {item.Label}
                    </Link>
                </Button>
            ))}

            { status === 'loading' ? (
                <></>
            ) : session ? (
                <Link href={"/dashboard"}
                 className='flex items-center justify-center gap-2 bg-zinc-900 text-white py-1 rounded-md px-3'>
                    Acessar clínica
                </Link>
            ) : (
                <Button onClick={handleLogin}>
                    <LogIn></LogIn>
                    Portal da clínica
                </Button>
            )}
        </>
    )

    return (
        <header className="fixed top-0 right-0 left-0 z-index-999 py-4 px-6 bg-white">
            <div className="container mx-auto flex items-center justify-between">

                <Link href="/" className="text-3xl font-bold text-zinc-900">
                    Dental<span className="text-emerald-500">Hub</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-4">
                    <NavLinks></NavLinks>
                </nav>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button className="text-black hover:bg-transparent" variant={"ghost"} size={"icon"}>
                            <Menu className="w-6 h-6"></Menu>
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-60 sm:w-75 z-9999 text-center">
                        <SheetTitle className='mt-4'>menu</SheetTitle>
                        <SheetHeader></SheetHeader>
                        <SheetDescription>Veja nossos links</SheetDescription>

                        <nav className='flex flex-col space-y-4 mt-6'>
                            <NavLinks></NavLinks>
                        </nav>

                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}