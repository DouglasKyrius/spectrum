'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { useSearchParams } from 'next/navigation';

import { reducer } from './JWTContext.reducer';
import {
  AccessTokenType,
  ACTION_TYPES,
  AuthContextInterface,
} from './JWTContext.types';
import { decodedToken, setSession } from '@/utils/jwt';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthContext = createContext({} as AuthContextInterface);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken =
          localStorage.getItem('accessToken') || searchParams.get('token');

        if (accessToken) {
          const user = await decodedToken(accessToken);

          dispatch({
            type: ACTION_TYPES.INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: ACTION_TYPES.INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        setSession(null);
        dispatch({
          type: ACTION_TYPES.INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, [searchParams]);

  const login = useCallback(async ({ accessToken }: AccessTokenType) => {
    const user = await decodedToken(accessToken);

    dispatch({
      type: ACTION_TYPES.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  const logout = useCallback(async () => {
    setSession(null);
    dispatch({ type: ACTION_TYPES.LOGOUT });
  }, []);

  const values = useMemo(
    () => ({
      ...state,
      login,
      logout,
    }),
    [state, login, logout]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
