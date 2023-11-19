export default function PublicationsLoader() {
    return new Array(20).fill(0).map((el, index) => (
        <div className="relative" key={index}>
            <div
                className={`skeleton rounded-md overflow-hidden relative w-60 aspect-[3/4]`}
            ></div>
            <div className="skeleton absolute top-0 right-0 -translate-y-1/2 w-14 h-14 translate-x-1/2 rounded-full shadow-[0px_0px_15px_1px_rgba(0,0,0,.5)]"></div>
        </div>
    ));
}
