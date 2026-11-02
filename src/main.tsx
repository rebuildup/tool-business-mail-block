import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import BusinessMailBlockApp from "./BusinessMailBlockApp";
import "./styles.css";

const container = document.getElementById("root");

if (!container) {
	throw new Error("Business Mail Block: missing #root element");
}

createRoot(container).render(
	<StrictMode>
		<BusinessMailBlockApp />
	</StrictMode>,
);
