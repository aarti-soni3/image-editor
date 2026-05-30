import { toast, Toaster } from "sonner";
import { ToastContext } from "./createContext";

export const ToastProvider = ({ children }) => {
  const theme = { position: "top-center" };

  const showDefaultToast = (title, description = null) => {
    if (description)
      toast(title, { description: description, ...theme.position });
    else toast(title, theme);
  };

  const showSuccessToast = (title, description = null) => {
    if (description)
      toast.success(title, {
        description: description,
        ...theme.position,
      });
    else toast.success(title, theme);
  };

  const showInfoToast = (title, description = null) => {
    if (description)
      toast.success(title, {
        description: description,
        ...theme.position,
      });
    else toast.info(title, theme);
  };

  const showWarningToast = (title, description = null) => {
    if (description)
      toast.success(title, {
        description: description,
        ...theme.position,
      });
    else toast.warning(title, theme);
  };

  const showErrorToast = (title, description = null) => {
    if (description)
      toast.success(title, {
        description: description,
        ...theme.position,
      });
    else toast.error(title, theme);
  };

  return (
    <ToastContext.Provider
      value={{
        showDefaultToast,
        showSuccessToast,
        showInfoToast,
        showWarningToast,
        showErrorToast,
      }}
    >
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};
