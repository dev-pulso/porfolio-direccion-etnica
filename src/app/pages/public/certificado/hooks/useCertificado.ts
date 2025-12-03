'use client'

import { certificadosApi, type CertificadoRequest, type CertificadoResponse, type Clan, type Formato, type TipoDocumento, type VerificarRequest, type VerificarResponse } from '@/api/certificado';
import { useState } from 'react';


export const useCertificado = () => {
    const [formatos, setFormatos] = useState<Formato[]>([]);
    const [clanes, setClanes] = useState<Clan[]>([]);
    const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Cargar todos los datos de una sola vez desde generales/publico
    const cargarDatosIniciales = async () => {
        setIsLoading(true);
        try {
            // Cargar formatos y datos generales en paralelo
            const [formatosResponse, generalesResponse] = await Promise.all([
                certificadosApi.getFormatos(),
                certificadosApi.getGeneralesPublico()
            ]);

            setFormatos(formatosResponse.data || []);
            setClanes(generalesResponse.clanes || []);
            setTiposDocumento(generalesResponse.tipo_documentos || []);
        } catch (error) {
            console.error('Error cargando datos iniciales:', error);
            setFormatos([]);
            setClanes([]);
            setTiposDocumento([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Mantener funciones individuales para compatibilidad
    const cargarFormatos = async () => {
        setIsLoading(true);
        try {
            const response = await certificadosApi.getFormatos();
            setFormatos(response.data || []);
        } catch (error) {
            console.error('Error cargando formatos:', error);
            setFormatos([]);
        } finally {
            setIsLoading(false);
        }
    };

    const cargarClanes = async () => {
        setIsLoading(true);
        try {
            const response = await certificadosApi.getClanes();
            setClanes(response.data || []);
        } catch (error) {
            console.error('Error cargando clanes:', error);
            setClanes([]);
        } finally {
            setIsLoading(false);
        }
    };

    const cargarTiposDocumento = async () => {
        setIsLoading(true);
        try {
            const response = await certificadosApi.getTiposDocumento();
            setTiposDocumento(response.data || []);
        } catch (error) {
            console.error('Error cargando tipos de documento:', error);
            setTiposDocumento([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Verificar miembro
    const verificarMiembro = async (data: VerificarRequest): Promise<VerificarResponse> => {
        return await certificadosApi.verificarMiembro(data);
    };

    // Generar certificado
    const generarCertificado = async (data: CertificadoRequest): Promise<CertificadoResponse> => {
        return await certificadosApi.generarCertificado(data);
    };

    return {
        formatos,
        clanes,
        tiposDocumento,
        isLoading,
        // Mantener nombres antiguos para compatibilidad
        isLoadingFormatos: isLoading,
        isLoadingClanes: isLoading,
        isLoadingTiposDocumento: isLoading,
        cargarDatosIniciales,
        cargarFormatos,
        cargarClanes,
        cargarTiposDocumento,
        verificarMiembro,
        generarCertificado,
    };
};
