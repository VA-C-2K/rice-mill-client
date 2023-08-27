/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ProductPageProvider, useProductPageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import TableSkeleton from "../../components/Skeleton";

const ProductTable = (props) => {
  const { productList, handleUpdateClick, handleDelete, loading } = useProductPageContext();
  const { isUpdate, setIsUpdate, formik } = props;
  if (loading) {
    return <TableSkeleton NoRecordFound={false} />;
  }
  if (productList?.products?.length === 0) {
    return <TableSkeleton NoRecordFound={true} />;
  }
  return (
    <Box mt={"6"} bg="#EDF1D6" w="100%" h="100%" p={3} borderWidth={"1px"} borderRadius={"lg"}>
      <TableContainer>
        <Table variant="simple" size={"sm"}>
          <Thead bg={"#9DC08B"} borderRadius={"lg"} h={"12"}>
            <Tr>
              <Th w={"20"}>
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
                  Quantity
                </Text>
              </Th>
              <Th w={"lg"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Current Rate{" "}
                </Text>
              </Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody justifyContent={"center"}>
            {productList?.products?.map((prod, index) => (
              <Tr key={prod._id}>
                <Td>{index + 1}</Td>
                <Td>{prod.name}</Td>
                <Td>{prod.quantity} Kg</Td>
                <Td>₹ {prod.current_rate}</Td>
                <Td>
                  <CustomButton
                    size="sm"
                    bg="transparent"
                    color="#609966"
                    _hover={{ bg: "#4a875d", color: "#EDF1D6" }}
                    onClick={() => handleUpdateClick({ id: prod._id, isUpdate, setIsUpdate, formik })}
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
                    onClick={() => handleDelete(prod._id)}
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

export default withHOC(ProductPageProvider, ProductTable);
