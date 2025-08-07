import { ToastContext } from '@context';
import { isAPIErrorResponse, isValidationError } from '@utils';
import { useContext } from 'react';

export const useToastErrorHandler = () => {
  const { pushToast } = useContext(ToastContext);

  const handleErrorWithToast = (error: unknown) => {
    if (error instanceof Error) {
      if ('body' in error && isAPIErrorResponse(error.body)) {
        const { body } = error;
        pushToast({ type: 'error', message: body.message });
        if (
          'errors' in body &&
          Array.isArray(body.errors) &&
          body.errors.every(isValidationError)
        ) {
          body.errors.forEach((error) =>
            error.failures.forEach((e) => pushToast({ type: 'error', message: e }))
          );
        }
      } else {
        pushToast({ type: 'error', message: error.message });
      }
    }
  };

  return handleErrorWithToast;
};
