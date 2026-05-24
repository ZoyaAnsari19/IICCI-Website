import { SitePageShell } from "@/components/layouts/SitePageShell";

export default function MediaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SitePageShell>{children}</SitePageShell>;
}
