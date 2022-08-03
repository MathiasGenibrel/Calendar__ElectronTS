import { Title } from "./Title";

class Calendar {
  private readonly currentDate: Date = new Date(Date.now());
  private readonly currentMonth: number = this.currentDate.getMonth();
  private readonly currentYear: number = this.currentDate.getFullYear();

  private totalDaysCurrentMonth(): number {
    return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  }

  render(): void {
    new Title(this.currentDate).render();
  }
}

export default new Calendar();
