import * as React from "react";
import ReactDOM from "react-dom";
import Main from "./pages/Main";

function App() {
	return (
		<div>
			<Main />
		</div>
	);
}

// render(<App />, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));
