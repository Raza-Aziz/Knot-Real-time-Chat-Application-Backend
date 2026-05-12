import { Response } from 'express';

export function setCookies(
  res: Response,
  access_token: string,
  refresh_token: string,
) {
  res.cookie('access-token', access_token, {
    httpOnly: true,
    secure: true, // Set to true since you're using Supabase/Cloud
    sameSite: 'lax',
    maxAge: 3600000, // 1 hour
  });

  res.cookie('refresh-token', refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 604800000, // 7 days
  });
}
