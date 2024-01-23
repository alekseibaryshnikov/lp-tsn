export const sortByDate = <T>(
  arr: T[],
  dateField: keyof T,
  desc?: boolean,
): T[] => {
  return arr.sort((a, b) => {
    const dateA = new Date(a[dateField] as string).getTime();
    const dateB = new Date(b[dateField] as string).getTime();

    if (dateA && dateB) {
      return desc
        ? new Date(dateA).getTime() - new Date(dateB).getTime()
        : new Date(dateB).getTime() - new Date(dateA).getTime();
    }

    if (dateA) {
      return desc ? 1 : -1;
    }

    if (dateB) {
      return desc ? -1 : 1;
    }

    return 0;
  });
};
