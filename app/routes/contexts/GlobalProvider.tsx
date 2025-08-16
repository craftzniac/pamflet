import { createContext, useContext, type ReactNode } from "react";

type TGlobalContext = {
    user: { username: string }
};

type Props = {
    user: TGlobalContext["user"],
    children: ReactNode
};

const GlobalContext = createContext<TGlobalContext>({
    user: { username: "" }
});

export function useGlobalContext(){
    return useContext(GlobalContext);
}

export default function GlobalProvider({ user, children }: Props) {
    return (
        <GlobalContext.Provider value={{ user }}>{children}</GlobalContext.Provider>
    );
}
