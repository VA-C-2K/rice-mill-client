import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { capitalizedString } from "../../utils/string-helper";
import { useCustomerPageContext, CustomerPageProvider } from "./provider";
import withHOC from "../../utils/with-hoc";
import TableSkeleton from "../../components/Skeleton";

const CustomerTable = (props) => {
  const { customerList, handleUpdateClick, handleDelete, loading } = useCustomerPageContext();
  const { isUpdate, setIsUpdate, formik } = props;
  if (loading) {
    return <TableSkeleton NoRecordFound={false} />;
  }
  if (customerList?.customers?.length === 0) {
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
              <Th w={"lg"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Name
                </Text>
              </Th>
              <Th w={"lg"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Address{" "}
                </Text>
              </Th>
              <Th w={"2xs"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Phone No.{" "}
                </Text>
              </Th>
              <Th w={"xs"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Govt/ Cust{" "}
                </Text>
              </Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody justifyContent={"center"}>
            {customerList?.customers?.map((customer, index) => (
              <Tr key={customer._id}>
                <Td>{index + 1}</Td>
                <Td>
                  {customer.first_name} {customer.last_name}
                </Td>
                <Td>{customer.address}</Td>
                <Td>{customer.phone_number}</Td>
                <Td>{capitalizedString(customer.gov_or_cust)}</Td>
                <Td>
                  <CustomButton
                    size="sm"
                    bg="transparent"
                    color="#609966"
                    _hover={{ bg: "#4a875d", color: "#EDF1D6" }}
                    onClick={() => handleUpdateClick({ id: customer._id, isUpdate, setIsUpdate, formik })}
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
                    onClick={() => handleDelete(customer._id)}
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

export default withHOC(CustomerPageProvider, CustomerTable);
