import { createContext, useContext, useEffect, useState } from "react";

const FilterContext = createContext<any>(null);

function FilterProvider({ children }: { children: React.ReactNode }) {
    const params = new URLSearchParams(window.location.search);

    const [choosenCategories, setChoosenCategories] = useState(params.get("categories"));
    const [choosenLanguages, setChoosenLanguages] = useState(params.get("languages"));
    const [choosenStates, setChoosenStates] = useState(params.get("states"));
    console.log(choosenCategories, choosenLanguages, choosenStates)
    return (
        <FilterContext.Provider
            value={{
                choosenCategories,
                choosenLanguages,
                choosenStates,
                setChoosenCategories,
                setChoosenLanguages,
                setChoosenStates,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

function useFilter() {
    const filter = useContext(FilterContext);

    return filter;
}

export { useFilter, FilterProvider };
