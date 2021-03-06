import React, {useState} from 'react';


export default function Login() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	const handleSubmit = event => {
		event.preventDefault();
		const userData = {
			userName,
			password
		};

		setUser(userData);
		setUserName('');
		setPassword('');
	};

	return (
		<div
			style={{
				textAlign: 'center'
			}}
		>
			<h2>Login</h2>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'grid',
					alignItems: 'center',
					justifyItems: 'center'
				}}
			>
				<input
					type="text"
					placeholder="Username"
					onChange={event => setUserName(event.target.value)}
					value={userName}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={event => setPassword(event.target.value)}
					value={password}
				/>
				<button type="submit">Submit</button>
			</form>

			{user && JSON.stringify(user, null, 2)}

		</div>
	);
}