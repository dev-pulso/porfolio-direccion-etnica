import { FileCheck, ShieldCheck, Users } from 'lucide-react'
import { CertificateForm } from './component/CertificadoForm'

function CertificadoPage() {
    return (
        <div className="py-16 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                        Certificado de Pertenencia Étnica
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty">
                        Genera tu certificado de pertenencia a la comunidad indígena Wayuu de manera rápida y segura
                    </p>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <FileCheck className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Rápido y Fácil</h3>
                        <p className="text-sm text-muted-foreground text-pretty">
                            Completa el formulario y obtén tu certificado en minutos
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Validación Oficial</h3>
                        <p className="text-sm text-muted-foreground text-pretty">
                            Verificamos tu información en el SIIM para garantizar autenticidad
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg border">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">Múltiples Usos</h3>
                        <p className="text-sm text-muted-foreground text-pretty">
                            Válido para salud, educación, empleo y más trámites
                        </p>
                    </div>
                </div>

                {/* Certificate Form */}
                <CertificateForm />
            </div>
        </div>
    )
}

export default CertificadoPage
