import { ipcRenderer } from "electron";

// Import Class
import { FormEvent } from "./FormEvent";

new FormEvent();

document.querySelector("#closeModal")?.addEventListener("click", () => {
  ipcRenderer.invoke("closeModal");
});
