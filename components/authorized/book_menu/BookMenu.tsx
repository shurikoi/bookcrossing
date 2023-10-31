import ModalMenu from "../../ui/ModalMenu";
import { useEffect, useRef, useState } from "react";
import { useBook } from "../../contexts/BookProvider";
import ViewMode from "./ViewMode";
import EditMode from "./EditMode";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export type BookMenuMode = "edit" | "view";

export default function BookMenu() {
    const { setBookId, bookId } = useBook();

    useEffect(() => {
        setMode("view")
        console.log(bookId)
        setIsModalActive(!!bookId);
    }, [bookId]);

    const [mode, setMode] = useState<BookMenuMode>("view");

    const [isModalActive, setIsModalActive] = useState(false);

    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <ModalMenu
            fullMode
            isModalActive={isModalActive}
            setIsModalActive={setIsModalActive}
            callback={() => setBookId("")}
        >
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={mode}
                    classNames="fade"
                    addEndListener={(done: any) => {
                        if (nodeRef.current) {
                            nodeRef.current.addEventListener("transitionend", done, false);
                        }
                    }}
                    nodeRef={nodeRef}
                >
                    <div ref={nodeRef}>
                        {mode == "view" ? (
                            <ViewMode
                                isModalActive={isModalActive}
                                setIsModalActive={setIsModalActive}
                                setMode={setMode}
                            ></ViewMode>
                        ) : (
                            <EditMode setMode={setMode}></EditMode>
                        )}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </ModalMenu>
    );
}
