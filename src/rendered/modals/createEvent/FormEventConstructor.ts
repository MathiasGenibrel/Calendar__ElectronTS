import { argv } from "process";

// Import interface
import {
  IHtmlInput,
  IHtmlInputValue,
  IHtmlInputRequired,
} from "../../../interface/CreateEvent/IHtmlInput";

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

  constructor() {
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

    return formInputValue as IHtmlInputValue;
  }

  private setSubmitHandler(): void {
    console.log(this.formElement);
    this.formElement.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();

      requiredFields.forEach((id) => {
        if (
          !this.formInputElement[id as keyof IHtmlInputRequired]?.value.trim()
        )
          throw new Error(`${id} is required`);
      });

      console.log(this.getFormInputValue());
    });
  }
}
