import * as bcrypt from 'bcryptjs';
export default class BCrypt {
  private encrypter = bcrypt;
  private salt: number | string | undefined;

  constructor(salt?: number | string) {
    this.salt = salt;
  }

  public hash(payload: string): string {
    const encoded = this.encrypter.hashSync(payload, this.salt);
    return encoded;
  }

  public compare(payload: string, hashed: string): boolean {
    return this.encrypter.compareSync(payload, hashed)
  }
}
