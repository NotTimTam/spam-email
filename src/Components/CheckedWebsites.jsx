import React, { useState, useEffect } from "react";
import { useAppContext } from "../util/context";
import { BsX, BsCheck, BsTrash } from "react-icons/bs";

const CheckedWebsites = () => {
	const { websites, setWebsites, setApi } = useAppContext();
	const [searchQuery, setSearchQuery] = useState("");

	// test url: http://malware.testing.google.test/testing/malware/

	useEffect(() => {
		setApi("");
	}, [setApi]);

	const deletePastWebsite = (id) => {
		setWebsites(websites.filter((website) => website.id !== id));
	};

	return (
		<div className="checked-websites">
			{websites.length > 0 && (
				<input
					type="text"
					value={searchQuery}
					autoComplete="off"
					autoCapitalize="off"
					spellCheck="off"
					onChange={(e) => setSearchQuery(e.target.value)}
					className="search-bar"
					placeholder="Search checked websites..."
				/>
			)}

			<ul>
				{websites.filter(
					(website) => website && website.url.includes(searchQuery)
				).length === 0 && websites.length > 0 ? (
					<p className="noResults">No search results...</p>
				) : (
					websites
						.filter(
							(website) =>
								website && website.url.includes(searchQuery)
						)
						.map((website) => {
							const { url: address, matches, id } = website;

							let safe = !matches ? true : false;
							let real =
								website.url.includes(".") ||
								website.url.includes("https://") ||
								website.url.includes(":");

							return (
								<li key={id}>
									<span className="address" title={address}>
										{address}
									</span>

									<div className="sections">
										<span className="section">
											<div
												className={`icon ${
													real ? "yes" : "no"
												}`}
											>
												{real ? <BsCheck /> : <BsX />}
											</div>
											real
										</span>
										<span className="section">
											<div
												className={`icon ${
													safe && real ? "yes" : "no"
												}`}
											>
												{safe && real ? (
													<BsCheck />
												) : (
													<BsX />
												)}
											</div>
											safe
										</span>
									</div>

									<div className="buttons">
										<button
											onClick={() =>
												deletePastWebsite(id)
											}
											className="btn delete-btn"
											title="Remove from search history."
										>
											<BsTrash />
										</button>
									</div>
								</li>
							);
						})
				)}
			</ul>
		</div>
	);
};

export default CheckedWebsites;
