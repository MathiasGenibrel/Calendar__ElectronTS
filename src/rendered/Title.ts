import Config from "../environments/config";

let WEEKDAY_GENERATED: boolean = false;

export class Title {
  private readonly currentDate: Date;
  private readonly title: string;
  private readonly weekdays: string[];

  constructor(currentDate: Date) {
    this.currentDate = currentDate;
    this.title = this.getMonthCurrentLanguage();
    this.weekdays = this.getWeekDaysCurrentLanguage();
  }

  /**
   * This private function returns an array of weekdays in the current language.
   * @returns {string[]} Array of weekdays
   */
  private getWeekDaysCurrentLanguage(): string[] {
    // get Monday on January 1970
    const dayNumeric = 5;
    const daysOfWeek: string[] = [];

    for (let index = 0; index < 7; index++) {
      daysOfWeek.push(
        new Date(`${dayNumeric + index} Jan 1970`).toLocaleDateString(
          Config.system.language,
          {
            weekday: "short",
          }
        )
      );
    }

    return daysOfWeek;
  }

  /**
   * Get the current month in the current language.
   * @returns {string} Month in current language
   */
  private getMonthCurrentLanguage(): string {
    return this.currentDate.toLocaleDateString(Config.system.language, {
      month: "long",
      year: "numeric",
    });
  }

  /**
   * Render title component.
   * Title component includes, the current month, year and the weekdays.
   */
  public render(): void {
    const currentMonthElement = document.querySelector(
      "#currentMonth"
    ) as HTMLHeadingElement;
    currentMonthElement.textContent = this.title;

    if (!WEEKDAY_GENERATED) {
      const currentWeekdayElement = document.querySelector(
        "#weekday"
      ) as HTMLElement;

      this.weekdays.forEach((day) => {
        const p = document.createElement("p");
        p.textContent = day;

        currentWeekdayElement.appendChild(p);
      });

      WEEKDAY_GENERATED = true;
    }
  }
}
