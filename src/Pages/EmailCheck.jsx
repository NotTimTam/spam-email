import React from "react";

import CheckedEmails from "../Components/CheckedEmails";
import EmailInput from "../Components/EmailInput";

const EmailCheck = () => {
	return (
		<div className="email-check">
			<h1>
				<span className="grow">Is this email address </span>spam?
			</h1>

			<div className="content">
				<EmailInput />
				<CheckedEmails />
			</div>
		</div>
	);
};

export default EmailCheck;
