"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { galeriasApi, type Galeria } from "@/api/galerias"
import { getStorageUrl } from "@/lib/storage"
import { NavLink } from "react-router"

const ITEMS_PER_PAGE = 6

export default function GaleriasPage() {
    const [galerias, setGalerias] = useState<Galeria[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    useEffect(() => {
        const fetchGalerias = async () => {
            try {
                const data = await galeriasApi.getAll()
                setGalerias(data)
            } catch (error) {
                console.error('Error al cargar galerías:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchGalerias()
    }, [])

    const filteredGalleries = useMemo(() => {
        let filtered = galerias

        if (startDate || endDate) {
            filtered = filtered.filter((gallery) => {
                const galleryDate = new Date(gallery.fecha)
                const start = startDate ? new Date(startDate) : new Date("2000-01-01")
                const end = endDate ? new Date(endDate) : new Date("2100-12-31")
                return galleryDate >= start && galleryDate <= end
            })
        }

        return filtered
    }, [galerias, startDate, endDate])

    const totalPages = Math.ceil(filteredGalleries.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const paginatedGalleries = filteredGalleries.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const handleDateChange = () => {
        setCurrentPage(1)
    }

    if (loading) {
        return (
            <div className="min-h-screen py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Galería de Imágenes</h1>
                        <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty">
                            Explora los momentos más importantes de nuestras actividades con la comunidad Wayuu
                        </p>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Cargando galerías...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-16 bg-background">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Galería de Imágenes</h1>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty">
                        Explora los momentos más importantes de nuestras actividades con la comunidad Wayuu
                    </p>
                </div>

                {/* Date Filters */}
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
                                setStartDate("")
                                setEndDate("")
                                setCurrentPage(1)
                            }}
                        >
                            Limpiar filtros
                        </Button>
                    )}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {paginatedGalleries.map((gallery) => (
                        <Card key={gallery.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                            <div className="relative w-full h-64 bg-muted">
                                <img
                                    src={gallery.imagenes && gallery.imagenes.length > 0
                                        ? getStorageUrl(gallery.imagenes[0].imagen)
                                        : "/placeholder.svg"}
                                    alt={gallery.titulo}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                    <ImageIcon className="h-4 w-4" />
                                    <span>{gallery.imagenes?.length || 0}</span>
                                </div>
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(gallery.fecha).toLocaleDateString('es-CO', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</span>
                                </div>
                                <CardTitle className="text-xl text-balance">{gallery.titulo}</CardTitle>
                                <CardDescription className="text-pretty">{gallery.subtitulo}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <NavLink to={`/galerias/${gallery.id}`} className="mt-auto">
                                    <Button variant="outline" className="w-full cursor-pointer bg-transparent">
                                        Ver galería
                                    </Button>
                                </NavLink>
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
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
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
                            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* Empty state */}
                {filteredGalleries.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No se encontraron galerías con los filtros seleccionados.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
