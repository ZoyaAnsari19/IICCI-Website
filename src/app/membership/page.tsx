import { Footer } from "@/components/Footer";
import { MembershipSection } from "@/components/MembershipSection";
import { Navbar } from "@/components/Navbar";

export default function MembershipPage() {
  return (
    <>
      <Navbar />
      <main className="relative page-nav-offset mt-6 sm:mt-8">
        <MembershipSection />
      </main>
      <Footer />
    </>
  );
}
