import * as jwt from 'jsonwebtoken';

export default class Token {
  private secret = process.env.JWT_SECRET || 'secret';
  public generateToken(payload: jwt.JwtPayload, expiresIn: string = '7d'): string {
    const token = jwt.sign(payload, this.secret, { expiresIn })
    return token;
  }

  public decode(token: string) {
    const payload = jwt.verify(token, this.secret);
    return payload;
  }
}
