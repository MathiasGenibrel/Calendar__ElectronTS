import { DayElement } from "./Elements/DayElement";

/**
 * @class GenerateDate
 * @description Generate all days to display in the calendar
 */
export class DateGenerator {
  // Get HTLM Element to push all days inside
  protected readonly calendarFragment: DocumentFragment =
    document.createDocumentFragment();
  protected readonly dayContainer: HTMLElement = document.querySelector(
    "#dayMonth"
  ) as HTMLElement;
  protected currentDate: Date = new Date(Date.now());

  /**
   * Get the currentDate and return the total days of the current month
   * @returns {number} - number of days inside the current month
   */
  private totalDaysCurrentMonth(): number {
    return new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    ).getDate();
  }

  /**
   * Generate all days to display for the actual Month
   */
  protected generateActualMonth(): void {
    for (let index = 1; index <= this.totalDaysCurrentMonth(); index++) {
      const actualDay = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        index
      );

      this.calendarFragment.appendChild(
        new DayElement({
          dayNumeric: index,
          date: actualDay,
        }).getElement()
      );
    }
  }

  /**
   * Generate all days to display for the previous month
   */
  protected generatePreviousMonth(): void {
    const firstDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const firstWeekdayMonth = firstDayOfMonth.getDay()
      ? firstDayOfMonth.getDay()
      : 7;

    if (firstWeekdayMonth !== 1) {
      for (let index = -firstWeekdayMonth + 2; index < 1; index++) {
        const currentDay = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          index
        );

        this.calendarFragment.appendChild(
          new DayElement({
            dayNumeric: currentDay.getDate(),
            date: currentDay,
            classList: ["other-month"],
          }).getElement()
        );
      }
    }
  }

  /**
   * Generate all days to display for the next month
   */
  protected generateNextMonth(): void {
    // Get last day of the month [Sunday, Monday, ...]
    const lastWeekdayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    ).getDay();

    if (lastWeekdayOfMonth) {
      for (let index = 1; index <= 7 - lastWeekdayOfMonth; index++) {
        // Get the next month data
        const nextMonth: Date = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth() + 1,
          index
        );

        this.calendarFragment.appendChild(
          new DayElement({
            dayNumeric: index,
            date: nextMonth,
            classList: ["other-month"],
          }).getElement()
        );
      }
    }
  }
}
