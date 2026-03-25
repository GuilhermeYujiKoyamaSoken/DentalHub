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
import { Menu, Mail } from "lucide-react";
import { useSession } from 'next-auth/react'
import { handleRegister } from '../_actions/login'

export function Header() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: "#profissionais", label: "Profissionais" },
        { href: "#contatos", label: "Contatos" }
    ]

    async function handleLogin() {
        await handleRegister("google");
    }

    const NavLinks = () => (
        <>
            {navItems.map((item) => (
                <Button
                    onClick={() => setIsOpen(false)}
                    key={item.href}
                    asChild
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                    <Link href={item.href} className='text-base font-medium'>
                        {item.label}
                    </Link>
                </Button>
            ))}

            {status === 'loading' ? (
                <div className="h-10 w-32 bg-gray-100 animate-pulse rounded-md"></div>
            ) : session ? (
                <Link
                    href={"/dashboard"}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 px-5 rounded-lg hover:bg-emerald-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                    Acessar clínica
                </Link>
            ) : (
                <Button
                    onClick={() => {
                        handleLogin();
                        setIsOpen(false);
                    }}
                    className="bg-white border-2 border-gray-200 hover:border-emerald-200 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200 gap-2 shadow-sm"
                >
                    <Mail className="h-4 w-4" />
                    Entrar com Google
                </Button>
            )}
        </>
    )

    return (
        <header className="fixed top-0 right-0 left-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
            <div className="container mx-auto px-6 py-3">
                <div className="flex items-center justify-between">

                    <Link href="/" className="group">
                        <span className="text-3xl font-bold text-gray-900">
                            Dental<span className="text-emerald-500 group-hover:text-emerald-600 transition-colors">Hub</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-2">
                        <NavLinks />
                    </nav>

                    {/* Mobile Navigation */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-75 sm:w-87.5">
                            <SheetHeader className="mb-6">
                                <SheetTitle className="text-2xl font-bold text-gray-900">
                                    Dental<span className="text-emerald-500">Hub</span>
                                </SheetTitle>
                                <SheetDescription className="text-gray-500 pt-2">
                                    {!session
                                        ? "Entre com sua conta Google para acessar a clínica"
                                        : `Bem-vindo, ${session.user?.name?.split(' ')[0] || session.user?.email?.split('@')[0] || 'de volta'}!`}
                                </SheetDescription>
                            </SheetHeader>

                            <nav className='flex flex-col gap-3'>
                                {navItems.map((item) => (
                                    <Button
                                        key={item.href}
                                        asChild
                                        variant="ghost"
                                        onClick={() => setIsOpen(false)}
                                        className="justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    >
                                        <Link href={item.href} className='text-base font-medium'>
                                            {item.label}
                                        </Link>
                                    </Button>
                                ))}

                                <div className="pt-4 border-t border-gray-100">
                                    {status === 'loading' ? (
                                        <div className="h-10 w-full bg-gray-100 animate-pulse rounded-lg"></div>
                                    ) : session ? (
                                        <Link
                                            href={"/dashboard"}
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 px-5 rounded-lg hover:bg-emerald-700 transition-all duration-200 font-medium w-full"
                                        >
                                            Acessar clínica
                                        </Link>
                                    ) : (
                                        <Button
                                            onClick={() => {
                                                handleLogin();
                                                setIsOpen(false);
                                            }}
                                            className="w-full bg-white border-2 border-gray-200 hover:border-emerald-200 text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200 gap-2"
                                        >
                                            <Mail className="h-4 w-4" />
                                            Entrar com Google
                                        </Button>
                                    )}
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}