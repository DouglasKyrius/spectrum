export const ACTION_TYPES = {
  INITIALIZE: 'INITIALIZE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

export type UserType = any;

export type InitialStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: UserType | null;
};

export type AccessTokenType = {
  accessToken: string;
};

export interface AuthContextInterface extends InitialStateType {
  login: ({ accessToken }: AccessTokenType) => Promise<void>;
  logout: () => Promise<void>;
}
