import ContentLoader from "../ui/ContentLoader";
import Book from "../ui/Book";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { bookData } from "./Main";
import { useFilter } from "../contexts/FilterProvider";

interface PublicationsProps {
    setCurrentBook: Dispatch<SetStateAction<bookData>>;
    setIsBookModalActive: Dispatch<SetStateAction<boolean>>;
    setBooks: Dispatch<SetStateAction<bookData[]>>;
    books: bookData[];
}

const limit = 10;

export default function Publications({ setCurrentBook, setIsBookModalActive, setBooks, books }: PublicationsProps) {
    const filter = useFilter();
    const params = new URLSearchParams(window.location.search);

    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const observerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setPage(0);
        setHasMore(true);
        setBooks([]);
    }, [filter.choosenCategories, filter.choosenLanguages, filter.choosenStates]);

    useEffect(() => {
        if (isLoading && hasMore) {
            getPublications();
        }

        async function getPublications() {
            // const categories = params.get("categories")?.split(",");
            // const languages = params.get("languages")?.split(",");
            // const states = params.get("states")?.split(",");
            console.log("zapros")
            const categories = filter.choosenCategories;
            const languages = filter.choosenLanguages;
            const states = filter.choosenStates;

            const response = await fetch("/api/getPublications", {
                method: "POST",
                body: JSON.stringify({
                    limit,
                    page,
                    filter: {
                        categories,
                        languages,
                        states,
                    },
                }),
            });

            const fetchedBooks: bookData[] = await response.json();
console.log(fetchedBooks)
            setPage((prev) => prev + 1);
            setIsLoading(false);

            if (fetchedBooks.length === 0) {
                setHasMore(false);
                setPage((prev) => prev - 1);
                return;
            }

            setBooks((books) => [...books, ...fetchedBooks]);
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

    return (
        <div className="px-28 flex flex-col gap-6 items-center">
            <TransitionGroup className="flex gap-6 flex-wrap justify-center">
                {books &&
                    books.map((book, index) => (
                        <CSSTransition key={index} classNames="item" timeout={500}>
                            <Book
                                key={index}
                                data={book}
                                handleClick={() => {
                                    setCurrentBook(book);
                                    setIsBookModalActive(true);
                                }}
                            />
                        </CSSTransition>
                    ))}
                <div ref={observerRef} className="absolute bottom-0"></div>
            </TransitionGroup>
            {isLoading && (
                <div className="w-6 h-6 relative">
                    <ContentLoader></ContentLoader>
                </div>
            )}
        </div>
    );
}
