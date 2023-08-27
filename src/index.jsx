import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/user-context";
import GlobalProvider from "./context/global-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <UserProvider>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </UserProvider>
    </BrowserRouter>
  </ChakraProvider>
);
