import { Dispatch, KeyboardEvent, SetStateAction, memo, useLayoutEffect, useRef, useState } from "react";
import DropDownMenu from "./DropDownMenu";

interface DropDownMenuProps {
  items: string[];
  setItem: Dispatch<SetStateAction<string>>;
  inputClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  startValue?: string;
  placeholder?: string;
  createNewItem?: boolean;
}

const DropDownMenuWithSearch = memo(
  ({ items, setItem, placeholder, startValue = "", createNewItem = false, inputClassName }: DropDownMenuProps) => {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const [value, setValue] = useState(startValue);

    const [filteredItems, setFilteredItems] = useState(items);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const scrollRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      setItem(value);
      setSelectedItemIndex(0);

      setFilteredItems(
        items.filter(
          (item) => item.toLowerCase().includes(value.toLowerCase()) && item.toLowerCase() != value.toLowerCase()
        )
      );
    }, [value]);

    function focusNextInput() {
      if (isMenuActive) triggerRef.current?.parentElement?.nextElementSibling?.querySelector("input")?.focus();
    }

    function validateSelectedIndex(index: number) {
      let correctIndex = index;

      if (createNewItem) {
        if (index > filteredItems.length) correctIndex = 0;
        else if (index < 0) correctIndex = filteredItems.length;
      } else {
        if (index > filteredItems.length - 1) correctIndex = 0;
        else if (index < 0) correctIndex = filteredItems.length - 1;
      }

      return correctIndex;
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
      if (e.key == "ArrowDown")
        setSelectedItemIndex((index) => {
          const correctIndex = validateSelectedIndex(index + 1);
          const topMargin = correctIndex * 40;

          if (scrollRef.current)
            if (topMargin < scrollRef.current.scrollTop || topMargin > scrollRef.current.scrollTop + 4 * 40)
              scrollRef.current.scrollTo({
                behavior: "smooth",
                top: topMargin - 2 * 40,
              });

          return correctIndex;
        });
      else if (e.key == "ArrowUp")
        setSelectedItemIndex((index) => {
          const correctIndex = validateSelectedIndex(index - 1);
          const topMargin = correctIndex * 40;

          if (scrollRef.current)
            if (topMargin < scrollRef.current.scrollTop || topMargin > scrollRef.current.scrollTop + 4 * 40)
              scrollRef.current.scrollTo({
                behavior: "smooth",
                top: topMargin - 2 * 40,
              });

          return correctIndex;
        });
      else if (e.key == "Enter") {
        setValue(filteredItems[selectedItemIndex] || value);
        setIsMenuActive(false);
        focusNextInput();
      }
    }

    function handleClick(item: string) {
      setValue(item);
      focusNextInput();
    }

    const triggerRef = useRef<HTMLDivElement>(null);

    return (
      <div ref={triggerRef} className={`relative w-full`}>
        <input
          className={inputClassName ? inputClassName : "placeholder:text-[#6C6C6C]"}
          type="text"
          placeholder={placeholder}
          value={value}
          maxLength={55}
          onBlur={() => setIsMenuActive(false)}
          onFocus={() => setIsMenuActive(true)}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setValue(e.target.value.replace(/\s+/g, " "));
            if (!isMenuActive) setIsMenuActive(true);
          }}
        />

        <DropDownMenu
          elRef={scrollRef}
          triggerRef={triggerRef}
          isMenuActive={isMenuActive}
          setIsMenuActive={setIsMenuActive}
          className="absolute left-0 -bottom-2 box-content translate-y-full shadow-lg rounded-lg flex flex-col bg-white min-w-full max-h-[200px] w-full overflow-auto overflow-x-hidden text-[16px] whitespace-nowrap"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item}
              className={`h-10 duration-300 cursor-pointer ${index == selectedItemIndex ? "bg-[#dcf5d5]" : ""}`}
              onMouseEnter={() => setSelectedItemIndex(index)}
              onClick={() => handleClick(item)}
            >
              <div className={`px-3 py-1.5 inline-block`}>{item}</div>
            </div>
          ))}
          {createNewItem && value.length > 0 && !items.includes(value) ? (
            <div
              className={`h-10 duration-300 cursor-pointer ${
                filteredItems.length == selectedItemIndex ? "bg-[#dcf5d5]" : ""
              }`}
              onMouseEnter={() => setSelectedItemIndex(filteredItems.length)}
              onClick={() => handleClick(value)}
            >
              <div className={`px-3 py-1.5 inline-block max-w-full`}>
                <span className="w-full overflow-hidden text-ellipsis block">Stwórz {value}</span>
              </div>
            </div>
          ) : null}
        </DropDownMenu>
      </div>
    );
  }
);

DropDownMenuWithSearch.displayName = "DropDownMenuWithSearch";

export default DropDownMenuWithSearch;
