import { Dispatch, SetStateAction, createContext, useContext, useLayoutEffect, useMemo, useState } from "react";

export type sort = "asc" | "desc";

export interface bookQuery {
  filter: {
    categories: string[];
    languages: string[];
    states: string[];
  };
  sort: sort;
}

interface FilterContext {
  categories: string[];
  setCategories: Dispatch<SetStateAction<string[]>>;
  languages: string[];
  setLanguages: Dispatch<SetStateAction<string[]>>;
  states: string[];
  setStates: Dispatch<SetStateAction<string[]>>;
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
  getFilters: () => void;
}

const FilterContext = createContext<FilterContext>({
  categories: [],
  setCategories: () => [],
  languages: [],
  setLanguages: () => [],
  states: [],
  setStates: () => [],
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
  getFilters: () => {},
});

interface FilterProviderProps {
  children: React.ReactNode;
  paramsQuery: bookQuery;
}

function FilterProvider({ children, paramsQuery }: FilterProviderProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  const [choosenCategories, setChoosenCategories] = useState<string[]>(paramsQuery.filter.categories);
  const [choosenLanguages, setChoosenLanguages] = useState<string[]>(paramsQuery.filter.languages);
  const [choosenStates, setChoosenStates] = useState<string[]>(paramsQuery.filter.states);
  const [choosenSort, setChoosenSort] = useState<sort>(paramsQuery.sort);

  const [query, setQuery] = useState<bookQuery>({
    filter: {
      categories: choosenCategories,
      languages: choosenLanguages,
      states: choosenStates,
    },
    sort: choosenSort,
  });

  async function getFilters() {
    const response = await fetch("/api/get-filters", { method: "post" });

    const filters = await response.json();

    setCategories(filters.categories);
    setLanguages(filters.languages);
    setStates(filters.states);
  }

  useLayoutEffect(() => {
    // init();
    getFilters();
  }, []);

  // function init() {
  //   const params = new URLSearchParams(window?.location.search);
  //   const sort = params.get("sort");

  //   if (sort != "desc" && sort != "asc") setChoosenSort("desc");
  //   else setChoosenSort(sort);

  //   setChoosenCategories(params.get("categories")?.split(",") || []);
  //   setChoosenLanguages(params.get("languages")?.split(",") || []);
  //   setChoosenStates(params.get("states")?.split(",") || []);
  // }

  useMemo(() => {
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
        categories,
        setCategories,
        languages,
        setLanguages,
        states,
        setStates,
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
        getFilters,
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

export { FilterProvider, useFilter };

