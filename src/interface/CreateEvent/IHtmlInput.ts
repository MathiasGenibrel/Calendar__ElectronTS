export interface IHtmlInput {
  date_deb?: HTMLInputElement;
  heure_deb?: HTMLInputElement;
  heure_fin?: HTMLInputElement;
  date_fin?: HTMLInputElement;
  titre?: HTMLInputElement;
  description?: HTMLInputElement;
  location?: HTMLInputElement;
  categorie?: HTMLInputElement;
  transparency?: HTMLInputElement;
  statut?: HTMLInputElement;
}

export interface IHtmlInputValue {
  date_deb: Date;
  date_fin: Date;
  titre: string;
  description?: string;
  location?: string;
  categorie?: string;
  transparency?: string;
  statut?: string;
}

export interface IHtmlInputValueFromParent {
  id: number;
  date_deb: string;
  date_fin: string;
  titre: string;
  description?: string;
  location?: string;
  categorie?: string;
  transparency?: string;
  statut?: string;
}

export interface IHtmlInputRequired {
  date_deb: HTMLInputElement;
  heure_deb: HTMLInputElement;
  heure_fin: HTMLInputElement;
  date_fin: HTMLInputElement;
  titre: HTMLInputElement;
}
