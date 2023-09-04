import React from "react";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { GlobalState } from "../context/global-context";
import Const from "../constants";
const Vendor = React.lazy(() => import("./vendor-page"));
const Vehicle = React.lazy(() => import("./vehicle-page"));
const Product = React.lazy(() => import("./product-page"));

const ImportsPage = () => {
  const { activeTab, setActiveTab, setFetchList, setSearchTerm, setPage } = GlobalState();
  if (activeTab === "") {
    setActiveTab("Vendor");
  } else if (
    [...Const.HOME_PAGES, ...Const.EXPORT_PAGES].includes(activeTab)
  ) {
    setActiveTab("Vendor");
  } else if (!Const.IMPORT_PAGES.includes(activeTab)) {
    setActiveTab("Vendor");
  }
  const handleTabChange = (index) => {
    setActiveTab(Const.IMPORT_PAGES[index]);
    setFetchList(0);
    setSearchTerm("");
    setPage(1);
  };

  return (
    <Tabs position="relative" isFitted variant="soft-rounded" onChange={(index) => handleTabChange(index)}>
      <Box mx="4">
        <Box bg="#EDF1D6" w="100%" py={1} px={10} borderRadius={"3xl"}>
          <TabList m="2px">
            {Const.IMPORT_PAGES.map((page,index) => (
              <Tab _selected={{ color: "white", bg: "#609966" }} key={index}>{page}</Tab>
            ))}
          </TabList>
        </Box>
      </Box>
      <TabPanels>
        <TabPanel>
          <Vendor />
        </TabPanel>
        <TabPanel>
          <Product />
        </TabPanel>
        <TabPanel>
          <Vehicle />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default ImportsPage;
