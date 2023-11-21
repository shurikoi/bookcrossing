"use client"

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
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
  const params = new URLSearchParams(typeof window !== "undefined" ? window?.location.search : "");

  const [categories, setCategories] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  const [choosenCategories, setChoosenCategories] = useState(params.get("categories")?.split(",") || []);
  const [choosenLanguages, setChoosenLanguages] = useState(params.get("languages")?.split(",") || []);
  const [choosenStates, setChoosenStates] = useState(params.get("states")?.split(",") || []);
  const [choosenSort, setChoosenSort] = useState<sort>("desc");

  const [query, setQuery] = useState<bookQuery>({
    filter: {
      category: choosenCategories,
      language: choosenLanguages,
      state: choosenStates,
    },
    sort: choosenSort,
  });

  useEffect(() => {
    const sort = params.get("sort");

    if (sort != "desc" && sort != "asc") setChoosenSort("desc");
    else setChoosenSort(sort);
    getFilters();

    async function getFilters() {
      const response = await fetch("/api/get-filters", { method: "post" });

      const filters = await response.json();

      setCategories(filters.categories);
      setLanguages(filters.languages);
      setStates(filters.states);
    }
  }, []);

  useEffect(() => {
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
