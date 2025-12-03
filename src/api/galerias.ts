import { apiClient } from './client';

export interface ImagenGaleria {
    id: number;
    galeria_id: number;
    imagen: string;
    imagen_url: string;
    orden?: number;
    created_at: string;
    updated_at: string;
}

export interface Galeria {
    id: number;
    titulo: string;
    subtitulo?: string;
    descripcion?: string;
    fecha: string;
    estado: boolean;
    imagenes?: ImagenGaleria[];
    created_at: string;
    updated_at: string;
}

export interface GaleriasResponse {
    data: Galeria[];
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
}

export const galeriasApi = {
    // Obtener todas las galerías activas (endpoint público)
    getAll: async (): Promise<Galeria[]> => {
        const response = await apiClient.get<GaleriasResponse>('/galeria/activas');
        return response.data;
    },

    // Obtener una galería por ID con sus imágenes (endpoint público)
    getById: async (id: number): Promise<Galeria> => {
        const response = await apiClient.get<GaleriasResponse>(`/galeria/activas`);
        // Buscar la galería específica en el array
        const galeria = response.data.find((g: Galeria) => g.id === id);
        if (!galeria) {
            throw new Error(`Galería con ID ${id} no encontrada`);
        }
        return galeria;
    },

    // Obtener galerías recientes (para la página principal)
    getRecent: async (limit: number = 6): Promise<Galeria[]> => {
        const response = await apiClient.get<GaleriasResponse>('/galeria/activas');
        // Limitar el número de resultados
        return response.data.slice(0, limit);
    },
};
