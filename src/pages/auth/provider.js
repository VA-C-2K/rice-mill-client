import { useCallback, useMemo } from "react";
import generateContext from "../../utils/generate-context";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthApi } from "../../api/hooks/use-auth-api";
import { useCustomToast } from "../../hooks/use-toast";

function useAuthPage() {
  const navigate = useNavigate();
  const authApi = useAuthApi();
  const { showErrorToast, showLoadingToast, showSuccessToast } =
    useCustomToast();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      showLoadingToast("Logging in...");
    },
    onSuccess: (data) => {
      const user = {
        username: data.name,
        uid: data._id,
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(data.token));
      showSuccessToast("Login Successful");
    },
    onError: (error) => {
      showErrorToast("Error Occurred!", error.response?.data?.message);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: authApi.signUp,
    onMutate: () => {
      showLoadingToast("Signing Up...");
    },
    onSuccess: (data) => {
      const user = {
        username: data.name,
        uid: data._id,
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(data.token));
      showSuccessToast("Registration Successful");
    },
    onError: (error) => {
      showErrorToast("Error Occurred!", error.response?.data?.message);
    },
  });

  const handleLogin = useCallback(
    (values, actions) => {
      loginMutation.mutate(values, {
        onSuccess: () => {
          actions.resetForm();
          navigate("/home");
        },
      });
    },
    [loginMutation, navigate]
  );

  const handleSignUp = useCallback(
    async (values, actions) => {
      signUpMutation.mutate(values, {
        onSuccess: () => {
          actions.resetForm();
          navigate("/home");
        },
      });
    },
    [navigate, signUpMutation]
  );

  return useMemo(() => {
    return {
      loading: loginMutation.isLoading || signUpMutation.isLoading,
      handleLogin,
      handleSignUp,
    };
  }, [
    loginMutation.isLoading,
    signUpMutation.isLoading,
    handleLogin,
    handleSignUp,
  ]);
}

export const [AuthPageProvider, useAuthPageContext] =
  generateContext(useAuthPage);
