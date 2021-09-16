import { useState, useEffect } from "react";
const API_ENDPOINT = `https://api.eva.pingutil.com/email?email=`;

// query is the s=batman part.
export const useFetch = (query) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({ show: false, msg: "" });
	const [data, setData] = useState([]);

	// url is the variable that will take in the endpoint and the query.
	const fetchData = async (url) => {
		setLoading(true);

		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.status === "success") {
				setData(data.Search || data);

				setError({ show: false, msg: "" });
			} else {
				setData(false);

				setError({ show: true, msg: data.Error });
			}

			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		console.log(`${API_ENDPOINT}${query}`);
		fetchData(`${API_ENDPOINT}${query}`);
	}, [query]);

	return { loading, error, data };
};
