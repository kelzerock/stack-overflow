import { createContext, useContext } from 'react';

type ToastMessage = { type: 'success' | 'error'; message: string };
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
