import { useState } from "react";
import BookMenu from "./BookMenu";
import PublicationMenu from "./PublicationMenu";
import AddBookBtn from "../ui/AddBookBtn";
import FilterBar from "./FilterBar";
import { messenger } from "./Contact";
import Publications from "./Publications";
import { FilterProvider } from "../contexts/FilterProvider";

export type bookData = {
    title: string;
    owner: string;
    author: string;
    description: string;
    category: string;
    image: string;
    messenger: messenger;
    messengerDescription: string;
    date: string;
};

export interface bookQuery {
    categories: string[];
    languages: string[];
    states: string[];
}

export default function Main() {
    const [isPublicationModalActive, setIsPublicationModalActive] = useState(false);
    const [isBookModalActive, setIsBookModalActive] = useState(false);

    const [books, setBooks] = useState<bookData[]>([]);

    // const [query, setQuery] = useState<bookQuery>({
    //     categories: [],
    //     languages: [],
    //     states: []
    // });

    const [booksCount, setBooksCount] = useState(0);
    const [booksQueryCount, setBooksQueryCount] = useState(0);

    const [isBooksLoading, setIsBooksLoading] = useState(true);

    const [currentBook, setCurrentBook] = useState<bookData>({
        title: "",
        owner: "",
        author: "",
        description: "",
        category: "",
        messenger: "Telegram",
        messengerDescription: "",
        image: "",
        date: "",
    });

    function handleAddBookClick() {
        setIsPublicationModalActive(true);
    }

    return (
        <div className="flex flex-col items-center gap-10 pt-10">
            <div className="text-center text-[25px] font-normal px-6 max-w-[800px] box-content">
                Wierzymy, że korzystanie z serwisu może dostarczyć wiele radości i wzbogacić Twoje doświadczenie
                czytelnicze.
            </div>
            <FilterProvider>
                <FilterBar
                    isBooksLoading={isBooksLoading}
                    booksCount={booksCount}
                    booksQueryCount={booksQueryCount}
                ></FilterBar>
                <Publications
                    setCurrentBook={setCurrentBook}
                    setIsBookModalActive={setIsBookModalActive}
                    setBooks={setBooks}
                    books={books}
                    setBooksQueryCount={setBooksQueryCount}
                    setBooksCount={setBooksCount}
                    setIsBooksLoading={setIsBooksLoading}
                    isBooksLoading={isBooksLoading}
                ></Publications>
            </FilterProvider>

            <AddBookBtn onClick={handleAddBookClick} />

            <PublicationMenu
                isModalActive={isPublicationModalActive}
                setIsModalActive={setIsPublicationModalActive}
                setBooks={setBooks}
            />

            <BookMenu
                isBookModalActive={isBookModalActive}
                setIsBookModalActive={setIsBookModalActive}
                data={currentBook}
            />
        </div>
    );
}
