import axios, { Method } from 'axios';
import { useState } from 'react';
import { UseAuth } from '@/contexts/AuthContext';

const BASE_URL: string =
  'https://api-pedido-erp-gateway-prod.saurus.net.br/api/v2';

interface Params {
  [key: string]: string;
}

interface Request {
  params?: Params | null;
  queryParams?: Params | null;
}

interface Response {
  data: any;
  error: any;
}

const buildQueryParams = (params: Params) => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

const UseAxios = (url: string, method: Method) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const { credentials } = UseAuth();

  const request = async ({
    params = null,
    queryParams = null,
  }: Request = {}): Promise<Response> => {
    setLoading(true);
    setError(null);

    let fullUrl = `${BASE_URL}${url}`;
    if (queryParams) {
      const queryString = buildQueryParams(queryParams);
      fullUrl += `?${queryString}`;
    }

    try {
      const result = await axios({
        method,
        url: fullUrl,
        data: params,
        headers: {
          ...credentials,
        },
      });
      setData(result.data);
      return { data: result.data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, request };
};

export default UseAxios;
