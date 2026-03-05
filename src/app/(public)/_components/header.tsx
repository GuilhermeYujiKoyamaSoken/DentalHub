'use client'

import { useState } from 'react'
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { LogIn, Menu, Github, Mail } from "lucide-react";
import { useSession } from 'next-auth/react'
import { handleRegister } from '../_actions/login'

export function Header() {
    const { data: session, status} = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [showLoginOptions, setShowLoginOptions] = useState(false);

    const navItems = [
        { href: "#profissionais", label: "Profissionais" },
        { href: "#contatos", label: "Contatos" }
    ]

    async function handleLogin(provider: "google" | "github"){
        await handleRegister(provider);
    }

    const NavLinks = () => (
        <>
            {navItems.map((item) => (
                <Button
                    onClick={() => setIsOpen(false)}
                    key={item.href}
                    asChild
                    className="bg-transparent hover:bg-transparent text-black shadow-none"
                >
                    <Link href={item.href} className='text-base'>
                        {item.label}
                    </Link>
                </Button>
            ))}

            { status === 'loading' ? (
                <></>
            ) : session ? (
                <Link 
                    href={"/dashboard"}
                    className='flex items-center justify-center gap-2 bg-zinc-900 text-white py-2 px-4 rounded-md hover:bg-zinc-800 transition-colors'
                >
                    Acessar clínica
                </Link>
            ) : (
                <div className="flex flex-col gap-2 w-full">
                    {!showLoginOptions ? (
                        <Button 
                            onClick={() => setShowLoginOptions(true)}
                            className="flex items-center gap-2"
                        >
                            <LogIn className="h-4 w-4" />
                            Portal da clínica
                        </Button>
                    ) : (
                        <>
                            <Button 
                                onClick={() => {
                                    handleLogin("google");
                                    setIsOpen(false);
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                            >
                                <Mail className="h-4 w-4" />
                                Continuar com Google
                            </Button>
                            <Button 
                                onClick={() => {
                                    handleLogin("github");
                                    setIsOpen(false);
                                }}
                                className="bg-gray-800 hover:bg-gray-900 text-white flex items-center gap-2"
                            >
                                <Github className="h-4 w-4" />
                                Continuar com GitHub
                            </Button>
                            <Button 
                                onClick={() => setShowLoginOptions(false)}
                                variant="ghost"
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Voltar
                            </Button>
                        </>
                    )}
                </div>
            )}
        </>
    )

    return (
        <header className="fixed top-0 right-0 left-0 z-50 py-4 px-6 bg-white border-b">
            <div className="container mx-auto flex items-center justify-between">

                <Link href="/" className="text-3xl font-bold text-zinc-900">
                    Dental<span className="text-emerald-500">Hub</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-4">
                    <NavLinks />
                </nav>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button className="text-black hover:bg-transparent" variant="ghost" size="icon">
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-72 sm:w-80 z-9999">
                        <SheetHeader className="mb-4">
                            <SheetTitle className="mt-4 text-lg">Menu</SheetTitle>
                            <SheetDescription>
                                {!session ? "Faça login para acessar a clínica" : "Bem-vindo de volta!"}
                            </SheetDescription>
                        </SheetHeader>

                        <nav className='flex flex-col space-y-3 mt-2'>
                            <NavLinks />
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}