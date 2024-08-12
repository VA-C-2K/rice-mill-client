/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Box, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { EmployeePageProvider, useEmployeePageContext } from "./provider";
import withHOC from "../../utils/with-hoc";
import TableSkeleton from "../../components/Skeleton";

const EmployeeTable = (props) => {
  const { employeeList, handleUpdateClick, loading } = useEmployeePageContext();
  const { isUpdate, setIsUpdate, formik, handleDelete } = props;

  if (loading) {
    return <TableSkeleton NoRecordFound={false} />;
  }
  if (employeeList?.employees?.length === 0) {
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
                  Salary{" "}
                </Text>
              </Th>
              <Th w={"xs"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Aadhar Card No.{" "}
                </Text>
              </Th>
              <Th w={"xs"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  No. Of Leaves{" "}
                </Text>
              </Th>
              <Th w={"xs"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Role{" "}
                </Text>
              </Th>
              <Th w={"xs"}>
                {" "}
                <Text as="b" fontSize="sm" fontFamily="Work sans" color="#40513B">
                  {" "}
                  Over time (hrs){" "}
                </Text>
              </Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody justifyContent={"center"}>
            {employeeList?.employees?.map((employee, index) => (
              <Tr key={employee._id}>
                <Td>{index + 1}</Td>
                <Td>
                  {employee.first_name} {employee.last_name}
                </Td>
                <Td>{employee.address}</Td>
                <Td>{employee.phone_number}</Td>
                <Td>{employee.salary}</Td>
                <Td>{employee.aadhar_card_no}</Td>
                <Td>{employee.no_of_leaves}</Td>
                <Td>{employee.role}</Td>
                <Td>{employee.over_time_hrs}</Td>
                <Td>
                  <CustomButton
                    size="sm"
                    bg="transparent"
                    color="#609966"
                    _hover={{ bg: "#4a875d", color: "#EDF1D6" }}
                    onClick={() => handleUpdateClick({ id: employee._id, isUpdate, setIsUpdate, formik })}
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
                    onClick={() => handleDelete(employee._id)}
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

export default withHOC(EmployeePageProvider, EmployeeTable);
