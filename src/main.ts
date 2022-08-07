import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import Config from "./environments/config";

// Import interface
import { IWindowParam } from "./interface/IWindowParam";

class App {
  public static createWindow(
    windowView: string,
    preload?: string,
    param?: IWindowParam
  ): BrowserWindow {
    const window = new BrowserWindow({
      minWidth: param?.minWidth ?? Config.window.minWidth,
      width: param?.width ?? Config.window.width,
      maxWidth: param?.maxWidth ?? undefined,
      minHeight: param?.minHeight ?? Config.window.minHeight,
      height: param?.height ?? Config.window.height,
      maxHeight: param?.maxHeight ?? undefined,
      parent: param?.parent,
      modal: param?.modal,
      show: param?.show ?? true,
      webPreferences: {
        preload: preload ? path.join(__dirname, preload) : undefined,
        nodeIntegration: true,
        contextIsolation: false,
        additionalArguments: param?.additionalArguments
          ? [...param?.additionalArguments]
          : undefined,
      },
    });

    if (windowView.includes("http")) window.loadURL(windowView);
    window.loadFile(`./public/${windowView}`);

    return window;
  }
}

app.whenReady().then(() => {
  App.createWindow("index.html", "preload.js");

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      App.createWindow("index.html", "preload.js");
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("createEvent", (event, arg: Date) => {
  App.createWindow("createEvent.html", undefined, {
    modal: true,
    parent: BrowserWindow.getFocusedWindow() ?? undefined,
    width: 400,
    height: 600,
    additionalArguments: [`--currentDateEvent=${arg.toISOString()}`],
  });
});

ipcMain.handle("closeModal", (event, arg) => {
  BrowserWindow.getFocusedWindow()?.close();
  // event.sender.send("createEvent", { whereAmI: "CEST ICI" });
});
