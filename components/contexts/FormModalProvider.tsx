import { createContext, useContext, useState } from "react";

const FormModalContext = createContext<any>(null);

function FormModalProvider({ children }: { children: React.ReactNode }) {
    const [formActive, setFormActive] = useState(false);

    return <FormModalContext.Provider value={{ formActive, setFormActive }}>{children}</FormModalContext.Provider>;
}

function useForm() {
    const form = useContext(FormModalContext);
    
    return form;
}

export { useForm, FormModalProvider };
