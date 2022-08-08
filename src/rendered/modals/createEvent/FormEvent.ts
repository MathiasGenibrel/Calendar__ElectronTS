import { getDay } from "../../../functions/getDateISO";
import { IHtmlInputValueFromParent } from "../../../interface/CreateEvent/IHtmlInput";
import { EventHandler } from "../../Events/EventsHandler";

// Import Class
import { FormEventConstructor } from "./FormEventConstructor";

export class FormEvent extends FormEventConstructor {
  private readonly currentDate: Date;

  constructor(formValue?: IHtmlInputValueFromParent) {
    super(formValue);

    this.currentDate = new Date(this.getStringDateParent());
    this.setInitialValues();
  }

  private setInitialValues(): void {
    // Init default values of date_deb
    if (this.formInputElement.date_fin && this.formInputElement.date_deb) {
      // Add current date like default value of date_deb (input)
      this.formInputElement.date_deb.value = getDay(this.currentDate);

      // Add event listener to date_deb (input), for change the min value of date_fin (input)
      this.formInputElement.date_deb.addEventListener(
        "change",
        (event: Event) => {
          const target = event.target as HTMLInputElement;

          console.log(target.value);

          if (this.formInputElement.date_fin)
            this.formInputElement.date_fin.min = target.value;
        }
      );

      // Protect minimum value of date_fin
      this.formInputElement.date_fin.min = getDay(this.currentDate);

      return;
    }
    throw new Error("date_deb || date_fin is not defined");
  }

  public static deleteEvent(id: number): void {
    new EventHandler().deleteEvent(id);
  }
}
