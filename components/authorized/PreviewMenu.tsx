import ModalMenu from "../ui/ModalMenu";
import { Dispatch, SetStateAction, useState } from "react";
import { bookData } from "./Publications";
import Book from "../ui/Book";
import SubmitIcon from "../ui/icons/SubmitIcon";
import ContentLoader from "../ui/ContentLoader";
interface PreviewMenuProps {
    handleSubmit: () => void;
    isSubmitButtonDisabled: boolean;
    previewData: bookData;
    isMenuActive: boolean;
    setIsMenuActive: Dispatch<SetStateAction<boolean>>;
}

export default function PreviewMenu({
    handleSubmit,
    isSubmitButtonDisabled,
    previewData,
    isMenuActive,
    setIsMenuActive,
}: PreviewMenuProps) {
    return (
        <ModalMenu isModalActive={isMenuActive} setIsModalActive={setIsMenuActive}>
            <div className="flex items-center justify-center flex-col gap-4 ">
                <Book data={previewData}></Book>
                <div className="flex justify-center 2sm:justify-start">
                    {isSubmitButtonDisabled ? (
                        <div className="relative w-[33px] h-[33px]">
                            <ContentLoader />
                        </div>
                    ) : (
                        <div
                            className={`${
                                isSubmitButtonDisabled ? "text-gray-400" : "text-black"
                            } duration-200 cursor-pointer w-fit`}
                            onClick={handleSubmit}
                        >
                            <SubmitIcon></SubmitIcon>
                        </div>
                    )}
                </div>
            </div>
        </ModalMenu>
    );
}
