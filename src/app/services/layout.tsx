import { SitePageShell } from "@/components/layouts/SitePageShell";

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SitePageShell>{children}</SitePageShell>;
}
