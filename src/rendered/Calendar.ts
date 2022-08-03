import Config from "../environments/local.config";
import { Title } from "./Title";

const CURRENT_MONTH = new Date(Date.now()).getMonth();

class Calendar {
  private currentDate: Date = new Date(Date.now());

  private totalDaysCurrentMonth(): number {
    return new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    ).getDate();
  }

  private createDayElement(day: number): HTMLElement {
    const today = this.currentDate.getDay();
    const currentMonthString = this.currentDate.toLocaleDateString(
      Config.system.language,
      { month: "short" }
    );

    const dayElementContainer = document.createElement("div");
    dayElementContainer.classList.add("calendar__app__dayMonth__day");

    const dayTitle = document.createElement("h2");

    // TODO add event element

    // Add class to make difference between current day and other days
    if (day === today && this.currentDate.getMonth() === CURRENT_MONTH)
      dayElementContainer.classList.add("calendar__app__dayMonth__day--today");

    dayTitle.textContent =
      day === 1 ? `${day} ${currentMonthString}` : day.toString();

    dayElementContainer.appendChild(dayTitle);

    return dayElementContainer;
  }

  public nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);

    this.render();
  }

  public previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);

    this.render();
  }

  render(): void {
    const dayContainer = document.querySelector("#dayMonth") as HTMLElement;

    new Title(this.currentDate).render();

    dayContainer.innerHTML = "";
    for (let index = 1; index <= this.totalDaysCurrentMonth(); index++) {
      const dayElement = this.createDayElement(index);
      dayContainer.appendChild(dayElement);
    }
  }
}

export default new Calendar();
