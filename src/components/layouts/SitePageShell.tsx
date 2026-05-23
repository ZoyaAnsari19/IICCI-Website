import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Floats } from "@/components/Floats";

export function SitePageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Loader />
      <Navbar />
      {children}
      <Footer />
      <Floats />
    </>
  );
}
