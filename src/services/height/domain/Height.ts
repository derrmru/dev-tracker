export type Unit = "cm" | "m" | "in" | "ft";

export class Height {
  private id: number;
  private childId: number;
  private addedAt: Date;
  private height: number;
  private unit: Unit;
  private lastUpdate?: Date;

  constructor(
    id: number,
    childId: number,
    dateMeasured: Date,
    height: number,
    unit: Unit,
    lastUpdate?: Date
  ) {
    this.id = id;
    this.childId = childId;
    this.addedAt = dateMeasured;
    this.height = height;
    this.unit = unit;
    this.lastUpdate = lastUpdate;
  }

  getId() {
    return this.id;
  }

  getChildId() {
    return this.childId;
  }

  getAddedat() {
    return this.addedAt;
  }

  getHeight() {
    return this.height;
  }

  getUnit() {
    return this.unit;
  }

  getLastUpdate() {
    return this.lastUpdate;
  }

  setDateMeasured(date: Date) {
    this.addedAt = date;
  }

  setHeight(height: number) {
    this.height = height;
  }
}
