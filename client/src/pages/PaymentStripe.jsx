import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios";
import swal from 'sweetalert';
import { useState } from "react";
import { Link } from "react-router-dom";

const cardElementOptions = {
  style: {
    base: {
      backgroundColor: 'transparent',
      lineHeight: '2',
      iconColor: 'grey',
      color: 'black',
      fontWeight: '400',
      fontSize: '18px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: 'black',
      },
      '::placeholder': {
        color: 'grey',
      },
    },
    invalid: {
      iconColor: 'red',
      color: 'red',
    },
  },
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
            buttons: [
              "Ok",
              <Link strict to='/home'>Return to home</Link>
            ]
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
    <div>
      <h1 className="my-5 text-5xl font-semibold text-center text-white">Payment</h1>
      <div className="container max-w-2xl p-8 mt-10 border rounded-md bg-slate-200">
        <div className="mx-5 mt-3">
          <Link className="text-lg text-indigo-800" to='/home'>Return to Home</Link>  
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <CardElement options={cardElementOptions} />
          <button disabled={!stripe} type="submit" className="w-24 h-12 p-1 mx-auto mt-5 text-center text-white bg-green-700 rounded-md">
            {loading ? (
              <p>Loading...</p>
            ) : (
              'Pay'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}