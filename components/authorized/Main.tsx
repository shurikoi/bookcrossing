"use client";

import { useState } from "react";
import { BookProvider } from "../contexts/BookProvider";
import { FilterProvider } from "../contexts/FilterProvider";
import AddBookButton from "../ui/buttons/AddBookButton";
import Publications from "./Publications";
import BookMenu from "./book_menu/BookMenu";
import FilterBar from "./filter/FilterBar";
import PublicationMenu, { messenger } from "./publication_menu/PublicationMenu";

export interface bookData {
  id: string;
  title: string;
  owner: string;
  author: string;
  description: string;
  category: string;
  image: string;
  messenger: messenger;
  language: string;
  state: string;
  messengerDescription: string;
  date: Date;
  ownerData: {
    avatar: string;
    name: string;
    surname: string;
  };

  isReserved: boolean;

  reservatorData?: {
    name: string;
    surname: string;
  };
}

export interface publication {
  id: string;
  date: Date;
  author: string;
  title: string;
  image: string;
  isReserved?: boolean;
  expires? : Date
  owner: string;
  ownerData: {
    avatar: string;
    name: string;
    surname: string;
  };
}

export default function Main({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
  const [isPublicationModalActive, setIsPublicationModalActive] = useState(false);

  function handleAddBookClick() {
    setIsPublicationModalActive(true);
  }

  return (
    <div className="flex flex-col items-center pt-10">
      <div className="text-center font-light text-[18px] lg:text-[23px] max-w-[800px] px-6 box-content">
        Wierzymy, że korzystanie z&nbsp;serwisu może dostarczyć wiele radości i&nbsp;wzbogacić Twoje doświadczenie
        czytelnicze.
      </div>

      <FilterBar></FilterBar>

      <Publications></Publications>

      <PublicationMenu isModalActive={isPublicationModalActive} setIsModalActive={setIsPublicationModalActive} />

      <BookMenu />

      <AddBookButton onClick={handleAddBookClick} />
    </div>
  );
}
