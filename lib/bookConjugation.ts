export default function bookConjugation(booksCount: number) {
  const lastDigit = booksCount % 10;

  if (lastDigit == 1) return "książka";
  else if (lastDigit >= 2 && lastDigit <= 4) return "książki";
  else if (lastDigit == 0 || lastDigit >= 5) return "książek";
}
