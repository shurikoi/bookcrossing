import Header from "@/components/ui/header";
import Advantages from "@/components/ui/advantages";


export default function Home() {
    return (
        <>
            <Header></Header>
            <div className="flex items-center justify-center border-b-2 border-black py-8">
                <div className="text-center text-xl font-medium">
                    BookCrossing — to społeczność, gdzie wymieniają się <br />
                    książkami nawzajem.
                </div>
            </div>
            <Advantages></Advantages>
        </>
    );
}
