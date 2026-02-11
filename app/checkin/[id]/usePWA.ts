import { useState, useEffect } from 'react';

export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Detecta se é iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIosDevice);

    // 2. Verifica se já está instalado/rodando como App
    const isApp = window.matchMedia('(display-mode: standalone)').matches 
                  || (navigator as any).standalone 
                  || document.referrer.includes('android-app://');
    setIsStandalone(isApp);

    // 3. Captura o evento de instalação (Android/Chrome)
    const handler = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  return { installPrompt, isIOS, isStandalone, installApp };
}