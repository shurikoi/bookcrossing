import ModalMenu from "../../ui/ModalMenu";
import { useEffect, useRef, useState } from "react";
import { useBook } from "../../contexts/BookProvider";
import ViewMode from "./ViewMode";
import EditMode from "./EditMode";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import ArrowLeftIcon from "@/components/ui/icons/ArrowLeftIcon";

export type BookMenuMode = "edit" | "view";

export default function BookMenu(props : any) {
  const { setBookId, bookId } = useBook();

  useEffect(() => {
    setMode("view");
    setIsModalActive(!!bookId);
  }, [bookId]);

  const [mode, setMode] = useState<BookMenuMode>("view");

  const [isModalActive, setIsModalActive] = useState(false);

  const nodeRef = useRef<HTMLDivElement>(null);

  const editModeHeader = mode == "edit" && (
    <div className="p-3 relative text-center w-full">
      <div className="absolute cursor-pointer w-fit" onClick={() => setMode("view")}>
        <ArrowLeftIcon></ArrowLeftIcon>
      </div>
      <div>Edytowanie</div>
    </div>
  );

  return (
    <ModalMenu
      fullMode
      header={editModeHeader}
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
              <ViewMode isModalActive={isModalActive} setIsModalActive={setIsModalActive} setMode={setMode}></ViewMode>
            ) : (
              <EditMode setMode={setMode}></EditMode>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </ModalMenu>
  );
}
