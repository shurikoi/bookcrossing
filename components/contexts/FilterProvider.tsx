import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { bookQuery } from "../authorized/Main";

export type sort = "asc" | "desc";

interface FilterContext {
    choosenCategories: string[];
    choosenLanguages: string[];
    choosenStates: string[];
    choosenSort: sort;
    query: bookQuery;
    setChoosenSort: Dispatch<SetStateAction<sort>>;
    setChoosenCategories: Dispatch<SetStateAction<string[]>>;
    setChoosenLanguages: Dispatch<SetStateAction<string[]>>;
    setChoosenStates: Dispatch<SetStateAction<string[]>>;
    setQuery: Dispatch<SetStateAction<bookQuery>>;
}

const FilterContext = createContext<FilterContext>({
    choosenCategories: [],
    choosenLanguages: [],
    choosenStates: [],
    choosenSort: "asc",
    query: {
        filter: {
            categories: [],
            languages: [],
            states: [],
        },
        sort: "asc",
    },
    setChoosenSort: () => "asc",
    setChoosenCategories: () => {},
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
    const [choosenSort, setChoosenSort] = useState<sort>("desc");

    const [query, setQuery] = useState<bookQuery>({
        filter: {
            categories: choosenCategories,
            languages: choosenLanguages,
            states: choosenStates,
        },
        sort: choosenSort,
    });

    // useEffect(() => {
    //     // const sort = params.get("sort");

    //     // if (!sort || !["asc", "desc"].includes(sort)) setChoosenSort("asc");
    //     // else setChoosenSort(params.get("sort") as sort);
    // }, [choosenSort]);

    useEffect(() => {
        setQuery({
            filter: {
                categories: choosenCategories,
                languages: choosenLanguages,
                states: choosenStates,
            },
            sort: choosenSort,
        });
    }, [choosenCategories, choosenLanguages, choosenStates, choosenSort]);

    return (
        <FilterContext.Provider
            value={{
                choosenCategories,
                choosenLanguages,
                choosenStates,
                choosenSort,
                setChoosenSort,
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
