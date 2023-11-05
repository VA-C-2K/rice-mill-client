import { useCallback, useEffect, useMemo, useState } from "react";
import generateContext from "../../utils/generate-context";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { authConfig } from "../../api";
import { baseURL } from "../../api";
import { UserState } from "../../context/user-context";

function useProfitPage() {
    axios.defaults.withCredentials = true;
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const { user, token } = UserState();
    const config = authConfig(token);
    const [profitList, setProfitList] = useState([]);

    const getProfit = useCallback(async () => {
        setLoading(true);
        try {
            const data = await axios.get(`${baseURL}/profits`, {
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
        };
    }, [profitList, getProfit, loading]);
}

export const [ProfitPageProvider, useProfitPageContext] = generateContext(useProfitPage);
