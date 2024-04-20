export const sortByDate = <T>(
  arr: T[],
  dateField: keyof T,
  asc?: boolean,
): T[] => {
  return arr.sort((a, b) => {
    const dateA = new Date(a[dateField] as string).getTime();
    const dateB = new Date(b[dateField] as string).getTime();

    if (dateA && dateB) {
      return asc
        ? new Date(dateA).getTime() - new Date(dateB).getTime()
        : new Date(dateB).getTime() - new Date(dateA).getTime();
    }

    if (dateA) {
      return asc ? 1 : -1;
    }

    if (dateB) {
      return asc ? -1 : 1;
    }

    return 0;
  });
};
