import mysql, { Connection, Query, QueryError } from "mysql2";
import Config from "../environments/config";
import {
  IEvents,
  IEventsDB,
  IEventsManager,
} from "../interface/Events/IEvents";

const CONNECTION: Connection = mysql.createConnection({
  host: Config.db.host,
  user: Config.db.user,
  password: Config.db.password,
  database: Config.db.database,
  waitForConnections: true,
});

export class DataBase {
  public static async createEvent(
    event: IEvents
  ): Promise<IEventsManager | QueryError> {
    return await new Promise<IEventsManager>((resolve, reject) => {
      CONNECTION.query(
        "INSERT INTO event (date_deb, date_fin, titre, description, location, categorie, statut, transparence, nbMaj) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          event.date_deb,
          event.date_fin,
          event.titre,
          event.description,
          event.location,
          event.categorie,
          event.statut,
          event.transparence,
          event.nbMaj,
        ],
        (err: QueryError | null, results: IEventsManager) => {
          if (err) reject(err);
          return resolve(results);
        }
      );
    });
  }

  public static getEvent(startDate: Date): Promise<IEvents[] | QueryError> {
    const dateFirstMoment = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      0,
      0,
      0,
      0
    );
    const dateLastMoment = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
      23,
      59,
      59,
      59
    );

    return new Promise((resolve, reject) => {
      CONNECTION.query(
        "SELECT * FROM event WHERE date_deb BETWEEN ? AND ?",
        [dateFirstMoment, dateLastMoment],
        (err: QueryError | null, results: IEventsDB[]) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }

  public static updateEvent(
    event: IEvents
  ): Promise<IEventsManager | QueryError> {
    return new Promise((resolve, reject) => {
      CONNECTION.query(
        "UPDATE event SET date_deb = ?, date_fin = ?, titre = ?, description = ?, location = ?, categorie = ?, statut = ?, transparence = ?, nbMaj = ? WHERE id = ?",
        [
          event.date_deb,
          event.date_fin,
          event.titre,
          event.description,
          event.location,
          event.categorie,
          event.statut,
          event.transparence,
          event.nbMaj,
          event.id,
        ],
        (err: QueryError | null, results: IEventsManager) => {
          if (err) return reject(err);
          if (results.affectedRows === 0)
            return reject(new Error("Event not found"));
          console.info(results);
          return resolve(results);
        }
      );
    });
  }

  public static deleteEvent(id: number): Promise<IEventsManager | QueryError> {
    return new Promise((resolve, reject) => {
      CONNECTION.query(
        "DELETE FROM event WHERE id = ?",
        [id],
        (err: QueryError | null, results: IEventsManager) => {
          if (err) return reject(err);
          if (results.affectedRows === 0)
            return reject(new Error("Event not found"));

          resolve(results);
        }
      );
    });
  }
}
