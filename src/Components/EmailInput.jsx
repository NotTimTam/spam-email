import { React, useState } from "react";
import { useAppContext } from "../util/context";

const EmailInput = () => {
	const { query, setQuery } = useAppContext();
	const [emailInput, setEmailInput] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		setQuery(emailInput);

		setEmailInput("");
	};

	return (
		<div className="email_input">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name=""
					id="email"
					placeholder="email@email.com"
					autoComplete="off"
					autoCapitalize="off"
					spellCheck="off"
					value={emailInput}
					onChange={(e) => setEmailInput(e.target.value)}
				/>
				<input type="submit" value="Check Address" />
			</form>
		</div>
	);
};

export default EmailInput;
