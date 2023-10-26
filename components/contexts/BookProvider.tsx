import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { bookData } from "../authorized/Main";

interface BookContext {
    setBookId: Dispatch<SetStateAction<string>>;
    book: bookData | undefined;
    setBook: Dispatch<SetStateAction<bookData | undefined>>;
    fetchedBooks: { [key: string]: bookData };
    setFetchedBooks: Dispatch<SetStateAction<{ [key: string]: bookData }>>;
    bookId: string;
    isLoading: boolean;
}

const BookContext = createContext<BookContext>({
    setBookId: () => {},
    fetchedBooks: {},
    setFetchedBooks: () => {},
    bookId: "",
    book: undefined,
    setBook: () => {},
    isLoading: true,
});

function BookProvider({ children }: { children: React.ReactNode }) {
    const params = new URLSearchParams(window.location.search);

    const [bookId, setBookId] = useState(params.get("book") || "");
    const [book, setBook] = useState<bookData>();

    const [fetchedBooks, setFetchedBooks] = useState<{ [key: string]: bookData }>({});

    const [isLoading, setIsLoading] = useState(false);
    console.log(fetchedBooks)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        params.set("book", bookId);

        if (!bookId) params.delete("book");

        history.pushState({}, "", params.size > 0 ? `/?${params}` : "/");

        if (bookId && !fetchedBooks[bookId]) getBook();
        else if (fetchedBooks[bookId]) setBook(fetchedBooks[bookId]);

        async function getBook() {
            setIsLoading(true);

            try {
                const response = await fetch("/api/get-publication", {
                    method: "POST",
                    body: JSON.stringify({ id: bookId }),
                });

                const book: bookData = await response.json();

                setBook(book);
            } catch (error) {
                setBook(undefined);
            }

            setIsLoading(false);
        }
    }, [bookId]);

    useEffect(() => {
        setFetchedBooks((fetchedBooks) => {
            if (book) return { ...fetchedBooks, [bookId]: book };
            return fetchedBooks;
        });
    }, [book]);

    return (
        <BookContext.Provider value={{ setBookId, book, setBook, isLoading, bookId, fetchedBooks, setFetchedBooks }}>
            {children}
        </BookContext.Provider>
    );
}

function useBook() {
    const book = useContext(BookContext);

    return book;
}

export { useBook, BookProvider };
