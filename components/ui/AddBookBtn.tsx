import Pencil from "./Pencil";

export default function AddBookBtn() {
    return (
        <div className="group">
            <div className="shadow-md px-6 py-2.5 right-5 bottom-5 flex items-center bg-[#F2F9F0] gap-3 fixed rounded-lg duration-200 group-hover:-translate-y-1 cursor-pointer will-change-transform">
                <Pencil />
                <div className="font-normal">Utwórz</div>
            </div>
        </div>
    );
}
