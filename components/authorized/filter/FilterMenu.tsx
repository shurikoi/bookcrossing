import { useBook } from "@/components/contexts/BookProvider";
import { ChangeEvent, memo, useRef, useState } from "react";
import { useFilter } from "../../contexts/FilterProvider";
import DropDownMenu from "../../ui/DropDownMenu";
import ArrowDownIcon from "../../ui/icons/ArrowDownIcon";

const FilterMenu = memo(() => {
  const triggerRef = useRef<HTMLDivElement>(null);

  const [isMenuActive, setIsMenuActive] = useState(false);

  const params = new URLSearchParams(typeof window !== "undefined" ? window?.location.search : "");

  const filter = useFilter();

  function setCategories(e: ChangeEvent<HTMLInputElement>) {
    const newParams = new URLSearchParams(Array.from(params.entries()));
    const categories = newParams.get("categories")?.split(",") || [];

    if (categories.includes(e.target.id)) categories.splice(categories.indexOf(e.target.id), 1);
    else categories.push(e.target.id);

    newParams.set("categories", categories.join(","));
    filter.setChoosenCategories(() => {
      if (categories.join(",").length == 0) return [];

      return categories;
    });

    if (categories.join().length == 0) newParams.delete("categories");

    history.pushState({}, "", newParams.size > 0 ? `/?${newParams}` : "/");
  }

  function setLanguages(e: ChangeEvent<HTMLInputElement>) {
    const newParams = new URLSearchParams(Array.from(params.entries()));
    const languages = newParams.get("languages")?.split(",") || [];

    if (languages.includes(e.target.id)) languages.splice(languages.indexOf(e.target.id), 1);
    else languages.push(e.target.id);

    newParams.set("languages", languages?.join(","));
    filter.setChoosenLanguages(() => {
      if (languages.join(",").length == 0) return [];

      return languages;
    });

    if (languages.join().length == 0) newParams.delete("languages");

    history.pushState({}, "", newParams.size > 0 ? `/?${newParams}` : "/");
  }

  function setStates(e: ChangeEvent<HTMLInputElement>) {
    const newParams = new URLSearchParams(Array.from(params.entries()));
    const states = newParams.get("states")?.split(",") || [];

    if (states.includes(e.target.id)) states.splice(states.indexOf(e.target.id), 1);
    else states.push(e.target.id);

    newParams.set("states", states?.join(","));
    filter.setChoosenStates(() => {
      if (states.join(",").length == 0) return [];

      return states;
    });

    if (states.join().length == 0) newParams.delete("states");

    history.pushState({}, "", newParams.size > 0 ? `/?${newParams}` : "/");
  }

  return (
    <div ref={triggerRef}>
      <div
        onClick={() => setIsMenuActive((prev) => !prev)}
        className="flex gap-3 items-center py-3 px-14 rounded-lg cursor-pointer select-none border-2 border-[#3F3A5A]"
      >
        Filtruj według
        <ArrowDownIcon></ArrowDownIcon>
      </div>
      <DropDownMenu
        isMenuActive={isMenuActive}
        setIsMenuActive={setIsMenuActive}
        triggerRef={triggerRef}
        className="flex justify-center absolute w-full left-0 top-full bg-white shadow-[0px_5px_5px_1px_rgba(0,0,0,.1)]"
      >
        <div
          className={`flex flex-col 2md:flex-row 2md:items-start gap-20 p-4 bg-white `}
        >
          <div className="text-left whitespace-nowrap 2md:pl-0 font-inter text-[#3F3A5A] text-[16px]  2md:w-auto 2md:px-0">
            <div className="font-semibold mb-3">Kategoria</div>
            <div className="max-h-[240px] max-w-[320px] overflow-y-auto overflow-x-hidden scrollbar">
              {filter.categories.map((category) => (
                <label
                  htmlFor={category}
                  key={category}
                  className="pr-6 flex gap-2 items-center select-none cursor-pointer"
                >
                  <input
                    className="border-2 border-[#747474] bg-white w-[15px] h-[15px] rounded-sm appearance-none checked:bg-[#2D50AA] checked:border-[#2D50AA] duration-200 cursor-pointer shrink-0"
                    type="checkbox"
                    checked={filter.choosenCategories?.includes(category)}
                    id={category}
                    onChange={setCategories}
                  />
                  <label className="cursor-pointer w-full break-words whitespace-break-spaces" htmlFor={category}>
                    {category}
                  </label>
                </label>
              ))}
            </div>
          </div>
          <div className="text-left whitespace-nowrap 2md:pl-0 font-inter text-[#3F3A5A] text-[16px]  2md:w-auto 2md:px-0">
            <div className="font-semibold mb-3">Języki</div>
            <div className="max-h-[240px] max-w-[320px] overflow-y-auto overflow-x-hidden scrollbar">
              {filter.languages.map((language) => (
                <label
                  htmlFor={language}
                  key={language}
                  className="pr-6 flex gap-2 items-center select-none cursor-pointer"
                >
                  <input
                    className="border-2 border-[#747474] bg-white w-[15px] h-[15px] rounded-sm appearance-none checked:bg-[#2D50AA] checked:border-[#2D50AA] duration-200 cursor-pointer shrink-0"
                    type="checkbox"
                    checked={filter.choosenLanguages?.includes(language)}
                    id={language}
                    onChange={setLanguages}
                  />
                  <label htmlFor={language} className=" w-full break-words whitespace-break-spaces cursor-pointer">
                    {language}
                  </label>
                </label>
              ))}
            </div>
          </div>
          <div className="text-left whitespace-nowrap 2md:pl-0 font-inter text-[#3F3A5A] text-[16px]  2md:w-auto 2md:px-0">
            <div className="font-semibold mb-3">Stan</div>
            <div className="max-h-[240px] max-w-[320px] overflow-y-auto overflow-x-hidden scrollbar">
              {filter.states.map((bookState) => (
                <label
                  htmlFor={bookState}
                  className="pr-6 flex gap-2 items-center select-none cursor-pointer w-full"
                  key={bookState}
                >
                  <input
                    className="border-2 border-[#747474] bg-white w-[15px] h-[15px] rounded-sm appearance-none checked:bg-[#2D50AA] checked:border-[#2D50AA] duration-200 cursor-pointer shrink-0"
                    type="checkbox"
                    checked={filter.choosenStates?.includes(bookState)}
                    id={bookState}
                    onChange={setStates}
                  />
                  <label htmlFor={bookState} className=" w-full break-words whitespace-break-spaces cursor-pointer">
                    {bookState}
                  </label>
                </label>
              ))}
            </div>
          </div>
        </div>
      </DropDownMenu>
    </div>
  );
});

FilterMenu.displayName = "FilterMenu";

export default FilterMenu;
