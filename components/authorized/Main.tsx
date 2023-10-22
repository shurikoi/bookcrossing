import { useState } from "react";
import BookMenu from "./BookMenu";
import PublicationMenu, { messenger } from "./PublicationMenu";
import AddBookBtn from "../ui/AddBookBtn";
import FilterBar from "./FilterBar";
import Publications from "./Publications";
import { FilterProvider, sort } from "../contexts/FilterProvider";
import { BookProvider } from "../contexts/BookProvider";

export interface bookData {
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
    date: string;
    ownerData: {
        avatar: string;
        name: string;
        surname: string;
    };
}

export interface publication {
    id?: string;
    date: string;
    author: string;
    title: string;
    image: string;
    ownerData: {
        avatar: string;
        name: string;
        surname: string;
    };
}

export interface bookQuery {
    filter: {
        category: string[];
        language: string[];
        state: string[];
    };
    sort: sort;
}

export default function Main() {
    const [isPublicationModalActive, setIsPublicationModalActive] = useState(false);

    const [books, setBooks] = useState<publication[]>([]);

    const [booksCount, setBooksCount] = useState(0);
    const [booksQueryCount, setBooksQueryCount] = useState(0);

    const [isBooksLoading, setIsBooksLoading] = useState(true);

    function handleAddBookClick() {
        setIsPublicationModalActive(true);
    }

    return (
        <div className="flex flex-col items-center pt-10">
            <div className="text-center text-[25px] font-normal px-6 max-w-[800px] box-content">
                Wierzymy, że korzystanie z&nbsp;serwisu może dostarczyć wiele radości i&nbsp;wzbogacić Twoje
                doświadczenie czytelnicze.
            </div>
            <BookProvider>
                <FilterProvider>
                    <FilterBar
                        setIsBooksLoading={setIsBooksLoading}
                        isBooksLoading={isBooksLoading}
                        booksCount={booksCount}
                        booksQueryCount={booksQueryCount}
                    ></FilterBar>

                    <Publications
                        setBooks={setBooks}
                        books={books}
                        setBooksQueryCount={setBooksQueryCount}
                        setBooksCount={setBooksCount}
                        setIsBooksLoading={setIsBooksLoading}
                        isBooksLoading={isBooksLoading}
                    ></Publications>
                </FilterProvider>

                <BookMenu />
            </BookProvider>

            <PublicationMenu
                isModalActive={isPublicationModalActive}
                setIsModalActive={setIsPublicationModalActive}
                setBooks={setBooks}
            />

            <AddBookBtn onClick={handleAddBookClick} />
        </div>
    );
}
