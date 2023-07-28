export default function Loader() {
    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white">
                <div className="absolute animate-scaling w-full h-full bg-transparent border-sky-400 border-2 rounded-full"></div>
                <div className="absolute animate-scaling-1s w-full h-full bg-transparent border-sky-400 border-2 rounded-full"></div>
            </div>
        </>
    );
}
