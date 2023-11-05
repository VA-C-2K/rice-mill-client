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

const ProfitPage = () => {
  const { profitList } = useProfitPageContext();
  console.log("profitList: ", profitList);
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          maxW="lg"
          py={2}
          px={6}
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
            pr={5}
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
      </Box>
      <Box
        display={"flex"}
        m={4}
        flexDir={"row"}
        justifyContent={"space-between"}
      >
        <Box
          bg="#EDF1D6"
          display="flex"
          p={3}
          borderWidth="1px"
          borderRadius="xl"
        >
          <TableContainer>
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
                </Tr>
              </Thead>
              <Tbody justifyContent={"center"}>
                {profitList?.mrm_remaining_to_pay_amount?.map((mrm, index) => (
                  <Tr key={mrm._id} _hover={{ bg: "#4a875d", color: "#EDF1D6", cursor:"pointer" }}>
                    <Td>{index + 1}</Td>
                    <Td>
                      {getFormattedDateforUI(mrm.remaining_price_paid_on)}
                    </Td>
                    <Td>{mrm.remaining_price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          bg="#EDF1D6"
          display="flex"
          p={10}
          borderWidth="1px"
          borderRadius="xl"
        ></Box>
      </Box>
    </>
  );
};

export default withHOC(ProfitPageProvider, ProfitPage);
