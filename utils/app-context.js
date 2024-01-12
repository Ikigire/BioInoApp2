import { createContext, useContext } from "react";

export const appContext = createContext(null);

export const useAppContext = () => {
    return useContext(appContext);
}
