import { DataBase } from "../../DataBase/Events";
import { IEvents } from "../../interface/Events/IEvents";

export class EventHandler {
  private readonly startDate: Date;

  constructor(currentDate: Date = new Date(Date.now())) {
    this.startDate = currentDate;
  }

  public async getEvent(): Promise<IEvents[] | void> {
    try {
      const events = (await DataBase.getEvent(this.startDate)) as IEvents[];

      return events;
    } catch (error) {
      console.error("ERROR --DEBUG : ", error);
    }
  }

  public async createEvent(eventParameters: IEvents): Promise<void> {
    try {
      // TODO display loading snakbar
      const response = await DataBase.createEvent(eventParameters);

      // TODO add event to calendar
      console.info(eventParameters.date_deb);

      console.info(response);
      // new SnackBar({
      //   message: "Event created",
      //   type: "success",
      // });
    } catch (err) {
      console.error(err);
    }
  }

  public async updateEvent(
    id: number,
    eventParameters: IEvents
  ): Promise<void> {
    try {
      if (!id) {
        throw new Error("id is required");
        // TODO
        // new SnackBar({
        //   message: "id is required",
        //   type: "error",
        // })
      }
      eventParameters.id = id;
      await DataBase.updateEvent(eventParameters);
      console.info("update event");
    } catch (error) {
      console.error("ERROR --DEBUG : ", error);
    }
  }

  public async deleteEvent(id: number): Promise<void> {
    try {
      // TODO ass snackbar loading && success event
      await DataBase.deleteEvent(id);
      console.info("delete event");
    } catch (error) {
      console.error("ERROR --DEBUG : ", error);
    }
  }
}
