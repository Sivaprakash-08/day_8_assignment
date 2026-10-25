import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState('');

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(window.__jasperToastTimer);
    window.__jasperToastTimer = window.setTimeout(() => setToast(''), 2400);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && <div className="toast" role="status" aria-live="polite">{toast}</div>}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
