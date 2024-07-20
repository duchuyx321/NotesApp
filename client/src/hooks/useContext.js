import { useContext, createContext, useState, useMemo } from "react";

const CreateContext = createContext();

export const useContexts = () => {
    return useContext(CreateContext);
};

export const ContextProvider = ({ children }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    const handleHiddenLogin = (is) => {
        setIsHidden(is);
    };
    const handleIsClosed = (is) => {
        setIsClosed(is);
    };
    const value = useMemo(
        () => ({
            isHidden,
            handleHiddenLogin,
            isClosed,
            handleIsClosed,
        }),
        [isClosed, isHidden]
    );

    return (
        <CreateContext.Provider value={value}>
            {children}
        </CreateContext.Provider>
    );
};
