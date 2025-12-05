"use client";
import { useEffect, useState } from "react";

function detectBrowser() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return {
    isInstagram: /instagram/i.test(ua),
    isAndroid: /Android/i.test(ua),
    isIOS: /iPhone|iPad|iPod/i.test(ua),
  };
}

function getRedirectUrl(url, browserInfo) {
  // Si es Android + Instagram, usar intent:// para forzar navegador externo
  if (browserInfo.isAndroid && browserInfo.isInstagram) {
    try {
      const parsedUrl = new URL(url);
      return `intent://${parsedUrl.hostname}${parsedUrl.pathname}${parsedUrl.search}#Intent;scheme=${parsedUrl.protocol.slice(0, -1)};action=android.intent.action.VIEW;end`;
    } catch (e) {
      console.error('Error parsing URL:', e);
      return url;
    }
  }

  // Para iOS + Instagram o navegadores normales, usar URL normal
  return url;
}

export default function RedirectClient({ url }) {
  const [browserInfo, setBrowserInfo] = useState(null);

  useEffect(() => {
    // Detectar navegador solo en el cliente
    const info = detectBrowser();
    setBrowserInfo(info);
  }, []);

  useEffect(() => {
    if (url && url !== "Url" && browserInfo) {
      const timer = setTimeout(() => {
        const redirectUrl = getRedirectUrl(url, browserInfo);

        // Para iOS + Instagram: intentar window.open() primero
        if (browserInfo.isIOS && browserInfo.isInstagram) {
          const opened = window.open(redirectUrl, '_blank');
          // Si window.open falla o no abre, usar fallback
          if (!opened || opened.closed || typeof opened.closed === 'undefined') {
            window.location.href = redirectUrl;
          }
        } else {
          // Android con intent:// o navegadores normales
          window.location.href = redirectUrl;
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [url, browserInfo]);

  return (
    <div className="page-container">
      <div>Redirigiendo...</div>
    </div>
  );
}
