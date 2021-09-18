import React from "react";

import { Link } from "react-router-dom";
import { links } from "../util/consts";

import { useLocation } from "react-router-dom";

const Navbar = () => {
	const location = useLocation();

	return (
		<nav>
			<h1>{location.pathname === "/websites" ? "phishing?" : "spam?"}</h1>
			<div className="links">
				{links.map((link) => {
					const { id, url, text } = link;

					return (
						<Link key={id} to={url}>
							{text}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default Navbar;
