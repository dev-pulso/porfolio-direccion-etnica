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
import { FileText, AlertCircle, CheckCircle2, XCircle, IdCard, Users, Baby, Calendar } from 'lucide-react'
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

    const [formDataRC, setFormDataRC] = useState({
        nombreMenor: '',
        fechaNacimiento: '',
        tipoDocumentoMadreId: 0,
        numeroDocumentoMadre: '',
        tipoDocumentoPadreId: 0,
        numeroDocumentoPadre: '',
    })

    const [isVerifying, setIsVerifying] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [miembroData, setMiembroData] = useState<MiembroData | null>(null)
    const [apiError, setApiError] = useState<string | null>(null)
    const [validationError, setValidationError] = useState<string | null>(null)

    useEffect(() => {
        cargarDatosIniciales()
    }, [])

    const formatoSeleccionado = formatos.find((f) => f.id === formData.formatoId)
    const isRegistroCivil =
        formData.formatoId > 0 &&
        !!formatoSeleccionado?.nombre.toLowerCase().includes('registro civil')

    const isCedulaCiudadania = (tipoDocId: number) => {
        const tipo = tiposDocumento.find((t) => t.id === tipoDocId)
        const nombre = tipo?.nombre.toLowerCase() || ''
        return nombre.includes('cédula') || nombre.includes('cedula') || nombre === 'cc'
    }

    const resetRCForm = () => {
        setFormDataRC({
            nombreMenor: '',
            fechaNacimiento: '',
            tipoDocumentoMadreId: 0,
            numeroDocumentoMadre: '',
            tipoDocumentoPadreId: 0,
            numeroDocumentoPadre: '',
        })
    }

    const handleFormatoChange = (value: string) => {
        setFormData({ tipoDocumentoId: 0, numeroDocumento: '', clanId: 0, formatoId: Number(value) })
        resetRCForm()
        setShowConfirmation(false)
        setMiembroData(null)
        setApiError(null)
        setValidationError(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsVerifying(true)
        setShowConfirmation(false)
        setMiembroData(null)
        setApiError(null)
        setValidationError(null)

        if (isRegistroCivil) {
            if (!formDataRC.nombreMenor.trim()) {
                setValidationError('El nombre completo del menor es obligatorio.')
                setIsVerifying(false)
                return
            }
            if (!formDataRC.fechaNacimiento) {
                setValidationError('La fecha de nacimiento del menor es obligatoria.')
                setIsVerifying(false)
                return
            }
            if (!formDataRC.tipoDocumentoMadreId || !formDataRC.numeroDocumentoMadre.trim()) {
                setValidationError('El tipo y número de documento de la madre son obligatorios.')
                setIsVerifying(false)
                return
            }
            if (!formData.clanId) {
                setValidationError('El Eiruku (Casta) del menor es obligatorio.')
                setIsVerifying(false)
                return
            }
            const madreCC = isCedulaCiudadania(formDataRC.tipoDocumentoMadreId)
            const padreCC = formDataRC.tipoDocumentoPadreId
                ? isCedulaCiudadania(formDataRC.tipoDocumentoPadreId)
                : false
            if (!madreCC && !padreCC) {
                setValidationError(
                    'Al menos uno de los padres debe ser ciudadano colombiano (Cédula de Ciudadanía).'
                )
                setIsVerifying(false)
                return
            }
        }

        const verificarRequestData = isRegistroCivil
            ? {
                  tipo_documento_id: formDataRC.tipoDocumentoMadreId,
                  numero_documento: formDataRC.numeroDocumentoMadre,
                  clan_id: formData.clanId,
                  formato_id: formData.formatoId,
              }
            : {
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
                setApiError(
                    response.message ||
                        'Revisado el SIIM (Sistema de Información Indígena Municipal) y no se encuentra registrado.'
                )
            }
        } catch {
            setApiError(
                'Revisado el SIIM (Sistema de Información Indígena Municipal) y no se encuentra registrado.'
            )
        } finally {
            setIsVerifying(false)
        }
    }

    const handleConfirmarGeneracion = async () => {
        setIsVerifying(true)
        setApiError(null)

        const requestData = isRegistroCivil
            ? {
                  tipo_documento_id: formDataRC.tipoDocumentoMadreId,
                  numero_documento: formDataRC.numeroDocumentoMadre,
                  clan_id: formData.clanId,
                  formato_id: formData.formatoId,
                  nombre_menor: formDataRC.nombreMenor,
                  fecha_nacimiento: formDataRC.fechaNacimiento,
                  tipo_documento_padre_id: formDataRC.tipoDocumentoPadreId || undefined,
                  numero_documento_padre: formDataRC.numeroDocumentoPadre || undefined,
              }
            : {
                  tipo_documento_id: formData.tipoDocumentoId,
                  numero_documento: formData.numeroDocumento,
                  clan_id: formData.clanId,
                  formato_id: formData.formatoId,
              }

        try {
            const response = await generarCertificado(requestData)

            if (response.success) {
                setFormData({ tipoDocumentoId: 0, numeroDocumento: '', clanId: 0, formatoId: 0 })
                resetRCForm()
                setShowConfirmation(false)
                setMiembroData(null)
                setApiError(null)
            } else {
                setApiError(
                    response.message || 'Error al generar certificado. Por favor, intente nuevamente.'
                )
            }
        } catch {
            setApiError('Error al generar certificado. Por favor, intente nuevamente.')
        } finally {
            setIsVerifying(false)
        }
    }

    const handleCancelar = () => {
        setShowConfirmation(false)
        setMiembroData(null)
        setApiError(null)
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
                        {/* Trámite - PRIMERO */}
                        <div className="space-y-2">
                            <Label htmlFor="formato" className="flex items-center gap-2 text-sm font-medium">
                                <FileText className="w-4 h-4" />
                                Trámite
                            </Label>
                            <Select
                                value={formData.formatoId ? formData.formatoId.toString() : ''}
                                onValueChange={handleFormatoChange}
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

                        {/* Campos para Registro Civil (id=6) */}
                        {isRegistroCivil ? (
                            <>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="nombreMenor"
                                        className="flex items-center gap-2 text-sm font-medium"
                                    >
                                        <Baby className="w-4 h-4" />
                                        Nombre Completo del Menor{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="nombreMenor"
                                        type="text"
                                        className="h-12"
                                        placeholder="Ingrese el nombre completo del menor"
                                        value={formDataRC.nombreMenor}
                                        onChange={(e) =>
                                            setFormDataRC({
                                                ...formDataRC,
                                                nombreMenor: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="fechaNacimiento"
                                        className="flex items-center gap-2 text-sm font-medium"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        Fecha de Nacimiento del Menor{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="fechaNacimiento"
                                        type="date"
                                        className="h-12"
                                        value={formDataRC.fechaNacimiento}
                                        onChange={(e) =>
                                            setFormDataRC({
                                                ...formDataRC,
                                                fechaNacimiento: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Documento de la Madre */}
                                <div className="space-y-3 p-4 rounded-lg border border-dashed">
                                    <p className="text-sm font-semibold flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        Documento de la Madre{' '}
                                        <span className="text-red-500">*</span>
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="tipoDocumentoMadre"
                                                className="text-sm"
                                            >
                                                Tipo de Documento
                                            </Label>
                                            <Select
                                                value={
                                                    formDataRC.tipoDocumentoMadreId
                                                        ? formDataRC.tipoDocumentoMadreId.toString()
                                                        : ''
                                                }
                                                onValueChange={(value) =>
                                                    setFormDataRC({
                                                        ...formDataRC,
                                                        tipoDocumentoMadreId: Number(value),
                                                    })
                                                }
                                            >
                                                <SelectTrigger
                                                    id="tipoDocumentoMadre"
                                                    className="h-12"
                                                >
                                                    <SelectValue placeholder="Seleccione" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {tiposDocumento.map((tipo) => (
                                                        <SelectItem
                                                            key={tipo.id}
                                                            value={tipo.id.toString()}
                                                        >
                                                            {tipo.nombre}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="numeroDocumentoMadre"
                                                className="text-sm"
                                            >
                                                Número de Documento
                                            </Label>
                                            <Input
                                                id="numeroDocumentoMadre"
                                                type="text"
                                                className="h-12"
                                                placeholder="Número de documento"
                                                value={formDataRC.numeroDocumentoMadre}
                                                onChange={(e) =>
                                                    setFormDataRC({
                                                        ...formDataRC,
                                                        numeroDocumentoMadre: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Documento del Padre */}
                                <div className="space-y-3 p-4 rounded-lg border border-dashed">
                                    <p className="text-sm font-semibold flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        Documento del Padre{' '}
                                        <span className="text-muted-foreground text-xs font-normal">
                                            (opcional)
                                        </span>
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="tipoDocumentoPadre"
                                                className="text-sm"
                                            >
                                                Tipo de Documento
                                            </Label>
                                            <Select
                                                value={
                                                    formDataRC.tipoDocumentoPadreId
                                                        ? formDataRC.tipoDocumentoPadreId.toString()
                                                        : ''
                                                }
                                                onValueChange={(value) =>
                                                    setFormDataRC({
                                                        ...formDataRC,
                                                        tipoDocumentoPadreId: Number(value),
                                                    })
                                                }
                                            >
                                                <SelectTrigger
                                                    id="tipoDocumentoPadre"
                                                    className="h-12"
                                                >
                                                    <SelectValue placeholder="Seleccione" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {tiposDocumento.map((tipo) => (
                                                        <SelectItem
                                                            key={tipo.id}
                                                            value={tipo.id.toString()}
                                                        >
                                                            {tipo.nombre}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="numeroDocumentoPadre"
                                                className="text-sm"
                                            >
                                                Número de Documento
                                            </Label>
                                            <Input
                                                id="numeroDocumentoPadre"
                                                type="text"
                                                className="h-12"
                                                placeholder="Número de documento"
                                                value={formDataRC.numeroDocumentoPadre}
                                                onChange={(e) =>
                                                    setFormDataRC({
                                                        ...formDataRC,
                                                        numeroDocumentoPadre: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Clan del menor */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="clan"
                                        className="flex items-center gap-2 text-sm font-medium"
                                    >
                                        <Users className="w-4 h-4" />
                                        Eiruku (Casta) del Menor{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.clanId ? formData.clanId.toString() : ''}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, clanId: Number(value) })
                                        }
                                    >
                                        <SelectTrigger id="clan" className="h-12">
                                            <SelectValue placeholder="Seleccione el Eiruku del menor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {clanes.map((clan) => (
                                                <SelectItem
                                                    key={clan.id}
                                                    value={clan.id.toString()}
                                                >
                                                    {clan.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Campos normales */}
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="tipoDocumento"
                                        className="flex items-center gap-2 text-sm font-medium"
                                    >
                                        <IdCard className="w-4 h-4" />
                                        Tipo de Documento
                                    </Label>
                                    <Select
                                        value={
                                            formData.tipoDocumentoId
                                                ? formData.tipoDocumentoId.toString()
                                                : ''
                                        }
                                        onValueChange={(value) =>
                                            setFormData({
                                                ...formData,
                                                tipoDocumentoId: Number(value),
                                            })
                                        }
                                        required
                                    >
                                        <SelectTrigger id="tipoDocumento" className="h-12">
                                            <SelectValue placeholder="Seleccione el tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tiposDocumento.map((tipo) => (
                                                <SelectItem
                                                    key={tipo.id}
                                                    value={tipo.id.toString()}
                                                >
                                                    {tipo.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="numeroDocumento"
                                        className="flex items-center gap-2 text-sm font-medium"
                                    >
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
                                            setFormData({
                                                ...formData,
                                                numeroDocumento: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="clan"
                                        className="flex items-center gap-2 text-sm font-medium"
                                    >
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
                                                <SelectItem
                                                    key={clan.id}
                                                    value={clan.id.toString()}
                                                >
                                                    {clan.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        )}

                        {/* Error de validación */}
                        {validationError && (
                            <Alert className="border-red-400 bg-red-50 dark:bg-red-950">
                                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                                <AlertTitle className="text-red-800 dark:text-red-200">
                                    Error de validación
                                </AlertTitle>
                                <AlertDescription className="text-red-700 dark:text-red-300">
                                    {validationError}
                                </AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 bg-amber-700 hover:bg-amber-800 text-white font-medium"
                            disabled={isVerifying}
                        >
                            {isVerifying ? 'Verificando...' : 'Verificar y Generar Certificado'}
                        </Button>
                    </form>

                    {/* Error de API (no encontrado) */}
                    {apiError && !showConfirmation && (
                        <Alert className="mt-6 border-amber-500 bg-amber-50 dark:bg-amber-950">
                            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            <AlertTitle className="text-amber-800 dark:text-amber-200">
                                Registro no encontrado
                            </AlertTitle>
                            <AlertDescription className="text-amber-700 dark:text-amber-300">
                                <p className="mb-3">{apiError}</p>
                                <p className="font-semibold">
                                    Por favor acérquese a la oficina de la Dirección Étnica Municipal
                                    para realizar su registro.
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
                                <CardTitle className="text-xl text-green-800">
                                    {isRegistroCivil ? '¡Madre Verificada en el SIIM!' : '¡Miembro Encontrado!'}
                                </CardTitle>
                                <CardDescription className="mt-1 text-green-700">
                                    Verifique que los datos sean correctos antes de generar el
                                    certificado
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        <Alert className="mb-6 bg-blue-50 border-blue-200">
                            <AlertDescription className="text-sm text-blue-800">
                                Por favor, revise cuidadosamente la información antes de continuar.
                            </AlertDescription>
                        </Alert>

                        {isRegistroCivil ? (
                            <div className="space-y-4">
                                {/* Datos del menor */}
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                    Datos del Menor
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Nombre Completo del Menor
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {formDataRC.nombreMenor}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Fecha de Nacimiento
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {formDataRC.fechaNacimiento
                                                ? new Date(formDataRC.fechaNacimiento + 'T00:00:00').toLocaleDateString('es-CO', {
                                                      day: '2-digit',
                                                      month: 'long',
                                                      year: 'numeric',
                                                  })
                                                : '—'}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Eiruku (Casta) del Menor
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {clanes.find((c) => c.id === formData.clanId)?.nombre ?? '—'}
                                        </p>
                                    </div>
                                </div>

                                {/* Datos de la madre */}
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-2">
                                    Datos de la Madre (verificada en el SIIM)
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-green-50 p-4 rounded-lg md:col-span-2">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Nombre Completo
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.nombre_completo}
                                        </p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Tipo de Documento
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.tipo_documento}
                                        </p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Número de Documento
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.documento}
                                        </p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Comunidad
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.comunidad}
                                        </p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Resguardo
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.resguardo}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Nombre Completo
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.nombre_completo}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Tipo de Documento
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.tipo_documento}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Número de Documento
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.documento}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Eiruku (Casta)
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.clan}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Comunidad
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.comunidad}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Resguardo
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.resguardo}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            Grupo Étnico
                                        </p>
                                        <p className="text-base font-semibold text-gray-900">
                                            {miembroData.grupo_etnico}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

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

                        {apiError && (
                            <Alert className="mt-4 border-red-500 bg-red-50">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <AlertTitle className="text-red-800">Error</AlertTitle>
                                <AlertDescription className="text-red-700">
                                    {apiError}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
