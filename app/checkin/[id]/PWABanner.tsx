interface PWABannerProps {
  installPrompt: any;
  isIOS: boolean;
  isStandalone: boolean;
  onInstall: () => void;
}

export function PWABanner({ installPrompt, isIOS, isStandalone, onInstall }: PWABannerProps) {
  // Se já estiver instalado, some completamente
  if (isStandalone) return null;

  // Se não for nem Android pronto pra instalar, nem iOS, some.
  if (!installPrompt && !isIOS) return null;

  return (
    <div className="w-full px-4 py-2 border-b border-slate-200 bg-slate-50/50 backdrop-blur-sm">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <p>
            {isIOS 
              ? "Para usar como App: toque em partilhar e 'Ecrã de Início'" 
              : "Instale o App para melhor experiência"}
          </p>
        </div>
        
        {!isIOS && installPrompt && (
          <button 
            onClick={onInstall}
            className="text-blue-600 font-semibold whitespace-nowrap"
          >
            Instalar
          </button>
        )}
      </div>
    </div>
  );
}