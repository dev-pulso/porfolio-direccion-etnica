"use client"

import { galeriasApi, type Galeria } from "@/api/galerias"
import { Button } from "@/components/ui/button"
import { getStorageUrl } from "@/lib/storage"
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "react-router"

interface GalleryDetailPageProps {
    params: Promise<{
        id: string
    }>
}

export default function GalleryDetailPage() {
    const [gallery, setGallery] = useState<Galeria | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
    const [galleryId, setGalleryId] = useState<string | null>(null)

    const params = useParams()

    useEffect(() => {
        const resolveParams = async () => {
            setGalleryId(params.id ?? '')
        }
        resolveParams()
    }, [params])

    useEffect(() => {
        if (!galleryId) return

        const fetchGallery = async () => {
            try {
                const data = await galeriasApi.getById(Number(galleryId))
                setGallery(data)
            } catch (error) {
                console.error('Error al cargar galería:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchGallery()
    }, [galleryId])

    const handlePrevious = () => {
        if (selectedImageIndex !== null && selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1)
        }
    }

    const handleNext = () => {
        if (gallery?.imagenes && selectedImageIndex !== null && selectedImageIndex < gallery.imagenes.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1)
        }
    }

    const handleBackToGalleries = () => {
        window.location.href = "/galerias"
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground">Cargando galería...</p>
                </div>
            </div>
        )
    }

    if (!gallery) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Galería no encontrada</h1>
                    <Button onClick={handleBackToGalleries}>Volver a Galerías</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-16 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
                <Button variant="ghost" className="mb-8 cursor-pointer" onClick={handleBackToGalleries}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a Galerías
                </Button>

                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(gallery.fecha).toLocaleDateString('es-CO', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>

                    <h1 className="text-4xl font-bold mb-3 text-balance">{gallery.titulo}</h1>
                    {gallery.subtitulo && (
                        <p className="text-xl text-muted-foreground text-pretty">{gallery.subtitulo}</p>
                    )}
                    {gallery.descripcion && (
                        <p className="mt-4 text-muted-foreground text-pretty">{gallery.descripcion}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gallery.imagenes?.map((imagen, index) => (
                        <div
                            key={imagen.id}
                            className="relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedImageIndex(index)}
                        >
                            <img
                                src={getStorageUrl(imagen.imagen)}
                                alt={`${gallery.titulo} - Imagen ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Modal for selected image with navigation */}
                {selectedImageIndex !== null && gallery.imagenes && (
                    <div
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                            onClick={() => setSelectedImageIndex(null)}
                        >
                            <X className="h-8 w-8" />
                        </button>

                        {/* Previous button */}
                        {selectedImageIndex > 0 && (
                            <button
                                className="absolute left-4 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 z-10"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handlePrevious()
                                }}
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </button>
                        )}

                        {/* Image */}
                        <div className="relative w-full max-w-6xl h-[90vh]" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={getStorageUrl(gallery.imagenes[selectedImageIndex].imagen)}
                                alt={`${gallery.titulo} - Imagen ${selectedImageIndex + 1}`}
                                className="w-full h-full object-contain"
                            />
                            {/* Image counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                                {selectedImageIndex + 1} / {gallery.imagenes.length}
                            </div>
                        </div>

                        {/* Next button */}
                        {selectedImageIndex < gallery.imagenes.length - 1 && (
                            <button
                                className="absolute right-4 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 z-10"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleNext()
                                }}
                            >
                                <ChevronRight className="h-8 w-8" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
