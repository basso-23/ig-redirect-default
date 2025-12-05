"use client";
import { useEffect } from "react";

export default function RedirectClient({ url }) {
  useEffect(() => {
    if (url && url !== "Url") {
      const timer = setTimeout(() => {
        window.location.replace(url);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [url]);

  return (
    <div className="page-container">
      <div>Redirigiendo...</div>
    </div>
  );
}
