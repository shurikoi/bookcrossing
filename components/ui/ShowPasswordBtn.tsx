import { MouseEventHandler, useState } from "react";
import OpenedEye from "./OpenedEyeIcon";
import ClosedEye from "./ClosedEyeIcon";

interface ShowPasswordBtn {
    isPasswordVisible: boolean;
    onClick: MouseEventHandler;
}

export default function ShowPasswordBtn({ isPasswordVisible, onClick }: ShowPasswordBtn) {
    return <div className="cursor-pointer" onClick={onClick}>{isPasswordVisible ? <OpenedEye></OpenedEye> : <ClosedEye></ClosedEye>}</div>;
}
