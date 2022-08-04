import Config from "../environments/local.config";
import { Title } from "./Title";
import { DayElement } from "./Elements/DayElement";

const INITIAL_DATE = new Date(Date.now());

class Calendar {
  private currentDate: Date = new Date(Date.now());

  private totalDaysCurrentMonth(): number {
    return new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    ).getDate();
  }

  public nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);

    this.render();
  }

  public initialMonth(): void {
    this.currentDate = new Date(Date.now());

    this.render();
  }

  public previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);

    this.render();
  }

  render(): void {
    const dayContainer = document.querySelector("#dayMonth") as HTMLElement;
    const firstDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const firstWeekdayMonth = firstDayOfMonth.getDay()
      ? firstDayOfMonth.getDay()
      : 7;

    const lastDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    const lastWeekdayMonth = lastDayOfMonth.getDay();

    new Title(this.currentDate).render();

    dayContainer.innerHTML = "";

    if (firstWeekdayMonth !== 1) {
      for (let index = -firstWeekdayMonth + 2; index < 1; index++) {
        const currentDay = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          index
        ).getDate();

        dayContainer.appendChild(
          new DayElement({
            dayNumeric: currentDay,
            date: this.currentDate,
          }).getElement()
        );
      }
    }

    for (let index = 1; index <= this.totalDaysCurrentMonth(); index++) {
      dayContainer.appendChild(
        new DayElement({
          dayNumeric: index,
          date: this.currentDate,
        }).getElement()
      );
    }

    const nextMonth: Date = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    if (lastWeekdayMonth) {
      for (let index = 1; index <= 7 - lastWeekdayMonth; index++) {
        dayContainer.appendChild(
          new DayElement({
            dayNumeric: index,
            date: nextMonth,
          }).getElement()
        );
      }
    }
  }
}

export default new Calendar();
