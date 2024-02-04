"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
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
  const activeModals = useRef<HTMLDivElement[]>([]);

  const bodyTimeout = useRef<NodeJS.Timer | null>(null);

  const { isSmallScreen } = useScreen();
  function addModalToActive(modalElement: HTMLDivElement) {
    activeModals.current.push(modalElement);

    handleModalState();
  }

  function removeModalFromActive(modalElement: HTMLDivElement) {
    const modalIndex = activeModals.current.indexOf(modalElement);

    if (modalIndex >= 0) activeModals.current.splice(modalIndex, 1);

    handleModalState();
  }

  function handleModalState() {
    if (!isSmallScreen) return;

    if (bodyTimeout.current) clearTimeout(bodyTimeout.current);

    if (activeModals.current.length > 0) document.body.style.overflow = "hidden";
    else
      bodyTimeout.current = setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 100);
  }

  return (
    <ModalContext.Provider value={{ addModalToActive, removeModalFromActive, activeModals: activeModals.current }}>
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const modal = useContext(ModalContext);

  return modal;
}

export { ModalProvider, useModal };
