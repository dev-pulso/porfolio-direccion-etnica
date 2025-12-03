'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { FileText, AlertCircle, CheckCircle2, XCircle, IdCard, Users } from 'lucide-react'
import { useCertificado } from '../hooks/useCertificado'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { MiembroData } from '@/api/certificado'

export function CertificateForm() {
    const {
        formatos,
        clanes,
        tiposDocumento,
        isLoading,
        cargarDatosIniciales,
        verificarMiembro,
        generarCertificado,
    } = useCertificado()

    const [formData, setFormData] = useState({
        tipoDocumentoId: 0,
        numeroDocumento: '',
        clanId: 0,
        formatoId: 0,
    })
    const [isVerifying, setIsVerifying] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [miembroData, setMiembroData] = useState<MiembroData | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    // Cargar todos los datos iniciales de una sola vez
    useEffect(() => {
        cargarDatosIniciales()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsVerifying(true)
        setShowConfirmation(false)
        setMiembroData(null)
        setErrorMessage(null)

        const verificarRequestData = {
            tipo_documento_id: formData.tipoDocumentoId,
            numero_documento: formData.numeroDocumento,
            clan_id: formData.clanId,
        }

        try {
            const response = await verificarMiembro(verificarRequestData)

            if (response.success && response.data) {
                setMiembroData(response.data)
                setShowConfirmation(true)
            } else {
                setErrorMessage(response.message || 'Revisado el SIIM (Sistema de Información Indígena Municipal) y no se encuentra registrado.')
            }
        } catch (error) {
            setErrorMessage('Revisado el SIIM (Sistema de Información Indígena Municipal) y no se encuentra registrado.')
        } finally {
            setIsVerifying(false)
        }
    }

    const handleConfirmarGeneracion = async () => {
        setIsVerifying(true)
        setErrorMessage(null)

        const requestData = {
            tipo_documento_id: formData.tipoDocumentoId,
            numero_documento: formData.numeroDocumento,
            clan_id: formData.clanId,
            formato_id: formData.formatoId,
        }

        try {
            const response = await generarCertificado(requestData)

            if (response.success) {
                // Resetear formulario
                setFormData({
                    tipoDocumentoId: 0,
                    numeroDocumento: '',
                    clanId: 0,
                    formatoId: 0,
                })
                setShowConfirmation(false)
                setMiembroData(null)
                setErrorMessage(null)
            } else {
                setErrorMessage(response.message || 'Error al generar certificado. Por favor, intente nuevamente.')
            }
        } catch (error) {
            setErrorMessage('Error al generar certificado. Por favor, intente nuevamente.')
        } finally {
            setIsVerifying(false)
        }
    }

    const handleCancelar = () => {
        setShowConfirmation(false)
        setMiembroData(null)
        setErrorMessage(null)
    }

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardContent className="p-8">
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            <span className="ml-3">Cargando...</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Card className="shadow-lg">
                <CardHeader className="border-b bg-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Solicitud de Certificado</CardTitle>
                            <CardDescription className="mt-1">
                                Complete todos los campos para verificar su registro en el SIIM
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="tipoDocumento" className="flex items-center gap-2 text-sm font-medium">
                                <IdCard className="w-4 h-4" />
                                Tipo de Documento
                            </Label>
                            <Select
                                value={formData.tipoDocumentoId ? formData.tipoDocumentoId.toString() : ''}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, tipoDocumentoId: Number(value) })
                                }
                                required
                            >
                                <SelectTrigger id="tipoDocumento" className="h-12">
                                    <SelectValue placeholder="Seleccione el tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tiposDocumento.map((tipo) => (
                                        <SelectItem key={tipo.id} value={tipo.id.toString()}>
                                            {tipo.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="numeroDocumento" className="flex items-center gap-2 text-sm font-medium">
                                <IdCard className="w-4 h-4" />
                                Número de Documento
                            </Label>
                            <Input
                                id="numeroDocumento"
                                type="text"
                                className="h-12"
                                placeholder="Ingrese su número de documento"
                                value={formData.numeroDocumento}
                                onChange={(e) =>
                                    setFormData({ ...formData, numeroDocumento: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="clan" className="flex items-center gap-2 text-sm font-medium">
                                <Users className="w-4 h-4" />
                                Eiruku (Casta)
                            </Label>
                            <Select
                                value={formData.clanId ? formData.clanId.toString() : ''}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, clanId: Number(value) })
                                }
                                required
                            >
                                <SelectTrigger id="clan" className="h-12">
                                    <SelectValue placeholder="Seleccione su Eiruku" />
                                </SelectTrigger>
                                <SelectContent>
                                    {clanes.map((clan) => (
                                        <SelectItem key={clan.id} value={clan.id.toString()}>
                                            {clan.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="formato" className="flex items-center gap-2 text-sm font-medium">
                                <FileText className="w-4 h-4" />
                                Trámite
                            </Label>
                            <Select
                                value={formData.formatoId ? formData.formatoId.toString() : ''}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, formatoId: Number(value) })
                                }
                                required
                            >
                                <SelectTrigger id="formato" className="h-12">
                                    <SelectValue placeholder="Seleccione el tipo de trámite" />
                                </SelectTrigger>
                                <SelectContent>
                                    {formatos.map((formato) => (
                                        <SelectItem key={formato.id} value={formato.id.toString()}>
                                            {formato.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-amber-700 hover:bg-amber-800 text-white font-medium"
                            disabled={isVerifying}
                        >
                            {isVerifying ? 'Verificando...' : 'Verificar y Generar Certificado'}
                        </Button>
                    </form>

                    {/* Mensaje de Error */}
                    {errorMessage && !showConfirmation && (
                        <Alert className="mt-6 border-amber-500 bg-amber-50 dark:bg-amber-950">
                            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            <AlertTitle className="text-amber-800 dark:text-amber-200">
                                Registro no encontrado
                            </AlertTitle>
                            <AlertDescription className="text-amber-700 dark:text-amber-300">
                                <p className="mb-3">{errorMessage}</p>
                                <p className="font-semibold">
                                    Por favor acérquese a la oficina de la Dirección Étnica Municipal para
                                    realizar su registro.
                                </p>
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* Modal de Confirmación */}
            {showConfirmation && miembroData && (
                <Card className="shadow-lg border-2 border-green-200">
                    <CardHeader className="bg-green-50 border-b">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <CardTitle className="text-xl text-green-800">¡Miembro Encontrado!</CardTitle>
                                <CardDescription className="mt-1 text-green-700">
                                    Verifique que los datos sean correctos antes de generar el certificado
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        <Alert className="mb-6 bg-blue-50 border-blue-200">
                            <AlertDescription className="text-sm text-blue-800">
                                Por favor, revise cuidadosamente la información registrada en el sistema antes de continuar.
                            </AlertDescription>
                        </Alert>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Nombre Completo</p>
                                    <p className="text-base font-semibold text-gray-900">{miembroData.nombre_completo}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Tipo de Documento</p>
                                    <p className="text-base font-semibold text-gray-900">{miembroData.tipo_documento}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Número de Documento</p>
                                    <p className="text-base font-semibold text-gray-900">{miembroData.documento}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Eiruku (Casta)</p>
                                    <p className="text-base font-semibold text-gray-900">{miembroData.clan}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Comunidad</p>
                                    <p className="text-base font-semibold text-gray-900">{miembroData.comunidad}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Resguardo</p>
                                    <p className="text-base font-semibold text-gray-900">{miembroData.resguardo}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                    <p className="text-xs font-medium text-gray-500 uppercase mb-1">Grupo Étnico</p>
                                    <p className="text-base font-semibold text-gray-900">{miembroData.grupo_etnico}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <Button
                                onClick={handleCancelar}
                                variant="outline"
                                className="flex-1 h-12 border-2 border-gray-300 hover:bg-gray-100"
                                disabled={isVerifying}
                            >
                                <XCircle className="w-4 h-4 mr-2" />
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleConfirmarGeneracion}
                                className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white"
                                disabled={isVerifying}
                            >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                {isVerifying ? 'Generando...' : 'Confirmar y Generar Certificado'}
                            </Button>
                        </div>

                        {errorMessage && (
                            <Alert className="mt-4 border-red-500 bg-red-50">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <AlertTitle className="text-red-800">Error</AlertTitle>
                                <AlertDescription className="text-red-700">
                                    {errorMessage}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
