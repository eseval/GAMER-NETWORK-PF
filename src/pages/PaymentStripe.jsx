import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import NavBar from '../components/NavBar';

const cardElementOptions = {
	style: {
		base: {
			backgroundColor: 'transparent',
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
};

export default function PaymentStripe() {
	const navigate = useNavigate();
	const location = useLocation();
	const stripe = useStripe();
	const elements = useElements();
	const amount = location.state;
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

	useEffect(() => {
		if (!dataUser || dataUser === '') {
			navigate('/');
		}
	}, [dataUser, navigate]);

	const handleSubmit = async e => {
		e.preventDefault();

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});

		if (!error) {
			const { id } = paymentMethod;
			try {
				const { data } = await axios.post('https://pf-henry-gamesportal.herokuapp.com/api/checkout', {
					id,
					amount: amount * 100,
					dataUser,
				});

				if (data.code) {
					swal({
						title: 'Error!',
						text: `${data.code.toString().replace('_', ' ').toUpperCase()} - ${data.decline_code
							.toString()
							.replace('_', ' ')
							.toUpperCase()}`,
						icon: 'error',
						button: 'Ok',
					});
					toast.error('Try again!');
				} else {
					swal({
						title: 'Success!',
						text: 'Payment confirmed',
						icon: 'success',
						button: 'Ok',
					});
					const newDataUser = await axios.get(
						`https://pf-henry-gamesportal.herokuapp.com/users/${dataUser.id}`
					);
					window.localStorage.setItem('userLogged', JSON.stringify(newDataUser.data));
					toast.success('Thanks for joining play center');
				}
				elements.getElement(CardElement).clear();
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div>
			<NavBar />
			<div className="container">
				<h1 className="my-5 text-5xl font-semibold text-center text-white">Payment</h1>
				<div className="container max-w-2xl p-8 mt-10 bg-gray-800 border-2 border-gray-700 rounded-md">
					<div className="mb-5">
						<Link className="text-blue-400 text-md" to="/home">
							Return to Home
						</Link>
					</div>
					<form onSubmit={handleSubmit} className="flex flex-col">
						<CardElement options={cardElementOptions} />
						<button
							disabled={!stripe}
							type="submit"
							className="w-24 h-12 p-1 mx-auto mt-5 text-center text-white bg-green-700 rounded-md"
						>
							Pay
						</button>
					</form>
				</div>
			</div>
			<Toaster
				position="button-left"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					className: '',
					duration: 5000,
					style: {
						background: '#363636',
						color: '#fff',
					},
					success: {
						duration: 3000,
						theme: {
							primary: 'green',
							secondary: 'black',
						},
					},
				}}
			/>
		</div>
	);
}
