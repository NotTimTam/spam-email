import { React, useState } from "react";
import { useAppContext } from "../util/context";

const WebsiteInput = () => {
	const { setQuery } = useAppContext();
	const [websiteInput, setWebsiteInput] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		setQuery(websiteInput);

		setWebsiteInput("");
	};

	return (
		<div className="website-input">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name=""
					id="website"
					placeholder="https://www.website.com"
					autoComplete="off"
					autoCapitalize="off"
					spellCheck="off"
					value={websiteInput}
					onChange={(e) => setWebsiteInput(e.target.value)}
				/>
				<input type="submit" value="Check Address" />
			</form>
		</div>
	);
};

export default WebsiteInput;
