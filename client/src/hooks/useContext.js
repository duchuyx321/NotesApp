import { useContext, createContext, useState, useMemo } from "react";

const CreateContext = createContext();

export const useContexts = () => {
    return useContext(CreateContext);
};

export const ContextProvider = ({ children }) => {
    const [isHidden, setIsHidden] = useState(false);

    const handleHiddenLogin = (is) => {
        setIsHidden(is);
    };
    const value = useMemo(() => [isHidden, handleHiddenLogin], [isHidden]);

    return (
        <CreateContext.Provider value={value}>
            {children}
        </CreateContext.Provider>
    );
};
