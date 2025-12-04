import { apiClient } from './client';

export interface Contacto {
    id: number;
    nombre: string;
    email: string;
    telefono?: string | null;
    celular?: string | null;
    mensaje: string;
    estado: 'pendiente' | 'leido' | 'respondido';
    created_at: string;
    updated_at: string;
}

export interface ContactoFormData {
    nombre: string;
    email: string;
    telefono?: string;
    celular?: string;
    mensaje: string;
}

export interface ContactoResponse {
    message: string;
    data: Contacto;
}

export const contactosApi = {
    // Enviar mensaje de contacto (público)
    enviarMensaje: async (data: ContactoFormData): Promise<ContactoResponse> => {
        return await apiClient.post<ContactoResponse>('/contactos', data);
    },
};
