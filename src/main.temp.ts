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
      width: Config.window.width,
      minWidth: Config.window.minWidth,
      height: Config.window.height,
      minHeight: Config.window.minHeight,
      parent: param?.parent,
      modal: param?.modal,
      show: param?.show,
      webPreferences: {
        preload: preload ? path.join(__dirname, preload) : undefined,
        nodeIntegration: true,
        contextIsolation: false,
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

// ipcMain.handle("createEvent", (event, arg) => {
//   console.log(arg);
//   console.log(event);
// });
