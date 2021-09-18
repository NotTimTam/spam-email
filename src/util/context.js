import React, { useState, useContext } from "react";
import { useFetch } from "./useFetch";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const [query, setQuery] = useState("");

	const { loading, error, data, emails } = useFetch(query);

	return (
		<AppContext.Provider
			value={{
				query,
				setQuery,
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
