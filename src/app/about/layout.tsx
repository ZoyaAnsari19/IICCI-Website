import { SitePageShell } from "@/components/layouts/SitePageShell";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SitePageShell>
      <main>{children}</main>
    </SitePageShell>
  );
}
