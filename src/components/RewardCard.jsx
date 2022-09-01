import React from 'react';
import { claimRewards } from '../redux/actions';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

export default function RewardCard({ title, image, price, recompenseType }) {
	const dispatch = useDispatch();
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

	const handleSubmit = e => {
		e.preventDefault();
		swal({
			title: 'Confirm claim!',
			text: 'Are you sure to claim this reward?',
			buttons: ['Cancel', 'Confirm'],
			icon: 'warning',
		}).then(res => {
			if (res) {
				const newTotal = dataUser.coins - price;
				dataUser.coins = newTotal;
				if (newTotal >= 0) {
					dispatch(claimRewards(dataUser, dataUser.id, price));
					swal({
						text: 'The claim has been completed!',
						icon: 'success',
					});
				} else {
					swal({
						text: "You don't have enough coins!",
						icon: 'error',
					});
				}
			}
		});
	};
	return (
		<div className="p-4 ">
			<div className="max-w-sm mx-5 mb-10 overflow-hidden rounded shadow-lg bg-slate-200">
				<a>
					<img className="p-8 rounded-t-lg h-80 w-80" src={image} alt="product image" />
				</a>
				<div className="px-5 pb-5">
					<a>
						<h3 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-black">{title}</h3>
					</a>
					<a>
						<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
							{recompenseType}
						</h5>
					</a>
					<div className="flex items-center justify-between">
						<span className="text-2xl font-bold text-gray-900 dark:text-black">💎 {price} Coins</span>
						<button
							className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
							onClick={e => handleSubmit(e)}
						>
							<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
								Claim
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
