import { React } from "react";
import EmailCheck from "../Pages/EmailCheck";
import WebsiteCheck from "../Pages/WebsiteCheck";

export const links = [
	{
		id: 1,
		url: "/",
		text: "Check Emails",
		page: <EmailCheck />,
	},

	{
		id: 2,
		url: "/websites",
		text: "Check Websites",
		page: <WebsiteCheck />,
	},
];
