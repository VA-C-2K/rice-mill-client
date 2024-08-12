import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosProvider } from "./context/axios-context";
import { UserProvider } from "./context/user-context";
import { GlobalProvider } from "./context/global-context";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AxiosProvider>
          <UserProvider>
            <GlobalProvider>
              <App />
            </GlobalProvider>
          </UserProvider>
        </AxiosProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ChakraProvider>
);
