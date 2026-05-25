import { SitePageShell } from "@/components/layouts/SitePageShell";
import { MediaSubnav } from "@/components/layouts/MediaSubnav";

export default function MediaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SitePageShell>
      <MediaSubnav />
      <main>{children}</main>
    </SitePageShell>
  );
}
