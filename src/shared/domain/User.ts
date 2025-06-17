export class User {
  constructor(
    private email: string,
    private name: string,
    private id?: number
  ) {}

  static create({
    id,
    email,
    name,
  }: {
    id?: number;
    email: string;
    name: string;
  }): User {
    return new User(email, name, id);
  }

  getId(): number | undefined {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }
}
