// URL base del backend (sin /api)
const BACKEND_URL = (import.meta.env.VITE_API_URL || import.meta.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace('/api', '');

/**
 * Convierte una ruta de storage de Laravel en una URL completa
 * @param path - Ruta relativa del storage (ej: "noticias/imagen.jpg")
 * @returns URL completa de la imagen (ej: "http://localhost:8000/storage/noticias/imagen.jpg")
 */
export function getStorageUrl(path: string | null): string {
    if (!path) {
        return '/placeholder.svg';
    }

    // Si ya es una URL completa, retornarla tal cual
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Si es una ruta de placeholder, retornarla tal cual
    if (path.startsWith('/')) {
        return path;
    }

    // Construir la URL completa del storage de Laravel
    return `${BACKEND_URL}/storage/${path}`;
}
