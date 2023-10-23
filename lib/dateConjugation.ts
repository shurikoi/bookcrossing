export default function dateConjugation(date: Date) {
    const time = new Date(date).getTime() / 1000; // czas w sekundach
    const currentTime = new Date().getTime() / 1000; // czas w sekundach
    const timeDifference = currentTime - time;

    const day = 86400;
    const daysFromPublication = Math.round(timeDifference / day);
    const monthsCount = Math.round(daysFromPublication / 30);

    if (daysFromPublication < 1 || Number.isNaN(daysFromPublication)) return "Dzisiaj";
    else if (daysFromPublication < 2) return "Wczoraj";
    else if (daysFromPublication < 30)
        if (daysFromPublication.toString()[1] == "1") return `${daysFromPublication} dzień temu`;
        else return `${daysFromPublication} dni temu`;
    else if (daysFromPublication > 30) {
        if (monthsCount == 1) return `${monthsCount} miesiąc`
        else if (monthsCount <= 4) return `${monthsCount} miesiące`
        else if (monthsCount >= 5) return `${monthsCount} miesięcy`
    }
}