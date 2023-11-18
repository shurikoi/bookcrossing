import { Dispatch, SetStateAction, createContext, useContext, useEffect, useRef, useState } from "react";
import { bookData, publication } from "../authorized/Main";

interface BookContext {
    setBookId: Dispatch<SetStateAction<string>>;
    book: bookData | undefined;
    setBook: Dispatch<SetStateAction<bookData | undefined>>;
    books: publication[];
    setBooks: Dispatch<SetStateAction<publication[]>>;
    fetchedBooks: { [key: string]: bookData };
    setFetchedBooks: Dispatch<SetStateAction<{ [key: string]: bookData }>>;
    bookId: string;
    isLoading: boolean;
}

const BookContext = createContext<BookContext>({
    setBookId: () => {},
    fetchedBooks: {},
    setFetchedBooks: () => {},
    books: [],
    setBooks: () => {},
    bookId: "",
    book: undefined,
    setBook: () => {},
    isLoading: true,
});

function BookProvider({ children }: { children: React.ReactNode }) {
    const params = new URLSearchParams(window.location.search);

    const [bookId, setBookId] = useState(params.get("book") || "");
    const [book, setBook] = useState<bookData>();

    const [books, setBooks] = useState<publication[]>([]);
    const [fetchedBooks, setFetchedBooks] = useState<{ [key: string]: bookData }>({});

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        params.set("book", bookId);

        if (!bookId) params.delete("book");

        history.pushState({}, "", params.size > 0 ? `/?${params}` : "/");

        if (!!bookId && !fetchedBooks[bookId]) getBook(bookId);
        else if (fetchedBooks[bookId]) setBook(fetchedBooks[bookId]);

        async function getBook(id: string) {
            setIsLoading(true);

            const response = await fetch("/api/get-publication", {
                method: "POST",
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                const book: bookData = await response.json();

                setBook(book);
            }

            setIsLoading(false);
        }
    }, [bookId]);

    useEffect(() => {
        if (book)
            setFetchedBooks((fetchedBooks) => {
                return { ...fetchedBooks, [book?._id]: book };
            });
    }, [book]);

    return (
        <BookContext.Provider
            value={{ setBookId, book, setBook, isLoading, bookId, fetchedBooks, setFetchedBooks, books, setBooks }}
        >
            {children}
        </BookContext.Provider>
    );
}

function useBook() {
    const book = useContext(BookContext);

    return book;
}

export { useBook, BookProvider };
