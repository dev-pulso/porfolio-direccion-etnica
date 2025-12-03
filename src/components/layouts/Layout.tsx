import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Navigation } from "../navigation";
import { Footer } from "../footer";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};
