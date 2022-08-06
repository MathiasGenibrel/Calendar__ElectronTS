import RFC_LANGUAGE from "./RFC_Languages";

// Import interface
import { ISystem } from "../interface/IConfig";
import { ConnectionOptions } from "mysql2";

class System {
  public readonly language: string;

  constructor(production: boolean) {
    this.language = this.getLanguage(production);
  }

  private getLanguage(production: boolean): string {
    if (!production)
      return RFC_LANGUAGE[Math.floor(Math.random() * RFC_LANGUAGE.length)];

    return window.navigator.language ?? "en-US";
  }
}

class Config {
  public static readonly production: boolean =
    process.env.NODE_ENV === "production";
  public static readonly system: ISystem = new System(this.production);
  public static readonly db: ConnectionOptions = {
    host: process.env.DB_HOST ?? "localhost",
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "password",
    database: process.env.DB_NAME ?? "calendar--app",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  };
}

export default Config;
