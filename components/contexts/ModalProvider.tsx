"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useScreen } from "./ScreenProvider";

interface ModalProvideProps {
  children: React.ReactNode;
}

interface ModalContext {
  addModalToActive: (ref: HTMLDivElement) => void;
  removeModalFromActive: (ref: HTMLDivElement) => void;
  activeModals: HTMLDivElement[];
}

const ModalContext = createContext<ModalContext>({
  addModalToActive: () => null,
  removeModalFromActive: () => null,
  activeModals: [],
});

function ModalProvider({ children }: ModalProvideProps) {
  const [activeModals, setActiveModals] = useState<HTMLDivElement[]>([]);

  const { isSmallScreen } = useScreen();
  function addModalToActive(modalElement: HTMLDivElement) {
    setActiveModals((activeModals) => [...new Set([...activeModals, modalElement])]);
  }

  function removeModalFromActive(modalElement: HTMLDivElement) {
    setActiveModals((modals) => {
      const modalIndex = modals.indexOf(modalElement);

      if (modalIndex >= 0) modals.splice(modalIndex, 1);

      return [...modals];
    });
  }

  useEffect(() => {
    if (!isSmallScreen) return;

    if (activeModals.length > 0) document.body.style.overflow = "hidden";
    else
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 100);
  }, [activeModals]);

  return (
    <ModalContext.Provider value={{ addModalToActive, removeModalFromActive, activeModals }}>
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const modal = useContext(ModalContext);

  return modal;
}

export { ModalProvider, useModal };
