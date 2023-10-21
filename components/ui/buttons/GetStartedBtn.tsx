import { useForm } from "@/components/contexts/FormModalProvider";

export default function GetStartedBtn() {
    const { setFormActive } = useForm();

    function handleClick() {
        setFormActive((formActive: boolean) => !formActive);
    }

    return (
        <div className="select-none group cursor-pointer" onClick={handleClick}>
            <div
                className="bg-[#00FF0A] rounded-2xl px-7 py-2.5  shadow-lg  will-change-transform
cursor-pointer shadow-black/20 font-normal duration-200 transition-transform group-hover:-translate-y-1 "
            >
                Rozpocznij
            </div>
        </div>
    );
}
