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

type items = {
    [key: string]: {
        icon?: React.ReactNode;
    };
};

interface DropDownMenuWithChooseProps {
    items: items;
    setItem: Dispatch<SetStateAction<string>>;
    item: string;
}

export default memo(function DropDownMenuWithSearch({ items, setItem, item }: DropDownMenuWithChooseProps) {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={menuRef} className={`relative`}>
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => setIsMenuActive((prev) => !prev)}>
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L0 0H8L4 6Z" fill="#4E4E4E" />
                </svg>

                <div className="cursor-pointer w-6 h-6">{items[item].icon}</div>
            </div>
            <DropDownMenu
                menuRef={menuRef}
                isMenuActive={isMenuActive}
                setIsMenuActive={setIsMenuActive}
                className="absolute gap-2 -bottom-2 right-0 box-content bg-white translate-y-full flex flex-col"
            >
                {Object.entries(items)
                    .filter(([key, value]) => key != item)
                    .map((item) => (
                        <div
                            className="cursor-pointer w-6 h-6"
                            onClick={() => {
                                console.log(item)
                                setItem(item[0]);
                                setIsMenuActive(false);
                            }}
                        >
                            {item[1]?.icon}
                        </div>
                    ))}
            </DropDownMenu>
        </div>
    );
});
