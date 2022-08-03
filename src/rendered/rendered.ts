import Config from "../environments/local.config";

class Title {
  private readonly title: string;
  private readonly weekdays: string[];

  constructor(currentDate: Date, weekdays: string[]) {
    this.title = currentDate.toLocaleDateString(Config.system.language, {
      month: "long",
      year: "numeric",
    });
    this.weekdays = weekdays;
  }

  private getWeekDays = (): string[] => {
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
  };

  public render(): void {
    const currentMonthElement = document.querySelector(
      "#currentMonth"
    ) as HTMLHeadingElement;

    currentMonthElement.textContent = this.title;

    console.log(this.getWeekDays());
  }
}

class Calendar {
  private readonly currentDate: Date = new Date(Date.now());
  private readonly currentMonth: number = this.currentDate.getMonth();
  private readonly currentYear: number = this.currentDate.getFullYear();

  private totalDaysInMonth(): number {
    return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  }

  render(): void {
    new Title(this.currentDate, []).render();
  }
}

const calendar = new Calendar();

calendar.render();
console.log(calendar);
console.log(Config.system.language);
