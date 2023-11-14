import React from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { GlobalState } from "../context/global-context";
import { Const } from "../constants";
const Cutomer = React.lazy(() => import("./customer-page"));
const Sale = React.lazy(() => import("./sale-page"));

const ExportsPage = () => {
  const { activeTab, setActiveTab, setFetchList, setSearchTerm, setPage } = GlobalState();
  if(activeTab === "") {
    setActiveTab("Sales");
  }else if([...Const.IMPORT_PAGES,...Const.HOME_PAGES].includes(activeTab)){
    setActiveTab("Sales");
  }else if(!Const.EXPORT_PAGES.includes(activeTab)){
    setActiveTab("Sales");
  }
  const handleTabChange = (index) => {
    setActiveTab(Const.EXPORT_PAGES[index]);
    setFetchList(0);
    setSearchTerm("");
    setPage(1);
  };

  return (
    <Tabs position="relative" isFitted variant="soft-rounded" onChange={(index) => handleTabChange(index)}>
      <Box mx="4">
        <Box bg="#EDF1D6" w="100%" py={1} px={10} borderRadius={"3xl"}>
          <TabList m="2px">
            {Const.EXPORT_PAGES.map((page,index) => (
              <Tab _selected={{ color: "white", bg: "#609966" }} key={index}>{page}</Tab>
            ))}
          </TabList>
        </Box>
      </Box>
      <TabPanels>
        <TabPanel>
          <Sale />
        </TabPanel>
        <TabPanel>
          <Cutomer />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default ExportsPage;
