import { useState, useEffect } from "react";
const API_ENDPOINT = `https://api.eva.pingutil.com/email?email=`;

// query is the s=batman part.
export const useFetch = (query) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({ show: false, msg: "" });
	const [data, setData] = useState([]);
	const [emails, setEmails] = useState([]);

	// useEffect(() => {
	// 	if (emails.length > 5) {
	// 		setEmails(emails.slice(0, emails.length - 1));
	// 	}
	// }, [emails]);

	// url is the variable that will take in the endpoint and the query.
	const fetchData = async (url) => {
		setLoading(true);

		try {
			const response = await fetch(url);
			const data = await response.json();

			setData(data.data || data);

			if (data.data !== undefined) {
				setEmails([
					{ ...data.data, id: new Date().getTime() },
					...emails,
				]);
			}

			setError({ show: false, msg: "" });

			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		// console.log(`${API_ENDPOINT}${query}`);
		fetchData(`${API_ENDPOINT}${query}`);
	}, [query]);

	return { loading, error, data, emails };
};
