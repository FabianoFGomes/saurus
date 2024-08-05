import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UseAxios from '@/hooks/UseAxios';
export interface Credential {
  username: string;
  aplicacaoid: string;
}

interface ResponseData {
  credenciais: Credential[];
}

interface ApiResponse {
  data?: ResponseData | null;
  error?: any;
}

interface AuthContextData {
  isLoggedIn: boolean;
  loading: boolean;
  credentials: Credential | null;
  onLogin(
    username: string,
    password: string,
    aplicationId: string,
  ): Promise<ApiResponse>;
  onLogout(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  loading: false,
  credentials: null,
  onLogin: async () => ({ data: null, error: null }),
  onLogout: async () => {},
});

const STORAGE_KEY_CREDENTIALS = '@App::credentials';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState<Credential | null>(null);
  const { loading, request } = UseAxios('/auth', 'post');

  const loadStorageData = async () => {
    try {
      const credentialsString: string | null = await AsyncStorage.getItem(
        STORAGE_KEY_CREDENTIALS,
      );
      const credentialsJson: Credential | null = credentialsString
        ? JSON.parse(credentialsString)
        : null;

      if (credentialsJson) {
        setCredentials(credentialsJson);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setCredentials(null);
      setIsLoggedIn(false);
    }
  };

  const onLogin = useCallback(
    async (
      username: string,
      password: string,
      aplicationId: string,
    ): Promise<ApiResponse> => {
      try {
        const response: ApiResponse = await request({
          params: {
            usuario: username,
            senha: password,
            aplicacaoId: aplicationId,
          },
        });

        if (response.error) {
          return response;
        }

        await AsyncStorage.setItem(
          STORAGE_KEY_CREDENTIALS,
          JSON.stringify(response.data?.credenciais[0]),
        );

        loadStorageData();

        return response;
      } catch (err) {
        loadStorageData();
        return { data: null, error: err };
      }
    },
    [request],
  );

  const onLogout = useCallback(async () => {
    await AsyncStorage.removeItem(STORAGE_KEY_CREDENTIALS);
    setIsLoggedIn(false);
    setCredentials(null);
  }, []);

  useEffect(() => {
    loadStorageData();
  }, []);

  const authValues = useMemo(
    () => ({ isLoggedIn, loading, credentials, onLogin, onLogout }),
    [isLoggedIn, loading, credentials, onLogin, onLogout],
  );

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
}

export function UseAuth() {
  return useContext(AuthContext);
}
