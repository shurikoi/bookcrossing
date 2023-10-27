import { Dispatch, ReactNode, SetStateAction, memo, useEffect, useRef, useState } from "react";
import DropDownMenu from "./DropDownMenu";

type ConditionalProps =
    | {
          mode: "icons" | "text" | "text&icons";
          items: {
              [key: string]: {
                  icon?: React.ReactNode;
              };
          };
      }
    | {
          mode: never;
          items: string[];
      };

type DropDownMenuWithChooseProps = ConditionalProps & {
    setItem: Dispatch<SetStateAction<string>>;
    item: string;
};

export default memo(function DropDownMenuWithChoose({ items, mode, setItem, item }: DropDownMenuWithChooseProps) {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={menuRef} className={`relative text-[15px] font-light`}>
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => setIsMenuActive((prev) => !prev)}>
                {mode != "text&icons" && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L0 0H8L4 6Z" fill="#4E4E4E" />
                    </svg>
                )}

                <div className="cursor-pointer">
                    {mode == "icons" && <div className="w-6 h-6">{items[item].icon}</div>}

                    {mode == "text" && item}
                    {mode == "text&icons" && (
                        <div className="flex gap-4 px-1.5">
                            <div className="w-6 h-6">{items[item].icon}</div>
                            <div className="font-extralight">{item}</div>
                        </div>
                    )}
                </div>

                {mode == "text&icons" && (
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L0 0H8L4 6Z" fill="#4E4E4E" />
                    </svg>
                )}
            </div>
            <DropDownMenu
                menuRef={menuRef}
                isMenuActive={isMenuActive}
                setIsMenuActive={setIsMenuActive}
                className={`absolute -bottom-2 bg-white translate-y-full flex flex-col ${
                    mode == "text&icons" ? "left-0" : "right-0"
                }`}
            >
                {mode == "icons" &&
                    Object.entries(items)
                        .filter(([key, value]) => key != item)
                        .map((item) => (
                            <div
                                key={item[0]}
                                className="cursor-pointer w-6 h-6 py-1.5 box-content"
                                onClick={() => {
                                    setItem(item[0]);
                                    setIsMenuActive(false);
                                }}
                            >
                                {item[1].icon}
                            </div>
                        ))}
                {mode == "text" &&
                    Object.entries(items)
                        .filter(([key, value]) => key != item)
                        .map((item) => (
                            <div
                                className="cursor-pointer w-6 h-6 py-1.5 box-content"
                                onClick={() => {
                                    setItem(item[0]);
                                    setIsMenuActive(false);
                                }}
                            >
                                {item[0]}
                            </div>
                        ))}
                {mode == "text&icons" &&
                    Object.entries(items)
                        .filter(([key, value]) => key != item)
                        .map((item) => (
                            <div
                                className="cursor-pointer flex py-1.5 px-1.5 gap-4 duration-200 hover:bg-[#EDFFE4]"
                                onClick={() => {
                                    setItem(item[0]);
                                    setIsMenuActive(false);
                                }}
                            >
                                <div className="w-6 h-6">{item[1].icon}</div>
                                {item[0]}
                            </div>
                        ))}
            </DropDownMenu>
        </div>
    );
});
