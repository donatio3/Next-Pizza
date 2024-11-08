import { PaymentData } from "@/@types/yookassa";
import axios from "axios";

interface Props {
    description: string;
    orderId: number;
    amount: number;
}

export async function createPayment(details: Props) {
    const shopId = process.env.YOOKASSA_STORE_ID;
    const apiKey = process.env.YOOKASSA_API_KEY;
  
    const authString = `${shopId}:${apiKey}`;
    const base64EncodedAuthString = Buffer.from(authString).toString('base64');
  
    const headers = {
      'Authorization': `Basic ${base64EncodedAuthString}`,
      'Content-Type': 'application/json',
      'Idempotence-Key': Math.random().toString().substring(7)
    };

  const { data } = await axios.post<PaymentData>(
        'https://api.yookassa.ru/v3/payments', 
        {
            amount: {
                value: details.amount,
                currency: "RUB"
            },
            capture: true,
            description: details.description,
            metadata: { // инфа которая вернется после оплаты, 
// мы используем orderId в момент оплаты => if оплата заказа true => меняем STATUS на SUCCEED
                order_id: details.orderId
            },
            confirmation: {
                type: "redirect",
                return_url: process.env.YOOKASSA_CALLBACK_URL as string
            }

        },
        {
            headers
        }   
  );

    return data;

}

