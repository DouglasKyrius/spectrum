import { ACTION_TYPES, InitialStateType } from './JWTContext.types';

export const reducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.INITIALIZE:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload?.user,
      };
    case ACTION_TYPES.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
