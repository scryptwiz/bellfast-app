type ToastParams = {
  type: string;
  text: string;
  duration?: number;
};

let showToastImpl: ((params: ToastParams) => void) | null = null;

export const ToastService = {
  setShowToastFunction: (fn: (params: ToastParams) => void) => {
    showToastImpl = fn;
  },
  showToast: (type: string, text: string, duration = 3000) => {
    if (showToastImpl) {
      showToastImpl({ type, text, duration });
    } else {
      console.warn('Toast function not initialized yet');
    }
  },
};
