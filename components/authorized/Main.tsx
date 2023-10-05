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

export default function Main() {
    const [isPublicationModalActive, setIsPublicationModalActive] = useState(false);
    const [isBookModalActive, setIsBookModalActive] = useState(true);

    const [books, setBooks] = useState<bookData[]>([]);

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
                <FilterBar></FilterBar>
                <Publications
                    setCurrentBook={setCurrentBook}
                    setIsBookModalActive={setIsBookModalActive}
                    setBooks={setBooks}
                    books={books}
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
