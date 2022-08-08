import { ipcRenderer } from "electron";
import { IDayElementParams } from "../../interface/Elements/IDayElement";
import Config from "../../environments/config";
import { EventHandler } from "../Events/EventsHandler";

// Import interface
import { IEvents } from "../../interface/Events/IEvents";

export class DayElement {
  private readonly currentDate: Date = new Date(Date.now());
  private params: IDayElementParams;
  private dayContainer: HTMLElement = document.createElement("div");
  private eventHandler: EventHandler;

  constructor(params: IDayElementParams) {
    this.params = params;
    this.eventHandler = new EventHandler(params.date);
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

  private setEventListener() {
    // Open new window with the creation content of an event
    this.dayContainer.addEventListener("click", () => {
      // TODO: Add event listener to create new event
      ipcRenderer.invoke("createEvent", this.params.date);
    });
  }

  private setEventDisplay() {
    this.eventHandler.getEvent().then((events: IEvents[] | void) => {
      if (events && events.length > 0) {
        // create event container (contains all event for this.params.date)
        const eventDisplay = document.createElement("div");
        eventDisplay.classList.add("calendar__app__dayMonth__day__eventList");

        events.forEach((event: IEvents) => {
          const eventElement = document.createElement("div");
          eventElement.classList.add("event");
          eventElement.textContent = event.titre;
          eventElement.addEventListener("click", (e) => {
            e.stopPropagation();
            // TODO Display detailed view of the event

            ipcRenderer.invoke("viewEvent", event);
          });

          // Insert event in event container
          eventDisplay.appendChild(eventElement);
        });

        // display event container
        this.dayContainer.appendChild(eventDisplay);
      }
    });
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
    this.setEventListener();
    this.setEventDisplay();

    return this.dayContainer;
  }
}
