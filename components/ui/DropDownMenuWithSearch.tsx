import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import DropDownMenu from "./DropDownMenu";

interface DropDownMenuProps {
    items: string[];
    setItem: Dispatch<SetStateAction<string>>;
    inputClassName?: React.HTMLAttributes<HTMLDivElement>["className"]
}

export default function DropDownMenuWithSearch({ items, setItem, inputClassName }: DropDownMenuProps) {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const [value, setValue] = useState("");

    const [filteredItems, setFilteredItems] = useState(items);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setItem(value);

        setFilteredItems(items.filter((item) => item.toLowerCase().includes(value.toLowerCase()) && value.toLowerCase() != item.toLowerCase()));
    }, [value]);

    useEffect(() => {
        setSelectedItemIndex(0);

        setIsMenuActive(filteredItems.length != 0);
    }, [filteredItems]);

    function validateSelectedIndex(index: number) {
        let correctIndex = index;

        if (index > filteredItems.length - 1) correctIndex = 0;
        else if (index < 0) correctIndex = filteredItems.length - 1;

        return correctIndex;
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key == "ArrowDown")
            setSelectedItemIndex((index) => {
                const correctIndex = validateSelectedIndex(index + 1);
                const topMargin = correctIndex * 30;

                if (scrollRef.current)
                    if (topMargin < scrollRef.current.scrollTop || topMargin > scrollRef.current.scrollTop + 6 * 30)
                        scrollRef.current.scrollTo({
                            behavior: "smooth",
                            top: topMargin - 2 * 30,
                        });

                return correctIndex;
            });
        else if (e.key == "ArrowUp")
            setSelectedItemIndex((index) => {
                const correctIndex = validateSelectedIndex(index - 1);
                const topMargin = correctIndex * 30;

                if (scrollRef.current)
                    if (topMargin < scrollRef.current.scrollTop || topMargin > scrollRef.current.scrollTop + 6 * 30)
                        scrollRef.current.scrollTo({
                            behavior: "smooth",
                            top: topMargin - 2 * 30,
                        });

                return correctIndex;
            });
        else if (e.key == "Enter") setValue(filteredItems[selectedItemIndex]);
    }

    const menuRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={menuRef} className="relative">
            {/* <div className="relative"> */}
                <input
                    className={inputClassName ? inputClassName : "py-2 px-3 bg-[#4d9ee97a] rounded-sm w-full"}
                    type="text"
                    value={value}
                    onFocus={() => filteredItems.length != 0 && setIsMenuActive(true)}
                    onKeyDown={handleKeyDown}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                />
                {/* {value.length > 0 && (
                    <div
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setValue("")}
                    >
                        x
                    </div>
                )} */}
            {/* </div> */}
            <DropDownMenu
                elRef={scrollRef}
                menuRef={menuRef}
                isMenuActive={isMenuActive}
                setIsMenuActive={setIsMenuActive}
                className="absolute left-0 -bottom-2 box-content translate-y-full shadow-lg rounded-lg flex flex-col bg-white min-w-full max-h-[210px] w-max overflow-auto overflow-x-hidden"
            >
                {filteredItems.map((item, index) => (
                    <div
                        className={`duration-300 cursor-pointer py-0.5 ${
                            index == selectedItemIndex ? "bg-[#dcf5d5]" : null
                        }`}
                        onMouseEnter={() => setSelectedItemIndex(index)}
                        onClick={() => setValue(item)}
                    >
                        <div className={`py-1.5 px-3 inline-block`}>{item}</div>
                    </div>
                ))}
            </DropDownMenu>
        </div>
    );
}
