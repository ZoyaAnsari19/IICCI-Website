export type MediaNavItem = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

export const MEDIA_NAV: ReadonlyArray<MediaNavItem> = [
  {
    slug: "media-center",
    title: "Media Center",
    description: "News, videos, events & press",
    icon: "fa-clapperboard",
    href: "/media",
  },
  {
    slug: "iicci-story",
    title: "IICCI Story",
    description: "Discover our vision in motion",
    icon: "fa-film",
    href: "/media/iicci-story",
  },
  {
    slug: "current-affairs",
    title: "Current Affairs",
    description: "Trade news & policy intelligence",
    icon: "fa-newspaper",
    href: "/media/currentAffairs",
  },
  {
    slug: "events",
    title: "Events",
    description: "Summits, conferences & trade gatherings",
    icon: "fa-calendar-days",
    href: "/media/events",
  },
] as const;
