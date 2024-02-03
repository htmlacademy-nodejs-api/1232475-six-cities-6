// генерит случайное число
export function generateRandomValue(min:number, max: number, numAfterDigit = 0) {

  // Math.random() - выводит случайное число от 0 до 1 со случаным количеством цифр после точки
  // .toFixed - указывает сколько знаком должно быть после точки
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);                   
}

// возвращает случайные строки из массива
export function getRandomItems<T>(items: T[]):T[] {
  const startPosition = generateRandomValue(0, items.length - 1);                         // генерит случайное число от 0 до длинны массива
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);   // 
  return items.slice(startPosition, endPosition);
}

// выбирает случайный елемент из массива
export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}