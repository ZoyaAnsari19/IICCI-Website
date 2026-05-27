import { ContactSection } from "@/components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact IICCI | Indian Importers Chambers of Commerce & Industry",
  description:
    "Contact IICCI headquarters in New Delhi — phone, email, office hours, and inquiry form for membership and trade facilitation.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
