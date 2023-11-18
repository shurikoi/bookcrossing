import {
    ChangeEvent,
    Dispatch,
    KeyboardEvent,
    SetStateAction,
    memo,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
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
            if (items.includes(value)) setIsMenuActive(false);

            setItem(value);
            setSelectedItemIndex(0);

            setFilteredItems(
                items.filter(
                    (item) =>
                        item.toLowerCase().includes(value.toLowerCase()) && item.toLowerCase() != value.toLowerCase()
                )
            );

            if (isMenuActive) triggerRef.current?.parentElement?.nextElementSibling?.querySelector("input")?.focus()
        }, [value]);

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
            }
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
                            className={`h-10 duration-300 cursor-pointer ${
                                index == selectedItemIndex ? "bg-[#dcf5d5]" : ""
                            }`}
                            onMouseEnter={() => setSelectedItemIndex(index)}
                            onClick={() => {
                                setValue(item);
                            }}
                        >
                            <div className={`py-1.5 px-3 inline-block`}>{item}</div>
                        </div>
                    ))}
                    {createNewItem && value.length > 0 && !items.includes(value) ? (
                        <div
                            className={`duration-300 cursor-pointer ${
                                filteredItems.length == selectedItemIndex ? "bg-[#dcf5d5]" : ""
                            }`}
                            onMouseEnter={() => setSelectedItemIndex(filteredItems.length)}
                            onClick={() => setIsMenuActive(false)}
                        >
                            <div className={`py-1.5 px-3 inline-block max-w-full overflow-hidden text-ellipsis`}>
                                Stwórz {value}
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
