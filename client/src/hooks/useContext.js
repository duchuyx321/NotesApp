import { useContext, createContext, useState, useMemo } from "react";

const CreateContext = createContext();

export const useContexts = () => {
    return useContext(CreateContext);
};

export const ContextProvider = ({ children }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const [isNext, setIsNext] = useState(false);
    const [textUsername, setTextUsername] = useState("");
    const [textEmail, setTextEmail] = useState("");
    const [textPassword, setTextPassword] = useState("");

    const handleHiddenLogin = (is) => {
        setIsHidden(is);
    };
    const handleIsClosed = (is) => {
        setIsClosed(is);
    };
    const handleIsNext = (is) => {
        setIsNext(is);
    };
    const value = useMemo(
        () => ({
            isHidden,
            isClosed,
            isNext,
            textEmail,
            textUsername,
            textPassword,
            handleHiddenLogin,
            handleIsClosed,
            handleIsNext,
            setTextUsername,
            setTextEmail,
            setTextPassword,
        }),
        [isClosed, isHidden, isNext, textEmail, textPassword, textUsername]
    );

    return (
        <CreateContext.Provider value={value}>
            {children}
        </CreateContext.Provider>
    );
};
