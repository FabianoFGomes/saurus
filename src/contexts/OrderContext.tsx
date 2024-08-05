import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useCallback,
} from 'react';

import UseAxios from '@/hooks/UseAxios';

export interface ResponseData {
  list: List[];
  totalResults: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
}
export interface List {
  numeroFatura: string;
  historico: string;
  valorFatura: number;
  pagamentoParcial: boolean;
  pessoa: Person;
  pagamento?: Payment[];
  origem: Origem[];
}
interface Origem {
  origem: string;
  numero: string;
  infAdic: string;
}
interface Payment {
  nome: string;
  tipoPagamento: number;
  numeroParcelas: number;
}
interface Person {
  cpfCnpj: string;
  codigo: string;
  nome: string;
}

interface ApiResponse {
  data?: ResponseData | null;
  error?: any;
}

interface OrderQueryParams {
  Cnpj?: string;
  CpfCnpj?: string;
  CodCliente?: string;
  NumFatura?: string;
  NumDocumento?: string;
  DueForUser?: string;
  Page?: string;
  PageSize?: string;
}

interface OrderContextData {
  loading: boolean;
  orders: any;
  onGetOrders(): Promise<ApiResponse>;
  onSelectOrder(order: List): void;
  orderSelected: List | null;
}

const OrderContext = createContext<OrderContextData>({
  loading: false,
  orders: null,
  onGetOrders: async () => ({ data: null, error: null }),
  onSelectOrder: async () => {},
  orderSelected: null,
});

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<List[] | null>(null);
  const [orderSelected, setOrderSelected] = useState<List | null>(null);
  const { loading, request } = UseAxios('/financeiro/faturas', 'get');

  const onGetOrders = useCallback(
    async (orderParams?: OrderQueryParams): Promise<ApiResponse> => {
      try {
        const response: ApiResponse = await request({
          queryParams: {
            ...orderParams,
          },
        });

        if (response.error) {
          return response;
        }

        setOrders(response?.data?.list!);

        return response;
      } catch (err) {
        return { data: null, error: err };
      }
    },
    [request],
  );

  const onSelectOrder = useCallback((order: List) => {
    setOrderSelected(order);
  }, []);

  const orderValues = useMemo(
    () => ({
      onGetOrders,
      loading,
      orders,
      onSelectOrder,
      orderSelected,
    }),
    [onGetOrders, loading, orders, onSelectOrder, orderSelected],
  );

  return (
    <OrderContext.Provider value={orderValues}>
      {children}
    </OrderContext.Provider>
  );
}

export function UseOrder() {
  return useContext(OrderContext);
}
