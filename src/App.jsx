import CheckedEmails from "./Components/CheckedEmails";
import EmailInput from "./Components/EmailInput";

function App() {
	return (
		<main>
			<h1>
				<span className="grow">Is this email address </span>spam?
			</h1>

			<div className="content">
				<EmailInput />
				<CheckedEmails />
			</div>

			<div className="attribute">
				<a href="https://eva.pingutil.com/">EVA</a> Email Verification
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
