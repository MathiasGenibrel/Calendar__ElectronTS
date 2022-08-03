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
