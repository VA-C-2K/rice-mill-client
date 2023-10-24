/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { DeleteIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { SalePageProvider, useSalePageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import TableSkeleton from "../../components/Skeleton";
import { capitalizedString } from "../../utils/string-helper";
import { getFormattedDateforUI } from "../../utils/date";

const SaleTable = (props) => {
  const { salesList, handleUpdateClick, handleDelete, loading } = useSalePageContext();
  const { isUpdate, setIsUpdate, formik } = props;
  if (loading) {
    return <TableSkeleton NoRecordFound={false} />;
  }
  if (salesList?.sales?.length === 0) {
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
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  Date
                </Text>
              </Th>
              <Th w={"xs"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Product
                </Text>
              </Th>
              <Th w={"12"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Quantity{" "}
                </Text>
              </Th>
              <Th w={"12"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                Total Amount
                </Text>
              </Th>
              <Th w={"12"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  Final Amount Paid
                </Text>
              </Th>
              <Th w={"xs"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  Customer Name
                </Text>
              </Th>
              <Th w={"xs"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  Vehicle No.
                </Text>
              </Th>
              <Th w={"xs"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  Discount
                </Text>
              </Th>
                <Th w={"12"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                Remaining Amount
                </Text>
              </Th>
              <Th w={"xs"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                Next Due On
                </Text>
              </Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody justifyContent={"center"}>
            {salesList?.sales?.map((sale, index) => (
              <Tr key={sale._id}>
                <Td>{index + 1}</Td>
                <Td>{getFormattedDateforUI(sale?.date)}</Td>
                <Td>{capitalizedString(sale?.product_details?.name)} ({sale?.product_details?.current_rate})</Td>
                <Td>{sale?.quantity} kg</Td>
                <Td>₹ {sale?.total_amount}</Td>
                <Td>₹ {sale?.final_amount_paid}</Td>
                <Td>{sale?.customer_details?.first_name || "-"} {sale?.customer_details?.last_name || "-"}</Td>
                <Td>{sale?.vehicle_details?.vehicle_number || sale?.vehicle_number }</Td>
                <Td>{sale?.discount || 0} %</Td>
                <Td>₹ {sale?.remainig_amount || "-"}</Td>
                <Td>{getFormattedDateforUI(sale?.next_due_on) || "-"}</Td>
                <Td>
                  <CustomButton
                    size="sm"
                    bg="transparent"
                    color="#609966"
                    _hover={{ bg: "#4a875d", color: "#EDF1D6" }}
                    onClick={() => {}}
                  >
                    {<ExternalLinkIcon w={5} h={5} />}
                  </CustomButton>
                </Td>
                <Td>
                  <CustomButton
                    size="sm"
                    bg="transparent"
                    color="#609966"
                    _hover={{ bg: "#4a875d", color: "#EDF1D6" }}
                    onClick={() => handleUpdateClick({ id: sale._id, isUpdate, setIsUpdate, formik })}
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
                    onClick={() => handleDelete(sale._id)}
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

export default withHOC(SalePageProvider, SaleTable);
