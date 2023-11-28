import { Dispatch, SetStateAction, createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

export type sort = "asc" | "desc";

export interface bookQuery {
  filter: {
    category: string[];
    language: string[];
    state: string[];
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
      category: [],
      language: [],
      state: [],
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

function FilterProvider({ children, sort }: { children: React.ReactNode; sort: sort}) {
  console.log(sort)
  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  const [choosenCategories, setChoosenCategories] = useState<string[]>([]);
  const [choosenLanguages, setChoosenLanguages] = useState<string[]>([]);
  const [choosenStates, setChoosenStates] = useState<string[]>([]);
  const [choosenSort, setChoosenSort] = useState<sort>(sort);

  const [query, setQuery] = useState<bookQuery>({
    filter: {
      category: choosenCategories,
      language: choosenLanguages,
      state: choosenStates,
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
    init();
    getFilters();
  }, []);

  function init() {
    const params = new URLSearchParams(window?.location.search);
    const sort = params.get("sort");

    if (sort != "desc" && sort != "asc") setChoosenSort("desc");
    else setChoosenSort(sort);

    setChoosenCategories(params.get("categories")?.split(",") || []);
    setChoosenLanguages(params.get("languages")?.split(",") || []);
    setChoosenStates(params.get("states")?.split(",") || []);
  }

  useLayoutEffect(() => {
    console.log(choosenSort);
    setQuery({
      filter: {
        category: choosenCategories,
        language: choosenLanguages,
        state: choosenStates,
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

export { useFilter, FilterProvider };
