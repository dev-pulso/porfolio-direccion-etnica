"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Link } from "react-router"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarFallback, AvatarImage } from "./ui/avatar"
import Logo from '@public/icon.svg'

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { href: "/", label: "Inicio" },
        { href: "/certificado", label: "Certificado" },
        { href: "/procesos", label: "Procesos" },
        { href: "/galerias", label: "Galerías" },
        { href: "/nosotros", label: "Nosotros" },
    ]

    return (
        <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                            <Avatar>
                                <AvatarImage src={Logo} />
                                <AvatarFallback>DE</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="hidden md:block">
                            <div className="text-lg font-bold leading-tight">Dirección Étnica</div>
                            <div className="text-xs opacity-90">Municipal Maicao</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link key={link.href} to={link.href}>
                                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-primary-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 space-y-2 border-t border-primary-foreground/20">
                        {navLinks.map((link) => (
                            <Link key={link.href} to={link.href} onClick={() => setIsOpen(false)}>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
                                >
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}
