"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getStorageUrl } from '@/lib/storage'
import { noticiasApi, type Noticia } from '@/api/noticias'

export function NewsSection() {
    const [noticias, setNoticias] = useState<Noticia[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const data = await noticiasApi.getActivas()
                // Limitar a las 6 más recientes
                setNoticias(data.slice(0, 6))
            } catch (error) {
                console.error('Error al cargar noticias:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchNoticias()
    }, [])

    if (loading) {
        return (
            <section className="py-16 bg-background" id="noticias">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Notas de Prensa</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                            Mantente informado sobre las últimas actividades y procesos de la Dirección Étnica Municipal
                        </p>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Cargando noticias...</p>
                    </div>
                </div>
            </section>
        )
    }

    if (noticias.length === 0) {
        return (
            <section className="py-16 bg-background" id="noticias">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Notas de Prensa</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                            Mantente informado sobre las últimas actividades y procesos de la Dirección Étnica Municipal
                        </p>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No hay noticias disponibles</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 bg-background" id="noticias">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Notas de Prensa</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                        Mantente informado sobre las últimas actividades y procesos de la Dirección Étnica Municipal
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {noticias.map((noticia) => (
                        <Card key={noticia.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                            <img
                                src={getStorageUrl(noticia.imagen)}
                                alt={noticia.titulo}
                                className="w-full h-48 object-cover"
                            />
                            <CardHeader>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(noticia.fecha_noticia).toLocaleDateString('es-CO', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                                <CardTitle className="text-xl text-balance">{noticia.titulo}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <CardDescription className="text-pretty mb-4 flex-1">{noticia.subtitulo}</CardDescription>
                                <a href={`/noticias/${noticia.id}`}>
                                    <Button variant="outline" className="w-full cursor-pointer">
                                        Leer más
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <a href="/procesos">
                        <Button size="lg" className="cursor-pointer">
                            Ver todas las notas de prensa
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    )
}
