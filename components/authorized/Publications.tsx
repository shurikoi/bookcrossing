import ContentLoader from "../ui/loaders/ContentLoader";
import Book from "../ui/Book";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Dispatch, SetStateAction, memo, useLayoutEffect, useEffect, useRef, useState } from "react";
import { publication } from "./Main";
import { useFilter } from "../contexts/FilterProvider";
import { useBook } from "../contexts/BookProvider";
import { useUserData } from "../contexts/UserProvider";
import PublicationsLoader from "../ui/loaders/skeleton/PublicationsLoader";

interface PublicationsProps {
    setBooksCount: Dispatch<SetStateAction<number>>;
    setBooksQueryCount: Dispatch<SetStateAction<number>>;
    setIsBooksLoading: Dispatch<SetStateAction<boolean>>;
    isBooksLoading: boolean;
}

interface fetchData {
    publications: publication[];
    count: number;
    queryCount: number;
}

const limit = 20;

const Publications = memo(
    ({ setBooksCount, setBooksQueryCount, setIsBooksLoading, isBooksLoading }: PublicationsProps) => {
        const filter = useFilter();

        const { setBookId, setBooks, books } = useBook();

        const timerRef = useRef<NodeJS.Timer | null>(null);
        const observer = useRef<IntersectionObserver | null>(null);

        const [isIntersecting, setIsIntersecting] = useState(true);
        const [hasMore, setHasMore] = useState(true);
        const [page, setPage] = useState(0);

        const observerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            setPage(0);
            setHasMore(true);
            setIsBooksLoading(false )
            setIsIntersecting(true)
            setBooks([]);
        }, [filter.query]);

        useLayoutEffect(() => {
            if (isIntersecting && !isBooksLoading && hasMore) getPublications();

            async function getPublications() {
                setIsBooksLoading(true);

                const response = await fetch("/api/get-publications", {
                    method: "POST",
                    body: JSON.stringify({
                        limit,
                        page,
                        query: filter.query,
                    }),
                });

                const data: fetchData = await response.json();

                const fetchedBooks: publication[] = data.publications;

                setPage((prev) => prev + 1);
                setIsBooksLoading(false);

                if (fetchedBooks.length === 0 || fetchedBooks.length < limit) {
                    setHasMore(false);
                    setPage((prev) => prev - 1);
                }

                setBooks((books) => [...books, ...fetchedBooks]);

                setBooksCount(data.count);
                setBooksQueryCount(data.queryCount);
            }
        }, [isBooksLoading, hasMore, filter.query, isIntersecting]);

        useEffect(() => {
            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) setIsIntersecting(true);
                    else setIsIntersecting(false);
                },
                {
                    rootMargin: "480px",
                }
            );
        }, []);

        useEffect(() => {
            if (observerRef.current && hasMore && observer.current) observer.current.observe(observerRef.current);

            return () => {
                if (observerRef.current && observer.current) observer.current.disconnect();
            };
        }, [observerRef, observerRef, observer, hasMore, isBooksLoading]);

        return (
            <div className="px-24 py-10 flex w-full flex-col gap-8 items-center bg-[linear-gradient(180deg,rgba(248,250,255,1)_40%,rgba(255,255,255,1)_80%)] ">
                <div className="relative flex gap-8 flex-wrap justify-center">
                    {books &&
                        books.map((book, index) => (
                            <Book key={index} data={book} handleClick={() => setBookId(book.id!)} />
                        ))}
                    {isBooksLoading && <PublicationsLoader></PublicationsLoader>}
                    <div ref={observerRef} className="absolute bottom-0"></div>
                </div>
            </div>
        );
    }
);

Publications.displayName = "Publications";

export default Publications;
