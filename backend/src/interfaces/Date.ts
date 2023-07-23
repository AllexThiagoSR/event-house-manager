type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type EntireDate = string
  | { day: number, month: MonthNumber, year: number };

export default EntireDate;
