import dayjs from "dayjs";

export function generateRangeDatesFromYearStart() {
  const startDate = dayjs("2023-12-31T00:00:00.000z").startOf("day");
  const endDate = new Date();

  let dateRange = [];
  let compareDate = startDate;

  while (compareDate.isBefore(endDate)) {
    dateRange.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dateRange;
}
