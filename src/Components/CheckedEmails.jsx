import React, { useState } from "react";
import { useAppContext } from "../util/context";
import { BsX, BsCheck } from "react-icons/bs";

const CheckedEmails = () => {
	const { emails } = useAppContext();
	const [searchQuery, setSearchQuery] = useState("");

	const handleSubmit = (e) => {
		setSearchQuery("");
	};

	return (
		<div className="checked-emails">
			{emails.length > 0 && (
				<input
					type="text"
					value={searchQuery}
					placeholder="email@email.com"
					autoComplete="off"
					autoCapitalize="off"
					spellCheck="off"
					onChange={(e) => setSearchQuery(e.target.value)}
					className="search-bar"
					placeholder="Search checked emails..."
				/>
			)}

			<ul>
				{emails.filter((email) => {
					if (email && email.email_address.includes(searchQuery)) {
						return email;
					}
				}).length === 0 && emails.length > 0 ? (
					<p className="noResults">No search results...</p>
				) : (
					emails
						.filter((email) => {
							if (
								email &&
								email.email_address.includes(searchQuery)
							) {
								return email;
							}
						})
						.map((email) => {
							if (email) {
								const {
									email_address: address,
									webmail,
									deliverable: real,
									spam,
									gibberish,
									id,
								} = email;

								return (
									<li key={id}>
										<span className="address">
											{address}
										</span>
										<div className="sections">
											<span className="section">
												<div
													className={`icon ${
														real ? "yes" : "no"
													}`}
												>
													{real ? (
														<BsCheck />
													) : (
														<BsX />
													)}
												</div>
												real
											</span>
											<span className="section">
												<div
													className={`icon ${
														spam ? "yes" : "no"
													}`}
												>
													{spam ? (
														<BsCheck />
													) : (
														<BsX />
													)}
												</div>
												spam
											</span>
											<span className="section">
												<div
													className={`icon ${
														gibberish ? "yes" : "no"
													}`}
												>
													{gibberish ? (
														<BsCheck />
													) : (
														<BsX />
													)}
												</div>
												gibberish
											</span>
										</div>
									</li>
								);
							}
						})
				)}
			</ul>
		</div>
	);
};

export default CheckedEmails;
