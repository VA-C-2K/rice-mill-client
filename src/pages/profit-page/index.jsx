/* eslint-disable react-refresh/only-export-components */
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import withHOC from "../../utils/with-hoc";
import { ProfitPageProvider, useProfitPageContext } from "./provider";
import { getFormattedDateforUI } from "../../utils/date";
import { capitalizedString } from "../../utils/string-helper";
import { Input, InputGroup } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { SearchIcon } from "@chakra-ui/icons";

const ProfitPage = () => {
  const {
    profitList,
    handleViewRowProduct,
    handleViewSale,
    handleSearch,
    filterDateRef,
  } = useProfitPageContext();
  return (
    <>
      <Box display="flex" justifyContent="flex-end" px={6}>
        <Box
          display="flex"
          maxW="lg"
          py={2}
          px={4}
          mr={20}
          justifyContent={"center"}
          borderWidth="1px"
          borderRadius="xl"
          boxShadow={"xl"}
          bg="#EDF1D6"
          overflow="hidden"
          borderColor={profitList?.profit > 0 ? "green.500" : "red.500"}
        >
          <Text
            as="b"
            fontSize="xl"
            fontFamily="Work sans"
            color="#40513B"
            pr={2}
          >
            Profit
          </Text>
          {profitList?.profit > 0 ? (
            <Text
              color={"green.500"}
              as="cite"
              fontWeight={700}
              fontSize="lg"
              fontFamily="Work sans"
            >
              {" "}
              + {profitList?.profit}{" "}
            </Text>
          ) : (
            <Text
              color={"red.500"}
              as="cite"
              fontWeight={700}
              fontSize="lg"
              fontFamily="Work sans"
            >
              {" "}
              {profitList?.profit}{" "}
            </Text>
          )}
        </Box>
        <Box
          display="flex"
          maxW="lg"
          py={2}
          px={6}
          borderWidth="1px"
          borderRadius="xl"
          boxShadow={"xl"}
          bg="#EDF1D6"
          flexDir={"row"}
          justifyContent="space-between"
        >
          <Box display={"flex"}>
            <InputGroup>
              <Input
                variant="outline"
                focusBorderColor="#609966"
                _placeholder={{ opacity: 0.5, color: "#40513B" }}
                color="#609966"
                fontWeight={500}
                border="1px"
                type="date"
                onChange={(e) => filterDateRef.current = { ...filterDateRef.current,to: e.target.value }}
              />
              <Box pr={3}> </Box>
              <Input
                type="date"
                variant="outline"
                focusBorderColor="#609966"
                _placeholder={{ opacity: 0.5, color: "#40513B" }}
                color="#609966"
                fontWeight={500}
                border="1px"
                onChange={(e) => filterDateRef.current = { ...filterDateRef.current,from: e.target.value }}
              />
            </InputGroup>
            <Box pr={3}></Box>
            <CustomButton
              bg="transparent"
              color="#609966"
              _hover={{ bg: "#4a875d", color: "#EDF1D6" }}
              border="1px"
              onClick={handleSearch}
            >
              <SearchIcon />
            </CustomButton>
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        pt={20}
        px={8}
        flexDir={"row"}
        justifyContent={"space-between"}
      >
        <Box
          bg="#EDF1D6"
          display="flex"
          p={2}
          borderWidth="1px"
          borderRadius="xl"
        >
          <TableContainer>
            <Text
              as="b"
              fontSize="md"
              fontFamily="Work sans"
              color="#40513B"
              px={2}
              py={1}
            >
              MRM to pay
            </Text>
            <Table variant="simple" size={"sm"}>
              <Thead bg={"#9DC08B"} h={"12"}>
                <Tr>
                  <Th w={"10"}>
                    <Text
                      as="b"
                      fontSize="sm"
                      fontFamily="Work sans"
                      color="#40513B"
                    >
                      No.
                    </Text>
                  </Th>
                  <Th w={"15"}>
                    <Text
                      as="b"
                      fontSize="sm"
                      fontFamily="Work sans"
                      color="#40513B"
                    >
                      Due Date
                    </Text>
                  </Th>
                  <Th w={"15"}>
                    {" "}
                    <Text
                      as="b"
                      fontSize="sm"
                      fontFamily="Work sans"
                      color="#40513B"
                    >
                      {" "}
                      Amount
                    </Text>
                  </Th>
                  <Th w={"15"}>
                    {" "}
                    <Text
                      as="b"
                      fontSize="sm"
                      fontFamily="Work sans"
                      color="#40513B"
                    >
                      {" "}
                      Vendor Details
                    </Text>
                  </Th>
                  <Th w={"15"}>
                    {" "}
                    <Text
                      as="b"
                      fontSize="sm"
                      fontFamily="Work sans"
                      color="#40513B"
                    >
                      {" "}
                      Phone No.
                    </Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody justifyContent={"center"}>
                {profitList?.mrm_remaining_to_pay_amount?.map((mrm, index) => (
                  <Tr
                    key={mrm._id}
                    _hover={{
                      bg: "#4a875d",
                      color: "#EDF1D6",
                      cursor: "pointer",
                    }}
                    onClick={handleViewRowProduct(mrm._id)}
                  >
                    <Td>{index + 1}</Td>
                    <Td>
                      {getFormattedDateforUI(mrm.remaining_price_paid_on)}
                    </Td>
                    <Td>{mrm.remaining_price}</Td>
                    <Td>
                      {mrm.vendor_details.first_name}{" "}
                      {mrm.vendor_details.last_name} (
                      {capitalizedString(mrm.vendor_details.gov_or_vendor)}){" "}
                    </Td>
                    <Td>{mrm.vendor_details.phone_number} </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          bg="#EDF1D6"
          display="flex"
          p={2}
          borderWidth="1px"
          borderRadius="xl"
        >
          <TableContainer>
            <Text
              as="b"
              fontSize="md"
              fontFamily="Work sans"
              color="#40513B"
              px={2}
              py={1}
            >
              MRM to receive
            </Text>
            <Table variant="simple" size={"sm"}>
              <Thead bg={"#9DC08B"} h={"12"}>
                <Tr>
                  <Th w={"10"}>
                    <Text
                      as="b"
                      fontSize="sm"
                      fontFamily="Work sans"
                      color="#40513B"
                    >
                      No.
                    </Text>
                  </Th>
                  <Th w={"15"}>
                    <Text
                      as="b"
                      fontSize="sm"
                      fontFamily="Work sans"
                      color="#40513B"
                    >
                      Due Date
                    </Text>
                  </Th>
                  <Th w={"15"}>
                    {" "}
                    <Text
                      as="b"
                      fontSize="sm"
                      fontFamily="Work sans"
                      color="#40513B"
                    >
                      {" "}
                      Amount
                    </Text>
                  </Th>
                  <Th w={"15"}>
                    {" "}
                    <Text
                      as="b"
                      fontSize="sm"
                      fontFamily="Work sans"
                      color="#40513B"
                    >
                      {" "}
                      Customer Details
                    </Text>
                  </Th>
                  <Th w={"15"}>
                    {" "}
                    <Text
                      as="b"
                      fontSize="sm"
                      fontFamily="Work sans"
                      color="#40513B"
                    >
                      {" "}
                      Phone No.
                    </Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody justifyContent={"center"}>
                {profitList?.sales?.map((sale, index) => (
                  <Tr
                    key={sale._id}
                    _hover={{
                      bg: "#4a875d",
                      color: "#EDF1D6",
                      cursor: "pointer",
                    }}
                    onClick={handleViewSale(sale._id)}
                  >
                    <Td>{index + 1}</Td>
                    <Td>{getFormattedDateforUI(sale.next_due_on)}</Td>
                    <Td>{sale.remainig_amount}</Td>
                    <Td>
                      {sale.customer_details.first_name}{" "}
                      {sale.customer_details.last_name} (
                      {capitalizedString(sale.customer_details.gov_or_cust)}){" "}
                    </Td>
                    <Td>{sale.customer_details.phone_number} </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default withHOC(ProfitPageProvider, ProfitPage);
