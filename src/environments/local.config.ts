import RFC_LANGUAGE from "./RFC_Languages";

// Import interface
import { ISystem } from "../interface/IConfig";

class System {
  private readonly production: boolean;
  public readonly language: string;

  constructor(production: boolean) {
    this.language = this.getLanguage();
    this.production = production;
  }

  private getLanguage(): string {
    if (!this.production)
      return RFC_LANGUAGE[Math.floor(Math.random() * RFC_LANGUAGE.length)];

    return window.navigator.language ?? "en-US";
  }
}

class Config {
  public readonly production: boolean = process.env.NODE_ENV === "production";
  public readonly system: ISystem = new System(this.production);
}

export default new Config();
