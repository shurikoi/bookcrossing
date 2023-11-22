import { Dispatch, SetStateAction, createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { bookQuery } from "../authorized/Main";

export type sort = "asc" | "desc";

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
});

function FilterProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  const [choosenCategories, setChoosenCategories] = useState<string[]>([]);
  const [choosenLanguages, setChoosenLanguages] = useState<string[]>([]);
  const [choosenStates, setChoosenStates] = useState<string[]>([]);
  const [choosenSort, setChoosenSort] = useState<sort>("desc");

  const [query, setQuery] = useState<bookQuery>({
    filter: {
      category: choosenCategories,
      language: choosenLanguages,
      state: choosenStates,
    },
    sort: choosenSort,
  });

  useLayoutEffect(() => {
    init();
    getFilters();

    async function getFilters() {
      const response = await fetch("/api/get-filters", { method: "post" });

      const filters = await response.json();

      setCategories(filters.categories);
      setLanguages(filters.languages);
      setStates(filters.states);
    }
  }, []);

  function init() {
    console.log(query.filter, Object.values(query.filter).every((item) => item.length == 0));

    const params = new URLSearchParams(window?.location.search);

    const sort = params.get("sort");

    if (sort != "desc" && sort != "asc") setChoosenSort("desc");
    else setChoosenSort(sort);

    setChoosenCategories(params.get("categories")?.split(",") || []);
    setChoosenLanguages(params.get("languages")?.split(",") || []);
    setChoosenStates(params.get("states")?.split(",") || []);
  }

  useLayoutEffect(() => {
    // const params = new URLSearchParams(window.location.search);

    // const categories = params.get("categories")?.split(",") || [];
    // const languages = params.get("languages")?.split(",") || [];
    // const states = params.get("states")?.split(",") || [];

    // console.log(categories, choosenCategories);

    // if (categories.length != choosenCategories.length) setChoosenCategories(categories);
    // if (languages.length != choosenLanguages.length) setChoosenLanguages(languages);
    // if (states.length != choosenStates.length) setChoosenStates(states);

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
