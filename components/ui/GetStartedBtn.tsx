"use client";

import { MouseEventHandler, useContext } from "react";
import { FormContext } from "@/components/FormProvider";
import Pencil from "./Pencil";

export default function getStartedBtn({ onClick }: { onClick?: MouseEventHandler }) {
    const { setFormActive } = useContext(FormContext);

    return (
        <div className="select-none group cursor-pointer" onClick={() => setFormActive((formActive: boolean) => !formActive)}>
            <div
                className="bg-[#00FF0A] rounded-2xl px-7 py-2.5  shadow-lg  will-change-transform
cursor-pointer shadow-black/20 font-normal duration-200 transition-transform group-hover:-translate-y-1 "
            >
                Get Started
            </div>
        </div>
    );
}
