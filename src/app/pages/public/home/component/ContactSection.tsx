"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { MapPin, Send } from 'lucide-react'
import { empresaApi, type Empresa } from '@/api/empresa'

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))
        alert('Mensaje enviado exitosamente. Nos pondremos en contacto pronto.')
        setFormData({ name: '', email: '', message: '' })
        setIsSubmitting(false)
    }

    if (loading) {
        return (
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <p className="text-muted-foreground">Cargando información...</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ubicación y Contacto</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                        Visítanos o envíanos tus consultas
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Map */}
                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Nuestra Ubicación
                            </CardTitle>
                            <CardDescription>
                                {empresa?.direccion && empresa?.municipio?.nombre && empresa?.departamento?.nombre
                                    ? `${empresa.direccion}, ${empresa.municipio.nombre}, ${empresa.departamento.nombre}`
                                    : 'Calle 12 # 11 – 36, Centro Administrativo Municipal CAM, Maicao, La Guajira'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="relative h-[400px] bg-muted">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31446.94!2d-72.9!3d11.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDMyJzI2LjQiTiA3MsKwNTQnMDAuMCJX!5e0!3m2!1sen!2sco!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación Dirección Étnica Municipal"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Envíanos un mensaje</CardTitle>
                            <CardDescription>
                                Responderemos tus dudas a la brevedad posible
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Contact Info */}
                            {empresa && (
                                <div className="mb-6 p-4 bg-muted rounded-lg space-y-2">
                                    {empresa.celular && (
                                        <p className="text-sm">
                                            <strong>Teléfono:</strong> {empresa.celular}
                                        </p>
                                    )}
                                    {empresa.email && (
                                        <p className="text-sm">
                                            <strong>Email:</strong> {empresa.email}
                                        </p>
                                    )}
                                    {empresa.web && (
                                        <p className="text-sm">
                                            <strong>Web:</strong>{' '}
                                            <a
                                                href={empresa.web}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                {empresa.web}
                                            </a>
                                        </p>
                                    )}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre completo</Label>
                                    <Input
                                        id="name"
                                        placeholder="Tu nombre"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="tu@correo.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Mensaje</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Escribe tu consulta aquí..."
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    <Send className="h-4 w-4 mr-2" />
                                    {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
