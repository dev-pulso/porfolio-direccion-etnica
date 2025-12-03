"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { galeriasApi, type Galeria } from "@/api/galerias"

export function PhotoGallery() {
    const [galerias, setGalerias] = useState<Galeria[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchGalerias = async () => {
            try {
                const data = await galeriasApi.getRecent(6)
                setGalerias(data)
            } catch (error) {
                console.error('Error al cargar galerías:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchGalerias()
    }, [])

    if (loading) {
        return (
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Comunidad Wayuu</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                            Conoce la riqueza cultural y tradiciones de nuestro pueblo indígena
                        </p>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Cargando galerías...</p>
                    </div>
                </div>
            </section>
        )
    }

    if (galerias.length === 0) {
        return (
            <section className="py-16 bg-muted">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Comunidad Wayuu</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                            Conoce la riqueza cultural y tradiciones de nuestro pueblo indígena
                        </p>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No hay galerías disponibles</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Comunidad Wayuu</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                        Conoce la riqueza cultural y tradiciones de nuestro pueblo indígena
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {galerias.map((galeria) => {
                        // Obtener la primera imagen de la galería como cover
                        const coverImage = galeria.imagenes && galeria.imagenes.length > 0
                            ? galeria.imagenes[0].imagen_url
                            : "/placeholder.svg"

                        return (
                            <a
                                key={galeria.id}
                                href={`/galerias/${galeria.id}`}
                                className="group block bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={coverImage}
                                        alt={galeria.titulo}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(galeria.fecha).toLocaleDateString('es-CO', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-balance">{galeria.titulo}</h3>
                                    {galeria.subtitulo && (
                                        <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{galeria.subtitulo}</p>
                                    )}
                                </div>
                            </a>
                        )
                    })}
                </div>

                <div className="text-center">
                    <a href="/galerias">
                        <Button size="lg" className="cursor-pointer">
                            Ver más galerías
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    )
}
