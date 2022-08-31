import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Widget } from '@uploadcare/react-widget';
import toast, { Toaster } from 'react-hot-toast';

export default function ModifyUserForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const user = location.state;
	const [img, setImg] = useState(user.img);
	const dataUser = !window.localStorage.userLogged ? '' : JSON.parse(window.localStorage.userLogged);

	useEffect(() => {
		if (!dataUser || dataUser === '') {
			navigate('/');
		}
	}, [dataUser, navigate]);

	return (
		<div>
			<NavBar />
			<h3 className="m-5 text-5xl font-semibold text-center text-white">Edit Information</h3>
			<div className="container max-w-md mt-10 overflow-hidden bg-white shadow sm:rounded-lg">
				<Formik
					initialValues={{
						nickname: '',
						description: user.description,
						servers: user.servers,
					}}
					validationSchema={Yup.object({
						nickname: Yup.string()
							.max(15, 'Must be 3-15 characters')
							.min(3, 'Must be 3-15 characters')
							.test('Unique nickname', 'Nickname already in use', function (value) {
								return new Promise((res, rej) => {
									axios
										.get(`https://pf-henry-gamesportal.herokuapp.com/users?findNickname=nickname`)
										.then(response => {
											if (response.data.includes(value)) {
												res(false);
											} else {
												res(true);
											}
										})
										.catch(error => {
											console.log(error);
										});
								});
							}),
						description: Yup.string().max(256, 'Max 256 characters'),
					})}
					validateOnBlur={true}
					onSubmit={async values => {
						await axios.put(`https://pf-henry-gamesportal.herokuapp.com/users/${user.id}`, {
							img,
							nickname: values.nickname !== '' ? values.nickname : user.nickname,
							description: values.description,
							servers: values.servers,
						});
						const newDataUser = await axios.get(
							`https://pf-henry-gamesportal.herokuapp.com/users/${user.id}`
						);
						window.localStorage.setItem('userLogged', JSON.stringify(newDataUser.data));
						toast.success(`${newDataUser.data.nickname}, your edit was succesfuly!`);
						setTimeout(() => navigate(`/profile/${user.id}`), 3000);
					}}
				>
					<Form>
						<div className="flex items-center justify-start m-5">
							<label for="img" className="block text-lg font-medium text-gray-700">
								Avatar
							</label>
							<div className="mx-3 bg-indigo-600 rounded-md">
								<Widget
									publicKey="50d55201e2f94662863b"
									id="file"
									imagesOnly={true}
									tabs="file camera url"
									onChange={info => setImg(info.cdnUrl)}
									crop="free, 16:9, 4:3, 5:4, 1:1"
								/>
							</div>
						</div>
						<div className="flex items-center justify-center m-5">
							<label for="nickname" className="block text-lg font-medium text-gray-700">
								Nickname
							</label>
							<Field
								type="text"
								name="nickname"
								id="nickname"
								placeholder={user.nickname}
								className="w-full px-3 py-2 mx-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
							<ErrorMessage component="div" className="text-xs italic text-red-500" name="nickname" />
						</div>
						<div className="flex items-center justify-center m-5">
							<label for="description" className="block text-lg font-medium text-gray-700">
								Description
							</label>
							<Field
								as="textarea"
								name="description"
								id="description"
								placeholder={user.description}
								className="w-full px-3 py-2 mx-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							/>
							<ErrorMessage component="div" className="text-xs italic text-red-500" name="description" />
						</div>
						<div className="flex items-center justify-center m-5">
							<label for="servers" className="block text-lg font-medium text-gray-700">
								Server
							</label>
							<Field
								as="select"
								id="servers"
								name="servers"
								className="px-3 py-2 mx-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
							>
								<option value="LAS">LAS</option>
								<option value="LAN">LAN</option>
								<option value="BR">BR</option>
								<option value="NA">NA</option>
								<option value="EUW">EUW</option>
							</Field>
						</div>

						<div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
							<button
								type="submit"
								className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Save changes
							</button>
						</div>
					</Form>
				</Formik>
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
		</div>
	);
}
