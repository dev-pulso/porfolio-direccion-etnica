import { apiClient } from './client';

// Interfaces de tipos de datos
export interface Formato {
    id: number;
    nombre: string;
    descripcion?: string;
    estado: boolean;
}

export interface TipoDocumento {
    id: number;
    nombre: string;
}

export interface Clan {
    id: number;
    nombre: string;
}

export interface CertificadoRequest {
    tipo_documento_id: number;
    numero_documento: string;
    clan_id: number;
    formato_id: number;
}

export interface VerificarRequest {
    tipo_documento_id: number;
    numero_documento: string;
    clan_id: number;
}

export interface MiembroData {
    nombre_completo: string;
    tipo_documento: string;
    documento: string;
    clan: string;
    comunidad: string;
    resguardo: string;
    grupo_etnico: string;
}

export interface VerificarResponse {
    success: boolean;
    message: string;
    data?: MiembroData;
}

export interface CertificadoResponse {
    success: boolean;
    message: string;
    certificado_url?: string;
    data?: any;
}

export interface ResponseGetApi<T> {
    data: T;
}

// Interfaz para la respuesta de generales/publico
export interface GeneralesPublicoResponse {
    tipo_documentos: TipoDocumento[];
    clanes: Clan[];
    departamentos?: any[];
    municipios?: any[];
    generos?: any[];
    grupos_etnicos?: any[];
    comunidades?: any[];
    resguardos?: any[];
    autoridades?: any[];
    formatos?: Formato[];
}

// Servicios del API
export const certificadosApi = {
    // Obtener formatos disponibles
    getFormatos: async (): Promise<ResponseGetApi<Formato[]>> => {
        return await apiClient.get<ResponseGetApi<Formato[]>>('/formatos');
    },

    // Obtener datos generales públicos (tipos de documento, clanes, etc.)
    getGeneralesPublico: async (): Promise<GeneralesPublicoResponse> => {
        return await apiClient.get<GeneralesPublicoResponse>('/generales/publico');
    },

    // Obtener clanes/eiruku disponibles
    getClanes: async (): Promise<ResponseGetApi<Clan[]>> => {
        const generales = await apiClient.get<GeneralesPublicoResponse>('/generales/publico');
        return { data: generales.clanes || [] };
    },

    // Obtener tipos de documento
    getTiposDocumento: async (): Promise<ResponseGetApi<TipoDocumento[]>> => {
        const generales = await apiClient.get<GeneralesPublicoResponse>('/generales/publico');
        return { data: generales.tipo_documentos || [] };
    },

    // Verificar si el miembro existe en el SIIM
    verificarMiembro: async (body: VerificarRequest): Promise<VerificarResponse> => {
        try {
            const requestData = {
                tipo_documento_id: body.tipo_documento_id,
                documento: body.numero_documento,
                clan_id: body.clan_id,
            };

            const response = await apiClient.post<VerificarResponse>('/certificados/verificar', requestData);
            return response;
        } catch (err: any) {
            if (err.message) {
                return {
                    success: false,
                    message: err.message || 'Los datos no coinciden. Por favor, verifique nuevamente.',
                };
            }
            throw err;
        }
    },

    // Generar y obtener certificado en PDF
    generarCertificado: async (body: CertificadoRequest): Promise<CertificadoResponse> => {
        try {
            const requestData = {
                tipo_documento_id: body.tipo_documento_id,
                documento: body.numero_documento,
                formato_id: body.formato_id,
                clan_id: body.clan_id,
            };

            // Hacer la petición para obtener el PDF como blob
            const response = await fetch(`${apiClient['baseURL']}/certificados/generar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error al generar el certificado' }));
                return {
                    success: false,
                    message: errorData.message || 'Los datos no coinciden. Por favor, verifique nuevamente.',
                };
            }

            // Verificar si es un PDF o un error JSON
            const contentType = response.headers.get('content-type');

            if (contentType?.includes('application/json')) {
                const errorData = await response.json();
                return {
                    success: false,
                    message: errorData.message || 'Los datos no coinciden. Por favor, verifique nuevamente.',
                };
            }

            // Crear blob del PDF
            const pdfBlob = await response.blob();
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Abrir en nueva pestaña
            window.open(pdfUrl, '_blank');

            return {
                success: true,
                message: 'Su certificado ha sido generado exitosamente.',
                certificado_url: pdfUrl,
            };
        } catch (err: any) {
            console.error('Error generando certificado:', err);
            return {
                success: false,
                message: 'Ocurrió un error al generar el certificado. Por favor, intente nuevamente.',
            };
        }
    },
};
