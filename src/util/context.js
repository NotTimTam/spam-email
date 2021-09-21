import React, { useState, useContext } from "react";
import { useFetch } from "./useFetch";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const [query, setQuery] = useState("");
	const [api, setApi] = useState("https://api.eva.pingutil.com/email?email=");

	const { loading, error, data, emails, setEmails, websites, setWebsites } =
		useFetch(query, api);

	return (
		<AppContext.Provider
			value={{
				query,
				setQuery,
				api,
				setApi,
				setEmails,
				websites,
				setWebsites,

				loading,
				error,
				data,
				emails,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
