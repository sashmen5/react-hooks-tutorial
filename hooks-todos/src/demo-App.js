import React, {useContext, useReducer} from 'react';
import {UserContext} from "./demo-index";

const initialState = {
	count: 0
};

function reducer(state, action) {
	switch(action.type) {
		case "INCREMENT":
			return {
				count: state.count + 1
			};
		case "DECREMENT":
			return {
				count: state.count - 1
			};
		case "RESET":
		default:
			return initialState;
	}
}

export default function DemoApp() {
	const value = useContext(UserContext);
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="p-2">
			Count: {state.count}
			<button className="border p-1 m-1" onClick={() => dispatch({type: "INCREMENT"})}>Increment</button>
			<button className="border p-1 m-1" onClick={() => dispatch({type: "DECREMENT"})}>Decrement</button>
		</div>
	)
}