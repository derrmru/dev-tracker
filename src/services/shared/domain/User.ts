export class User {
  constructor(
    private email: string,
    private name: string,
    private id?: number
  ) {}

  static create({
    email,
    name,
    id,
  }: {
    email: string;
    name: string;
    id?: number;
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
