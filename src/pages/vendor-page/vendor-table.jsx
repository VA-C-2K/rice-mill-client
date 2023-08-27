import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { capitalizedString } from "../../utils/string-helper";
import { VendorPageProvider, useVendorPageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import TableSkeleton from "../../components/Skeleton";

const VendorTable = (props) => {
  const { vendorList, handleUpdateClick, handleDelete, loading } = useVendorPageContext();
  const { isUpdate, setIsUpdate, formik } = props;
  if (loading) {
    return <TableSkeleton NoRecordFound={false} />;
  }
  if (vendorList?.vendors?.length === 0) {
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
                  Govt/ Vendor{" "}
                </Text>
              </Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody justifyContent={"center"}>
            {vendorList?.vendors?.map((vendor, index) => (
              <Tr key={vendor._id}>
                <Td>{index + 1}</Td>
                <Td>
                  {vendor.first_name} {vendor.last_name}
                </Td>
                <Td>{vendor.address}</Td>
                <Td>{vendor.phone_number}</Td>
                <Td>{capitalizedString(vendor.gov_or_vendor)}</Td>
                <Td>
                  <CustomButton
                    size="sm"
                    bg="transparent"
                    color="#609966"
                    _hover={{ bg: "#4a875d", color: "#EDF1D6" }}
                    onClick={() => handleUpdateClick({ id: vendor._id, isUpdate, setIsUpdate, formik })}
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
                    onClick={() => handleDelete(vendor._id)}
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

export default withHOC(VendorPageProvider, VendorTable);
