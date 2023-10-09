import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { bookQuery } from "../authorized/Main";

interface FilterContext {
    choosenCategories: string[];
    choosenLanguages: string[];
    choosenStates: string[];
    query: bookQuery;
    setChoosenCategories: Dispatch<SetStateAction<string[]>>;
    setChoosenLanguages: Dispatch<SetStateAction<string[]>>;
    setChoosenStates: Dispatch<SetStateAction<string[]>>;
    setQuery: Dispatch<SetStateAction<bookQuery>>;
}

const FilterContext = createContext<FilterContext>({
    choosenCategories: [],
    choosenLanguages: [],
    choosenStates: [],
    setChoosenCategories: () => {},
    query: {
        categories: [],
        languages: [],
        states: [],
    },
    setChoosenLanguages: () => [],
    setChoosenStates: () => [],
    setQuery: () => ({
        categories: [],
        languages: [],
        states: [],
    }),
});

function FilterProvider({ children }: { children: React.ReactNode }) {
    const params = new URLSearchParams(window.location.search);

    const [choosenCategories, setChoosenCategories] = useState(params.get("categories")?.split(",") || []);
    const [choosenLanguages, setChoosenLanguages] = useState(params.get("languages")?.split(",") || []);
    const [choosenStates, setChoosenStates] = useState(params.get("states")?.split(",") || []);

    useEffect(() => {
        setQuery({ categories: choosenCategories, languages: choosenLanguages, states: choosenStates });
    }, [choosenCategories, choosenLanguages, choosenStates]);

    const [query, setQuery] = useState<bookQuery>({
        categories: choosenCategories,
        languages: choosenLanguages,
        states: choosenStates,
    });

    return (
        <FilterContext.Provider
            value={{
                choosenCategories,
                choosenLanguages,
                choosenStates,
                setChoosenCategories,
                setChoosenLanguages,
                setChoosenStates,
                query,
                setQuery,
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
