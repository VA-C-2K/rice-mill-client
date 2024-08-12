import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import generateContext from "../../utils/generate-context";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { authConfig } from "../../api";
import { baseURL } from "../../api";
import { useUserInfo } from "../../context/user-context";
import { useNavigate } from "react-router-dom";

function useProfitPage() {
    axios.defaults.withCredentials = true;
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const { user, token } = useUserInfo();
    const config = authConfig(token);
    const [profitList, setProfitList] = useState([]);
    const filterDateRef  = useRef({});
    const navigate = useNavigate();

    const getProfit = useCallback(async (searchTerm="") => {
        setLoading(true);
        try {
            const data = await axios.get(`${baseURL}/profits?${searchTerm}`, {
                headers: config.headers,
            });
            setProfitList(data?.data);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }, [config.headers, toast]);

    const handleViewRowProduct = useCallback(() => () => {
        navigate("/imports")
    }, [navigate]);

    const handleViewSale = useCallback(() => () => {
        navigate("/exports")
    }, [navigate]);

    const handleSearch = useCallback(() => {
        const queryParams = new URLSearchParams(filterDateRef.current);
        getProfit(queryParams?.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (user !== null) {
            getProfit();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return useMemo(() => {
        return {
            loading,
            profitList,
            getProfit,
            handleViewRowProduct,
            handleViewSale,
            handleSearch,
            filterDateRef,
        };
    }, [loading, profitList, getProfit, handleViewRowProduct, handleViewSale, handleSearch, filterDateRef]);
}

export const [ProfitPageProvider, useProfitPageContext] = generateContext(useProfitPage);
