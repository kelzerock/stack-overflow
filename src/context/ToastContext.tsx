import { createContext, useContext } from 'react';
type ToastType = 'info' | 'success' | 'warning' | 'error' | 'default';
type ToastMessage = { type: ToastType; message: string };
type ToastContextType = {
  toasts: ToastMessage[];
  pushToast: (msg: ToastMessage) => void;
  clearToasts: () => void;
};

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  pushToast: () => {},
  clearToasts: () => {},
});

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('ToastContext not available');
  return ctx;
};
