import React from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { GlobalState } from "../context/global-context";
import Const from "../constants";
const Employee = React.lazy(() => import("./employee-page/index.jsx"));

const HomePage = () => {
  const { activeTab, setActiveTab, setFetchList, setSearchTerm, setPage } =
    GlobalState();
  if (activeTab === "") {
    setActiveTab("Employee");
  } else if (
    [...Const.IMPORT_PAGES, ...Const.EXPORT_PAGES].includes(activeTab)
  ) {
    setActiveTab("Employee");
  } else if (!Const.HOME_PAGES.includes(activeTab)) {
    setActiveTab("Employee");
  }
  const handleTabChange = (index) => {
    setActiveTab(Const.HOME_PAGES[index]);
    setFetchList(0);
    setSearchTerm("");
    setPage(1);
  };

  return (
    <Tabs
      position="relative"
      isFitted
      variant="soft-rounded"
      onChange={(index) => handleTabChange(index)}
    >
      <Box mx="4">
        <Box bg="#EDF1D6" w="100%" py={1} px={10} borderRadius={"3xl"}>
          <TabList m="2px">
            {Const.HOME_PAGES.map((page, index) => (
              <Tab _selected={{ color: "white", bg: "#609966" }} key={index}>
                {page}
              </Tab>
            ))}
          </TabList>
        </Box>
      </Box>
      <TabPanels>
        <TabPanel>
          <Employee />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default HomePage;
