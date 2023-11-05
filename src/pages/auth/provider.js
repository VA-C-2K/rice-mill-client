import { useCallback, useMemo, useState } from "react";
import generateContext from "../../utils/generate-context";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { config } from "../../api";
import { login, signUp } from "../../api";

function useAuthPage() {
  axios.defaults.withCredentials = true;
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(
    async (values, actions) => {
      toast({
        title:"Logging in...",
        status:"loading",
        duration: 500,
        isClosable: true,
        position: "bottom",
      });
      const { phonenumber, password } = values;
      setLoading(true);
      try {
        const { data } = await axios.post(login(), { password, phonenumber }, config());
        toast.close();
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        const user = {
          username: data.name,
          uid: data._id,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(data.token));
        setLoading(false);
        actions.resetForm();
        navigate("/home");
      } catch (error) {
        toast.close();
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    },
    [navigate, toast]
  );

  const handleSignUp = useCallback(
    async (values, actions) => {
      toast({
        title:"Signing Up...",
        status:"loading",
        duration: 500,
        isClosable: true,
        position: "bottom",
      });
      const { username, phonenumber, password } = values;
      setLoading(true);
      try {
        const { data } = await axios.post(
          signUp(),
          {
            name: username,
            password,
            phonenumber,
          },
          config()
        );
        toast.close();
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        const user = {
          username: data.name,
          uid: data._id,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(data.token));
        actions.resetForm();
        navigate("/home");
      } catch (error) {
        toast.close();
        toast({
          title: "Error Occured!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    },
    [navigate, toast]
  );

  return useMemo(() => {
    return {
      loading,
      handleLogin,
      handleSignUp,
    };
  }, [loading, handleLogin, handleSignUp]);
}

export const [AuthPageProvider, useAuthPageContext] = generateContext(useAuthPage);
