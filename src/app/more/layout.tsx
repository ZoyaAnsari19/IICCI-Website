import { SitePageShell } from "@/components/layouts/SitePageShell";

export default function MoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SitePageShell>{children}</SitePageShell>;
}
