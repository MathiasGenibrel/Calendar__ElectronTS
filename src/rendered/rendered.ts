import Calendar from "./Calendar";

Calendar.render();

const nextMonthButton = document.querySelector("#nextMonth") as HTMLElement;
const previousMonthButton = document.querySelector(
  "#previousMonth"
) as HTMLElement;

nextMonthButton.addEventListener("click", () => Calendar.nextMonth());
previousMonthButton.addEventListener("click", () => Calendar.previousMonth());
