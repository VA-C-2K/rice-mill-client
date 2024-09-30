import { useToast } from "@chakra-ui/react";
import { useCallback } from 'react';

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = useCallback((options) => {
    const defaultOptions = {
      duration: 5000,
      isClosable: true,
      position: "bottom",
    };

    toast({
      ...defaultOptions,
      ...options,
    });
  }, [toast]);

  return {
    showSuccessToast: useCallback((title, description) => {
      toast.closeAll();
      showToast({ title, description, status: "success" });
    }, [showToast, toast]),

    showErrorToast: useCallback((title, description) => {
      toast.closeAll();
      showToast({ title, description, status: "error" });
    }, [showToast, toast]),

    showInfoToast: useCallback((title, description) => {
      toast.closeAll();
      showToast({ title, description, status: "info" });
    }, [showToast, toast]),

    showWarningToast: useCallback((title, description) => {
      toast.closeAll();
      showToast({ title, description, status: "warning" });
    }, [showToast, toast]),
    
    showLoadingToast: useCallback((title, description) => {
      toast.closeAll();
      showToast({ title, description, status: "loading" });
    }, [showToast, toast]),

    closeToast: toast.closeAll,

    showCustomToast: showToast,
  };
};