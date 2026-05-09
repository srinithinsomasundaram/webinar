export {};

declare global {
  interface Window {
    Razorpay?: new (options: {
      key: string;
      amount: number;
      currency: string;
      name: string;
      description: string;
      order_id: string;
      theme?: {
        color?: string;
      };
      prefill?: {
        name?: string;
        email?: string;
        contact?: string;
      };
      modal?: {
        ondismiss?: () => void;
      };
      handler: (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => void | Promise<void>;
    }) => {
      open: () => void;
    };
  }
}
