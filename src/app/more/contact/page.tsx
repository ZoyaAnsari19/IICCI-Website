import { SubpageHero } from "@/components/layouts/SubpageHero";
import { ContactSection } from "@/components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact IICCI | Indian Importers Chambers of Commerce & Industry",
  description:
    "Contact IICCI headquarters in New Delhi — phone, email, office hours, and inquiry form for membership and trade facilitation.",
};

export default function ContactPage() {
  return (
    <>
      <SubpageHero
        title="Contact"
        tagline="We are here to help"
        badge="Reach IICCI"
      />
      <ContactSection />
    </>
  );
}
