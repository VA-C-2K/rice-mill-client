import React, { useEffect } from "react";
import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../context/user-context";
const Login = React.lazy(() => import("./Login"));
const Signup = React.lazy(() => import("./Signup"));

const AuthPage = () => {
  const navigate = useNavigate();
  const { user } = useUserInfo();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);

  return (
    <Container maxW="xl" centerContent mt="200px">
      <Box display="flex" justifyContent="center" p={3} w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px" bg="#EDF1D6">
        {/* <Image src={IconApp} height={50} width={50} alt={"Icon"}/> */}
        <Text as="b" fontSize="4xl" fontFamily="Work sans" color="#40513B">
          Mahaveer Rice Mill
        </Text>
      </Box>
      <Box bg="#EDF1D6" w="100%" p={4} borderRadius="lg" borderWidth={"1px"}>
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%" _selected={{ color: "white", bg: "#609966" }}>
              Login
            </Tab>
            <Tab width="50%" _selected={{ color: "white", bg: "#609966" }}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AuthPage;
