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
      showToast({ title, description, status: "success" });
    }, [showToast]),

    showErrorToast: useCallback((title, description) => {
      showToast({ title, description, status: "error" });
    }, [showToast]),

    showInfoToast: useCallback((title, description) => {
      showToast({ title, description, status: "info" });
    }, [showToast]),

    showWarningToast: useCallback((title, description) => {
      showToast({ title, description, status: "warning" });
    }, [showToast]),

    showCustomToast: showToast,
  };
};