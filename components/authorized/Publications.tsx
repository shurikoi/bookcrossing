import { Fragment, createRef, useEffect, useRef, useState } from "react";

import BookMenu from "./BookMenu";
import { messenger } from "./Contact";
import ContentLoader from "../ui/ContentLoader";
import Book from "../ui/Book";
import PublicationForm from "./PublicationMenu";
import ModalMenu from "../ui/ModalMenu";
import AddBookBtn from "../ui/AddBookBtn";
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";

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

const limit = 10;

export default function Publications() {
    const [isPublicationModalActive, setIsPublicationModalActive] = useState(false);
    const [isBookModalActive, setIsBookModalActive] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
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

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isLoading && hasMore) {
            getPublications();
        }

        async function getPublications() {
            const response = await fetch("/api/getPublications", {
                method: "POST",
                body: JSON.stringify({
                    limit,
                    page,
                }),
            });

            const fetchedBooks: bookData[] = await response.json();

            setPage((prev) => prev + 1);
            setIsLoading(false);

            if (fetchedBooks.length === 0) {
                setHasMore(false);
                return;
            }

            setBooks([...books, ...fetchedBooks]);
        }
    }, [isLoading, hasMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsLoading(true);
                }
            },
            {
                rootMargin: "100px",
            }
        );

        if (observerRef.current && hasMore) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.disconnect();
        };
    }, [observerRef, observerRef.current, hasMore, isLoading]);

    function handleAddBookClick() {
        setIsPublicationModalActive(true);
    }

    return (
        <div className="px-28 py-16 relative">
            <div className="flex gap-6 flex-wrap justify-center">
                {books &&
                    books.map((book, index) => {
                        return (
                            <TransitionGroup>
                                <CSSTransition key={index} classNames="item" timeout={300}>
                                    <Book
                                        key={index}
                                        data={book}
                                        handleClick={() => {
                                            setCurrentBook(book);
                                            setIsBookModalActive(true);
                                        }}
                                    />
                                </CSSTransition>
                            </TransitionGroup>
                        );
                    })}
                <div ref={observerRef}></div>
            </div>
            {isLoading && (
                <div className="relative mt-5">
                    <ContentLoader></ContentLoader>
                </div>
            )}

            <AddBookBtn onClick={handleAddBookClick} />

            <ModalMenu fullMode isModalActive={isPublicationModalActive} setIsModalActive={setIsPublicationModalActive}>
                <PublicationForm />
            </ModalMenu>

            <ModalMenu fullMode isModalActive={isBookModalActive} setIsModalActive={setIsBookModalActive}>
                <BookMenu data={currentBook} />
            </ModalMenu>
        </div>
    );
}
