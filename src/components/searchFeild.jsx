/* eslint-disable react/prop-types */
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import CustomButton from "./CustomButton";
import { useCallback, useState } from "react";

const SearchField = ({ searchBy, loading, setSearchTerm }) => {
  const [search, setSearch] = useState();

  const handleSearch = useCallback(() => {
    setSearchTerm(search);
  }, [search, setSearchTerm]);

  const handleClear = useCallback(
    (event) => {
      setSearch(event.target.value);
      if (event.target.value?.length === 0) {
        setSearchTerm("");
      }
    },
    [setSearchTerm]
  );

  return (
    <InputGroup>
      <Input
        placeholder={`Search ${searchBy}`}
        value={search}
        borderRadius="md"
        variant="outline"
        onChange={handleClear}
        focusBorderColor="#609966"
        _placeholder={{ opacity: 0.5, color: "#40513B" }}
        color="#609966"
        fontWeight={500}
        border="1px"
        bg="#EDF1D6"
        width="100%"
      />
      <InputRightElement>
        {search?.length > 0 && (
          <CustomButton isLoading={loading} bg="transparent" color="#609966" _hover={{ bg: "#4a875d", color: "#EDF1D6" }} onClick={handleSearch}>
            <SearchIcon />
          </CustomButton>
        )}
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchField;
