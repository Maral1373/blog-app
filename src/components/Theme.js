import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#1976d2", // blue
		},
		secondary: {
			main: "#dc004e", // pink
		},
		background: {
			default: "#f2f2f2", // light grey
		},
		text: {
			default: "#111", // blue
		},
	},
});

export default theme;
