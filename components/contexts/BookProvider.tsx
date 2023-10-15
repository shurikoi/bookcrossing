import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { bookData, bookQuery } from "../authorized/Main";

interface BookContext {
    setBookId: Dispatch<SetStateAction<string>>;
    book: bookData;
    bookId: string;
    isLoading: boolean;
}

const BookContext = createContext<BookContext>({
    setBookId: () => {},
    book: {
        title: "",
        owner: "",
        author: "",
        description: "",
        category: "",
        messenger: "Telegram",
        messengerDescription: "",
        image: "",
        date: "",
    },
    bookId: "",
    isLoading: true,
});

function BookProvider({ children }: { children: React.ReactNode }) {
    const params = new URLSearchParams(window.location.search);

    const [bookId, setBookId] = useState(params.get("book") || "");
    const [book, setBook] = useState<bookData>({
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

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        params.set("book", bookId);

        if (!bookId) params.delete("book")

        history.pushState({}, "", params.size > 0 ? `/?${params}` : "/");
        
        if (bookId) getBook();

        async function getBook() {
            setIsLoading(true);

            const response = await fetch("/api/get-book", {
                method: "POST",
                body: JSON.stringify({ id: bookId })
            });

            const book = await response.json();
            console.log(book);
            setBook(book);
            setIsLoading(false);
        }
    }, [bookId]);

    return <BookContext.Provider value={{ setBookId, book, isLoading, bookId }}>{children}</BookContext.Provider>;
}

function useBook() {
    const book = useContext(BookContext);

    return book;
}

export { useBook, BookProvider };
