import type { ID, ISODateTimeString, Role } from "./common";

export type UserStatus = "ACTIVE" | "SUSPENDED" | "DELETED";

export type PublicUser = {
  userId: ID;
  displayName: string;
  avatarUrl?: string;
  roles: Role[];
};

export type User = PublicUser & {
  email: string;
  status: UserStatus;
  createdAt: ISODateTimeString;
};

export type AuthRegisterRequest = {
  email: string;
  password: string;
  display_name?: string;
};

export type AuthRegisterResponse = {
  user_id: ID;
  email: string;
  created_at: ISODateTimeString;
};

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};
