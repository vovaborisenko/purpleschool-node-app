import { compare, hash } from 'bcryptjs';

export class User {
  private _password: string;
  constructor(
    private _email: string,
    private _name: string | null,
    hashedPassword?: string,
  ) {
    if (hashedPassword) {
      this._password = hashedPassword;
    }
  }

  get name(): string | null {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  async setPassword(password: string, salt: number): Promise<void> {
    this._password = await hash(password, salt);
  }

  async comparePassword(hashedPassword: string): Promise<boolean> {
    return this._password ? compare(hashedPassword, this._password) : false;
  }
}
