export default function TagIcon({height = 15, width = 15} : {height?: number, width?: number}) {
    return (
        <svg width={width} height={height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_256_83)">
                <path
                    d="M6.73312 13.4906L5.87812 14.375L-0.625 7.85688V2.5H0.625V7.32438L6.73312 13.4906ZM7.9825 0.625H1.875V6.7325L9.42125 14.375L15.625 8.21875L7.9825 0.625ZM5 5C4.30937 5 3.75 4.44063 3.75 3.75C3.75 3.05938 4.30937 2.5 5 2.5C5.69062 2.5 6.25 3.05938 6.25 3.75C6.25 4.44063 5.69062 5 5 5Z"
                    fill="#4E4E4E"
                />
            </g>
            <defs>
                <clipPath id="clip0_256_83">
                    <rect width="15" height="15" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
