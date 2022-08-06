import { BrowserWindow } from "electron";

export interface IWindowParam {
  parent?: BrowserWindow | undefined;
  modal?: boolean;
  show?: boolean;
}
