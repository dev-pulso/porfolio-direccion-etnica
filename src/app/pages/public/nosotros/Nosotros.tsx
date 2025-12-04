import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Eye, Users, Mail, Phone, MapPin, User, Scale, Heart, Handshake, Globe, Shield, FileCheck } from 'lucide-react'

export default function NosotrosPage() {
    return (
        <div className="py-16 bg-background">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                        Sobre Nosotros
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty">
                        Conoce más sobre la Dirección Étnica Municipal y nuestro compromiso con las comunidades étnicas de Maicao
                    </p>
                </div>

                {/* Hero Image */}
                <div className="relative h-[400px] rounded-xl overflow-hidden mb-16">
                    <img
                        src="/ethnic-office-hero.jpg"
                        alt="Oficina Dirección Étnica Municipal"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-8 left-8">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Dirección Étnica Municipal
                        </h2>
                        <p className="text-white/90 text-lg">
                            Al servicio de las comunidades étnicas de Maicao
                        </p>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Target className="h-6 w-6 text-primary" />
                                </div>
                                Misión
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed text-pretty">
                                Garantizar la protección y promoción efectiva de los derechos de todas las comunidades étnicas de Maicao, actuando como ente garante mediante la mediación y conciliación en conflictos entre comunidades (Wayuu, Alijunas) y brindando acompañamiento técnico y logístico a las Asambleas y espacios de decisión en las comunidades indígenas.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Eye className="h-6 w-6 text-primary" />
                                </div>
                                Visión
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground leading-relaxed text-pretty">
                                Ser reconocida como el motor de la convivencia pacífica y el respeto intercultural en Maicao, logrando el fortalecimiento de la autonomía comunitaria a través de la participación efectiva en asambleas y la resolución exitosa de conflictos territoriales.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mb-16 bg-muted/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Heart className="h-6 w-6 text-primary" />
                            </div>
                            Valores Fundamentales
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Handshake className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Mediación y Diálogo</h3>
                                    <p className="text-sm text-muted-foreground text-pretty">
                                        Priorizar la búsqueda de acuerdos justos y sostenibles.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Respeto a la Autonomía</h3>
                                    <p className="text-sm text-muted-foreground text-pretty">
                                        Honrar las formas propias de organización y toma de decisiones de las comunidades (Asambleas).
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Scale className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Equidad Intercultural</h3>
                                    <p className="text-sm text-muted-foreground text-pretty">
                                        Asegurar que las negociaciones y el acompañamiento beneficien justamente a todas las etnias involucradas.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Globe className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Interculturalidad</h3>
                                    <p className="text-sm text-muted-foreground text-pretty">
                                        Reconocimiento y respeto por la diversidad cultural.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Heart className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Dignidad</h3>
                                    <p className="text-sm text-muted-foreground text-pretty">
                                        Defensa incondicional de la vida y la integridad de cada miembro de las etnias.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <FileCheck className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Transparencia</h3>
                                    <p className="text-sm text-muted-foreground text-pretty">
                                        Gestión clara y abierta en la defensa de los derechos.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Participación</h3>
                                    <p className="text-sm text-muted-foreground text-pretty">
                                        Fomento de los espacios de consulta y decisión de las comunidades.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-16 bg-muted/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            Procesos de la Dirección Étnica
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Handshake className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Conciliaciones entre Wayuu, Alijunas y Empresas</h3>
                                    <p className="text-muted-foreground text-pretty">
                                        La oficina actúa como mediadora y facilitadora en los procesos de diálogo y conciliación entre los pueblos indígenas.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Acompañamiento a Asambleas en Comunidades Indígenas</h3>
                                    <p className="text-muted-foreground text-pretty">
                                        La oficina brinda apoyo técnico, jurídico y administrativo durante las asambleas y reuniones comunitarias.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <FileCheck className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Expedición de Certificados Indígenas</h3>
                                    <p className="text-muted-foreground text-pretty">
                                        Es responsable de la expedición de certificados de pertenencia étnica o de autoreconocimiento indígena.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Shield className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Garantes de los Derechos de los Indígenas</h3>
                                    <p className="text-muted-foreground text-pretty">
                                        La oficina actúa como garante de los derechos fundamentales, colectivos y culturales de los pueblos indígenas.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                Directorio de la Dirección Étnica
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src="/secretary-photo.jpg"
                                            alt="Juan Carlos Apshana Jusayu"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground mb-1">Director Étnico Municipal</p>
                                        <p className="font-semibold text-lg mb-2">Juan Carlos Apshana Jusayu</p>
                                        <a
                                            href="mailto:asuntosindigenas@maicao-laguajira.gov.co"
                                            className="text-sm text-primary hover:underline"
                                        >
                                            asuntosindigenas@maicao-laguajira.gov.co
                                        </a>
                                    </div>
                                </div>
                                <div className="border-t pt-4 flex items-start gap-4">
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src="/director-photo.jpg"
                                            alt="Omar Antonio Santiago Silvero"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-muted-foreground mb-1">Secretario</p>
                                        <p className="font-semibold text-lg mb-2">Omar Antonio Santiago Silvero</p>
                                        <p className="text-sm text-muted-foreground">
                                            <Phone className="h-4 w-4 inline mr-1" />
                                            (+57) 321 830 6902
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                Información de Contacto
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                                        <a
                                            href="mailto:asuntosindigenas@maicao-laguajira.gov.co"
                                            className="font-medium text-primary hover:underline"
                                        >
                                            asuntosindigenas@maicao-laguajira.gov.co
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Teléfono</p>
                                        <p className="font-medium">(5) 7268233 – Fax 8930</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Dirección</p>
                                        <p className="font-medium text-pretty">
                                            Calle 12 # 11 – 36<br />
                                            Centro Administrativo Municipal CAM<br />
                                            Maicao, La Guajira
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
