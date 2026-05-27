"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __iicciOnRouteChange?: () => void;
  }
}

function runAfterPaint(fn: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}

export function SiteClientInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (document.getElementById("iicci-app-js")) return;

    const script = document.createElement("script");
    script.id = "iicci-app-js";
    script.src = "/static/app.js";
    script.async = false;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    runAfterPaint(() => {
      window.__iicciOnRouteChange?.();
    });
  }, [pathname]);

  return null;
}
