import React, {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useCallback,
} from 'react';

import UseAxios from '@/hooks/UseAxios';

export enum PaymentTypes {
  credit = 'credit',
  debit = 'debit',
  pix = 'pix',
}

export type PaymentType = keyof typeof PaymentTypes | null;

interface ApiResponse {
  data?: any;
  error?: any;
}

interface PaymentContextData {
  loading: boolean;
  onSelectPayment(payment: PaymentType): void;
  onPay(): Promise<ApiResponse>;
  selectedPayment: PaymentType;
}

const PaymentContext = createContext<PaymentContextData>({
  loading: false,
  onSelectPayment: () => {},
  onPay: async () => ({ data: null, error: null }),
  selectedPayment: null,
});

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [selectedPayment, setSelectedPayment] =
    React.useState<PaymentType>(null);
  const { loading, request } = UseAxios('/financeiro/retorno', 'post');

  const onPay = useCallback(async () => {
    try {
      const response = await request({});

      return response;
    } catch (err) {
      return { data: null, error: err };
    }
  }, [request]);

  const onSelectPayment = useCallback((payment: PaymentType) => {
    setSelectedPayment(payment);
  }, []);

  const paymentValues = useMemo(
    () => ({ loading, onSelectPayment, selectedPayment, onPay }),
    [loading, onSelectPayment, selectedPayment, onPay],
  );

  return (
    <PaymentContext.Provider value={paymentValues}>
      {children}
    </PaymentContext.Provider>
  );
}

export function UsePayment() {
  return useContext(PaymentContext);
}
