import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios";
import swal from 'sweetalert';
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const cardElementOptions = {
  style: {
    base: {
      backgroundColor: 'transparent',
      lineHeight: '2',
      iconColor: 'grey',
      color: 'white',
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
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const amount = location.state;

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
          amount: amount*100
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
    <div>
      <h1 className="my-5 text-5xl font-semibold text-center text-white">Payment</h1>
      <div className="container max-w-2xl p-8 mt-10 bg-gray-800 border-2 border-gray-700 rounded-md">
        <div className="mb-5">
          <Link className="text-blue-400 text-md" to='/home'>Return to Home</Link>  
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