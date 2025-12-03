import { apiClient } from './client';

export interface Banner {
    id: number;
    titulo: string;
    subtitulo: string;
    imagen: string | null;
    color_titulo: string | null;
    color_subtitulo: string | null;
}

export interface BannersResponse {
    data: Banner[];
}

export const bannersApi = {
    // Obtener todos los banners activos
    getActivos: async (): Promise<Banner[]> => {
        const response = await apiClient.get<BannersResponse>('/banners/activos');
        return response.data;
    },

    // Obtener un banner por ID
    getById: async (id: number): Promise<Banner> => {
        return await apiClient.get<Banner>(`/banners/${id}`);
    },
};
