import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import CrossBtn from "./CrossBtn";
import useClickOutside from "../hooks/useClickOutside";

interface ModalMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    modalActive: boolean;
    setModalActive: Dispatch<SetStateAction<boolean>>;
    smallScreen?: boolean;
}

const ModalMenu = React.memo(({ children, modalActive, setModalActive, smallScreen, ...props }: ModalMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    const style: React.CSSProperties = modalActive
        ? {
            opacity: 1,
            pointerEvents: "auto",
        }
        : {
            opacity: 0,
            pointerEvents: "none",
        };

    useClickOutside(menuRef, () => {    
        setModalActive(false);
    });

    if (smallScreen) return (
        <div className="fixed w-full h-full top-0 left-0 bg-white duration-300"
        style={style}>
            <CrossBtn smallScreen setMenuActive={setModalActive}></CrossBtn>
        </div>
    )

    return (

        <div
            className={`fixed left-0 top-0 w-screen h-screen sm:flex items-center justify-center  duration-300 transition-opacity z-50 hidden`}
            style={style}
        >
            <div
                className={`absolute top-0 left-0 w-screen h-screen bg-black/50  duration-300 transition-opacity  `}
            ></div>
            <div
                ref={menuRef}
                className={`relative bg-white shadow-sm rounded-lg duration-300 transition-opacity `}
                {...props}
            >
                <CrossBtn setMenuActive={setModalActive}></CrossBtn>
                {children}
            </div>
        </div>
    )
});

export default ModalMenu;
