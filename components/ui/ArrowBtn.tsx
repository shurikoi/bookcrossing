export default function arrowBtn({ className = "" } : {className? : string}) {
    return (
        <div className={`cursor-pointer rounded-full bg-[#95ED8E] w-7 h-7 ${className}`}>
            <div className=" relative w-full h-full before:w-0.5 before:h-[10px] before:bg-white before:absolute before:top-[50%] before:left-[50%] before:rotate-45 before:translate-x-[-50%] before:translate-y-[calc(-50%+3px)] after:w-0.5 after:h-[10px] after:bg-white after:absolute after:top-[50%] after:left-[50%] after:rotate-[135deg] after:translate-x-[-50%] after:translate-y-[calc(-50%-3px)] "></div>
        </div>
    );
}
