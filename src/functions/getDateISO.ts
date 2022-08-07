export const getDay = (currentDate: Date) => {
  const dd: number = currentDate.getDate();
  // Add 0 if day is less than 10, for format to ISO model (YYYY-MM-DD)
  const mm: number | string =
    currentDate.getMonth() + 1 < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;
  const yyyy: number = currentDate.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};
