import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#646cff", // blue
		},
		secondary: {
			main: "#dc004e", // pink
		},
		background: {
			main: "#a0a4fa",
			default: "#f2f2f2", // light grey
		},
	},
});

export default theme;
