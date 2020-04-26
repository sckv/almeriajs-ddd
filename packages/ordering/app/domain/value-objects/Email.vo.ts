import validator from 'validator';

export class Email {
  private _unique: void;

  get value() {
    return this.email;
  }

  private constructor(private email: string) {}

  static create(email: string) {
    if (typeof email !== 'string') return false;
    if (!validator.isEmail(email)) return false;
    return new Email(email);
  }
}
