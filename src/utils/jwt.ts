import * as jose from 'jose';
import { UserType } from '@/contexts/JWTContext';

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  } else {
    localStorage.removeItem('accessToken');
  }
};

export const decodedToken = async (accessToken: string) => {
  if (!accessToken) {
    return null;
  }
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
  const { payload } = await jose.jwtVerify(accessToken, secret);
  setSession(accessToken);
  return payload;
};
