export default function convertDate(date: string) {
    const time = new Date(date).getTime() / 1000; // czas w sekundach
    const currentTime = new Date().getTime() / 1000; // czas w sekundach
    const timeDifference = currentTime - time;

    const day = 86400;
    const daysFromPublication = Math.round(timeDifference / day);

    if (daysFromPublication < 1) return "Dzisiaj";
    else if (daysFromPublication < 2) return "Wczoraj";
    else if (daysFromPublication > 20)
        if (daysFromPublication.toString()[1] == "1") return `${daysFromPublication} dzień temu`;
    return `${daysFromPublication} dni temu`;
}
