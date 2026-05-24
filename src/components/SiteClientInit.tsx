"use client";

import { useEffect } from "react";

export function SiteClientInit() {
  useEffect(() => {
    if (document.getElementById("iicci-app-js")) return;

    const script = document.createElement("script");
    script.id = "iicci-app-js";
    script.src = "/static/app.js";
    script.async = false;
    document.body.appendChild(script);
  }, []);

  return null;
}
