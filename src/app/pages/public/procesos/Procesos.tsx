'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { noticiasApi, type Noticia } from '@/api/noticias'
import { getStorageUrl } from '@/lib/storage'

const ITEMS_PER_PAGE = 6

export default function ProcesosPage() {
    const [noticias, setNoticias] = useState<Noticia[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await noticiasApi.getActivas()
                console.log('Noticias cargadas:', data)
                setNoticias(data)
            } catch (error) {
                console.error('Error al cargar noticias:', error)
                setError('Error al cargar las noticias. Por favor, intenta de nuevo.')
            } finally {
                setLoading(false)
            }
        }

        fetchNoticias()
    }, [])

    const filteredNews = useMemo(() => {
        let filtered = noticias

        if (startDate || endDate) {
            filtered = filtered.filter(noticia => {
                const noticiaDate = new Date(noticia.fecha_noticia)
                const start = startDate ? new Date(startDate) : new Date('2000-01-01')
                const end = endDate ? new Date(endDate) : new Date('2100-12-31')
                return noticiaDate >= start && noticiaDate <= end
            })
        }

        return filtered
    }, [noticias, startDate, endDate])

    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handleDateChange = () => {
        setCurrentPage(1)
    }

    if (loading) {
        return (
            <div className="min-h-screen py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">Cargando noticias...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center py-12">
                        <p className="text-red-500 text-lg">{error}</p>
                        <Button onClick={() => window.location.reload()} className="mt-4">
                            Reintentar
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-16 bg-background">
            <div className="container mx-auto px-4">
                {/* Hero Image */}
                <div className="relative h-[300px] rounded-xl overflow-hidden mb-12">
                    <img
                        src="/press-room-hero.jpg"
                        alt="Notas de Prensa - Dirección Étnica"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-balance">
                            Notas de Prensa
                        </h1>
                        <p className="text-white/90 text-lg max-w-3xl mx-auto text-pretty">
                            Conoce los acompañamientos y procesos que la Dirección Étnica realiza semanalmente para el bienestar de la comunidad Wayuu
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center mb-12">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Desde:</label>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value)
                                handleDateChange()
                            }}
                            className="w-auto"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Hasta:</label>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value)
                                handleDateChange()
                            }}
                            className="w-auto"
                        />
                    </div>
                    {(startDate || endDate) && (
                        <Button
                            variant="outline"
                            onClick={() => {
                                setStartDate('')
                                setEndDate('')
                                setCurrentPage(1)
                            }}
                        >
                            Limpiar filtros
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {paginatedNews.map((noticia) => (
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
                                <CardDescription className="text-pretty line-clamp-2">
                                    {noticia.subtitulo}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <a href={`/noticias/${noticia.id}`} className="mt-auto">
                                    <Button variant="outline" className="w-full cursor-pointer">
                                        Leer más
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setCurrentPage(page)}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* Empty state */}
                {filteredNews.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">
                            No se encontraron notas de prensa con los filtros seleccionados.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
