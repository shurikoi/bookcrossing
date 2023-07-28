import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import CrossBtn from "./CrossBtn";
import CheckClickOutside from "../CheckClickOutside";

interface ModalMenu extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    modalActive: boolean;
    setModalActive: Dispatch<SetStateAction<boolean>>;
    padding?: string;
} ;

export default function ModalMenu({ children, modalActive, setModalActive, ...props }: ModalMenu) {
    const menuRef = useRef<HTMLDivElement>(null);

    return (
        <div
            className={`fixed left-0 top-0 w-screen h-screen flex items-center justify-center  duration-300 transition-opacity ${
                modalActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            
        >
            <div
                className={`absolute top-0 left-0 w-screen h-screen bg-black/50  duration-300 transition-opacity  `}
            ></div>
            <CheckClickOutside elRef={menuRef} isActive={modalActive} setIsActive={setModalActive}>
                <div
                    ref={menuRef}
                    className={`relative bg-white shadow-sm rounded-lg duration-300 transition-opacity `}
                    {...props}
                >
                    <CrossBtn setMenuActive={setModalActive}></CrossBtn>
                    {children}
                </div>
            </CheckClickOutside>
        </div>
    );
}
