import { Word } from "./Word";

export class Child {
  constructor(
    private dateOfBirth: Date,
    private name: string,
    private id?: number
  ) {}

  static create({
    dateOfBirth,
    name,
    id,
  }: {
    dateOfBirth: Date;
    name: string;
    id?: number;
  }): Child {
    return new Child(dateOfBirth, name, id);
  }

  getId(): number | undefined {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDateOfBirth(): Date {
    return this.dateOfBirth;
  }

  setName(newName: string): Child {
    this.name = newName;
    return this;
  }

  setDateOfBirth(newDateOfBirth: Date): Child {
    this.dateOfBirth = newDateOfBirth;
    return this;
  }
}
