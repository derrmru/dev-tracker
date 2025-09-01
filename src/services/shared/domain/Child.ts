export class Child {
  constructor(
    private dateOfBirth: Date,
    private name: string,
    private userId: number,
    private id?: number
  ) {}

  static create({
    dateOfBirth,
    name,
    id,
    userId,
  }: {
    dateOfBirth: Date;
    name: string;
    id?: number;
    userId: number;
  }): Child {
    return new Child(dateOfBirth, name, userId, id);
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

  getUserId(): number {
    return this.userId;
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
