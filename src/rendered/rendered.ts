import { EventHandler } from "./Events/EventsHandler";
import Calendar from "./Calendar";

Calendar.render();

const nextMonthButton = document.querySelector("#nextMonth") as HTMLElement;
const initialMonthButton = document.querySelector(
  "#initialMonth"
) as HTMLElement;
const previousMonthButton = document.querySelector(
  "#previousMonth"
) as HTMLElement;

nextMonthButton.addEventListener("click", () => Calendar.nextMonth());
previousMonthButton.addEventListener("click", () => Calendar.previousMonth());
initialMonthButton.addEventListener("click", () => Calendar.initialMonth());

// new EventHandler().createEvent({
//   date_deb: new Date(2022, 7, 9, 8),
//   date_fin: new Date(2022, 7, 9, 19),
//   titre: "Anniversaire Maman",
//   description: "Anniversaire de Maman",
//   location: "Paris",
//   nbMaj: 0,
// });

// new EventHandler().deleteEvent(125);

// new EventHandler().updateEvent({
//   id: 124,
//   date_deb: new Date(2022, 7, 9, 8),
//   date_fin: new Date(2022, 7, 9, 19),
//   titre: "UPDATED",
//   description: "UPDATED",
//   location: "PERPIGNAN",
//   nbMaj: 1,
// });
