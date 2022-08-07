import { Title } from "./Title";
import { DateGenerator } from "./GenerateDate";

/**
 * @class Calendar
 * @description Calendar component
 */
class Calendar extends DateGenerator {
  /**
   * Method to switch to the next month
   */
  public nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);

    this.render();
  }

  /**
   * Method to switch to initial month
   */
  public initialMonth(): void {
    this.currentDate = new Date(Date.now());

    this.render();
  }

  /**
   * Method to switch to the previous month
   */
  public previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);

    this.render();
  }

  render(): void {
    new Title(this.currentDate).render();

    // Generate all days to display
    this.generatePreviousMonth();
    this.generateActualMonth();
    this.generateNextMonth();

    // Reset the day container (day elements displayed)
    this.dayContainer.innerHTML = "";

    // Render the calendar
    this.dayContainer.appendChild(this.calendarFragment);
  }
}

export default new Calendar();
