import { BrowserWindow } from "electron";

export interface IWindowParam {
  parent?: BrowserWindow | undefined;
  modal?: boolean;
  show?: boolean;
  minWidth?: number;
  width?: number;
  maxWidth?: number;
  minHeight?: number;
  height?: number;
  maxHeight?: number;
  additionalArguments?: string[];
}
