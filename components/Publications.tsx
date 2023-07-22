import { useState } from "react";
import AddBookBtn from "./ui/AddBookBtn";
import Book from "./ui/Book";

type data = {
    title: string
}

export default function Publications() {
    const [data, setData] = useState<data[]>() 
    getBooks()
    async function getBooks(){
        const books = await fetch("https://jsonplaceholder.typicode.com/posts").then(data => data.json())

        setData(books)
    }

    if (!data)
        return <div>no data</div>

    return (
        <div className="px-28 py-16">
            <div className="flex gap-6 flex-wrap justify-center">
                {data.map(data => <Book title={data.title} author={"nikita"} date={"dzisiaj"}/>)}
            </div>
            <AddBookBtn />
        </div>
    );
}
