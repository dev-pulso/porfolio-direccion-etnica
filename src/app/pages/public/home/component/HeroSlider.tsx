"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getStorageUrl } from '@/lib/storage'
import { bannersApi, type Banner } from '@/api/banners'

export function HeroSlider() {
    const [slides, setSlides] = useState<Banner[]>([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const banners = await bannersApi.getActivos()
                setSlides(banners)
            } catch (error) {
                console.error('Error al cargar banners:', error)
            } finally {
                setLoading(false)
            }
        }


        fetchBanners()
    }, [])

    useEffect(() => {
        if (slides.length === 0) return

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [slides.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    if (loading) {
        return (
            <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Cargando banners...</p>
            </section>
        )
    }

    if (slides.length === 0) {
        return (
            <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">No hay banners disponibles</p>
            </section>
        )
    }

    return (
        <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-muted">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={getStorageUrl(slide.imagen)}
                        alt={slide.titulo}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-end">
                        <div className="container mx-auto px-4 pb-16">
                            <h2
                                className="text-3xl md:text-5xl font-bold mb-4 text-balance"
                                style={{ color: slide.color_titulo || '#ffffff' }}
                            >
                                {slide.titulo}
                            </h2>
                            <p
                                className="text-lg md:text-xl max-w-2xl text-pretty"
                                style={{ color: slide.color_subtitulo || 'rgba(255, 255, 255, 0.9)' }}
                            >
                                {slide.subtitulo}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Buttons */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                onClick={nextSlide}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                            }`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </section>
    )
}
