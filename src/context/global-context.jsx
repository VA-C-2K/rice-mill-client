/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

const GlobalProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");
  const [fetchList, setFetchList] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  return (
    <GlobalStateContext.Provider
      value={{
        activeTab,
        setActiveTab,
        fetchList,
        setFetchList,
        searchTerm,
        setSearchTerm,
        page,
        setPage,
      }}
    >
      <>{children}</>
    </GlobalStateContext.Provider>
  );
};

export const GlobalState = () => {
  return useContext(GlobalStateContext);
};

export default GlobalProvider;
