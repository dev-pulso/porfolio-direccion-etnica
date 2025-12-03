import { apiClient } from './client';

export interface Departamento {
    id: number;
    nombre: string;
}

export interface Municipio {
    id: number;
    nombre: string;
}

export interface Empresa {
    id: number;
    nit: string;
    titulo1: string;
    titulo2: string;
    titulo3?: string;
    titulo4?: string;
    celular?: string;
    direccion?: string;
    email?: string;
    web?: string;
    logo?: string;
    logo_url?: string;
    codigo?: string;
    fecha?: string;
    version?: string;
    departamento_id?: number;
    municipio_id?: number;
    estado?: boolean;
    created_at: string;
    departamento?: Departamento;
    municipio?: Municipio;
}

export interface EmpresaResponse {
    data: Empresa;
}

export const empresaApi = {
    // Obtener información de la empresa (autenticado)
    get: async (): Promise<Empresa> => {
        const response = await apiClient.get<EmpresaResponse>('/empresa');
        return response.data;
    },

    // Obtener información pública de la empresa
    getPublica: async (): Promise<Empresa> => {
        const response = await apiClient.get<EmpresaResponse>('/empresa/publica');
        return response.data;
    },
};
