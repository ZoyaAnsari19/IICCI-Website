import { SitePageShell } from "@/components/layouts/SitePageShell";
import { AboutSubnav } from "@/components/layouts/AboutSubnav";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SitePageShell>
      <AboutSubnav />
      <main>{children}</main>
    </SitePageShell>
  );
}
