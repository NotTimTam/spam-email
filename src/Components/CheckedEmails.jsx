import React, { useState, useEffect } from "react";
import { useAppContext } from "../util/context";
import { BsX, BsCheck, BsTrash, BsEnvelope } from "react-icons/bs";

const CheckedEmails = () => {
	const { emails, setEmails, setApi } = useAppContext();
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		setApi("https://api.eva.pingutil.com/email?email=");
	}, [setApi]);

	const deletePastEmail = (id) => {
		setEmails(emails.filter((email) => email.id !== id));
	};

	return (
		<div className="checked-emails">
			{emails.length > 0 && (
				<input
					type="text"
					value={searchQuery}
					autoComplete="off"
					autoCapitalize="off"
					spellCheck="off"
					onChange={(e) => setSearchQuery(e.target.value)}
					className="search-bar"
					placeholder="Search checked emails..."
				/>
			)}

			<ul>
				{emails.filter(
					(email) =>
						email && email.email_address.includes(searchQuery)
				).length === 0 && emails.length > 0 ? (
					<p className="noResults">No search results...</p>
				) : (
					emails
						.filter(
							(email) =>
								email &&
								email.email_address.includes(searchQuery)
						)
						.map((email) => {
							if (email) {
								const {
									email_address: address,
									deliverable: real,
									spam,
									gibberish,
									id,
								} = email;

								return (
									<li key={id}>
										<span
											className="address"
											title={address}
										>
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

										<div className="buttons">
											<a
												href={`${
													!spam
														? real
															? `mailto:${address}`
															: "https://support.google.com/mail/answer/8253?hl=en"
														: "https://support.google.com/mail/answer/8253?hl=en"
												}`}
											>
												<button
													className="btn"
													title={`${
														spam
															? "You shouldn't contact spam addresses."
															: "Send an email to this address."
													}`}
												>
													<BsEnvelope />
												</button>
											</a>

											<button
												onClick={() =>
													deletePastEmail(id)
												}
												className="btn delete-btn"
												title="Remove from search history."
											>
												<BsTrash />
											</button>
										</div>
									</li>
								);
							} else {
								return null;
							}
						})
				)}
			</ul>
		</div>
	);
};

export default CheckedEmails;
