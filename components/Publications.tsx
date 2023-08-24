import { useEffect, useState } from "react";
import AddBookBtn from "./ui/AddBookBtn";
import Book from "./ui/Book";
import ModalMenu from "./ui/ModalMenu";
import PublicationForm from "./PublicationForm";
import ContentLoader from "./ui/ContentLoader";
import BookMenu from "./BookMenu";
import { messenger } from "./Contact";

export type data = {
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

export default function Publications() {
    const [isPublicationModalActive, setIsPublicationModalActive] = useState(false);
    const [isBookModalActive, setIsBookModalActive] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<data[]>();

    const [currentBook, setCurrentBook] = useState<data>({
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

    useEffect(() => {
        getPublications();

        async function getPublications() {
            const response = await fetch("/api/getPublications", {
                method: "POST",
            });

            const books: data[] = await response.json();
            
            setIsLoading(false);

            if (books.length === 0) return;

            setData(books);
            setCurrentBook(books[0]);
        }
    }, []);

    function handleAddBookClick() {
        setIsPublicationModalActive(true);
    }

    return (
        <div className="px-28 py-16">
            <div className="flex gap-6 flex-wrap justify-center">
                {isLoading ? (
                    <ContentLoader></ContentLoader>
                ) : (
                    data &&
                    data.map((data, index) => (
                        <Book
                            key={index}
                            data={data}
                            setCurrentBook={setCurrentBook}
                            setIsBookModalActive={setIsBookModalActive}
                        />
                    ))
                )}
            </div>

            <AddBookBtn onClick={handleAddBookClick} />

            <ModalMenu
                modalActive={isPublicationModalActive}
                setModalActive={setIsPublicationModalActive}
                style={{ padding: "25px" }}
            >
                <PublicationForm />
            </ModalMenu>

            <ModalMenu
                modalActive={isBookModalActive}
                setModalActive={setIsBookModalActive}
                style={{ padding: "25px" }}
            >
                <BookMenu data={currentBook} />
            </ModalMenu>
        </div>
    );
}
