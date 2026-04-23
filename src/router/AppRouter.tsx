import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { Layout } from "@/components/layouts/Layout";
import { Loading } from "@/components/loading";
import NotFoundPage from "@/components/not-found";

const HomePage = lazy(() => import("@/app/pages/public/home/Home"));
const CertificadoPage = lazy(() => import("@/app/pages/public/certificado/Certificado"));
const ProcesosPage = lazy(() => import("@/app/pages/public/procesos/Procesos"));
const GaleriaPage = lazy(() => import("@/app/pages/public/galeria/Galeria"));
const NosotrosPage = lazy(() => import("@/app/pages/public/nosotros/Nosotros"));
const NoticiasPage = lazy(() => import("@/app/pages/public/noticias/Noticias"));
const GaleriaDetallePage = lazy(() => import("@/app/pages/public/galeria/GaleriaDetalle"));


export const AppRouter = () => {
  // const { isAuthenticated } = useAuthStore()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/certificado" element={
            <Suspense fallback={<Loading />}>
              <CertificadoPage />
            </Suspense>
          } />

          <Route path="/procesos" element={
            <Suspense fallback={<Loading />}>
              <ProcesosPage />
            </Suspense>
          } />
          <Route path="/nosotros" element={
            <Suspense fallback={<Loading />}>
              <NosotrosPage />
            </Suspense>
          } />
          <Route path="/noticias/:id" element={
            <Suspense fallback={<Loading />}>
              <NoticiasPage />
            </Suspense>
          } />
          <Route path="/galerias" element={
            <Suspense fallback={<Loading />}>
              <GaleriaPage />
            </Suspense>
          } />
          <Route path="/galerias/:id" element={
            <Suspense fallback={<Loading />}>
              <GaleriaDetallePage />
            </Suspense>
          } />
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
