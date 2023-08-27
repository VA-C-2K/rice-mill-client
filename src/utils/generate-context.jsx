/* eslint-disable react/prop-types */
import { createContext, useContext, useMemo } from "react";

function generateHookName(baseName = "") {
  return `${baseName || "this"}Context`;
}

function generateProviderName(baseName = "") {
  return `${baseName.split("use")?.[1] || "this"}Provider`;
}

function generateContext(useGetContextValue) {
  const functionName = useGetContextValue.displayName || useGetContextValue.name;
  const hookName = generateHookName(functionName);
  const providerName = generateProviderName(functionName);
  const Context = createContext({});

  const errorMessage = `${hookName} hook must be use within ${providerName}`;

  const Provider = (props) => {
    const { children, ...restProps } = props;
    const contextvalue = useGetContextValue(restProps);

    const value = useMemo(() => {
      return { ...restProps, ...contextvalue };
    }, [contextvalue, restProps]);
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  const useThisContext = () => {
    const context = useContext(Context);
    if (context === undefined || Object.keys(context || {}).length === 0) {
      throw new Error(errorMessage);
    }
    return context;
  };
  return [Provider, useThisContext, Context];
}

export default generateContext;
