import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

import EmailCheck from "./Pages/EmailCheck";
import WebsiteCheck from "./Pages/WebsiteCheck";

import { links } from "./util/consts";

const filterList = ["Checked Emails"];

function App() {
	return (
		<main>
			<Navbar />

			<Switch>
				<Route exact path="/">
					<EmailCheck />
				</Route>

				<Route path="/websites">
					<WebsiteCheck />
				</Route>

				{links
					.filter((link) => !filterList.includes(link.text))
					.map((link) => {
						const { page, id, url } = link;
						return (
							<Route key={id} path={url}>
								{page}
							</Route>
						);
					})}
			</Switch>

			<div className="attribute-footer">
				<a href="https://eva.pingutil.com/">EVA</a> Email Verification
				API |{" "}
				<a href="https://developers.google.com/safe-browsing">
					Safe Browsing
				</a>{" "}
				API
				<br />
				Icon made by{" "}
				<a href="https://www.freepik.com" title="Freepik">
					Freepik
				</a>{" "}
				from{" "}
				<a href="https://www.flaticon.com/" title="Flaticon">
					www.flaticon.com
				</a>
			</div>
		</main>
	);
}

export default App;
