import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ToastContext } from './ToastContext';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<{ type: 'success' | 'error'; message: string }[]>([]);

  const pushToast = (msg: { type: 'success' | 'error'; message: string }) => {
    setToasts((prev) => [...prev, msg]);
  };

  const clearToasts = () => setToasts([]);

  useEffect(() => {
    if (toasts.length) {
      toasts.forEach(({ type, message }) => {
        toast[type](message);
      });
      clearToasts();
    }
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toasts, pushToast, clearToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
