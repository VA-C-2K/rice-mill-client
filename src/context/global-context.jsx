/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const useGloabalInfoContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");
  const [fetchList, setFetchList] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  return (
    <useGloabalInfoContext.Provider
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
    </useGloabalInfoContext.Provider>
  );
};

export const useGloabalInfo = () => useContext(useGloabalInfoContext);
