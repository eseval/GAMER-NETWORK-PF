import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios";
import swal from 'sweetalert';
import { useState } from "react";

const cardElementOptions = {
  style: {
    base: {
      color: "#666",
      fontSize: "20px",
    },
    invalid: {
      color: "#fa755a",
      fontSize: "20px",
    }
  }
}

export default function PaymentStripe () {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
    setLoading(true);

    if(!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post('http://localhost:3001/api/checkout', {
          id, 
          amount: 100
        });
        if(data.hasOwnProperty('message')) {
          swal({
            title: "Error!",
            text: data.message,
            icon: "error",
            button: "Ok",
          });
        } else {
          swal({
            title: "Success!",
            text: 'Payment confirmed',
            icon: "success",
            button: "Ok",
          });
        }
        elements.getElement(CardElement).clear();
      } catch(error) {
        console.log(error)
      }
      setLoading(false);
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="container flex flex-col max-w-xl p-10 mt-10 align-middle border rounded-md bg-slate-200">
        <CardElement options={cardElementOptions} />
        <button disabled={!stripe} type="submit" className="p-1 mt-3 text-center border border-black rounded-md w-fit">
          {loading ? (
            <p>Loading...</p>
          ) : (
            'Pay'
          )}
        </button>
      </div>
    </form>
  )
}

