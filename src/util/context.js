import React, { useState, useContext } from "react";
import { useFetch } from "./useFetch";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const [query, setQuery] = useState("");
	const { loading, error, data } = useFetch(query);

	return (
		<AppContext.Provider value={{ query, setQuery, loading, error, data }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
