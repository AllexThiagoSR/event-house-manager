import * as bcrypt from 'bcryptjs';
export default class BCrypt {
  public static hash(payload: string): string {
    const encoded = bcrypt.hashSync(payload, 12);
    return encoded;
  }

  public static compare(payload: string, hashed: string): boolean {
    return bcrypt.compareSync(payload, hashed)
  }
}
