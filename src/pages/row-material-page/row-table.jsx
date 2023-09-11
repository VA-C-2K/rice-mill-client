/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { RowMaterialPageProvider, useRowMaterialPageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import TableSkeleton from "../../components/Skeleton";
import { capitalizedString } from "../../utils/string-helper";
import { getFormattedDateforUI } from "../../utils/date";

const RowTable = (props) => {
  const { rowMaterialList, handleUpdateClick, handleDelete, loading } = useRowMaterialPageContext();
  const { isUpdate, setIsUpdate, formik } = props;
  if (loading) {
    return <TableSkeleton NoRecordFound={false} />;
  }
  if (rowMaterialList?.row_materials?.length === 0) {
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
            </Tr>
          </Thead>
          <Tbody justifyContent={"center"}>
            {rowMaterialList?.row_materials?.map((row, index) => (
              <Tr key={row._id}>
                <Td>{index + 1}</Td>
                <Td>{capitalizedString(row?.type_of_material)}</Td>
                <Td>₹ {row?.buying_price}</Td>
                <Td>{row?.quantity}</Td>
                <Td>{getFormattedDateforUI(row?.date)}</Td>
                <Td>₹ {row?.mrm_paid_price}</Td>
                <Td>₹ {row?.remaining_price}</Td>
                <Td>{getFormattedDateforUI(row?.remaining_price_paid_on)}</Td>
                <Td>{row?.vehicle_details?.vehicle_number || row?.vehicle_number }</Td>
                <Td>{row?.vendor_details?.first_name} {row?.vendor_details?.last_name} - {capitalizedString(row?.vendor_details?.gov_or_vendor)}</Td>
                <Td>
                  <CustomButton
                    size="sm"
                    bg="transparent"
                    color="#609966"
                    _hover={{ bg: "#4a875d", color: "#EDF1D6" }}
                    onClick={() => handleUpdateClick({ id: row._id, isUpdate, setIsUpdate, formik })}
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
                    onClick={() => handleDelete(row._id)}
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

export default withHOC(RowMaterialPageProvider, RowTable);
