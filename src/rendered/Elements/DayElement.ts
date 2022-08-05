import { IDayElementParams } from "../../interface/Elements/IDayElement";
import Config from "../../environments/config";

export class DayElement {
  private readonly currentDate: Date = new Date(Date.now());
  private params: IDayElementParams;
  private dayContainer: HTMLElement = document.createElement("div");

  constructor(params: IDayElementParams) {
    this.params = params;
  }

  private setContainerParam() {
    if (this.params.eventListener)
      this.dayContainer.addEventListener(
        this.params.eventListener.type,
        this.params.eventListener.callback
      );

    if (this.params.classList)
      this.dayContainer.classList.add(...this.params.classList);
  }

  private setDayContent() {
    const dayTitle = document.createElement("h2");
    const monthLocaleDateString = this.params.date.toLocaleDateString(
      Config.system.language,
      { month: "short" }
    );

    if (this.params.dayNumeric === 1)
      dayTitle.textContent = `${this.params.dayNumeric} ${monthLocaleDateString}`;
    else dayTitle.textContent = this.params.dayNumeric.toString();

    this.dayContainer.appendChild(dayTitle);
  }

  public getElement() {
    this.dayContainer.classList.add("calendar__app__dayMonth__day");

    this.currentDate.setHours(0, 0, 0, 0);
    this.params.date.setHours(0, 0, 0, 0);

    if (this.params.date.getTime() === this.currentDate.getTime())
      this.dayContainer.classList.add("calendar__app__dayMonth__day--today");

    if (this.params.classList)
      this.dayContainer.classList.add(...this.params.classList);

    this.setContainerParam();
    this.setDayContent();

    return this.dayContainer;
  }
}
