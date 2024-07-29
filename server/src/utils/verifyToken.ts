import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

export function verifyToken(
  token: string,
  secret: string
): Promise<string | JwtPayload | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}
