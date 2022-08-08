import { argv } from "process";
import { ipcRenderer } from "electron";

// Import interface
import {
  IHtmlInput,
  IHtmlInputValue,
  IHtmlInputRequired,
  IHtmlInputValueFromParent,
} from "../../../interface/CreateEvent/IHtmlInput";
import { EventHandler } from "../../Events/EventsHandler";
import { getDay } from "../../../functions/getDateISO";

const inputsID = [
  "date_deb",
  "heure_deb",
  "heure_fin",
  "date_fin",
  "titre",
  "description",
  "location",
  "categorie",
  "transparency",
  "statut",
];

const requiredFields = [
  "date_deb",
  "heure_deb",
  "heure_fin",
  "date_fin",
  "titre",
];

export class FormEventConstructor {
  protected readonly formInputElement: IHtmlInput;
  private readonly formElement: HTMLFormElement;
  private readonly idEvent?: number;

  constructor(formValue?: IHtmlInputValueFromParent) {
    if (formValue) {
      this.setDefaultValue(formValue);
      this.idEvent = formValue.id;
    }
    this.formInputElement = this.getAllHtmlInputs();
    this.formElement = document.querySelector("#formEvent") as HTMLFormElement;
    this.setSubmitHandler();
  }

  protected getStringDateParent(): string {
    return argv
      .find((arg) => arg.includes("--currentDateEvent"))
      ?.split("=")[1] as string;
  }

  private getElementHTML(id: string): HTMLInputElement {
    return document.querySelector(`#${id}`) as HTMLInputElement;
  }

  private getAllHtmlInputs(): IHtmlInput {
    const inputs: IHtmlInput = {};

    inputsID.forEach((id) => {
      inputs[id as keyof IHtmlInput] = this.getElementHTML(id);
    });

    return inputs;
  }

  private getFormInputValue(): IHtmlInputValue {
    const formInputValue: any = {};

    for (const element in this.formInputElement) {
      const inputElement = this.formInputElement[element as keyof IHtmlInput];
      if (inputElement) {
        formInputValue[element as keyof IHtmlInput] = inputElement.value.length
          ? inputElement.value
          : null;
      }
    }

    formInputValue.date_deb = new Date(
      formInputValue.date_deb + " " + formInputValue.heure_deb
    );

    formInputValue.date_fin = new Date(
      formInputValue.date_fin + " " + formInputValue.heure_fin
    );

    // Remove unnecessary properties
    delete formInputValue.heure_deb;
    delete formInputValue.heure_fin;

    return formInputValue;
  }

  private setSubmitHandler(): void {
    console.log(this.formElement);
    this.formElement.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;

      requiredFields.forEach((id) => {
        if (
          !this.formInputElement[id as keyof IHtmlInputRequired]?.value.trim()
        )
          throw new Error(`${id} is required`);
      });

      if (target.name === "createEvent")
        new EventHandler().createEvent(this.getFormInputValue());

      if (target.name === "updateEvent")
        new EventHandler().updateEvent(
          this.idEvent as number,
          this.getFormInputValue()
        );

      ipcRenderer.invoke("closeModal");
    });
  }

  private setDefaultValue(formValue: IHtmlInputValueFromParent): void {
    const startHour = formValue?.date_deb.split("T")[1].slice(0, 5);
    const endHour = formValue?.date_fin.split("T")[1].slice(0, 5);

    const inputListOfElement = this.getAllHtmlInputs();

    for (const element in inputListOfElement) {
      const inputElement = inputListOfElement[element as keyof IHtmlInput];
      const defaultValue = formValue?.[element as keyof IHtmlInputValue];

      if (inputElement) {
        if (element === "heure_deb" && startHour) {
          inputElement.value = startHour;
        } else if (element === "heure_fin" && endHour) {
          inputElement.value = endHour;
        } else if (element === "date_deb" || element === "date_fin") {
          inputElement.value = getDay(new Date(defaultValue as string));
        } else {
          inputElement.value = defaultValue as string;
        }
      }
    }
  }
}
