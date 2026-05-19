import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title:
    "IICCI – Indian Importers Chambers of Commerce & Industry | Global Trade",
  description:
    "Indian Importers Chambers of Commerce & Industry (IICCI) - Connecting India to Global Trade Opportunities. Empowering importers, global partnerships, international trade, investment opportunities, and bilateral business growth.",
  keywords: [
    "IICCI",
    "Indian Importers",
    "Chamber of Commerce",
    "International Trade",
    "Import Export",
    "Global Trade",
    "India Business",
    "Bilateral Trade",
  ],
  authors: [
    {
      name: "Indian Importers Chambers of Commerce & Industry",
    },
  ],
  openGraph: {
    title: "IICCI - Indian Importers Chambers of Commerce & Industry",
    description:
      "Connecting India To Global Trade Opportunities. A premium international chamber empowering importers and global partnerships.",
    type: "website",
  },
  other: {
    "theme-color": "#081120",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const tailwindConfig = `
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
      colors: {
        navy: {
          50: '#f0f4fa',
          100: '#dae4f1',
          200: '#b5c9e3',
          300: '#86a5cf',
          400: '#557fb6',
          500: '#36629c',
          600: '#264c7e',
          700: '#1d3c66',
          800: '#142a4a',
          900: '#0c1c34',
          950: '#081120',
        },
        royal: {
          DEFAULT: '#1e40af',
          light: '#3b82f6',
          dark: '#1e3a8a',
        },
        gold: {
          50: '#fbf8ec',
          100: '#f6efce',
          200: '#eddd9d',
          300: '#e2c466',
          400: '#d9ac3d',
          500: '#c79328',
          600: '#a87320',
          700: '#86551e',
          800: '#70451f',
          900: '#5f3a1f',
          DEFAULT: '#d4af37',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          'to': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      }
    }
  }
};
document.documentElement.classList.add('tailwind-ready');
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        {/* Same order as original Hono renderer — scripts in head before body paint */}
        <script src="https://cdn.tailwindcss.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: tailwindConfig,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.1/css/all.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js" />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body className="bg-navy-950 text-white font-sans antialiased overflow-x-hidden">
        {children}
        <script src="/static/app.js" defer />
      </body>
    </html>
  );
}
