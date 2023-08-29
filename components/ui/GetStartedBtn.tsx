"use client";

import { MouseEventHandler } from "react";
import { useForm } from "@/components/contexts/FormContext";
import Pencil from "./icons/PencilIcon";

export default function getStartedBtn({ onClick }: { onClick?: MouseEventHandler }) {
    const { setFormActive } = useForm();

    return (
        <div
            className="select-none group cursor-pointer"
            onClick={() => setFormActive((formActive: boolean) => !formActive)}
        >
            <div
                className="bg-[#00FF0A] rounded-2xl px-7 py-2.5  shadow-lg  will-change-transform
cursor-pointer shadow-black/20 font-normal duration-200 transition-transform group-hover:-translate-y-1 "
            >
                Get Started
            </div>
        </div>
    );
}
