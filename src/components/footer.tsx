"use client"

import { useState, useEffect } from 'react'
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react'
import { empresaApi, type Empresa } from '@/api/empresa'

export function Footer() {
    const [empresa, setEmpresa] = useState<Empresa | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEmpresa = async () => {
            try {
                const data = await empresaApi.getPublica()
                setEmpresa(data)
            } catch (error) {
                console.error('Error al cargar información de la empresa:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchEmpresa()
    }, [])

    if (loading) {
        return (
            <footer className="bg-secondary text-secondary-foreground">
                <div className="container mx-auto px-4 py-12">
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">Cargando...</p>
                    </div>
                </div>
            </footer>
        )
    }

    return (
        <footer className="bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contacto</h3>
                        <div className="space-y-3">
                            {empresa?.direccion && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm leading-relaxed">
                                        {empresa.direccion}
                                        {empresa.municipio && empresa.departamento && (
                                            <>
                                                <br />
                                                {empresa.municipio.nombre}, {empresa.departamento.nombre}
                                            </>
                                        )}
                                    </p>
                                </div>
                            )}
                            {empresa?.celular && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 flex-shrink-0" />
                                    <p className="text-sm">{empresa.celular}</p>
                                </div>
                            )}
                            {empresa?.email && (
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 flex-shrink-0" />
                                    <p className="text-sm">{empresa.email}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/certificado" className="text-sm hover:text-accent transition-colors">
                                    Solicitar Certificado
                                </a>
                            </li>
                            <li>
                                <a href="/procesos" className="text-sm hover:text-accent transition-colors">
                                    Ver Procesos
                                </a>
                            </li>
                            <li>
                                <a href="/nosotros" className="text-sm hover:text-accent transition-colors">
                                    Sobre Nosotros
                                </a>
                            </li>
                            {empresa?.web && (
                                <li>
                                    <a
                                        href={empresa.web}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm hover:text-accent transition-colors"
                                    >
                                        Sitio Web Municipal
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Síguenos</h3>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                                <Instagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} {empresa?.titulo1 || 'Dirección Étnica Municipal'}. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}
