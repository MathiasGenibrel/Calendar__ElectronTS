import RFC_LANGUAGE from "./RFC_Languages";

// Import interface
import { ISystem } from "../interface/IConfig";

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
}

export default Config;
