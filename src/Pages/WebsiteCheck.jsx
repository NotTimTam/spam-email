import React from "react";

import CheckedWebsites from "../Components/CheckedWebsites";
import WebsiteInput from "../Components/WebsiteInput";

const WebsiteCheck = () => {
	return (
		<div className="website-check">
			<h1>
				<span className="grow">Is this website </span>fishing?
			</h1>

			<div className="content">
				<WebsiteInput />
				<CheckedWebsites />
			</div>
		</div>
	);
};

export default WebsiteCheck;
