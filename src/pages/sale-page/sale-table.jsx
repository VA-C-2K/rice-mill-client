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
  console.log('salesList?.sales: ', salesList?.sales);
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
                  Type of Material
                </Text>
              </Th>
              <Th w={"xs"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Buying Price{" "}
                </Text>
              </Th>
              <Th w={"xs"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  Quantity
                </Text>
              </Th>
              <Th w={"xs"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  Date
                </Text>
              </Th>
              <Th w={"xs"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  MRM Paid Amount
                </Text>
              </Th>
              <Th w={"xs"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  Remaining Amount
                </Text>
              </Th>
              <Th w={"xs"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  Next Due on
                </Text>
              </Th>
              <Th w={"xs"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  Vehicle No.
                </Text>
              </Th>
              <Th w={"xs"}>
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  Vendor
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
                <Td>{capitalizedString(sale?.type_of_material)}</Td>
                <Td>₹ {sale?.buying_price}</Td>
                <Td>{sale?.quantity}</Td>
                <Td>{getFormattedDateforUI(sale?.date)}</Td>
                <Td>₹ {sale?.mrm_paid_price}</Td>
                <Td>₹ {sale?.remaining_price}</Td>
                <Td>{getFormattedDateforUI(sale?.remaining_price_paid_on)}</Td>
                <Td>{sale?.vehicle_details?.vehicle_number || sale?.vehicle_number }</Td>
                <Td>{sale?.vendor_details?.first_name} {sale?.vendor_details?.last_name} - {capitalizedString(sale?.vendor_details?.gov_or_vendor)}</Td>
                <Td>
                  <CustomButton
                    size="sm"
                    bg="transparent"
                    color="#609966"
                    _hover={{ bg: "#4a875d", color: "#EDF1D6" }}
                    onClick={() => handleUpdateClick({ id: sale._id, isUpdate, setIsUpdate, formik })}
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
