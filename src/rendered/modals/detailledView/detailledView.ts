import { ipcRenderer } from "electron";
import { argv } from "process";

// Import interface
import { IHtmlInputValueFromParent } from "../../../interface/CreateEvent/IHtmlInput";
import { FormEvent } from "../createEvent/FormEvent";

const eventData: IHtmlInputValueFromParent = JSON.parse(
  argv
    .find((element) => element.includes("--eventData="))
    ?.split("=")[1] as string
);
console.log(eventData);
new FormEvent(eventData);

document.querySelector("#closeModal")?.addEventListener("click", () => {
  ipcRenderer.invoke("closeModal");
});

document.querySelector("#deleteEvent")?.addEventListener("click", () => {
  FormEvent.deleteEvent(eventData.id);
  ipcRenderer.invoke("closeModal");
});
