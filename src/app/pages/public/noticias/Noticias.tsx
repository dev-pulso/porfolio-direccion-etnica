'use client'

import { useState, useEffect } from 'react'
import { Calendar, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { noticiasApi, type Noticia } from '@/api/noticias'
import { getStorageUrl } from '@/lib/storage'

export default function NewsDetailPage() {
    const [noticia, setNoticia] = useState<Noticia | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [noticiaId, setNoticiaId] = useState<number | null>(null)

    // Obtener el ID de la URL usando JavaScript puro (React)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname
            const parts = path.split('/')
            const id = parts[parts.length - 1]
            const parsedId = parseInt(id)

            console.log('URL path:', path)
            console.log('Extracted ID:', parsedId)

            if (!isNaN(parsedId)) {
                setNoticiaId(parsedId)
            } else {
                setError('ID de noticia inválido')
                setLoading(false)
            }
        }
    }, [])

    // Cargar la noticia cuando tengamos el ID
    useEffect(() => {
        const fetchNoticia = async () => {
            if (!noticiaId) return

            try {
                setLoading(true)
                setError(null)

                console.log('Fetching noticia with ID:', noticiaId)
                const data = await noticiasApi.getById(noticiaId)
                console.log('Noticia cargada:', data)
                setNoticia(data)
            } catch (error) {
                console.error('Error al cargar noticia:', error)
                setError('Error al cargar la noticia. Por favor, intenta de nuevo.')
            } finally {
                setLoading(false)
            }
        }

        fetchNoticia()
    }, [noticiaId])

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">Cargando noticia...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !noticia) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-16">
                    <a href="/procesos">
                        <Button variant="ghost" className="mb-6 cursor-pointer">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a notas de prensa
                        </Button>
                    </a>
                    <div className="text-center py-12">
                        <p className="text-red-500 text-lg">{error || 'Noticia no encontrada'}</p>
                        <Button onClick={() => window.location.reload()} className="mt-4">
                            Reintentar
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <a href="/procesos">
                    <Button variant="ghost" className="mb-6 cursor-pointer">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a notas de prensa
                    </Button>
                </a>

                <article className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <img
                            src={getStorageUrl(noticia.imagen)}
                            alt={noticia.titulo}
                            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <Calendar className="h-5 w-5" />
                        <span>
                            {new Date(noticia.fecha_noticia).toLocaleDateString('es-CO', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    <h1
                        className="text-4xl md:text-5xl font-bold mb-6 text-balance"
                        style={{ color: noticia.color_titulo || undefined }}
                    >
                        {noticia.titulo}
                    </h1>

                    <div className="prose prose-lg max-w-none prose-headings:text-primary prose-a:text-accent prose-strong:text-foreground">
                        <p className="text-xl leading-relaxed text-muted-foreground mb-6">
                            {noticia.subtitulo}
                        </p>
                        <div
                            className="text-foreground leading-relaxed whitespace-pre-wrap text-justify"
                            style={{ color: noticia.color_parrafo || undefined }}
                        >
                            {noticia.parrafo}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}
