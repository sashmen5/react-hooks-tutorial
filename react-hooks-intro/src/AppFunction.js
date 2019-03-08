import React, {
	useState, 	/*state effects*/
	useEffect  /*side effects*/
} from 'react';

const initialLocationState = {
	latitude: null,
	longitude: null,
	speed: null
};

const App = () => {
	const [count, setCount] = useState(0);
	const [isOn, setIsOn] = useState(false);
	const [mousePosition, setMousePosition] = useState({x: null, y: null});
	const [status, setStatus] = useState(navigator.onLine);
	const [{latitude, longitude, speed}, setLocation] = useState(initialLocationState);
	let mounted = true;

	useEffect(
		() => { //executed after every render
		document.title = `You have clicked ${count} times`;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);
		navigator.geolocation.getCurrentPosition(handleGeoLocation); // event that does not have supportive api
		const wathcId = navigator.geolocation.watchPosition(handleGeoLocation); // event that does not have supportive api


		return () => {
			// executed when component unmounts
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
			navigator.geolocation.clearWatch(wathcId);
			mounted = false;
		}
	},
		[count] //only count value makes effects in every render
	);

	const handleGeoLocation = event => {
		if (mounted) {
			const {latitude, longitude, speed} = event.coords;
			setLocation({
				latitude,
				longitude,
				speed
			})
		}
	};

	const handleOnline = () => {
		setStatus(true);
	};

	const handleOffline = () => {
		setStatus(false);
	};

	const handleMouseMove = event => {
		setMousePosition({
			x: event.pageX,
			y: event.pageY,
		})
	};


	const incrementCount = () => {
		setCount(prevCount => prevCount + 1);
	};

	const toggleLight = () => {
		setIsOn(prevIsOn => !prevIsOn)
	};
	return (
		<>
			<h2>Counter</h2>
			<button onClick={incrementCount}>I was clicked {count} times</button>

			<h2>Toggle light</h2>
			<img
				src={
					isOn
						? 'https://icon.now.sh/highlight/fd0'
						: 'https://icon.now.sh/highlight/aaa'
				}
				style={{
					height: '80px',
					width: '80px',
				}}
				onClick={toggleLight}
				alt="Flashlight"
			/>

			<h2>Mouse position</h2>
			{JSON.stringify(mousePosition, null, 2)}

			<h2>NetworkStatus</h2>
			<p>You are <strong>{status ? 'online' : 'offline'}</strong></p>

			<h2>Geolocation</h2>
			<p>Latitude is {latitude}</p>
			<p>Longitude is {longitude}</p>
			<p>Speed is {speed ? speed : '0'}</p>
		</>
	)
};

export default App;