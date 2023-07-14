"use client";

import { MouseEventHandler, useContext } from "react";
import { FormContext } from "./FormProvider";

export default function getStartedBtn({ onClick }: { onClick?: MouseEventHandler }) {
    const { setFormActive } = useContext(FormContext);

    return (
        <div className="group select-none" onClick={() => setFormActive((formActive: boolean) => !formActive)}>
            <div className="bg-[#00FF0A] rounded-2xl px-7 py-2.5 font-semibold transition duration-200 group-hover:translate-y-[-3px] cursor-pointer">
                Get Started
            </div>
        </div>
    );
}
