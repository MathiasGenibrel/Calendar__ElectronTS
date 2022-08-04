import { IDayElementParams } from "../../interface/Elements/IDayElement";
import Config from "../../environments/local.config";

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
    this.params.classList?.push("calendar__app__dayMonth__day");

    if (this.params.date === this.currentDate)
      this.params.classList?.push("calendar__app__dayMonth__day--today");

    this.setContainerParam();
    this.setDayContent();

    return this.dayContainer;
  }
}
