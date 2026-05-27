import { Women } from "@/components/Women";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women Wing | IICCI",
  description:
    "IICCI Women Entrepreneurship Wing — nurturing women business leaders, fostering female entrepreneurship, and global trade opportunities.",
};

export default function WomenWingPage() {
  return (
    <main>
      <Women />
    </main>
  );
}
