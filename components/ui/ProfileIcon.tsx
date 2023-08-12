export default function ProfileIcon({height = 15, width = 15} : {height?: number, width?: number}) {
    return (
        <svg width={width} height={height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.5 0C3.35813 0 0 3.35813 0 7.5C0 11.6419 3.35813 15 7.5 15C11.6419 15 15 11.6419 15 7.5C15 3.35813 11.6419 0 7.5 0ZM7.5 13.75C5.54813 13.75 3.80375 12.8494 2.65687 11.4437C2.81875 11.0763 3.14625 10.8219 3.82375 10.665C5.22625 10.3412 6.61062 10.0519 5.94438 8.82438C3.9725 5.18688 5.3825 3.125 7.5 3.125C9.57625 3.125 11.0212 5.11063 9.05562 8.82438C8.40875 10.0444 9.74312 10.3344 11.1763 10.665C11.8525 10.8212 12.1825 11.0744 12.3456 11.4406C11.1981 12.8488 9.45312 13.75 7.5 13.75Z"
                fill="#434343"
            />
        </svg>
    );
}
