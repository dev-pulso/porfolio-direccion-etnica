import { apiClient } from './client';

export interface Noticia {
    id: number;
    titulo: string;
    subtitulo: string;
    parrafo: string;
    imagen: string | null;
    estado: boolean;
    color_titulo: string | null;
    color_parrafo: string | null;
    fecha_noticia: string;
    created_at: string;
    updated_at: string;
}

export interface NoticiasResponse {
    data: Noticia[];
}

export const noticiasApi = {
    // Obtener todas las noticias activas
    getActivas: async (): Promise<Noticia[]> => {
        const response = await apiClient.get<NoticiasResponse>('/noticias/activas');
        return response.data || [];
    },

    // Obtener una noticia por ID
    getById: async (id: number): Promise<Noticia> => {
        const response = await apiClient.get<{ data: Noticia }>(`/noticias/${id}`);
        return response.data;
    },
};
