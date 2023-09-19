/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { capitalizedString } from "../../utils/string-helper";
import { DailyExpensePageProvider, useDailyExpensePageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import TableSkeleton from "../../components/Skeleton";
import { getFormattedDateforUI } from "../../utils/date";

const DailyExpenseTable = (props) => {
  const { dailyExpenseList, handleUpdateClick, handleDelete, loading } = useDailyExpensePageContext();
  const { isUpdate, setIsUpdate, formik } = props;
  if (loading) {
    return <TableSkeleton NoRecordFound={false} />;
  }
  if (dailyExpenseList?.dailyExpenses?.length === 0) {
    return <TableSkeleton NoRecordFound={true} />;
  }
  return (
    <Box bg="#EDF1D6" w="100%" h="100%" p={3} borderWidth={"1px"} borderRadius={"lg"}>
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <Thead bg={"#9DC08B"} borderRadius={"lg"} h={"12"}>
            <Tr>
              <Th w={"12"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  No.
                </Text>
              </Th>
              <Th w={"xs"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Date
                </Text>
              </Th>
              <Th w={"3xs"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Entity{" "}
                </Text>
              </Th>
              <Th w={"xs"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Amount{" "}
                </Text>
              </Th>
              <Th w={"lg"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Description{" "}
                </Text>
              </Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody justifyContent={"center"}>
            {dailyExpenseList?.dailyExpenses?.map((daily_expense, index) => (
              <Tr key={daily_expense?._id}>
                <Td>{index + 1}</Td>
                <Td>
                  {getFormattedDateforUI(daily_expense?.date)}
                </Td>
                <Td>{capitalizedString(daily_expense?.entity)}</Td>
                <Td>₹ {daily_expense?.amount}</Td>
                <Td>{daily_expense?.description}</Td>
                <Td>
                  <CustomButton
                    size="sm"
                    bg="transparent"
                    color="#609966"
                    _hover={{ bg: "#4a875d", color: "#EDF1D6" }}
                    onClick={() => handleUpdateClick({ id: daily_expense?._id, isUpdate, setIsUpdate, formik })}
                  >
                    {<EditIcon w={5} h={5} />}
                  </CustomButton>
                </Td>
                <Td>
                  <CustomButton
                    size="sm"
                    bg="transparent"
                    color={"#D57E7E"}
                    _hover={{ bg: "#D25959", color: "#EDF1D6" }}
                    onClick={() => handleDelete(daily_expense?._id)}
                  >
                    {<DeleteIcon w={5} h={5} />}
                  </CustomButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default withHOC(DailyExpensePageProvider, DailyExpenseTable);
