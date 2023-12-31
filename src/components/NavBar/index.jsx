/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, Box, Flex, Text, Stack } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import CustomButton from "../CustomButton";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Text as="b" fontSize="lg" fontFamily="Work sans" color="#40513B">
        Mahaveer Rice Mill
      </Text>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="#40513B"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg width="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#40513B">
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, to = "/", ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link onClick={() => navigate(to)}>
      <Text display="block" fontWeight={isActive ? "bold" : "normal"} {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  const navigate = useNavigate();
  const logouthandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box display={{ base: isOpen ? "block" : "none", md: "block" }} flexBasis={{ base: "100%", md: "auto" }}>
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/profit"> Profit </MenuItem>
        <MenuItem to="/home"> Home </MenuItem>
        <MenuItem to="/imports"> Imports </MenuItem>
        <MenuItem to="/exports"> Exports </MenuItem>
        <MenuItem isLast>
          <CustomButton onClick={logouthandler} size={["sm", "md"]} id="logoutBtn">
            Logout
          </CustomButton>
        </MenuItem>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" mb={2} p={3} bg={"#EDF1D6"} color={"#40513B"} {...props}>
      {children}
    </Flex>
  );
};

export default NavBar;
