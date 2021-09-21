import { useState, useEffect } from "react";
import { post } from "axios";

const API_ENDPOINT = `https://api.eva.pingutil.com/email?email=`;
const BASE_URL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.REACT_APP_SAFE_BROWSING_API_KEY}`;

// query is the s=batman part.
export const useFetch = (query, api) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({ show: false, msg: "" });
	const [data, setData] = useState([]);
	const [emails, setEmails] = useState([]);
	const [websites, setWebsites] = useState([]);

	// useEffect(() => {
	// 	if (emails.length > 5) {
	// 		setEmails(emails.slice(0, emails.length - 1));
	// 	}
	// }, [emails]);

	// url is the variable that will take in the endpoint and the query.
	const fetchData = async (url) => {
		setLoading(true);

		try {
			if (api === API_ENDPOINT) {
				// EMAIL CHECK
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
			} else {
				// WEBSITE CHECK

				let body = {
					client: {
						clientId: "safe-browse-url-lookup",
						clientVersion: "1.0.0",
					},
					threatInfo: {
						threatTypes: [
							"MALWARE",
							"SOCIAL_ENGINEERING",
							"UNWANTED_SOFTWARE",
							"POTENTIALLY_HARMFUL_APPLICATION",
							"THREAT_TYPE_UNSPECIFIED",
						],
						platformTypes: ["ANY_PLATFORM"],
						threatEntryTypes: ["URL"],
						threatEntries: [{ url }],
					},
				};

				const response = await post(BASE_URL, body);
				const data = response.data;

				setData(data);

				setWebsites([
					{ ...data, id: new Date().getTime(), url },
					...websites,
				]);
			}

			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		// console.log(`${api !== "" ? api : ""}${query}`);
		fetchData(`${api !== "" ? api : ""}${query}`);
	}, [query]);

	return { loading, error, data, emails, setEmails, websites, setWebsites };
};
