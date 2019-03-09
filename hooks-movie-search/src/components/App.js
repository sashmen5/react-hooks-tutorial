import React, { useReducer, useEffect } from "react";
import "../App.css";
import axios from "axios";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import reducer from "../reducer/reducer";
const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

const initialState = {
	loading: true,
	movies: [],
	errorMessage: null
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	useEffect(() => {
		axios.get(MOVIE_API_URL)
			.then(({data}) => {
				dispatch({
					type: "SEARCH_MOVIES_SUCCESS",
					payload: data.Search
				});
			});
	}, []);

	const search = searchValue => {
		dispatch({type: "SEARCH_MOVIES_REQUEST"});
		axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
			.then(({data}) => {
				console.log(data);
				if (data.Response === "True") {
					dispatch({type: "SEARCH_MOVIES_SUCCESS", payload: data.Search});
				} else {
					dispatch({type: "SEARCH_MOVIES_FAILURE", error: data.Error});
				}
			});
	};

	const { movies, errorMessage, loading } = state;

	return (
		<div className="App">
			<Header text="HOOKE - MOVIE SEARCH" />
			<Search search={search} />
			<p className="App-intro">Sharing a few of our favourite movies</p>
			<div className="movies">
				{loading && !errorMessage ? (
					<span>Loading... </span>
				) : errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					movies.map((movie, index) => (
						<Movie key={`${index}-${movie.Title}`} movie={movie} />
					))
				)}
			</div>
		</div>
	);
};
export default App;