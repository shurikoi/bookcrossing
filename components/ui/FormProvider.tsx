import { createContext, useState } from "react";

const FormContext = createContext<any>(null);

function FormProvider({ children }: { children: React.ReactNode }) {
    const [formActive, setFormActive] = useState<boolean>(false);

    function toggleFormState(){
        setFormActive(state => !state)
    }

    return <FormContext.Provider value={{formActive, setFormActive}}>{children}</FormContext.Provider>;
}

export { FormContext, FormProvider };
