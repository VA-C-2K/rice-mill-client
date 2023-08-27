/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import CustomButton from "./CustomButton";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const Pagination = ({ setPage, currentPage, totalPages }) => {
  const handlePreviousPage = useCallback(() => {
    setPage(currentPage - 1);
  }, [currentPage, setPage]);

  const handleNextPage = useCallback(() => {
    setPage(currentPage + 1);
  }, [currentPage, setPage]);

  return (
    <Flex justifyContent={"space-between"} pt={1} pb={3} mx={2} flexDirection={"row"}>
      <CustomButton onClick={handlePreviousPage} isDisabled={!(currentPage !== 1)}>
        {<ArrowBackIcon w={4} h={4} />}
      </CustomButton>
      <CustomButton onClick={handleNextPage} isDisabled={totalPages === currentPage}>
        {<ArrowForwardIcon w={4} h={4} />}
      </CustomButton>
    </Flex>
  );
};

export default Pagination;
