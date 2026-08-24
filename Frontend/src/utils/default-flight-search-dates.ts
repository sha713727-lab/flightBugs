export function formatIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function defaultFlightSearchDates(now: Date = new Date()): {
  readonly departDate: string;
  readonly returnDate: string;
} {
  const depart = new Date(now);
  depart.setHours(0, 0, 0, 0);
  depart.setDate(depart.getDate() + 7);

  const ret = new Date(depart);
  ret.setDate(ret.getDate() + 7);

  return {
    departDate: formatIsoDate(depart),
    returnDate: formatIsoDate(ret),
  };
}
