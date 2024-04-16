import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../../auth/auth.module';

export class TokenUtil {
  public static parseBearerToken(request: Request) {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Missing or invalid Authorization header');
    }
    const token = authHeader.slice(7);

    try {
      const decoded = jwt.verify(token, jwtSecret) as {
        userId: number;
        role: string;
      };
      return { userId: decoded.userId, role: decoded.role };
    } catch (err) {
      console.error('Failed to parse token', err);
      return null;
    }
  }
}
