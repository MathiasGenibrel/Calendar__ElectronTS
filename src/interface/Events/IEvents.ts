import { RowDataPacket, OkPacket } from "mysql2";

export interface IEvents {
  id?: number;
  date_deb: Date;
  date_fin: Date;
  titre: string;
  description?: string;
  location?: string;
  categorie?: string;
  statut?: string;
  transparence?: string;
  nbMaj?: number;
}

export interface IEventsDB extends RowDataPacket, IEvents {}

export interface IEventsManager extends OkPacket {
  affectedRows: number;
  fieldCount: number;
  info: string;
  insertId: number;
  serverStatus: number;
  warningStatus: number;
}
